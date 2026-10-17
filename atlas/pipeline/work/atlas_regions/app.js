import {createRegionLayer,recipeGlyph} from '../coastal_pipeline/v3/atlas-layer.js';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
async function main(){
const assetBase=new URL('.',document.currentScript.src).href;
if(new URLSearchParams(location.search).get('proof')==='unlabeled')document.documentElement.classList.add('unlabeled');
const started=performance.now(), $=s=>document.querySelector(s), mobile=matchMedia('(max-width:699px)').matches;
const [catalog,districts,features,builtRoutes,roadData]=await Promise.all(['catalog.json','districts.json','features.json','routes.json','roads.json'].map(p=>fetch(assetBase+p).then(r=>r.json())));
const packageRegistry=await fetch(assetBase+'package-registry.json').then(r=>r.json());
const towns=catalog.towns, regions=catalog.regions, byId=Object.fromEntries(towns.map(t=>[t.id,t]));
const qs=new URLSearchParams(location.search);const landing=qs.get('landing')==='1';if(landing)document.documentElement.classList.add('landing-export');
let thirty=null,thirtyModel=null,sandArt=null,alysArt=null,alysOccupied=[];
async function loadThirty(){if(!thirty){thirty=await fetch(assetBase+'30a.json').then(r=>r.json());const vs=await fetch(assetBase+'sand.json').then(r=>r.json());const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vs,3));sandArt=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:'#fffdf1',side:THREE.DoubleSide,toneMapped:false}));scene.add(sandArt);const exact=await fetch(assetBase+'alys-geometry.json.gz').then(async r=>new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).json());alysOccupied=exact.occupied;alysArt=new THREE.Group();for(const [key,vs] of Object.entries(exact)){if(key==='occupied')continue;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vs,3));g.computeVertexNormals();const m=new THREE.MeshStandardMaterial({color:key==='walls'?'#fff9e9':key==='roofs'?'#fffdf6':'#ded1b4',side:THREE.DoubleSide,roughness:.92,flatShading:true});const mesh=new THREE.Mesh(g,m);mesh.castShadow=key!=='lanes';mesh.receiveShadow=true;alysArt.add(mesh)}scene.add(alysArt)}return thirty}
let townId=qs.get('view')||'30a';if(!byId[townId])townId='30a';
let level=qs.get('level')||'region', activeTown=byId[townId], region=regionFor(townId), selectedDistrict=null, selectedFeature=null, weights={}, top5=[], resultsProvided=false, airportRoutes=builtRoutes;
function regionFor(id){return regions.find(r=>r.towns.includes(id))||regions[0]}
const scene=new THREE.Scene();scene.background=new THREE.Color('#3593ae');
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=THREE.PCFSoftShadowMap;$('#map').append(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x798b77,1.5));const sun=new THREE.DirectionalLight(0xfff5df,1.7);sun.castShadow=!mobile;sun.shadow.mapSize.set(mobile?1024:2048, mobile?1024:2048);sun.shadow.bias=-.0003;scene.add(sun,sun.target);
const sea=new THREE.Mesh(new THREE.PlaneGeometry(3500,3500),new THREE.MeshBasicMaterial({color:'#3593ae',toneMapped:false}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-.4,-400);scene.add(sea);
const roadGeometry=new THREE.BufferGeometry();roadGeometry.setAttribute('position',new THREE.Float32BufferAttribute(roadData,3));const roadLines=new THREE.LineSegments(roadGeometry,new THREE.LineBasicMaterial({color:'#958a6e',transparent:true,opacity:.3}));scene.add(roadLines);
const camera=new THREE.OrthographicCamera(-50,50,50,-50,.0001,3500), target=new THREE.Vector3(), overlays=new THREE.Group();scene.add(overlays);let span=48, architecture=null, stateIcons=null, currentPackage='', packageToken=0;
const loader=new GLTFLoader(), cache=new Map();
const lakeRay=new THREE.Raycaster();renderer.domElement.addEventListener('click',e=>{if(!isThirty()||!terrain)return;lakeRay.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY-renderer.domElement.getBoundingClientRect().top)/renderer.domElement.getBoundingClientRect().height*2+1),camera);const hit=lakeRay.intersectObject(terrain,true).find(h=>h.object.name.startsWith('Lake_')||h.object.name.startsWith('Lake /'));if(!hit)return;const lake=thirty.lakes.find(l=>hit.object.name.includes(l.name.replaceAll(' ','_'))||hit.object.name.includes(l.name));if(lake)openLake(lake)});
function openLake(l){$('#card-title').textContent=l.name;$('#card-copy').textContent='A coastal dune lake. Its mapped outline follows OpenStreetMap; seasonal water levels and outfalls change.';$('#card-price').textContent='Mapped water is not a statement of public access. Check the county access guide before visiting.';$('#card-source').href=l.source;$('#card-source').textContent='View mapped shoreline';$('#card-place')?.remove();$('#card').hidden=false;document.body.classList.add('card-open')}
async function load(name){
 if(cache.has(name))return cache.get(name);
 const promise=(async()=>{const r=await fetch(assetBase+'assets/'+name+'.glb.gz');if(!r.ok)throw Error('Map package unavailable');const bytes=await r.arrayBuffer();const unpacked=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();return new Promise((resolve,reject)=>loader.parse(unpacked,'',g=>{g.scene.traverse(o=>{if(!o.isMesh)return;const name=o.name+' '+o.parent?.name;if(/Geography.*miami.lanes/i.test(name))o.visible=false;o.castShadow=!name.includes('Geography');o.receiveShadow=true;if(/Continuous.forest.canopy/.test(name)&&thirty){o.material=o.material.clone();o.material.transparent=true;o.material.depthWrite=false;const mask=new THREE.TextureLoader().load(assetBase+'canopy-mask.png',texture=>{const canvas=document.createElement('canvas');canvas.width=texture.image.width;canvas.height=texture.image.height;const ctx=canvas.getContext('2d');ctx.drawImage(texture.image,0,0);canopyPixels=ctx.getImageData(0,0,canvas.width,canvas.height);render()});mask.flipY=true;const b=thirty.canopyBounds;o.material.onBeforeCompile=shader=>{shader.uniforms.canopyMask={value:mask};shader.uniforms.canopyBounds={value:new THREE.Vector4(...b)};shader.vertexShader='varying vec3 canopyP;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n canopyP=position;');shader.fragmentShader='varying vec3 canopyP; uniform sampler2D canopyMask; uniform vec4 canopyBounds;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n vec2 canopyUV=(vec2(canopyP.x,-canopyP.z)-canopyBounds.xy)/(canopyBounds.zw-canopyBounds.xy); float density=texture2D(canopyMask,canopyUV).r; if(density<0.02)discard; diffuseColor.a*=density; float canopy=sin(canopyP.x*720.0)*sin(canopyP.z*650.0);diffuseColor.rgb*=0.97+0.06*canopy;');};} if(/Depth.band/.test(name)){const m=Array.isArray(o.material)?o.material[0]:o.material;o.material=new THREE.MeshBasicMaterial({name:m.name,color:m.color,side:THREE.DoubleSide,toneMapped:false})}});resolve(g.scene)},reject))})();cache.set(name,promise);return promise;
}

