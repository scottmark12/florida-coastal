from pathlib import Path
import json,html,shutil,hashlib
base=Path('outputs/coastal_pipeline_v4');queue=Path('work/coastal_pipeline/v4/queue.json');items=json.load(queue.open())
for id in ['tampa-south-shore','sarasota-bradenton']:
 p=base/id;a=json.load(open(p/'canopy-sources.json'));r=json.load(open(p/'report.json'));integrity=json.load(open(p/'package-integrity.json'));qa=json.load(open(p/'visual-checks.json'))
 sources={row['district']:row for row in a['measured_rasters']};names={d['id']:d['name'] for d in json.load(open(p/'scene.json'))['districts']}
 evidence=f'<h2>Canopy evidence</h2><p>{integrity["initial_region_asset_bytes"]/1e6:.2f} MB total initial regional assets. Canopy is loaded in separate spatial tiles. Extent comes from mapped data; the crown positions and live-oak shapes are illustrations, not a surveyed tree inventory.</p><p><a href="canopy-sources.json">Canopy audit</a> · <a href="canopy-inputs.json">Dataset dates and source links</a> · <a href="district-style-recipes.json">District recipes</a> · <a href="package-integrity.json">Package checks</a></p><table><tr><th>District</th><th>Canopy source</th><th>Source year</th><th>Canopy fraction in source window</th></tr>'
 for d in a['districts']:
  src=sources[d['district']];provider='Tampa / USF measured canopy' if 'usf.edu' in src['source'] else 'ESA WorldCover 10 m';evidence+=f'<tr><td>{html.escape(names[d["district"]])}</td><td><a href="{html.escape(src["source"])}">{provider}</a></td><td>{src["year"]}</td><td>{src["mapped_canopy_fraction"]:.1%}</td></tr>'
 evidence+='</table><p>Percentages describe each source window, which can include water and nearby districts; they are not municipal canopy statistics. ESA WorldCover 10 m 2021 v200: CC BY 4.0, DOI 10.5281/zenodo.7254221. Additional forest extent: OpenStreetMap; Sarasota also uses Florida FWC Cooperative Land Cover.</p>'
 if id=='tampa-south-shore':
  evidence+='<h2>Before this pass</h2><p>The updated views above use warm painted-wood recipes and pitched roofs for Hyde Park and Seminole Heights, with local measured canopy taking precedence over regional land cover.</p><div class="pair"><figure><img src="before-hydepark-1440.png" alt="Hyde Park before sourced canopy"><figcaption>Hyde Park — before</figcaption></figure><figure><img src="before-seminole-1440.png" alt="Seminole Heights before sourced canopy"><figcaption>Seminole Heights — before</figcaption></figure></div>'
 page=p/'atlas-review.html';s=page.read_text().replace('</html>',evidence+'</html>');s=s.replace('<table>','<table style="border-collapse:collapse;width:100%;font-size:14px;text-align:left">');s=s.replace('/explore_coast.html?','/explore_coast.html?v=canopy453&');page.write_text(s)
 for q in items:
  if q['region']==id:q['status']=f'v4.5 canopy review ready: {len(names)} sourced districts, {len(qa["views"])} viewport screenshots, {integrity["initial_region_asset_bytes"]} initial bytes; physical-phone timing unverified'
 r['canopy_rule']='Mapped canopy sources required; no default roadside planting';r['canopy_audit']='canopy-sources.json';(p/'report.json').write_text(json.dumps(r,indent=2))
queue.write_text(json.dumps(items,indent=2))
p=Path('outputs/florida_coastal_atlas/regions/rollout-review.html');s=p.read_text();s=s.replace('</body>','') if '</body>' in s else s
s=s.replace('</html>','');s+='<h2>Source-backed canopy · v4.5</h2><p><a href="packages/tampa-south-shore/atlas-review.html?v=canopy453">Tampa — Hyde Park and Seminole Heights updated</a> · <a href="packages/sarasota-bradenton/atlas-review.html?v=canopy453">Sarasota, Bradenton and Venice — next region ready for review</a></p><p>Both packages are below 4 MB at initial Region load. Physical-phone timing is unverified.</p></html>';p.write_text(s)
# Approved 30A source assets remain byte-identical.
j=json.load(open('outputs/30a_locked/lock-manifest.json'));checks={n:hashlib.sha256(Path(n).read_bytes()).hexdigest()==h for n,h in j['files'].items() if any(k in n for k in ['30a-finished','30a.json','sand.json','alys-geometry','canopy-mask','canopies/'])};assert all(checks.values())
for id in ['tampa-south-shore','sarasota-bradenton']:(base/id/'30a-preservation.json').write_text(json.dumps(checks,indent=2))
print('Reviews finalized; 30A preserved:',len(checks),'files')
