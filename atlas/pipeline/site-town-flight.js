const FLIGHT_MAP={"desktop":"img/atlas/flight-regions.webp?v=d40751de9f","mobile":"img/atlas/flight-regions-m.webp?v=733d9e8500","bounds":[-425.188847735177,-742.9916716839022,558.5359493042099,226.6666331151739],"towns":{"30a":[-205.12920847238226,-497.5120687678498],"dunedin":[118.81996935206179,-314.79795103064157],"clearwaterbeach":[115.27532158970834,-312.03158491166187],"gulfport":[127.19363791832008,-294.0240931205479],"ami":[124.98453984166848,-277.1847705228766],"longboat":[133.52869272717462,-267.25073783188975],"apollo-beach":[155.93809803415454,-297.4711158267074],"clearwater":[117.75644070437052,-311.31630621079125],"indian-rocks-beach":[113.6066474228451,-305.78701612126207],"madeira-beach":[120.07130838445127,-297.55985363624154],"new-port-richey":[125.46235829677109,-333.7648641607344],"ruskin":[153.2499725775903,-290.70321319600924],"safety-harbor":[128.69425060303072,-313.939423357598],"st-pete-beach":[124.5929766175035,-291.06610688490633],"st-petersburg":[134.30974626116142,-296.7401405645519],"sun-city-center":[162.40506942249712,-292.24181587634473],"tampa":[150.8369193127122,-310.7257626899544],"tarpon-springs":[121.68913533832163,-326.6163228092055],"treasure-island":[120.86636741542021,-296.6424409133501],"bradenton":[141.30553167349706,-274.87879799344086],"bradenton-beach":[128.91954871341431,-272.71477003112045],"cortez":[129.9652371526435,-272.7648637957888],"englewood":[162.4004042428245,-232.92835068812525],"sarasota":[143.5482648377456,-262.49548094629256],"siesta-key":[143.35920183613064,-257.24128136217536],"venice":[152.81496672593394,-244.1240408785298],"miami":[381.75027799919474,-143.73303596502774],"southbeach":[387.2244800014506,-144.21552021380504],"naples":[219.707887643899,-169.0628410191171],"marco-island":[225.96318816444867,-154.0289812460037],"everglades-city":[261.66203538802864,-147.83941790608807],"chokoloskee":[264.13850675686126,-144.14523484332517],"pensacola":[-308.84062379781926,-505.7732420750908],"jacksonville":[224.98663583925443,-497.7139166171745],"pensacola-beach":[-302.17195290437786,-499.9826095525608],"panama-city":[-159.80773372126401,-483.9066686122154],"pcb":[-180.30192530307662,-488.99091427775835],"destin":[-240.67662251487153,-503.9135143677643],"port-st-joe":[-125.9370034091393,-456.89933654976977],"apalachicola":[-95.3442111124957,-450.03596225852954],"st-george-island":[-83.67902387898468,-444.98170623782295],"carrabelle":[-64.25562735638043,-459.267251295435],"st-marks":[-19.91920560340043,-483.05755588093876],"st-teresa":[-42.74834463020166,-465.67545166803126],"mexico-beach":[-137.10574399674232,-467.88616530554293],"cedarkey":[93.77422496734614,-403.5697912347527],"crystal-river":[136.92625384780996,-385.03679936446093],"homosassa":[134.47887740770298,-375.7915869669276],"ozello":[130.69936145193745,-379.6040204924721],"steinhatchee":[59.343597981142906,-445.3801077226909],"perdido-key":[-328.2829629980431,-498.0201033583723],"gulf-breeze":[-304.6296904446297,-501.05140792885214],"navarre":[-274.73368516994424,-504.78983347887623],"navarre-beach":[-275.0888309418817,-503.4114286258375],"fort-walton-beach":[-250.4457191945155,-504.5677960765869],"okaloosa-island":[-249.18758938533475,-503.98226839995385],"mary-esther":[-256.0981694853347,-505.3421949741607],"shalimar":[-247.56985305798935,-507.4405815200341],"niceville":[-238.3815330248605,-513.5332407743257],"valparaiso":[-238.7756308129572,-512.1882735215456],"miramar-beach":[-229.51371890096934,-502.4881981763087],"freeport":[-204.81203052249137,-511.655574894486],"keaton-beach":[39.43806095176344,-457.13117129816663],"horseshoe-beach":[69.20040258385265,-427.5967498348962],"suwannee":[83.050284295743,-418.4837442210105],"yankeetown":[125.00223704125519,-395.41093684809664],"inglis":[129.3770983243697,-395.10471240408765],"hernando-beach":[131.4545799785487,-353.0484995564618],"weeki-wachee":[139.38417025000942,-354.7390035262396],"aripeka":[130.5400213373642,-348.05941547842434],"oldsmar":[130.7604578173398,-317.04583880444727],"palm-harbor":[120.7536052432815,-320.6308445035526],"belleair-beach":[113.9347686458046,-307.2512752801668],"indian-shores":[113.83497466273747,-303.12603903269206],"redington-shores":[114.83495193754455,-301.56642788401865],"north-redington-beach":[116.19495860778552,-300.13643499758626],"redington-beach":[117.12962047443735,-299.50517218807397],"tierra-verde":[125.81107666550731,-289.9666369328732],"holiday":[120.44252179966894,-328.2640907366926],"port-richey":[125.05155736849304,-335.6150206764746],"hudson":[126.60046225297488,-342.30791475172845],"gibsonton":[159.05283332012303,-303.64662618719797],"captiva":[180.28235452492913,-198.3253861089857],"matlacha":[191.41192933380705,-206.91717851424318],"keywest":[222.83435925032984,-45.24590897548493],"islamorada":[340.1967143025594,-75.72446642825476],"ftl":[384.849103609368,-170.65434576388475],"delray":[391.46056181503315,-197.76227972788706],"jupiter":[387.8400860914756,-235.18818513300522],"fortpierce":[362.395367428135,-274.4765770285058],"cocoa":[331.98950574761994,-346.3167526379861],"nsb":[301.2425206655232,-397.3818657891322],"daytona":[290.1471578738472,-412.2942685524188],"flagler":[277.8510748048117,-431.90815446867884],"staug":[259.02270530606637,-464.1574168019296],"jaxbeach":[250.59755801354066,-495.4846111160919],"fernandina":[242.8044793980225,-525.073927939481],"bonita-springs":[221.36948091097722,-185.1139100020526],"cape-coral":[204.2732203705647,-202.40292729224464],"fort-myers":[211.63194448149878,-208.12516365129085],"fort-myers-beach":[204.57317693450483,-193.85143366361535],"port-charlotte":[189.33571315926068,-234.72360925381565],"punta-gorda":[193.3455764057931,-231.0326541024459],"sanibel-island":[196.8578363546581,-193.3414880501445],"key-largo":[358.23605358449356,-89.20755302988862],"bal-harbour":[387.32441209251084,-153.10964251824146],"boca-raton":[389.76428060334024,-189.22412376480943],"dania-beach":[388.054126618173,-165.45806302625144],"hallandale":[387.41214877654716,-160.13410785093083],"highland-beach":[391.4481045647364,-192.88789580436872],"hollywood":[387.437744257493,-162.37799026763062],"lauderdale-by-the-sea":[389.0957362141485,-176.63603900721878],"lighthouse-point":[389.85614183584926,-183.0488029219985],"north-miami-beach":[383.54957437520164,-155.5275467018467],"north-palm-beach":[390.1891358399053,-225.95684930904312],"palm-beach":[393.31543004996576,-217.02343993844806],"palm-beach-gardens":[383.408859186051,-225.9077500972491],"riviera-beach":[391.96734673188007,-222.40914115055938],"sunny-isles-beach":[387.5467557252118,-156.24776214047583],"west-palm-beach":[391.71790539442316,-217.3296427285694],"wilton-manors":[385.4978504858427,-173.8991077818954],"jensen-beach":[372.1414930292185,-259.1297407913635],"port-st-lucie":[363.74389857528485,-260.66797486822924],"sebastian":[347.39469489542626,-302.0511078016847],"stuart":[370.57028115890296,-254.77868192611322],"vero-beach":[358.57561558768606,-289.6948667059901],"indialantic":[336.3664744816799,-324.8202264431064],"melbourne-beach":[336.5994316785397,-322.54116544568365],"palm-bay":[335.1894227719694,-319.83347077327767],"satellite-beach":[334.02708953672817,-330.0195519713893],"titusville":[311.4267399673354,-364.4929100904243],"west-melbourne":[326.6675406828146,-322.9780475494852],"atlantic-beach":[249.31879637916606,-498.35153801024535],"neptune-beach":[249.97176685068496,-497.91379356289826],"ponte-vedra-beach":[251.66802928771105,-491.3614341529529],"st-augustine-beach":[263.4199018300592,-461.2210540431358],"daytona-beach-shores":[292.45856922398286,-409.3971885495343],"ormond-beach":[286.10549677530116,-417.7401989122731],"palm-coast":[271.5656962015788,-439.1721544408679],"port-orange":[292.21596350112515,-406.28063869177515],"south-daytona":[290.8753099645143,-408.34971034069036],"boynton-beach":[392.11002742890525,-202.3573241004577],"lake-worth-beach":[392.6008917168031,-209.31531034291442],"juno-beach":[390.4486196569168,-230.92242379705934],"tequesta":[386.55608183340803,-236.48633418663445],"lantana":[392.5766704757152,-206.85891300019262],"lake-park":[391.43423369455354,-223.64638673546955],"palm-beach-shores":[393.10843341214576,-222.30392984888232],"hobe-sound":[382.96820904521974,-244.17380329511064],"port-salerno":[376.3986165080435,-250.89850908640753],"palm-city":[368.10827591527317,-253.1400287827585],"sewalls-point":[375.3961850411974,-254.78915040550052],"indian-river-shores":[356.1935319496999,-294.58336296241924],"hutchinson-island":[374.9871752853651,-259.70616273149267],"melbourne":[333.1299306486924,-322.9344900935437],"cape-canaveral":[332.8218023068356,-348.8782625456827],"merritt-island":[325.0381749487224,-345.87145019592845],"rockledge":[321.47770850384364,-342.15790052624766],"cocoa-village":[320.216332190397,-344.38902240425324],"indian-harbour-beach":[333.28050611358344,-328.7302359482553],"ponce-inlet":[297.79998817053973,-401.11871518823096],"edgewater":[300.8501356259437,-394.2246797015151],"holly-hill":[288.2284895754368,-412.70793543284026],"ormond-by-the-sea":[284.8848583484541,-420.51667008562134],"beverly-beach":[276.0322290391207,-434.6638393566894],"vilano-beach":[260.2827095498576,-466.65667852551104],"crescent-beach":[264.9483510431363,-454.92577037496034]}};
const flightMapImages=new Map();
const TOWN_TONES={};
function townToneStyle(key){return `filter:url(#atlas-tone-${key})`;}
function townToneHTML(key){
 const tone=TOWN_TONES[key];
 const sharpen='<feConvolveMatrix order="3" kernelMatrix="0 -0.12 0 -0.12 1.48 -0.12 0 -0.12 0" edgeMode="duplicate" preserveAlpha="true"/>';
 if(!tone)return `<svg aria-hidden="true" style="position:absolute;width:0!important;height:0!important;overflow:hidden"><defs><filter id="atlas-tone-${key}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">${sharpen}</filter></defs></svg>`;
 const table=channel=>Array.from({length:65},(_,i)=>Math.max(0,Math.min(1,(64-Math.abs(i*255/64-channel))/52)).toFixed(3)).join(' ');
 const functions=tone.water.map((v,i)=>`<feFunc${'RGB'[i]} type="table" tableValues="${table(v)}"/>`).join('');
 const shifts=tone.shift.map((v,i)=>`<feFunc${'RGB'[i]} type="linear" slope="1" intercept="${(v/255).toFixed(5)}"/>`).join('');
 return `<svg aria-hidden="true" style="position:absolute;width:0!important;height:0!important;overflow:hidden"><defs><filter id="atlas-tone-${key}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feComponentTransfer in="SourceGraphic" result="water-key">${functions}</feComponentTransfer><feColorMatrix in="water-key" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 -2" result="water-mask"/><feComponentTransfer in="SourceGraphic" result="shifted">${shifts}</feComponentTransfer><feComposite in="shifted" in2="water-mask" operator="in" result="water"/><feComposite in="SourceGraphic" in2="water-mask" operator="out" result="land"/><feComposite in="land" in2="water" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>${sharpen}</filter></defs></svg>`;
}

