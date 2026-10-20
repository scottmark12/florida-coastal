from pathlib import Path
p=Path('work/coastal_pipeline/v3/engine.py');s=p.read_text();s=s.replace("surf(land,.002,rules['palette']['land'])", "surf(land,.002,rules['palette']['land'])\nif m['inputs'].get('context'):\n context=shape(json.load(open(m['inputs']['context']['path'])));surf(context,.0015,rules['palette']['land'])")
s=s.replace("g=p.simplify(.001).buffer(width,cap_style=2,join_style=2,quad_segs=1);g=g if bridge else g.intersection(land);surf(g,.004 if not bridge else .008,'#e1d7bd' if cl in ['path','footway','cycleway'] else '#b4b7ab');roads.append(p)","""g=p.simplify(.001).buffer(width,cap_style=2,join_style=2,quad_segs=1);g=g if bridge else g.intersection(land)
 color='#e1d7bd' if cl in ['path','footway','cycleway'] else '#b4b7ab'
 if cl in ['motorway','trunk','primary','secondary'] or bridge:
  current='base';surf(g,.004 if not bridge else .008,color)
 else:
  minx,miny,maxx,maxy=g.bounds if not g.is_empty else (0,0,-1,-1)
  for ix in range(math.floor(minx),math.floor(maxx)+1):
   for iy in range(math.floor(miny),math.floor(maxy)+1):
    current=f'tile-{ix}-{iy}';surf(g.intersection(box(ix,iy,ix+1,iy+1)),.004,color)
 roads.append(p)""")
p.write_text(s)
