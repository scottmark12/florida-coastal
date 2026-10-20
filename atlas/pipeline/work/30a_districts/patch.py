from pathlib import Path
p=Path('work/atlas_regions/app.js');s=p.read_text().replace('let thirty=null,thirtyModel=null,sandArt=null;','let thirty=null,thirtyModel=null,sandArt=null,alysArt=null;')
s=s.replace("scene.add(sandArt)}return thirty", """scene.add(sandArt);const exact=await fetch(assetBase+'alys-geometry.json').then(r=>r.json());alysArt=new THREE.Group();for(const [key,vs] of Object.entries(exact)){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vs,3));g.computeVertexNormals();const m=new THREE.MeshStandardMaterial({color:key==='walls'?'#fff9e9':key==='roofs'?'#fffdf6':'#ded1b4',side:THREE.DoubleSide,roughness:.92,flatShading:true});const mesh=new THREE.Mesh(g,m);mesh.castShadow=key!=='lanes';mesh.receiveShadow=true;alysArt.add(mesh)}scene.add(alysArt)}return thirty""")
needle="m.needsUpdate=true}});\n}"
replacement="""m.needsUpdate=true}
 if(o.isInstancedMesh&&/Homes.*rosemary/.test(o.name+' '+o.parent?.name)){o.material=o.material.clone();const m=o.material;const palette=m.name==='taupe'?['#ddc7a3','#f2e8d2','#babcb6','#c4a05d','#ded1b6','#9b8270']:m.name==='Rosemary dark roof'?['#43594c','#5b625a','#43564d','#686a60']:m.name==='Shaded windows'?['#355b48']:m.name==='Porch and trim'?['#f4ebd6','#655546','#edf0da']:null;if(palette){m.color.set('#ffffff');for(let i=0;i<o.count;i++){const a=o.instanceMatrix.array,k=i*16;const seed=Math.abs(Math.round(a[k+12]*98765+a[k+14]*34567));o.setColorAt(i,new THREE.Color(palette[seed%palette.length]))}o.userData.allColors=o.instanceColor.array.slice()}}
 });
}"""
assert needle in s;s=s.replace(needle,replacement)
s=s.replace("o.instanceMatrix.array.set(original.subarray(i,i+16),count++*16)","if(o.userData.allColors)o.instanceColor.array.set(o.userData.allColors.subarray(i/16*3,i/16*3+3),count*3);o.instanceMatrix.array.set(original.subarray(i,i+16),count++*16)")
s=s.replace("o.instanceMatrix.needsUpdate=true;o.computeBoundingSphere()});\n}","if(isThirty()&&level==='town'&&/Homes.*alys/.test(o.name+' '+o.parent?.name))o.count=0;if(o.instanceColor)o.instanceColor.needsUpdate=true;o.instanceMatrix.needsUpdate=true;o.computeBoundingSphere()});\n}")
s=s.replace("function render(){if(sandArt)","function render(){if(alysArt)alysArt.visible=isThirty()&&level==='town';if(sandArt)")
p.write_text(s)
# Add derived original geometry to normal stage/install workflow.
p=Path('work/30a_finish/stage.py');s=p.read_text();s+="\nshutil.copy2('outputs/30a_districts/alys-geometry.json',O/'alys-geometry.json')\n";p.write_text(s)
p=Path('work/30a_finish/install.py');s=p.read_text().replace("'sand.json']","'sand.json','alys-geometry.json']");p.write_text(s)
