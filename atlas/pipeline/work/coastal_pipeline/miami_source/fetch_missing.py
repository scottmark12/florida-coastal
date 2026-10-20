from pathlib import Path
import urllib.request
P=Path(__file__).parent
for i,j in [(0,0),(0,1),(0,2),(1,2),(2,1),(2,2),(3,2)]:
 for a in range(2):
  for b in range(2):
   w=-80.29+i*.02+a*.01;s=25.71+j*.02+b*.01;p=P/f'map-sub-{i}-{j}-{a}-{b}.osm'
   if p.exists():continue
   try:
    data=urllib.request.urlopen(urllib.request.Request(f'https://api.openstreetmap.org/api/0.6/map?bbox={w:.5f},{s:.5f},{w+.01:.5f},{s+.01:.5f}',headers={'User-Agent':'FloridaCoastalAtlas/1.0'}),timeout=40).read();p.write_bytes(data);print(p.name,len(data),flush=True)
   except Exception as e:print(p.name,e,flush=True)