function maskLegacyThirty(model){model.traverse(o=>{if(!o.isMesh||o.userData.thirtyMasked)return;o.userData.thirtyMasked=true;const ms=Array.isArray(o.material)?o.material:[o.material];const replacements=ms.map(m=>{const copy=m.clone();copy.onBeforeCompile=shader=>{shader.vertexShader='varying vec3 patchWorld;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>','#include <project_vertex>\n patchWorld=(modelMatrix*vec4(transformed,1.0)).xyz;');shader.fragmentShader='varying vec3 patchWorld;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\n vec2 p=vec2(patchWorld.x,-patchWorld.z);if(((46.155393352)*(p.y-(690.327265323))-(-0.808549590)*(p.x-(-230.797948991)))>=0.0&&((0.673879006)*(p.y-(689.518715732))-(43.277241149)*(p.x-(-184.642555639)))>=0.0&&((-45.986942745)*(p.y-(732.795956881))-(0.805598675)*(p.x-(-183.968676633)))>=0.0&&((-0.842329613)*(p.y-(733.601555556))-(-43.274290233)*(p.x-(-229.955619377)))>=0.0)discard;');};return copy});o.material=Array.isArray(o.material)?replacements:replacements[0]})}

function status(text){$('#status').textContent=text;$('#status').hidden=!text}
let terrain=null,terrainName='';
let detailedLayer=null;const detailedLayers=new Map();const isDetailed=()=>!!packageRegistry[activeTown.id]&&level!=='state';
const isThirty=()=>activeTown.id==='30a'&&level!=='state';
function setCamera(){
 if(level==='state'){target.set(30,0,-440);span=830}
 else {target.set(activeTown.x,0,-activeTown.y);span=level==='region'?48:22;if(level==='town'&&selectedDistrict){target.set(selectedDistrict.x,0,-selectedDistrict.y);span=17}}
 if(isThirty()){if(level==='region'){target.set(innerWidth<700?-204:-199,0,innerWidth<700?-705:-708);span=innerWidth<700?32:48;if(weights.airport){const route=builtRoutes.find(r=>r.town==='30a'&&(selectedDistrict?r.district===selectedDistrict.id:!r.district));if(route){const xs=route.points.map(p=>p[0]),ys=route.points.map(p=>p[1]);span=Math.max(48,(Math.max(...xs)-Math.min(...xs))*1.55);target.set((Math.min(...xs)+Math.max(...xs))/2+(mobile?0:span*.09),0,-(Math.min(...ys)+Math.max(...ys))/2)}}}else{const d=selectedDistrict||districts.find(d=>d.id==='seaside'&&d.town==='30a');target.set(d.x,0,-d.y);span=.85}}
 if(isDetailed()&&detailedLayer){if(level==='region'){const c=detailedLayer.meta.camera||{center:[detailedLayer.meta.center[0]+1,detailedLayer.meta.center[1]],phoneOffsetY:4,phoneSpan:20,desktopSpan:32};target.set(c.center[0]+(innerWidth<700?0:(c.desktopOffsetX||0)),0,-c.center[1]+(innerWidth<700?c.phoneOffsetY:0));span=innerWidth<700?c.phoneSpan:c.desktopSpan}else{const d=selectedDistrict||detailedLayer.meta.districts[0];target.set(d.x,0,-d.y);span=innerWidth<700?1.05:1.9}}
 if(landing&&level==='town'){if(qs.has('cx'))target.set(Number(qs.get('cx')),0,-Number(qs.get('cy')));span=Number(qs.get('span')||span);}
 const mapHeight=innerHeight;renderer.setSize(innerWidth,mapHeight);const a=innerWidth/mapHeight, height=level==='state'?Math.max(span,span/(a*.9)):span/a;camera.left=-height*a/2;camera.right=height*a/2;camera.top=height/2;camera.bottom=-height/2;camera.position.copy(target).add(new THREE.Vector3(0,height*1.25,height*1.25));camera.lookAt(target);camera.updateProjectionMatrix();sun.position.copy(target).add(new THREE.Vector3(-height,height*1.5,height*.6));sun.target.position.copy(target);Object.assign(sun.shadow.camera,{left:-height,right:height,top:height,bottom:-height,near:.001,far:height*5});sun.shadow.camera.updateProjectionMatrix();sun.shadow.normalBias=(isThirty()||isDetailed())?.0001:.06;
 $('#scale').textContent=level==='state'?'Florida · regional overview':level==='region'?(isDetailed()?activeTown.name+' · regional atlas':'Regional view · approximately 30 miles across'):(isThirty()?'Neighborhood view · 850 m across · 3× height, capped at 3× footprint':'Neighborhood view · illustrated building scale');
}
async function show(){
 document.documentElement.classList.toggle('miami-region',isDetailed()&&level==='region');const token=++packageToken,flight=pendingFlight;pendingFlight=null;document.documentElement.classList.toggle('thirty-region',(isThirty()||isDetailed())&&level==='region');setCamera();status('Loading this part of the coast…');
 try{
  document.body.dataset.ready='false';renderer.toneMapping=isDetailed()?THREE.NoToneMapping:THREE.ACESFilmicToneMapping;
  if(isDetailed()){
   const packagePath=packageRegistry[activeTown.id];if(detailedLayer)detailedLayer.hide();if(!detailedLayers.has(packagePath)){const layer=await createRegionLayer(assetBase+packagePath);detailedLayers.set(packagePath,layer);scene.add(layer.root)}detailedLayer=detailedLayers.get(packagePath);const credit=document.getElementById('canopy-credit');if(credit)credit.textContent=detailedLayer.meta.canopyAttribution||'OSM-based geography · original illustrated canopy';
   if(token!==packageToken)return;
   for(const o of [terrain,architecture,stateIcons,thirtyModel,sandArt,alysArt])if(o)o.visible=false;
   roadLines.visible=false;setCamera();await detailedLayer.show(level==='town'?(landing?{...(selectedDistrict||{}),id:selectedDistrict?.id||activeTown.id,x:target.x,y:-target.z}:(selectedDistrict||detailedLayer.meta.districts[0])):null,innerWidth<700?2.5:2.1);
   if(token!==packageToken)return;status('');updateUi();makeLabels();highlight();if(flight)animateFlight(flight,token);else render();document.body.dataset.ready='true';document.body.dataset.pipeline='shared-atlas';return;
  }
  if(detailedLayer)detailedLayer.hide();const credit=document.getElementById('canopy-credit');if(credit)credit.textContent='OSM-based geography · original illustrated canopy';if(terrain)terrain.visible=true;
  if(isThirty()){await loadThirty();await localCanopy()}
  const tn=isThirty()?'30a-finished':level==='state'?'terrain-state':'terrain-'+region.id;if(tn!==terrainName){const next=await load(tn);if(token!==packageToken)return;if(terrain)scene.remove(terrain);terrain=next;terrainName=tn;if(tn==='30a-finished'||tn==='terrain-state')illustrateThirty(terrain);scene.add(terrain);document.body.dataset.terrainMs=Math.round(performance.now()-started)}
  if(level==='state'){
   maskLegacyThirty(terrain);await loadThirty();thirtyModel=await load('30a-finished');if(token!==packageToken)return;illustrateThirty(thirtyModel);scene.add(thirtyModel);thirtyModel.visible=true;
   roadLines.visible=true;if(architecture)architecture.visible=false;if(!stateIcons){stateIcons=await load('state');stateIcons.traverse(o=>{if(!o.isInstancedMesh)return;for(let i=0;i<o.instanceMatrix.array.length;i+=16)for(let j=0;j<12;j++)o.instanceMatrix.array[i+j]*=3;o.instanceMatrix.needsUpdate=true;o.computeBoundingSphere()});scene.add(stateIcons)}stateIcons.visible=true;stateIcons.traverse(o=>{if(!o.isInstancedMesh)return;const a=o.instanceMatrix.array;for(let i=0;i<a.length;i+=16)if(a[i+12]>-226&&a[i+12]<-186&&-a[i+14]>695&&-a[i+14]<733){for(let j=0;j<12;j++)a[i+j]=0}o.instanceMatrix.needsUpdate=true});
  }else if(isThirty()){
   if(stateIcons)stateIcons.visible=false;if(architecture)architecture.visible=false;roadLines.visible=false;
  }else{
   if(thirtyModel)scene.remove(thirtyModel);roadLines.visible=true;if(stateIcons)stateIcons.visible=false;
   if(currentPackage!==region.id){const next=await load((mobile?'mobile-':'')+region.id);if(token!==packageToken)return;if(architecture)scene.remove(architecture);architecture=next;scene.add(architecture);currentPackage=region.id}
   architecture.visible=true;
  }
  if(token!==packageToken)return;if(isThirty())terrain.visible=true;status('');updateUi();makeLabels();highlight();if(flight)animateFlight(flight,token);else render();document.body.dataset.ready='true';document.body.dataset.readyMs=Math.round(performance.now()-started);document.body.dataset.drawCalls=renderer.info.render.calls;document.body.dataset.triangles=renderer.info.render.triangles;
 }catch(e){status('This map section could not load. Try another region.');console.error(e)}
}
function updateUi(){
 document.querySelectorAll('[data-level]').forEach(b=>{b.classList.toggle('active',b.dataset.level===level);b.setAttribute('aria-pressed',b.dataset.level===level)});
 $('#region-select').value=region.id;$('#town-select').replaceChildren(...region.towns.map(id=>{const o=document.createElement('option');o.value=id;o.textContent=byId[id].name;return o}));$('#town-select').value=activeTown.id;$('#title').textContent=level==='state'?'Find your stretch of coast':level==='region'?(activeTown.id==='30a'?'The 30A coast':activeTown.name+' & nearby towns'):selectedDistrict?.name||activeTown.name;
 $('#subtitle').textContent=level==='state'?'Choose a region to compare places.':level==='region'?'Compare towns, then explore their neighborhoods.':'Tap a district for its character and housing context.';
 $('#district-list').replaceChildren();let ds=isDetailed()?detailedLayer.meta.districts:districts.filter(d=>d.town===activeTown.id||(activeTown.id==='southbeach'&&d.town==='miami'));
 $('#district-wrap').hidden=level==='state';$('#district-title').textContent=ds.length?'Explore districts':'About this town';
 for(const d of ds){const b=document.createElement('button');b.textContent=d.name;b.onclick=()=>openDistrict(d);$('#district-list').append(b)}
 if(isThirty()&&thirty){let lakeSelect=document.querySelector('#lake-select');if(!lakeSelect){lakeSelect=document.createElement('select');lakeSelect.id='lake-select';lakeSelect.setAttribute('aria-label','Explore a dune lake');$('#district-wrap').append(lakeSelect)}lakeSelect.hidden=false;lakeSelect.replaceChildren();const blank=document.createElement('option');blank.textContent='Explore a dune lake';blank.value='';lakeSelect.append(blank);for(const l of thirty.lakes){const o=document.createElement('option');o.value=l.id;o.textContent=l.name;lakeSelect.append(o)}lakeSelect.onchange=()=>{const l=thirty.lakes.find(l=>l.id===lakeSelect.value);if(l)openLake(l)}}else if($('#lake-select'))$('#lake-select').hidden=true;
 if(!ds.length){const b=document.createElement('button');b.textContent=activeTown.name+' guide';b.onclick=()=>openTown(activeTown);$('#district-list').append(b)}
}
const labels=[];
function label(text,x,y,kind,onClick,priority=1){
 const b=document.createElement('button');b.className='map-label '+kind;b.textContent=text;b.onclick=onClick;$('#labels').append(b);
 const leader=document.createElementNS('http://www.w3.org/2000/svg','line');leader.setAttribute('stroke','#8a927a');leader.setAttribute('stroke-width','1');$('#leaders').append(leader);
 let anchor=null,d=null;if((isThirty()||isDetailed())&&level==='region'&&kind==='district-label'){
  d=isDetailed()?detailedLayer.meta.districts.find(d=>d.name===text):districts.find(d=>d.name===text&&d.town===activeTown.id);if(d){anchor=document.createElement('button');anchor.className='district-anchor';anchor.setAttribute('aria-label','Explore '+text);anchor.dataset.district=d.id;anchor.innerHTML=isDetailed()?recipeGlyph(d,detailedLayer.meta.recipes):districtGlyph(d).split('<span>')[0];anchor.onclick=e=>{if(innerWidth<700&&e.detail){const nearest=labels.filter(l=>l.anchor&&Number.isFinite(l.ax)).sort((a,b)=>Math.hypot(e.clientX-a.ax,e.clientY-a.ay)-Math.hypot(e.clientX-b.ax,e.clientY-b.ay))[0];flyToDistrict(nearest?.d||d)}else flyToDistrict(d)};$('#labels').append(anchor);b.onclick=()=>flyToDistrict(d);}
 }
 labels.push({b,x,y,priority,leader,anchor,d});
}
function makeLabels(){
 $('#labels').replaceChildren();$('#leaders').replaceChildren();labels.length=0;
 if(level==='state')for(const r of regions)label(r.map,r.center[0],r.center[1],'region-label',()=>{region=r;activeTown=byId[r.towns[0]];level='region';selectedDistrict=null;show()},3);
 else {
  for(const t of towns){if(isDetailed())continue;if(isThirty()&&t.id==='30a')continue;if(Math.hypot(t.x-activeTown.x,t.y-activeTown.y)>42)continue;label(t.name,t.x,t.y,'town-label',()=>{activeTown=t;region=regionFor(t.id);selectedDistrict=null;level='town';openTown(t);show()},t.id===activeTown.id?5:2)}
  for(const d of districts.filter(d=>(!isDetailed()||detailedLayer.meta.districts.some(q=>q.id===d.id))&&(isDetailed()||Math.hypot(d.x-activeTown.x,d.y-activeTown.y)<24&&(level==='town'||d.town===activeTown.id||(activeTown.id==='southbeach'&&d.town==='miami')))))label(d.name,d.x,d.y,'district-label',()=>openDistrict(d),4);
 }
}
function districtGlyph(d){
 const sty=d.style||'cottage',alys=sty==='alys',rose=sty==='rosemary';
 const walls=alys?['#fffdf4','#f5f1e5','#fffaf0']:rose?['#d8b997','#e3c8aa','#d2b8a0']:sty==='seaside'?['#eabdb2','#b7d3d2','#e8d398']:sty==='watercolor'?['#b9c9a6','#e8d7b7','#bdd4cf']:['#e4d0aa','#c8d4b4','#d5bfa6'];
 let svg='<svg viewBox="0 0 120 85" aria-hidden="true"><ellipse cx="60" cy="69" rx="50" ry="9" fill="#95876b" opacity=".13"/>';
 const houses=rose?[[34,37,17,25],[54,31,17,28],[74,36,17,28],[29,57,17,25],[50,56,17,29],[72,58,17,25]]:[[26,38,16,16],[48,30,18,18],[73,36,18,17],[21,57,18,17],[47,58,20,20],[75,58,18,18],[94,49,13,15]];
 for(let i=0;i<houses.length;i++){let[x,y,w,h]=houses[i],c=walls[i%3],r=alys?'#fffdf7':rose?'#9a9988':'#aebfba';svg+=`<path d="M${x} ${y}l${w} -6 8 6v${h}l-${w} 6 -8 -6z" fill="${c}"/><path d="M${x+w} ${y-6}l8 6v${h}l-8 3z" fill="#bba98d" opacity=".35"/><path d="M${x-1} ${y}l${w/2} -12 ${w/2+9} 6 -8 6z" fill="${r}"/>`;
 if(alys)svg+=`<path d="M${x+4} ${y+6}l7 -2 5 3v8l-7 3 -5 -3z" fill="#bac6ab"/>`;
 else svg+=`<path d="M${x+3} ${y+6}v4m5 -5v4m5 -5v4" stroke="#789995" stroke-width="2"/><path d="M${x} ${y+h-2}l${w} -5" stroke="#fff6dc" stroke-width="2"/>`;
 if(sty==='seaside'||sty==='watercolor')svg+=`<path d="M${x-2} ${y+h-4}l${w+3} -5 4 3 -${w+3} 5z" fill="#f8efd9"/><path d="M${x} ${y+h-2}v5m${w-3} -9v5" stroke="#fdf9e9" stroke-width="1.4"/>`;
 }
 if(sty==='seaside')svg+='<ellipse cx="62" cy="65" rx="12" ry="6" fill="#a7bf87"/><path d="M53 57l6 -27 4 -1 8 27z" fill="#fffbee" stroke="#b6b6a0" stroke-width=".6"/><path d="M58 57v-6q4 -7 8 0v6" fill="#9bb4aa"/>';
 for(const [x,y]of [[12,53],[92,68],[98,34]])svg+=`<path d="M${x} ${y}v-8" stroke="#b0a17c"/><ellipse cx="${x}" cy="${y-10}" rx="5" ry="6" fill="#b2c18e"/><ellipse cx="${x-2}" cy="${y-12}" rx="3" ry="4" fill="#c5d2a6"/>`;
 return svg+'</svg><span>'+d.name+'</span>';
}
function placeDistrictArt(){
 if((!isThirty()&&!isDetailed())||level!=='region')return;
 const mapRect=renderer.domElement.getBoundingClientRect(),header=$('header').getBoundingClientRect(),controls=$('#controls').getBoundingClientRect();
 const ls=labels.filter(l=>l.anchor).sort((a,b)=>a.x-b.x),used=[];
 const ranks={seaside:100,alys:95,rosemary:90,grayton:85,'dune-allen':80,'inlet-beach':75,watercolor:70,'blue-mountain-beach':65,watersound:60,seagrove:55,seacrest:50,'santa-rosa-beach':45};
 ls.forEach((l,i)=>{const p=new THREE.Vector3(l.x,.004,-l.y).project(camera);l.ax=mapRect.left+(p.x*.5+.5)*mapRect.width;l.ay=mapRect.top+(-p.y*.5+.5)*mapRect.height;l.side=i%2?-1:1;
  l.anchor.classList.toggle('coast-dot',innerWidth<700);l.anchor.style.left=l.ax+'px';l.anchor.style.top=l.ay+'px';l.anchor.dataset.screenX=l.ax;l.anchor.dataset.screenY=l.ay;l.anchor.dataset.worldX=l.x;l.anchor.dataset.worldY=l.y;
  l.anchor.style.visibility=p.z<=1&&l.ax>=0&&l.ax<=innerWidth&&l.ay>=0&&l.ay<=innerHeight?'visible':'hidden';l.b.style.visibility='hidden';l.leader.style.display='none';
 });
 for(const l of [...ls].sort((a,b)=>(ranks[b.d.id]||b.d.labelPriority||0)-(ranks[a.d.id]||a.d.labelPriority||0))){
  if(l.anchor.style.visibility==='hidden')continue;const w=l.b.offsetWidth,h=l.b.offsetHeight;const x=l.ax,y=l.ay+l.side*(innerWidth<700?28:isDetailed()&&l.side<0?52:34),box={left:x-w/2,right:x+w/2,top:y-h/2,bottom:y+h/2};
  const collides=q=>!(box.right+5<q.left||box.left-5>q.right||box.bottom+4<q.top||box.top-4>q.bottom);
  if(box.left<5||box.right>innerWidth-5||box.top<5||box.bottom>innerHeight-26||collides(header)||collides(controls)||used.some(collides))continue;
  l.b.style.left=x+'px';l.b.style.top=y+'px';l.b.style.visibility='visible';used.push(box);
  const endY=y-l.side*h/2;l.leader.setAttribute('x1',l.ax);l.leader.setAttribute('y1',l.ay);l.leader.setAttribute('x2',x);l.leader.setAttribute('y2',endY);l.leader.dataset.length=Math.abs(endY-l.ay);l.leader.style.display='block';
 }
}
let pendingFlight=null;
function flyToDistrict(d){pendingFlight={target:target.clone(),span,position:camera.position.clone(),left:camera.left,right:camera.right,top:camera.top,bottom:camera.bottom};weights.airport=0;const airportButton=$('[data-priority="airport"]');airportButton.classList.remove('active');airportButton.setAttribute('aria-pressed','false');openDistrict(d)}
function animateFlight(from,token){
 const to={target:target.clone(),span,position:camera.position.clone(),left:camera.left,right:camera.right,top:camera.top,bottom:camera.bottom};const start=performance.now();document.body.dataset.flying='true';
 function frame(now){if(token!==packageToken){document.body.dataset.flying='false';return}const t=Math.min(1,(now-start)/650),e=t*t*(3-2*t);target.lerpVectors(from.target,to.target,e);span=THREE.MathUtils.lerp(from.span,to.span,e);camera.position.lerpVectors(from.position,to.position,e);for(const k of ['left','right','top','bottom'])camera[k]=THREE.MathUtils.lerp(from[k],to[k],e);camera.lookAt(target);camera.updateProjectionMatrix();render();if(t<1)requestAnimationFrame(frame);else{document.body.dataset.flying='false';setCamera();render()}}
 requestAnimationFrame(frame);
}

