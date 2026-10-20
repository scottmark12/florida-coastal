from pathlib import Path
p=Path('work/atlas_regions/app.js');s=p.read_text()
s=s.replace("scene.background=new THREE.Color('#579ba8')","scene.background=new THREE.Color('#3593ae')").replace("color:'#579ba8'","color:'#3593ae'")
s=s.replace("span=1.25","span=.85").replace('Neighborhood view · 1.25 km across','Neighborhood view · 850 m across')
s=s.replace("scene.add(terrain);document.body", "if(tn==='30a-finished')illustrateThirty(terrain);scene.add(terrain);document.body")
s=s.replace("scene.add(thirtyModel);thirtyModel.visible=true;", "illustrateThirty(thirtyModel);scene.add(thirtyModel);thirtyModel.visible=true;")
s=s.replace("async function loadThirty(){if(!thirty)thirty=await fetch(assetBase+'30a.json').then(r=>r.json());return thirty}","async function loadThirty(){if(!thirty){thirty=await fetch(assetBase+'30a.json').then(r=>r.json());const vs=await fetch(assetBase+'sand.json').then(r=>r.json());const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vs,3));sandArt=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:'#fffdf1',side:THREE.DoubleSide}));scene.add(sandArt)}return thirty}")
s=s.replace('let thirty=null,thirtyModel=null;', 'let thirty=null,thirtyModel=null,sandArt=null;')
s=s.replace('function render(){trimInstances();', "function render(){if(sandArt)sandArt.visible=activeTown.id==='30a'||level==='state';trimInstances();")
s=s.replace('renderer.render(scene,camera);placeLabels();','renderer.render(scene,camera);placeLabels();placeDistrictArt();')
# Decorate existing district labels, keeping their original geographic anchors for leader lines.
s=s.replace("b.textContent=text;b.onclick=onClick;", "b.textContent=text;if(isThirty()&&level==='region'&&kind==='district-label'){const d=districts.find(d=>d.name===text&&d.town==='30a');if(d){b.innerHTML=districtGlyph(d);b.setAttribute('aria-label',d.name)}}b.onclick=onClick;")
# replace the old rotated-label branch
start=s.index("  if(isThirty()&&level==='region'&&l.b.classList.contains('district-label'))")
end=s.index('\n  if(x<w/2',start)
s=s[:start]+"  if(isThirty()&&level==='region'&&l.b.classList.contains('district-label'))continue;"+s[end:]
s=s.replace("if(density<150)continue;", "const grove=Math.sin(x*72+Math.sin(z*39)*2)+Math.cos(z*63+Math.sin(x*27)*2);if(density<150||grove<.55||Math.sin(x*1937+z*1271)<-.05)continue;")
s=s.replace("const size=.68+.32*Math.abs(Math.sin(p[0]*1173+p[2]*837));", "const size=.42+.26*Math.abs(Math.sin(p[0]*1173+p[2]*837));")
s=s.replace("mesh.setMatrixAt(i,m)});mesh.computeBoundingSphere();forestDetail.add(mesh)","mesh.setMatrixAt(i,m);mesh.setColorAt(i,new THREE.Color(['#edf0cf','#d1dfb6','#b9ce9d','#dce6be'][i%4]))});mesh.computeBoundingSphere();forestDetail.add(mesh)")
s=s.replace('function placeLabels(){',Path('work/30a_art/glyphs.js').read_text()+'\nfunction placeLabels(){')
p.write_text(s)
# Update packaging, not data or models.
p=Path('work/30a_finish/stage.py');s=p.read_text();s=s.replace("(O/'index.html').write_text(html)","html=html.replace('Canopy imagery: Esri, Vantor, Earthstar Geographics & GIS User Community','OSM-based geography · original illustrated canopy')\nhtml=html.replace('</style>',Path('work/30a_art/style.css').read_text()+'</style>')\nshutil.copy2('outputs/30a_art/sand.json',O/'sand.json')\n(O/'index.html').write_text(html)");p.write_text(s)
p=Path('work/30a_finish/install.py');s=p.read_text().replace("'canopy-mask.png']","'canopy-mask.png','sand.json']");p.write_text(s)
