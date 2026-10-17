from pathlib import Path
import json
p=Path('work/atlas_regions/app.js');s=p.read_text();Path('work/coastal_pipeline/v3/app-before-integration.js').write_text(s)
s="import {createRegionLayer,recipeGlyph} from '../coastal_pipeline/v3/atlas-layer.js';\n"+s
s=s.replace("const isThirty=()=>", "let detailedLayer=null;const isMiami=()=>activeTown.id==='miami'&&level!=='state';\nconst isThirty=()=>")
s=s.replace(" const mapHeight=innerHeight;", " if(isMiami()&&detailedLayer){if(level==='region'){target.set(detailedLayer.meta.center[0]+1,0,-detailedLayer.meta.center[1]);span=innerWidth<700?17:32}else{const d=selectedDistrict||districts.find(d=>d.id==='brickell');target.set(d.x,0,-d.y);span=innerWidth<700?1.05:1.9}}\n const mapHeight=innerHeight;")
s=s.replace("sun.shadow.normalBias=isThirty()?.0001:.06", "sun.shadow.normalBias=(isThirty()||isMiami())?.0001:.06")
s=s.replace(" try{\n  if(isThirty())", """ try{
  document.body.dataset.ready='false';renderer.toneMapping=isMiami()?THREE.NoToneMapping:THREE.ACESFilmicToneMapping;
  if(isMiami()){
   if(!detailedLayer){detailedLayer=await createRegionLayer(assetBase+'miami/');scene.add(detailedLayer.root)}
   if(token!==packageToken)return;
   for(const o of [terrain,architecture,stateIcons,thirtyModel,sandArt,alysArt])if(o)o.visible=false;
   roadLines.visible=false;setCamera();await detailedLayer.show(level==='town'?(selectedDistrict||districts.find(d=>d.id==='brickell')):null,innerWidth<700?1.25:2.1);
   if(token!==packageToken)return;status('');updateUi();makeLabels();highlight();if(flight)animateFlight(flight,token);else render();document.body.dataset.ready='true';document.body.dataset.pipeline='shared-atlas';return;
  }
  if(detailedLayer)detailedLayer.hide();if(terrain)terrain.visible=true;
  if(isThirty())""")
s=s.replace("if(isThirty()&&level==='region'&&kind==='district-label')", "if((isThirty()||isMiami())&&level==='region'&&kind==='district-label')")
s=s.replace("d=districts.find(d=>d.name===text&&d.town==='30a')", "d=districts.find(d=>d.name===text&&d.town===activeTown.id)")
s=s.replace("anchor.innerHTML=districtGlyph(d).split('<span>')[0]", "anchor.innerHTML=isMiami()?recipeGlyph(d,detailedLayer.meta.recipes):districtGlyph(d).split('<span>')[0]")
s=s.replace("if(!isThirty()||level!=='region')return;", "if((!isThirty()&&!isMiami())||level!=='region')return;")
s=s.replace("if(isThirty()&&level==='region'&&l.b.classList.contains('district-label'))", "if((isThirty()||isMiami())&&level==='region'&&l.b.classList.contains('district-label'))")
s=s.replace("l.x,isThirty()?.004:.8,-l.y", "l.x,(isThirty()||isMiami())?.004:.8,-l.y")
s=s.replace("for(const t of towns){if(isThirty()", "for(const t of towns){if(isMiami())continue;if(isThirty()")
s=s.replace("for(const d of districts.filter(d=>Math.hypot", "for(const d of districts.filter(d=>(!isMiami()||d.town==='miami')&&Math.hypot")
s=s.replace("if(d.town==='30a'){level=", "if(d.town==='30a'||d.town==='miami'){level=")
s=s.replace("d.priceSource?'View asking-price source'", "d.priceSource?'View market-price source'")
s=s.replace("isThirty()?.015:.85", "(isThirty()||isMiami())?.015:.85")
s=s.replace("isThirty()&&level==='region');setCamera()", "(isThirty()||isMiami())&&level==='region');setCamera()")
s=s.replace("await show();\n\n}", "await show();if(selectedDistrict)openDistrict(selectedDistrict);\n\n}")
p.write_text(s)
# Publish data to the existing shared district/card catalog.
D=Path('outputs/florida_coastal_atlas/regions/districts.json');ds=json.load(open(D));new=json.load(open('work/coastal_pipeline/v3/miami/districts-current.json'));ds=[d for d in ds if d['town']!='miami']+new;D.write_text(json.dumps(ds,indent=2))
link=Path('outputs/florida_coastal_atlas/regions/miami');link.symlink_to(Path('../../../../outputs/coastal_pipeline_v3/miami')) if not link.exists() else None