function illustrateThirty(model){
 if(model.userData.illustrated)return;model.userData.illustrated=true;
 const palette={'Atlas cream':'#f1e3c8','Atlas woodland':'#bdcba5','Atlas marsh':'#b4ccb0','Atlas fields':'#e5d9b7','Atlas golf':'#c4d29e','Atlas beach':'#fffdf1','Warm coastal ground':'#f1e3c8','Sugar sand':'#fffef4','Bay water':'#68bcb3','Dune lake water':'#8abbb0','Continuous forest canopy':'#bdcba5','Neighborhood streets':'#b6aa8e','Timpoochee pale trail':'#fff5df','Standing seam zinc':'#bfd0cb','Rosemary dark roof':'#9ca48e','Porch and trim':'#fff8e6','Shaded windows':'#81aaa6','Tree trunk':'#b6a581','Tree canopy':'#b3c896','Neighborhood greens':'#b5ca92',cream:'#f1dbb4',pink:'#e7b7ac',blue:'#a7cfce',sage:'#c7d5ad',white:'#fffdf6',taupe:'#dfc4a2',shingle:'#c3c6af'};
 model.traverse(o=>{if(!o.isMesh)return;const ms=Array.isArray(o.material)?o.material:[o.material];for(const m of ms){if(palette[m.name])m.color.set(palette[m.name]);if(/Homes/.test(o.name+' '+o.parent?.name)){m.flatShading=true;m.roughness=.92;}if(m.name.startsWith('Shallows ')){const w=Number(m.name.split(' ').pop());m.color.set(w>1?'#44aebc':w>.3?'#64cfc9':'#91e1d0')}m.needsUpdate=true}
 if(o.isInstancedMesh&&/Homes.*rosemary/.test(o.name+' '+o.parent?.name)){o.material=o.material.clone();const m=o.material;const palette=m.name==='taupe'?['#ddc7a3','#f2e8d2','#babcb6','#c4a05d','#ded1b6','#9b8270']:m.name==='Rosemary dark roof'?['#50595b','#50595b','#50595b','#899493','#899493','#8e6d59','#8e6d59','#486357']:m.name==='Shaded windows'?['#355b48']:m.name==='Porch and trim'?['#f4ebd6','#655546','#edf0da']:null;if(palette){m.color.set('#ffffff');for(let i=0;i<o.count;i++){const a=o.instanceMatrix.array,k=i*16;const seed=Math.abs(Math.round(a[k+12]*98765+a[k+14]*34567));o.setColorAt(i,new THREE.Color(palette[seed%palette.length]))}o.userData.allColors=o.instanceColor.array.slice()}}
 });
}