function flightMapTexture(){
 const path=window.innerWidth<700?FLIGHT_MAP.mobile:FLIGHT_MAP.desktop;
 if(!flightMapImages.has(path)){const image=new Image();image.src=path;flightMapImages.set(path,image);}
 return flightMapImages.get(path);
}
if(location.pathname.endsWith('/find-your-mile.html')){
 if(window.requestIdleCallback)requestIdleCallback(()=>flightMapTexture(),{timeout:1500});else setTimeout(()=>flightMapTexture(),1000);
}
async function prepareRevealView(root) {
  const texture=flightMapTexture();
  const images = [texture,...root.querySelectorAll('.lnd img,.rv-card .ph img,.rvp-hero img')];
  for(const illustrated of root.querySelectorAll('.illus-img')) {
    const image=new Image();image.src=illustrated.getAttribute('href');images.push(image);
  }
  const decoded = images.map(image => {
    if (image.complete && image.naturalWidth) return Promise.resolve();
    if (image.decode) return image.decode().catch(() => {});
    return new Promise(resolve => {
      image.addEventListener('load', resolve, {once:true});
      image.addEventListener('error', resolve, {once:true});
    });
  });
  let deadline;
  await Promise.race([
    Promise.all(decoded),
    new Promise(resolve => { deadline = setTimeout(resolve, 4000); })
  ]);
  clearTimeout(deadline);
  const aerial = root.querySelector('.lnd img');
  if (aerial && (!aerial.complete || !aerial.naturalWidth)) aerial.closest('.lnd').remove();
}
const townTextureCache=new Map();
function townTexture(image){
 const key=image.getAttribute('src').split('/').pop().replace(/\.webp(?:\?.*)?$/,'');
 if(townTextureCache.has(key))return townTextureCache.get(key);
 const canvas=document.createElement('canvas');canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
 const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
 const pixels=ctx.getImageData(0,0,canvas.width,canvas.height),data=pixels.data,tone=TOWN_TONES[key];
 if(tone)for(let i=0;i<data.length;i+=4){
  const weight=Math.max(0,[0,1,2].reduce((sum,c)=>sum+Math.max(0,Math.min(1,(64-Math.abs(data[i+c]-tone.water[c]))/52)),0)-2);
  for(let c=0;c<3;c++)data[i+c]+=tone.shift[c]*weight;
 }
 const original=new Uint8ClampedArray(data),stride=canvas.width*4;
 for(let y=1;y<canvas.height-1;y++)for(let x=1;x<canvas.width-1;x++){
  const i=y*stride+x*4;for(let c=0;c<3;c++)data[i+c]=original[i+c]*1.48-.12*(original[i+c-4]+original[i+c+4]+original[i+c-stride]+original[i+c+stride]);
 }
 ctx.putImageData(pixels,0,0);
 // Feather in map space, so detail merges with its surroundings instead of
 // presenting the outline of a moving viewport-sized photograph.
 ctx.globalCompositeOperation='destination-in';
 for(const horizontal of [true,false]){
  const gradient=ctx.createLinearGradient(0,0,horizontal?canvas.width:0,horizontal?0:canvas.height);
  gradient.addColorStop(0,'transparent');gradient.addColorStop(.2,'#000');gradient.addColorStop(.8,'#000');gradient.addColorStop(1,'transparent');
  ctx.fillStyle=gradient;ctx.fillRect(0,0,canvas.width,canvas.height);
 }
 ctx.globalCompositeOperation='source-over';
 townTextureCache.set(key,canvas);
 while(townTextureCache.size>4)townTextureCache.delete(townTextureCache.keys().next().value);
 return canvas;
}
function flyTo(id,finished,destination){
 const root=document.querySelector('.fs-rv,.fs-rvp');if(!root)return 0;
 const map=root.querySelector('.fs-map'),oldAerial=map.querySelector('.lnd'),nextAerial=destination?.querySelector('.fs-map .lnd');
 const fromId=map.dataset.town||map.querySelector('.dot.hot')?.getAttribute('data-id');
 const fromTown=T.find(t=>t.id===fromId),toTown=T.find(t=>t.id===id);
 if(!oldAerial||!nextAerial||!fromTown||!toTown)return 0;
 const rawFrom=FLIGHT_MAP.towns[fromId],rawTo=FLIGHT_MAP.towns[id];if(!rawFrom||!rawTo)return 0;
 const next=nextAerial.cloneNode(true);next.style.visibility='hidden';map.appendChild(next);
 const measure=(node,tid,image=node.querySelector('img'))=>{
  const box=node.querySelector('.lnd-box').getBoundingClientRect(),entry=LANDING[tid],close=/-close(?:-m)?\.webp/.test(image.getAttribute('src'))&&entry.chw,mobile=node.classList.contains('m');
  const half=close?mobile?entry.cmhw:entry.chw:mobile?entry.mhw:entry.hw;
  const vertical=close?mobile?entry.cmhh:entry.chh:mobile?entry.mhh:entry.hh;
  return {key:image.getAttribute('src'),center:[box.left+box.width/2,box.top+box.height/2],scale:box.width/(half*2),half,vertical,point:FLIGHT_MAP.towns[tid],texture:townTexture(image)};
 };
 const departure=measure(oldAerial,fromId),arrival=measure(next,id,nextAerial.querySelector('img'));next.remove();
 const tiles=[...(map.atlasTiles||[departure]).filter(tile=>tile.key!==arrival.key),arrival].slice(-4);
 const viewport=map.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,2),canvas=document.createElement('canvas');
 canvas.className='continuous-atlas';canvas.setAttribute('aria-hidden','true');canvas.width=Math.round(viewport.width*ratio);canvas.height=Math.round(viewport.height*ratio);
 canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none';
 const ctx=canvas.getContext('2d',{alpha:false});ctx.setTransform(ratio,0,0,ratio,0,0);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
 const background=flightMapTexture(),bounds=FLIGHT_MAP.bounds;
 const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*t*(t*(t*6-15)+10);};
 const mix=(a,b,t)=>a+(b-a)*t,exp=(a,b,t)=>Math.exp(mix(Math.log(a),Math.log(b),t));
 const km=Math.hypot((toTown.lon-fromTown.lon)*111.32*Math.cos((toTown.lat+fromTown.lat)*Math.PI/360),(toTown.lat-fromTown.lat)*110.57);
 const zoomOnly=fromId===id;
 const duration=zoomOnly?900:Math.round(Math.min(5000,3300+km*2.5)),cruise=Math.min(Math.min(departure.scale,arrival.scale)*.12,Math.min(viewport.width,viewport.height)*.64/(km+45));
 function paint(time){
  const travel=smooth((time-.1)/.8),scale=zoomOnly?exp(departure.scale,arrival.scale,smooth(time)):time<.48?exp(departure.scale,cruise,smooth(time/.48)):time>.52?exp(cruise,arrival.scale,smooth((time-.52)/.48)):cruise;
  const anchor=[mix(departure.center[0],arrival.center[0],travel)-viewport.left,mix(departure.center[1],arrival.center[1],travel)-viewport.top];
  const left=mix(rawFrom[0],rawTo[0],travel)-anchor[0]/scale,top=mix(rawFrom[1],rawTo[1],travel)-anchor[1]/scale;
  const draw=(image,x,y,w,h)=>ctx.drawImage(image,(x-left)*scale,(y-top)*scale,w*scale,h*scale);
  ctx.globalAlpha=1;ctx.fillStyle='#71adbd';ctx.fillRect(0,0,viewport.width,viewport.height);
  if(background.complete&&background.naturalWidth)draw(background,bounds[0],bounds[1],bounds[2]-bounds[0],bounds[3]-bounds[1]);
  for(const tile of tiles){
   const width=tile.half*2*scale;
   // A geographic level of detail, independent of departure/arrival timing.
   // These tiles never slide or scale separately from the map camera.
   ctx.globalAlpha=smooth((width-12)/100);
   if(ctx.globalAlpha)draw(tile.texture,tile.point[0]-tile.half,tile.point[1]-tile.vertical,tile.half*2,tile.vertical*2);
  }
  ctx.globalAlpha=1;
 }
 map.querySelectorAll('.continuous-atlas').forEach(node=>node.remove());map.appendChild(canvas);paint(0);
 oldAerial.style.background='transparent';oldAerial.querySelector('img').style.opacity='0';root.classList.add('flying');
 const label=root.querySelector('.rvp-maplabel');if(label)label.textContent=zoomOnly?short(toTown):short(fromTown)+' → '+short(toTown);
 let complete=false;const started=performance.now();
 const done=()=>{
  if(complete)return;complete=true;clearTimeout(deadline);
  if(root.isConnected){
   paint(1);const target=destination.querySelector('.fs-map');target.dataset.town=id;target.atlasTiles=tiles;
   nextAerial.style.background='transparent';nextAerial.querySelector('img').style.opacity='0';target.appendChild(canvas);
  }
  finished();
 };
 const tick=now=>{if(complete)return;if(!root.isConnected){done();return;}const t=Math.max(0,Math.min(1,(now-started)/duration));paint(t);if(t<1)requestAnimationFrame(tick);else done();};
 const deadline=setTimeout(done,duration+400);tick(started);return duration;
}

async function zoomTownDetail(button){
 if(S.flying)return;
 const root=button.closest('.fs-rv,.fs-rvp'),old=button.closest('.lnd'),town=rankedTowns().slice(0,5)[S.reveal||0];
 if(!root||!old||!town)return;
 S.lndClose=!S.lndClose;track('aerial_zoom',S.lndClose?'close':'town');S.flying=true;
 const holder=document.createElement('div');holder.innerHTML='<div class="fs-map mapbox">'+landingHTML(town,old.classList.contains('m'))+'</div>';
 await prepareRevealView(holder);
 if(!root.isConnected){S.flying=false;return;}
 if(!holder.querySelector('.lnd')){S.lndClose=!S.lndClose;S.flying=false;return;}
 const done=()=>{
  if(!root.isConnected){S.flying=false;return;}
  holder.querySelector('.flight-world')?.remove();
  root.querySelector('.fs-map').replaceWith(holder.querySelector('.fs-map'));
  root.classList.remove('flying');S.flying=false;
  const queued=S.rvQueue;S.rvQueue=null;if(queued)root.querySelector(`[data-rv="${queued}"]`)?.click();
 };
 if(!flyTo(town.id,done,holder))done();
}
