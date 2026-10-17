from geometry import *
p=Path('work/atlas_regions/app.js');s=p.read_text()
# Crop the legacy state drawing only within the rebuilt region, then draw the same 30A model at every scale.
corners=[project(Point(x,y)) for x,y in [(-86.40,30.20),(-85.92,30.20),(-85.92,30.59),(-86.40,30.59)]]
terms=[]
for a,b in zip(corners,corners[1:]+corners[:1]):terms.append(f'(({b.x-a.x:.9f})*(p.y-({a.y:.9f}))-({b.y-a.y:.9f})*(p.x-({a.x:.9f})))>=0.0')
frag='vec2 p=vec2(patchWorld.x,-patchWorld.z);if('+ '&&'.join(terms)+')discard;'
fn="""
function maskLegacyThirty(model){model.traverse(o=>{if(!o.isMesh||o.userData.thirtyMasked)return;o.userData.thirtyMasked=true;const ms=Array.isArray(o.material)?o.material:[o.material];const replacements=ms.map(m=>{const copy=m.clone();copy.onBeforeCompile=shader=>{shader.vertexShader='varying vec3 patchWorld;\\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <project_vertex>','#include <project_vertex>\\n patchWorld=(modelMatrix*vec4(transformed,1.0)).xyz;');shader.fragmentShader='varying vec3 patchWorld;\\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\\n FRAG');};return copy});o.material=Array.isArray(o.material)?replacements:replacements[0]})}
""".replace('FRAG',frag)
s=s.replace("function status(text)",fn+"\nfunction status(text)")
s=s.replace("if(level==='state'){\n   roadLines.visible=true;", "if(level==='state'){\n   maskLegacyThirty(terrain);await loadThirty();thirtyModel=await load('30a-finished');if(token!==packageToken)return;scene.add(thirtyModel);thirtyModel.visible=true;\n   roadLines.visible=true;")
s=s.replace("stateIcons.visible=true;", "stateIcons.visible=true;stateIcons.traverse(o=>{if(!o.isInstancedMesh)return;const a=o.instanceMatrix.array;for(let i=0;i<a.length;i+=16)if(a[i+12]>-226&&a[i+12]<-186&&-a[i+14]>695&&-a[i+14]<733){for(let j=0;j<12;j++)a[i+j]=0}o.instanceMatrix.needsUpdate=true});")
s=s.replace("roadLines.visible=true;if(stateIcons)", "if(thirtyModel)scene.remove(thirtyModel);roadLines.visible=true;if(stateIcons)")
# Avoid accidentally hiding/reusing a trimmed 30A model after a state/town transition.
s=s.replace("if(token!==packageToken)return;status('');", "if(token!==packageToken)return;if(isThirty())terrain.visible=true;status('');")
s=s.replace("const model=isThirty()?terrain:architecture;if(!model||level==='state')return;", "const model=level==='state'?thirtyModel:isThirty()?terrain:architecture;if(!model)return;")
s=s.replace("if(Math.abs(original[i+12]-target.x)>halfX||Math.abs(original[i+14]-target.z)>halfZ)continue;", "if(level!=='state'&&(Math.abs(original[i+12]-target.x)>halfX||Math.abs(original[i+14]-target.z)>halfZ))continue;")
p.write_text(s)