function placeLabels(){
 const boxes=[];const header=$('header').getBoundingClientRect(),controls=$('#controls').getBoundingClientRect();
 for(const l of [...labels].sort((a,b)=>b.priority-a.priority)){
  l.leader.style.display='none';const mapRect=renderer.domElement.getBoundingClientRect();const p=new THREE.Vector3(l.x,(isThirty()||isDetailed())?.004:.8,-l.y).project(camera),w=l.b.offsetWidth||100,h=l.b.offsetHeight||28;let x=(p.x*.5+.5)*innerWidth,y=mapRect.top+(-p.y*.5+.5)*mapRect.height;
  if(p.z>1||x<-w||x>innerWidth+w||y<0||y>innerHeight){l.b.style.visibility='hidden';continue}
  if((isThirty()||isDetailed())&&level==='region'&&l.b.classList.contains('district-label'))continue;
  if(x<w/2+10||x>innerWidth-w/2-10){l.b.style.visibility='hidden';continue}let good=false;
  const anchorX=x;for(const [dx,dy] of (level==='state'?[[0,0],[-150,0],[150,0],[-260,0],[260,0]]:[[0,0]])){x=Math.min(innerWidth-w/2-10,Math.max(w/2+10,anchorX+dx));const b={left:x-w/2,right:x+w/2,top:y+dy-h/2,bottom:y+dy+h/2};const overlaps=q=>!(b.right+5<q.left||b.left-5>q.right||b.bottom+4<q.top||b.top-4>q.bottom);
   if(b.top<12||b.bottom>innerHeight-45||overlaps(header)||overlaps(controls)||boxes.some(overlaps))continue;l.b.style.left=x+'px';l.b.style.top=y+dy+'px';l.b.style.visibility='visible';if(Math.abs(dy)>3||level==='state'){l.leader.setAttribute('x1',(p.x*.5+.5)*innerWidth);l.leader.setAttribute('y1',(-p.y*.5+.5)*innerHeight);l.leader.setAttribute('x2',x);l.leader.setAttribute('y2',y+dy);l.leader.style.display='block'}boxes.push(b);good=true;break}
  if(!good)l.b.style.visibility='hidden';
 }
}
let localCanopies=new Map();async function localCanopy(){if(!isThirty()||level!=='town')return;const id=selectedDistrict?.id||'seaside';if(localCanopies.has(id)||!thirty.neighborhoodCanopies?.[id])return;const texture=await new THREE.TextureLoader().loadAsync(assetBase+thirty.neighborhoodCanopies[id].file);const c=document.createElement('canvas');c.width=texture.image.width;c.height=texture.image.height;const ctx=c.getContext('2d');ctx.drawImage(texture.image,0,0);localCanopies.set(id,ctx.getImageData(0,0,c.width,c.height));texture.dispose();forestDetailKey=''}
let palmParts=null;
function palmGeometry(){if(palmParts)return palmParts;const trunk=new THREE.CylinderGeometry(.00023,.00048,.019,5);trunk.translate(0,.0095,0);const vs=[];for(let f=0;f<9;f++){const a=f*Math.PI*2/9,dx=Math.cos(a),dz=Math.sin(a);for(let k=0;k<5;k++){const t=k/5,u=(k+1)/5;const pt=(v,side)=>{const r=.0045*v,w=.00072*Math.sin(Math.PI*v)*side;return [dx*r-dz*w,.019+.0035*Math.sin(Math.PI*v)-.0018*v,dz*r+dx*w]};const l=pt(t,-1),r=pt(t,1),nl=pt(u,-1),nr=pt(u,1);vs.push(...l,...r,...nl,...r,...nr,...nl)}}const crown=new THREE.BufferGeometry();crown.setAttribute('position',new THREE.Float32BufferAttribute(vs,3));crown.computeVertexNormals();palmParts=[{geometry:trunk,material:new THREE.MeshStandardMaterial({color:'#b9a27c',roughness:1})},{geometry:crown,material:new THREE.MeshStandardMaterial({color:'#91ad72',side:THREE.DoubleSide,roughness:1,flatShading:true})}];return palmParts}
let canopyPixels=null,forestDetail=new THREE.Group(),forestDetailKey='';scene.add(forestDetail);
function updateForestDetail(){
 if(document.body.dataset.flying==='true'){forestDetail.visible=false;return}
 forestDetail.visible=isThirty()&&level==='town';if(!forestDetail.visible||!canopyPixels||!terrain||!thirty)return;
 const key=target.x.toFixed(4)+','+target.z.toFixed(4);if(key===forestDetailKey)return;forestDetailKey=key;
 while(forestDetail.children.length){const o=forestDetail.children.pop();o.dispose?.()}
 const prototypes=[];const occupied=new Set(alysOccupied),cell=.004;
 terrain.traverse(o=>{if(!o.isInstancedMesh)return;const name=o.name+' '+o.parent?.name;if(/Trees/.test(name)){prototypes.push(o);return}const a=o.userData.allMatrices||o.instanceMatrix.array;for(let i=0;i<a.length;i+=16){const x=a[i+12],z=a[i+14];if(Math.abs(x-target.x)>1||Math.abs(z-target.z)>1)continue;const wx=Math.hypot(a[i],a[i+2]),wz=Math.hypot(a[i+8],a[i+10]),radius=Math.max(wx,wz)*.75+.003;for(let xx=Math.floor((x-radius)/cell);xx<=Math.ceil((x+radius)/cell);xx++)for(let zz=Math.floor((z-radius)/cell);zz<=Math.ceil((z+radius)/cell);zz++){const dx=(xx+.5)*cell-x,dz=(zz+.5)*cell-z;if(Math.abs((dx*a[i]+dz*a[i+2])/wx)<wx*.5+.001&&Math.abs((dx*a[i+8]+dz*a[i+10])/wz)<wz*.5+.001)occupied.add(xx+','+zz)}}});
 const id=selectedDistrict?.id||'seaside',local=localCanopies.get(id),b=local?thirty.neighborhoodCanopies[id].bounds:thirty.canopyBounds,pixels=local||canopyPixels,positions=[];const halfX=span*.55,halfZ=(camera.top-camera.bottom)*.78;const step=(thirty.scaleRule.treeSpacingMeters||8)/1000;
 for(let x=Math.floor((target.x-halfX)/step)*step;x<target.x+halfX;x+=step)for(let z=Math.floor((target.z-halfZ)/step)*step;z<target.z+halfZ;z+=step){
  if(occupied.has(Math.floor(x/cell)+','+Math.floor(z/cell)))continue;const u=(x-b[0])/(b[2]-b[0]),v=(b[3]+z)/(b[3]-b[1]);if(u<0||u>=1||v<0||v>=1)continue;
  const density=pixels.data[(Math.floor(v*pixels.height)*pixels.width+Math.floor(u*pixels.width))*4];const grove=Math.sin(x*72+Math.sin(z*39)*2)+Math.cos(z*63+Math.sin(x*27)*2);if(density<110||grove<-.2||Math.sin(x*1937+z*1271)<-.05)continue;
  const j=Math.sin(x*1813+z*912)*.0035,k=Math.sin(x*931-z*1717)*.0035;positions.push([x+j,.003,z+k]);if(positions.length>=18000)break;
 }
 const district=thirty.districts.find(d=>d.id===id),palms=[],broadleaf=[];for(const p of positions){const nearCoast=district&&p[2]>-district.y-.18;const random=Math.abs(Math.sin(p[0]*4171+p[2]*7583));(random<(nearCoast?.72:.16)?palms:broadleaf).push(p)}
 for(const proto of prototypes){const mesh=new THREE.InstancedMesh(proto.geometry,proto.material,broadleaf.length);mesh.castShadow=!mobile;mesh.receiveShadow=true;const m=new THREE.Matrix4();broadleaf.forEach((p,i)=>{const size=.55+.22*Math.abs(Math.sin(p[0]*1173+p[2]*837));m.makeScale(size,size,size);m.setPosition(...p);mesh.setMatrixAt(i,m);mesh.setColorAt(i,new THREE.Color(['#edf0cf','#d1dfb6','#b9ce9d','#dce6be'][i%4]))});mesh.computeBoundingSphere();forestDetail.add(mesh)}
 for(const proto of palmGeometry()){const mesh=new THREE.InstancedMesh(proto.geometry,proto.material,palms.length),m=new THREE.Matrix4(),q=new THREE.Quaternion();palms.forEach((p,i)=>{const size=.72+.25*Math.abs(Math.sin(p[0]*831+p[2]*413));q.setFromAxisAngle(new THREE.Vector3(0,1,0),p[0]*877);m.compose(new THREE.Vector3(...p),q,new THREE.Vector3(size,size,size));mesh.setMatrixAt(i,m)});mesh.castShadow=!mobile;mesh.receiveShadow=true;mesh.computeBoundingSphere();forestDetail.add(mesh)}
 document.body.dataset.palmTrees=palms.length;document.body.dataset.forestTrees=positions.length;
}

