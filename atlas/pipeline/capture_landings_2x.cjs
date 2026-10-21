// Offline asset export: exact published URLs, 1600x1000 CSS pixels, DPR 2.
const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
const crypto=require('node:crypto');
const OUT=path.join(__dirname,'outputs/landing-2x');
const BASE=process.env.ATLAS_EXPORT_BASE||'http://127.0.0.1:8785/atlas/landing/';
const sha=data=>crypto.createHash('sha256').update(data).digest('hex');
async function main(){
 const queue=JSON.parse(await fs.readFile(path.join(OUT,'capture-queue.json'),'utf8'));
 const captures=path.join(OUT,'captures');await fs.mkdir(captures,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--force-color-profile=display-p3']});
 let cursor=0,done=0;
 async function worker(){
  const context=await browser.newContext({viewport:{width:1600,height:1000},deviceScaleFactor:2});
  let page=await context.newPage();
  while(cursor<queue.length){
   // Keep temporary captures bounded on laptops; the encoder removes them.
   while((await fs.readdir(captures)).filter(name=>name.endsWith('.png')).length>12)
    await new Promise(resolve=>setTimeout(resolve,1000));
   const item=queue[cursor++],stem=item.town_id+'-'+item.view,signature=sha(JSON.stringify(item));
   const metaPath=path.join(captures,stem+'.json'),png=path.join(captures,stem+'.png');
   try{const old=JSON.parse(await fs.readFile(metaPath,'utf8'));const staged=await fs.stat(path.join(OUT,'staged',stem+'.json')).catch(()=>null);if(old.signature===signature&&old.deviceScaleFactor===2&&!old.errors.length&&(staged||(await fs.stat(png)).size>0)){done++;continue}}catch{}
   let success=false;
   for(let attempt=0;attempt<2&&!success;attempt++){
    const errors=[];const onError=e=>errors.push(e.message);page.on('pageerror',onError);
    try{
     await page.goto(new URL(item.url,BASE).href,{waitUntil:'load',timeout:120000});
     await page.waitForSelector('body[data-ready="true"]',{state:'attached',timeout:120000});
     await page.waitForLoadState('networkidle',{timeout:120000});
     // Wait for the viewer's final asynchronous canopy redraw and GPU frame.
     await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
     const meta=await page.locator('body').evaluate(body=>({camera:JSON.parse(body.dataset.camera),viewport:body.dataset.viewport,deviceScaleFactor:devicePixelRatio,canvas:[...document.querySelectorAll('#map canvas')].map(c=>[c.width,c.height]),forestTrees:body.dataset.forestTrees,triangles:body.dataset.triangles}));
     if(errors.length)throw new Error(errors.join('; '));
     if(meta.deviceScaleFactor!==2||meta.viewport!=='1600×1000'||!meta.canvas.some(c=>c[0]===3200&&c[1]===2000))throw new Error('Wrong capture resolution');
     await page.screenshot({path:png+'.part',type:'png',scale:'device',timeout:120000});
     await fs.rename(png+'.part',png);
     await fs.writeFile(metaPath+'.part',JSON.stringify({...meta,errors,signature,url:new URL(item.url,BASE).href,colorEncoding:'sRGB screenshot; encode as approved untagged Display P3 channels'},null,2)+'\n');
     await fs.rename(metaPath+'.part',metaPath);
     success=true;done++;console.log(`${done}/${queue.length} ${stem}`);
    }catch(error){console.error(stem,'attempt',attempt+1,error.message);await page.close();page=await context.newPage();if(attempt===1)throw error}
    finally{page.off('pageerror',onError)}
   }
  }
  await context.close();
 }
 try{await Promise.all(Array.from({length:Number(process.env.ATLAS_EXPORT_WORKERS||2)},worker))}finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
