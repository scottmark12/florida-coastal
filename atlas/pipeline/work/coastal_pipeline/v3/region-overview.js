import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const intersects=(a,b)=>a[0]<b[2]&&a[2]>b[0]&&a[1]<b[3]&&a[3]>b[1];
const contained=(a,b)=>a[0]>=b[0]&&a[2]<=b[2]&&a[1]>=b[1]&&a[3]<=b[3];
function outside(mesh,rects){
 for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material]){
  let u=material.userData.overviewClip;
  if(!u){u={overviewRects:{value:Array.from({length:9},()=>new T.Vector4())},overviewCount:{value:0}};material.userData.overviewClip=u;
   material.onBeforeCompile=shader=>{Object.assign(shader.uniforms,u);shader.vertexShader='varying vec2 overviewXY;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n overviewXY=vec2(position.x,-position.z);');shader.fragmentShader='varying vec2 overviewXY;uniform vec4 overviewRects[9];uniform int overviewCount;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n for(int i=0;i<9;i++){if(i<overviewCount){vec4 r=overviewRects[i];if(overviewXY.x>=r.x&&overviewXY.x<=r.z&&overviewXY.y>=r.y&&overviewXY.y<=r.w)discard;}}');};material.customProgramCacheKey=()=> 'atlas-context-clip';material.needsUpdate=true;
  }
  u.overviewCount.value=rects.length;rects.forEach((r,i)=>u.overviewRects.value[i].set(...r));
 }
}
function disposeObject(root){root.traverse(o=>{let shared=false;for(let p=o;p;p=p.parent)if(p.userData.sharedTownSource)shared=true;if(!shared&&o.isMesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose()}}})}
// Regional presentation only. Approved town geometry is read-only.
export async function createAccurateOverview(url,neighborUrls=[]){
 async function metadata(path){const r=await fetch(path+'manifest.json',{cache:'no-cache'});if(!r.ok)throw Error('Regional overview unavailable');return {url:path,meta:await r.json()}}
 const own=await metadata(url),meta=own.meta,neighbors=await Promise.all(neighborUrls.map(metadata));
 const root=new T.Group(),architecture=new T.Group(),context=new T.Group(),cache=new Map(),covers=new Map();root.add(architecture,context);root.visible=false;let version=0,disposed=false;
 const asset=(source,file)=>source.url+file+'?v='+(source.meta.revision||source.meta.initial_bytes);
 async function model(source,file){const key=asset(source,file);if(!cache.has(key))cache.set(key,(async()=>{const r=await fetch(key);if(!r.ok)throw Error('Missing overview '+file);const bytes=await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();return new Promise((resolve,reject)=>new GLTFLoader().parse(bytes,'',g=>{g.scene.traverse(o=>{if(o.isMesh){o.geometry.computeVertexNormals();o.material.flatShading=true;o.castShadow=false;o.receiveShadow=false}});if(disposed)disposeObject(g.scene);resolve(g.scene)},reject))})());return cache.get(key)}
 async function plane(source,file,y){const texture=await new T.TextureLoader().loadAsync(asset(source,file));texture.colorSpace=T.SRGBColorSpace;const [x0,y0,x1,y1]=source.meta.bounds;const mesh=new T.Mesh(new T.PlaneGeometry(x1-x0,y1-y0),new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,toneMapped:false}));mesh.rotation.x=-Math.PI/2;mesh.position.set((x0+x1)/2,y,-(y0+y1)/2);
  // Plane shader receives projected coordinates, rather than local plane vertices.
  const position=mesh.geometry.getAttribute('position');for(let i=0;i<position.count;i++)position.setXYZ(i,position.getX(i)+(x0+x1)/2,y,-(position.getY(i)+(y0+y1)/2));position.needsUpdate=true;mesh.rotation.set(0,0,0);mesh.position.set(0,0,0);return mesh;
 }
 const [base,canopy,water]=await Promise.all([model(own,meta.base),plane(own,meta.canopy,.0024),plane(own,meta.water,.0001)]);root.add(base,water,canopy);
 async function show(bounds,phone,onUpdate=()=>{}){
  const token=++version;root.visible=true;architecture.clear();context.clear();document.body.dataset.regionChunks='0';document.body.dataset.regionBuildings='0';document.body.dataset.regionNeighbors='';if(phone)return;
  const excluded=[],tasks=[];let queued=false;
  function update(){if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;if(token===version)onUpdate()})}}
  const sources=[own,...(meta.continuousCoverage?neighbors.filter(s=>s.meta.continuousCoverage&&intersects(s.meta.bounds,bounds)).sort((a,b)=>a.meta.id.localeCompare(b.meta.id)):[])];
  for(const source of sources){
   const holes=excluded.map(b=>b.slice()),tiles=source.meta.buildings.filter(t=>intersects(t.bounds,bounds)&&!holes.some(b=>contained(t.bounds,b)));
   for(const tile of tiles)tasks.push((async()=>{const g=await model(source,tile.file);if(token!==version)return;if(holes.length)g.traverse(o=>{if(o.isMesh)outside(o,holes)});architecture.add(g);update()})());
   if(source!==own&&tiles.length){if(!covers.has(source.url))covers.set(source.url,plane(source,source.meta.canopy,.0025));tasks.push((async()=>{const p=await covers.get(source.url);if(token!==version)return;outside(p,holes);context.add(p);update()})())}
   excluded.push(source.meta.coverageBounds||source.meta.bounds);
  }
  await Promise.all(tasks);if(token!==version)return;document.body.dataset.regionChunks=architecture.children.length;document.body.dataset.regionBuildings=meta.native_buildings+Object.values(meta.coverage_buildings).reduce((a,b)=>a+b,0);document.body.dataset.regionNeighbors=sources.slice(1).map(s=>s.meta.id).join(',');
 }
 return {root,meta,show,hide(){version++;root.visible=false},dispose(){version++;disposed=true;disposeObject(root);for(const p of cache.values())p.then(disposeObject,()=>{});for(const p of covers.values())p.then(disposeObject,()=>{});root.removeFromParent();cache.clear();covers.clear()}};
}
