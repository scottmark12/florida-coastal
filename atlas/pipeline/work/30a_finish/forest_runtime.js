let canopyPixels=null,forestDetail=new THREE.Group(),forestDetailKey='';scene.add(forestDetail);
function updateForestDetail(){
 forestDetail.visible=isThirty()&&level==='town';if(!forestDetail.visible||!canopyPixels||!terrain||!thirty)return;
 const key=target.x.toFixed(4)+','+target.z.toFixed(4);if(key===forestDetailKey)return;forestDetailKey=key;
 while(forestDetail.children.length){const o=forestDetail.children.pop();o.dispose?.()}
 const prototypes=[];const occupied=new Set(),cell=.008;
 terrain.traverse(o=>{if(!o.isInstancedMesh)return;const name=o.name+' '+o.parent?.name;if(/Trees/.test(name)){prototypes.push(o);return}const a=o.userData.allMatrices||o.instanceMatrix.array;for(let i=0;i<a.length;i+=16){const x=a[i+12],z=a[i+14];if(Math.abs(x-target.x)>1||Math.abs(z-target.z)>1)continue;const radius=Math.max(Math.hypot(a[i],a[i+2]),Math.hypot(a[i+8],a[i+10]))*.65+.006;for(let xx=Math.floor((x-radius)/cell);xx<=Math.ceil((x+radius)/cell);xx++)for(let zz=Math.floor((z-radius)/cell);zz<=Math.ceil((z+radius)/cell);zz++)occupied.add(xx+','+zz)}});
 const b=thirty.canopyBounds,positions=[];const halfX=span*.55,halfZ=(camera.top-camera.bottom)*.78;const step=(thirty.scaleRule.treeSpacingMeters||8)/1000;
 for(let x=Math.floor((target.x-halfX)/step)*step;x<target.x+halfX;x+=step)for(let z=Math.floor((target.z-halfZ)/step)*step;z<target.z+halfZ;z+=step){
  if(occupied.has(Math.floor(x/cell)+','+Math.floor(z/cell)))continue;const u=(x-b[0])/(b[2]-b[0]),v=(b[3]+z)/(b[3]-b[1]);if(u<0||u>=1||v<0||v>=1)continue;
  const density=canopyPixels.data[(Math.floor(v*canopyPixels.height)*canopyPixels.width+Math.floor(u*canopyPixels.width))*4];if(density<210)continue;
  const j=Math.sin(x*1813+z*912)*.0015;positions.push([x+j,.003,z-j]);if(positions.length>=18000)break;
 }
 for(const proto of prototypes){const mesh=new THREE.InstancedMesh(proto.geometry,proto.material,positions.length);mesh.castShadow=!mobile;mesh.receiveShadow=true;const m=new THREE.Matrix4();positions.forEach((p,i)=>{m.makeTranslation(...p);mesh.setMatrixAt(i,m)});mesh.computeBoundingSphere();forestDetail.add(mesh)}
 document.body.dataset.forestTrees=positions.length;
}
