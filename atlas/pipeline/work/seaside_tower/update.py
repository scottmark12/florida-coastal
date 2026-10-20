exec(open('work/coast_geography/refine.py').read().split('for o in instances:')[0])
exec(Path('work/seaside_tower/geometry.py').read_text())
for o in instances:
 if o['asset']=='Composed / Signature / Seaside Coleman Pavilion':o['s']=[2.1,2.1,4.6]
exec(open('work/coast_geography/refine.py').read().split('def rgb(c):')[1].join(['def rgb(c):','']))
