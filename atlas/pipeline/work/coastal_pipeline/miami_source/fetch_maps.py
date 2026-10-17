from pathlib import Path
import urllib.request, time
P=Path(__file__).parent
# Official map API resolves complete ways and supplies all thematic layers in each tile.
for i in range(9):
 for j in range(6):
  w=-80.29+i*.02;s=25.71+j*.02;p=P/f'map-{i}-{j}.osm'
  if p.exists():continue
  try:
   req=urllib.request.Request(f'https://api.openstreetmap.org/api/0.6/map?bbox={w:.5f},{s:.5f},{w+.02:.5f},{s+.02:.5f}',headers={'User-Agent':'FloridaCoastalAtlas/1.0'})
   data=urllib.request.urlopen(req,timeout=40).read();p.write_bytes(data);print(p.name,len(data),flush=True)
  except Exception as e:print(p.name,e,flush=True)
