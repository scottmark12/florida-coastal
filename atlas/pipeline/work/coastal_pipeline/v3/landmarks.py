from pathlib import Path
import json
p=Path('work/coastal_pipeline/v3/rules.json');r=json.loads(p.read_text());r['landmarks']={
 'way/300232867':{'name':'Miami Tower','profile':[[.0,0],[.40,.10],[.72,.20]],'source':'https://www.miamiandbeaches.com/l/business-resources/miami-tower/2252'},
 'way/290629021':{'name':'Freedom Tower','profile':[[0,0],[.24,.28],[.78,.34]],'walls':['#e7c69d'],'source':'https://freedomtower.mdc.edu/'},
 'relation/9396621':{'name':'One Thousand Museum','profile':[[0,0]],'diagonalFrame':True,'source':'https://www.zaha-hadid.com/architecture/1000-museum/'},
 'way/435587753':{'name':'The Colony Hotel','walls':['#b9d7d2','#f0ead7'],'source':'https://www.miamiandbeaches.com/l/attractions/art-deco-district/2116'}
};p.write_text(json.dumps(r,indent=2))
p=Path('work/coastal_pipeline/v3/engine.py');s=p.read_text();s=s.replace("h=min(real*rules['scale']", "landmark=rules.get('landmarks',{}).get(props['osm_type']+'/'+str(seed),{})\n h=min(real*rules['scale']")
s=s.replace("walls(p,z0,z,wc)\n if recipe", """if landmark.get('walls'):wc=landmark['walls'][0]
 profile=landmark.get('profile')
 if profile:
  for level,(fraction,inset) in enumerate(profile):
   q=p.buffer(-w*inset,join_style=2);top=z0+h*(profile[level+1][0] if level+1<len(profile) else 1)
   if not q.is_empty:walls(q,z0+h*fraction,top,wc);surf(q,top,rc)
 else:walls(p,z0,z,wc)
 if landmark.get('diagonalFrame'):
  for a,b in zip(rect,rect[1:]):
   a=np.array(a);b=np.array(b);along=(b-a);unit=along/np.linalg.norm(along)*.001
   for reverse in [False,True]:
    aa,bb=(a,b) if not reverse else (b,a)
    add('#f5f0df',[(*(aa-unit),z0),(*(aa+unit),z0),(*(bb+unit),z),(*(aa-unit),z0),(*(bb+unit),z),(*(bb-unit),z)])
 if profile:pass
 elif recipe""")
s=s.replace("elif recipe.get('detail')=='deco':", "elif recipe.get('detail')=='deco':")
# Retain the 30A recipe vocabulary in the shared engine.
s=s.replace("else:surf(p,z,rc)\n # Crisp", """elif recipe['roof']=='bermuda':
  current_roof=p;bottom=z0+h*.76
  for level in range(7):
   q=p.buffer(-w*.045*(level+1),join_style=2)
   if q.is_empty:surf(current_roof,bottom,rc);break
   surf(current_roof.difference(q),bottom,rc);top=z0+h*.76+h*.24*(level+1)/7;walls(q,bottom,top,wc);current_roof=q;bottom=top
  else:surf(current_roof,bottom,rc)
 else:surf(p,z,rc)
 # Crisp""")
p.write_text(s)
p=Path('work/coastal_pipeline/v3/viewer.js');s=p.read_text().replace(".0075*v,w=.0012", ".004*v,w=.00072").replace("new T.IcosahedronGeometry(.0055,1)","new T.IcosahedronGeometry(.004,1)").replace("oak.translate(0,.014,0)","oak.translate(0,.020,0)")
s=s.replace("const span=chosen?townSpan():", "const span=chosen?townSpan():")
p.write_text(s)