function trimInstances(){
 const model=level==='state'?thirtyModel:isThirty()?terrain:architecture;if(!model)return;
 const padding=isThirty()?.1:4;const halfX=span*.5+padding,halfZ=(camera.top-camera.bottom)*.72+padding;
 model.traverse(o=>{if(!o.isInstancedMesh)return;if(isThirty()&&/Trees/.test(o.name+' '+o.parent?.name))o.visible=level!=='town';else o.visible=true;const original=o.userData.allMatrices||(o.userData.allMatrices=o.instanceMatrix.array.slice());let count=0;for(let i=0;i<original.length;i+=16){if(level!=='state'&&(Math.abs(original[i+12]-target.x)>halfX||Math.abs(original[i+14]-target.z)>halfZ))continue;if(o.userData.allColors)o.instanceColor.array.set(o.userData.allColors.subarray(i/16*3,i/16*3+3),count*3);o.instanceMatrix.array.set(original.subarray(i,i+16),count++*16)}o.count=isThirty()&&level==='region'&&innerWidth<700?0:count;if(isThirty()&&level==='town'&&/Homes.*alys/.test(o.name+' '+o.parent?.name))o.count=0;if(o.instanceColor)o.instanceColor.needsUpdate=true;o.instanceMatrix.needsUpdate=true;o.computeBoundingSphere()});
}
let roofInk=null,roofInkKey='',pavilionArt=null;
function architectureDetails(){
 if(!pavilionArt){pavilionArt=new THREE.Group();scene.add(pavilionArt);const white=new THREE.MeshStandardMaterial({color:'#fff9eb',roughness:.9,flatShading:true}),zinc=new THREE.MeshStandardMaterial({color:'#b0c5c0',roughness:.9,flatShading:true});
 const locations=[{"name": "Natchez", "x": -205.7424992632622, "y": 703.2363057903973, "lon": -86.1418426, "lat": 30.320445, "source": "https://www.openstreetmap.org/way/103387124", "positionMethod": "OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."}, {"name": "Odessa", "x": -205.67593401064562, "y": 703.2109954286946, "lon": -86.1411452, "lat": 30.3202274, "source": "https://www.openstreetmap.org/way/103387122", "positionMethod": "OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."}, {"name": "Pensacola", "x": -205.60728643773982, "y": 703.1871811372487, "lon": -86.1404264, "lat": 30.3200236, "source": "https://www.openstreetmap.org/way/103387107", "positionMethod": "OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."}, {"name": "West Ruskin", "x": -205.5397196668342, "y": 703.1603112161185, "lon": -86.1397183, "lat": 30.3197921, "source": "https://www.openstreetmap.org/way/103387092", "positionMethod": "OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."}, {"name": "East Ruskin", "x": -205.22279844768693, "y": 703.0381293671229, "lon": -86.1363977, "lat": 30.3187409, "source": "https://www.openstreetmap.org/way/103386960", "positionMethod": "OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."}, {"name": "Savannah", "x": -205.15518558183663, "y": 703.0138250207976, "lon": -86.1356896, "lat": 30.3185325, "source": "https://www.openstreetmap.org/way/103386996", "positionMethod": "OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."}, {"name": "Tupelo", "x": -205.08809111901192, "y": 702.9895300382666, "lon": -86.1349869, "lat": 30.3183241, "source": "https://www.openstreetmap.org/way/103386912", "positionMethod": "OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center."}];
 for(const p of locations){const group=new THREE.Group();group.position.set(p.x,.003,-p.y);group.rotation.y=.36;group.name=p.name+' street-end pavilion (OSM access placement)';
 const box=(x,y,z,w,h,d,mat)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;group.add(m)};
 box(0,.0004,0,.006,.0008,.008,white);
 for(const x of [-.0023,.0023])for(const z of [-.0032,.0032])box(x,.0032,z,.0005,.006,.0005,white);
 const v=[-.003,.006,-.004,.003,.006,-.004,0,.009,-.004,-.003,.006,.004,.003,.006,.004,0,.009,.004];const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setIndex([0,2,5,0,5,3,1,4,5,1,5,2,0,1,2,3,5,4]);g.computeVertexNormals();const roof=new THREE.Mesh(g,zinc);roof.castShadow=true;group.add(roof);pavilionArt.add(group)}}
 pavilionArt.visible=isThirty()&&level==='town';
 if(!roofInk){roofInk=new THREE.LineSegments(new THREE.BufferGeometry(),new THREE.LineBasicMaterial({color:'#718f89',transparent:true,opacity:.65}));scene.add(roofInk)}
 roofInk.visible=isThirty()&&level==='town';if(!roofInk.visible||document.body.dataset.flying==='true')return;
 const key=target.x+','+target.z+','+innerWidth;if(key===roofInkKey)return;roofInkKey=key;const points=[],matrix=new THREE.Matrix4();
 terrain.updateMatrixWorld(true);terrain.traverse(o=>{if(!o.isInstancedMesh||!/Homes/.test(o.name+' '+o.parent?.name)||!['Standing seam zinc','Rosemary dark roof'].includes(o.material.name))return;
 const line=(a,b)=>{for(const p of [a,b]){const v=new THREE.Vector3(...p).applyMatrix4(matrix).applyMatrix4(o.matrixWorld);points.push(v.x,v.y,v.z)}};
 for(let i=0;i<o.count;i++){o.getMatrixAt(i,matrix);line([0,1,.395],[0,1,-.515]);line([-.47,.77,.395],[0,1,.395]);line([0,1,.395],[.47,.77,.395]);if(o.material.name==='Standing seam zinc')for(const x of [-.32,-.16,.16,.32]){const h=1-Math.abs(x)/.47*.23;line([x,h,.395],[x,h,-.515])}}});
 roofInk.geometry.dispose();roofInk.geometry=new THREE.BufferGeometry();roofInk.geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
}
function render(){overlays.visible=!landing;if(alysArt)alysArt.visible=isThirty()&&level==='town';if(sandArt)sandArt.visible=activeTown.id==='30a'||level==='state';trimInstances();updateForestDetail();architectureDetails();renderer.render(scene,camera);placeLabels();placeDistrictArt();document.body.dataset.drawCalls=renderer.info.render.calls;document.body.dataset.triangles=renderer.info.render.triangles;document.body.dataset.viewport=innerWidth+'×'+innerHeight;if(landing)document.body.dataset.camera=JSON.stringify({position:camera.position.toArray(),target:target.toArray(),left:camera.left,right:camera.right,top:camera.top,bottom:camera.bottom,near:camera.near,far:camera.far,projection:'orthographic',mapUnits:'kilometers',tiltDegrees:45})}
function openTown(t){selectedDistrict=null;$('#card-title').textContent=t.name;$('#card-copy').textContent=t.blurb||'Explore the surrounding coastal neighborhoods.';$('#card-price').textContent=t.price?('Town-level housing context: '+t.price):'Current neighborhood price ranges are not yet verified.';$('#card-source').href='https://www.floridacoastal.co/towns/'+(t.id==='miami'?'southbeach':t.id)+'.html';$('#card-source').textContent='Read the Florida Coastal guide';$('#card').hidden=false;document.body.classList.add('card-open')}
function openDistrict(d){selectedDistrict=d;if(d.town==='30a'||isDetailed()){level=weights.airport?'region':'town';show()} $('#card-title').textContent=d.name;$('#card-copy').textContent=d.description;$('#card-price').textContent=d.priceRange||d.priceBenchmark||d.priceStatus;$('#card-source').href=d.priceSource||d.source;$('#card-source').textContent=d.priceSource?'View market-price source':'Place guide';let place=document.querySelector('#card-place');if(!place){place=document.createElement('a');place.id='card-place';place.target='_blank';place.rel='noopener';$('#card-source').after(place)}place.href=d.source;place.textContent=' · Place guide';$('#card').hidden=false;document.body.classList.add('card-open');highlight();render()}
const slim=document.createElement('button');slim.id='controls-slim';slim.textContent='Map controls · change district';slim.onclick=()=>$('#card-close').click();$('#controls').prepend(slim);
$('#card-close').onclick=()=>{$('#card').hidden=true;document.body.classList.remove('card-open');selectedDistrict=null;highlight();render()};
function clearOverlay(){while(overlays.children.length){const o=overlays.children[0];overlays.remove(o);o.geometry?.dispose();o.material?.dispose()}}
function ring(x,y,color,radius=.55){const o=new THREE.Mesh(new THREE.RingGeometry(radius*.65,radius,48),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.8,side:THREE.DoubleSide,depthTest:false}));o.rotation.x=-Math.PI/2;o.position.set(x,isThirty()?.004:.6,-y);o.renderOrder=10;overlays.add(o)}
function line(points,color,dashed=false){const g=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(p[0],isThirty()?.004:.7,-p[1])));const m=dashed?new THREE.LineDashedMaterial({color,dashSize:.5,gapSize:.3,depthTest:false}):new THREE.LineBasicMaterial({color,depthTest:false});const l=new THREE.Line(g,m);if(dashed)l.computeLineDistances();l.renderOrder=11;overlays.add(l)}
function highlight(){
 clearOverlay();for(let i=labels.length-1;i>=0;i--){if(labels[i].b.classList.contains('feature-label')){labels[i].b.remove();labels[i].leader.remove();labels.splice(i,1)}}$('#match-note').textContent=resultsProvided?'Your quiz priorities, mapped to places.':'Preview a priority, or bring your top five from the quiz.';
 for(const f of features){if(!weights[f.kind]||Math.hypot(f.x-activeTown.x,f.y-activeTown.y)>50)continue;if(top5.length&&!top5.includes(f.town)&&!(f.town==='miami'&&top5.includes('southbeach')))continue;
  const col={beach:'#d18a34',water:'#1a777f',walk:'#b3542b',airport:'#695a92'}[f.kind];ring(f.x,f.y,col,isThirty()?.025:f.kind==='walk'?.9:.55);label(f.name,f.x,f.y,'feature-label',()=>{$('#card-title').textContent=f.name;$('#card-copy').textContent='Highlighted for your '+({water:'boating',walk:'walkability',beach:'beach',airport:'airport access'}[f.kind])+' priority.';$('#card-price').textContent=f.boundaryNote||'Access rules and hours should be checked locally.';$('#card-source').href=f.source||'https://www.floridacoastal.co/towns/'+(f.town==='miami'?'southbeach':f.town)+'.html';$('#card-source').textContent='Read the town guide';$('#card').hidden=false;document.body.classList.add('card-open')},6);if(f.path)line(f.path,col);if(f.paths)for(const path of f.paths)line(path,col);
 }
 if(Object.values(weights).some(Boolean)&&!features.some(f=>weights[f.kind]&&Math.hypot(f.x-activeTown.x,f.y-activeTown.y)<50))$('#match-note').textContent='Verified amenity overlays are not available for this town yet.';
 if(weights.airport){const airport=features.find(f=>f.kind==='airport'&&(f.town===activeTown.id||(activeTown.id==='southbeach'&&f.town==='miami')));if(airport){const from=selectedDistrict||activeTown;const route=airportRoutes.find(r=>(r.town===activeTown.id||(activeTown.id==='southbeach'&&r.town==='miami'))&&(selectedDistrict?r.district===selectedDistrict.id:!r.district)&&Array.isArray(r.points)&&r.points.length>1&&r.points.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)));line(route?route.points:[[from.x,from.y],[airport.x,airport.y]],'#695a92',!route);$('#match-note').textContent=route?.minutes?String(route.minutes)+' min · '+(route.asOf||'provided route estimate'):(selectedDistrict?.airportMinutes?selectedDistrict.airportMinutes+' · guide estimate, traffic varies.':'Dashed line shows the airport connection, not a road route. Drive time needs verified routing data.')}}
 if(selectedDistrict)ring(selectedDistrict.x,selectedDistrict.y,'#aa512a',(isThirty()||isDetailed())?.015:.85);
 for(const id of top5){const t=byId[id];if(t)ring(t.x,t.y,'#b75225',level==='state'?8:1.3)}
}
for(const r of regions){const o=document.createElement('option');o.value=r.id;o.textContent=r.map;$('#region-select').append(o)}
for(const t of region.towns.map(id=>byId[id])){const o=document.createElement('option');o.value=t.id;o.textContent=t.name;$('#town-select').append(o)}
$('#region-select').onchange=e=>{region=regions.find(r=>r.id===e.target.value);activeTown=byId[region.towns[0]];level='region';selectedDistrict=null;$('#card').hidden=true;show()};
$('#town-select').onchange=e=>{activeTown=byId[e.target.value];region=regionFor(activeTown.id);selectedDistrict=null;level='region';$('#card').hidden=true;show()};
for(const b of document.querySelectorAll('[data-level]'))b.onclick=()=>{level=b.dataset.level;selectedDistrict=null;$('#card').hidden=true;show()};
for(const b of document.querySelectorAll('[data-priority]'))b.onclick=()=>{const k=b.dataset.priority;weights[k]=weights[k]?0:3;b.classList.toggle('active',!!weights[k]);b.setAttribute('aria-pressed',!!weights[k]);if(k==='airport'&&activeTown.id==='30a'){level='region';show()}else{highlight();render()}};
function applyResults(payload){
 if(!payload||!Array.isArray(payload.top5))return false;top5=payload.top5.map(v=>typeof v==='string'?v:v.id).filter(id=>byId[id]).slice(0,5);airportRoutes=Array.isArray(payload.airportRoutes)?[...payload.airportRoutes,...builtRoutes]:builtRoutes;weights={};for(const k of ['beach','water','walk','airport'])weights[k]=Number(payload.weights?.[k])>0?3:0;resultsProvided=top5.length>0;
 $('#top-five').replaceChildren();for(const [i,id] of top5.entries()){const b=document.createElement('button');b.textContent=(i+1)+'. '+byId[id].name;b.onclick=()=>{activeTown=byId[id];region=regionFor(id);level='region';selectedDistrict=null;show()};$('#top-five').append(b)}
 for(const b of document.querySelectorAll('[data-priority]')){b.classList.toggle('active',!!weights[b.dataset.priority]);b.setAttribute('aria-pressed',!!weights[b.dataset.priority])}
 if(top5.length){activeTown=byId[top5[0]];region=regionFor(activeTown.id)}show();return true;
}
window.setFloridaCoastalResults=applyResults;
window.addEventListener('floridacoastal:results',e=>applyResults(e.detail));
window.addEventListener('message',e=>{if(e.origin!==location.origin&&e.origin!=='https://www.floridacoastal.co'&&e.origin!=='https://floridacoastal.co')return;if(e.data?.type==='floridacoastal:results')applyResults(e.data.payload)});
$('#import-results').onchange=async e=>{try{const payload=JSON.parse(await e.target.files[0].text());if(!applyResults(payload))throw Error();$('#import-note').textContent='Quiz matches loaded.'}catch{$('#import-note').textContent='Use an exported top-five result file.'}};
window.addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);setCamera();render()});
if(qs.get('district')){selectedDistrict=districts.find(d=>d.id===qs.get('district'));if(selectedDistrict)level='town'}
await show();if(selectedDistrict&&isDetailed())openDistrict(selectedDistrict);

}
main().catch(e=>{document.querySelector("#status").textContent="The map could not load. Please refresh.";console.error(e)});
