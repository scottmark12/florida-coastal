import sys
sys.path.insert(0,'work/30a_finish')
from geometry import *
from pathlib import Path
es={e['id']:e for e in json.loads((D/'map-data.json').read_text())['elements']}
ps=[]
for name,wid in [('Natchez',103387124),('Odessa',103387122),('Pensacola',103387107),('West Ruskin',103387092),('East Ruskin',103386960),('Savannah',103386996),('Tupelo',103386912)]:
 e=es[wid];p=e['geometry'][-1];x,y=T.transform(p['lon'],p['lat']);ps.append({'name':name,'x':x/1000,'y':y/1000,'lon':p['lon'],'lat':p['lat'],'source':f'https://www.openstreetmap.org/way/{wid}','positionMethod':'OSM street-end beach access endpoint; pavilion footprint not separately mapped. Approximate placement, not a surveyed pavilion center.'})
Path('outputs/30a_final/pavilion-evidence.json').write_text(json.dumps(ps,indent=2))
p=Path('work/atlas_regions/app.js');s=p.read_text();s=s.replace('function render(){','''let roofInk=null,roofInkKey='',pavilionArt=null;
function architectureDetails(){
 if(!pavilionArt){pavilionArt=new THREE.Group();scene.add(pavilionArt);const white=new THREE.MeshStandardMaterial({color:'#fff9eb',roughness:.9,flatShading:true}),zinc=new THREE.MeshStandardMaterial({color:'#b0c5c0',roughness:.9,flatShading:true});
 const locations=PAVILIONS;
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
function render(){'''.replace('PAVILIONS',json.dumps(ps)))
s=s.replace('trimInstances();updateForestDetail();renderer.render','trimInstances();updateForestDetail();architectureDetails();renderer.render');p.write_text(s)
