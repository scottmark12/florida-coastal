// Publish only price data and its comparison renderer. Preserve independently maintained live pages.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {minify}=require('terser');const images=require('./images');
const root=path.resolve(__dirname,'../..');const hash=s=>crypto.createHash('sha1').update(s).digest('hex').slice(0,10);
(async()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'src/manifest.json'),'utf8'));const replace=[];
 for(const name of ['towns','beach-towns-t','compare-d','results-td']){
  const spec=Object.values(manifest.data).find(d=>d.file===name+'.json');if(!spec)throw Error(name);
  const value=JSON.parse(fs.readFileSync(path.join(root,'src/data',spec.file),'utf8'));
  const body=images.rewrite(`${spec.kind} ${spec.name}=${JSON.stringify(value)};`),dest=`assets/v3/data/${name}.${hash(body)}.js`;
  fs.writeFileSync(path.join(root,dest),body);replace.push([new RegExp('assets/v3/data/'+name+'\\.[a-f0-9]+\\.js','g'),dest]);
 }
 const body=images.rewrite((await minify(fs.readFileSync(path.join(root,'src/js/compare-1.js'),'utf8'),{ecma:2020,compress:{passes:1,keep_fargs:true,keep_infinity:true},mangle:{toplevel:false},format:{comments:false}})).code);
 const dest=`assets/v3/compare-1.${hash(body)}.js`;fs.writeFileSync(path.join(root,dest),body);replace.push([/assets\/v3\/compare-1\.[a-f0-9]+\.js/g,dest]);
 const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()&&!['.git','node_modules','src','img'].includes(e.name)?walk(path.join(d,e.name)):e.isFile()&&e.name.endsWith('.html')?[path.join(d,e.name)]:[]);
 let changed=0;for(const file of walk(root)){let s=fs.readFileSync(file,'utf8'),n=s;for(const [a,b]of replace)n=n.replace(a,b);if(n!==s){fs.writeFileSync(file,n);changed++}}
 console.log(`Updated price references in ${changed} live HTML files; wrote five content-hashed assets.`);
})().catch(e=>{console.error(e);process.exit(1)});
