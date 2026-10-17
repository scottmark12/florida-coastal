from pathlib import Path
import subprocess,json
s=Path('work/florida_atlas/site_app.js').read_text()
def literal(marker):
 start=s.index(marker)+len(marker);op=s[start];cl={ '[':']','{':'}'}[op];depth=0;quote=None;esc=False
 for i in range(start,len(s)):
  c=s[i]
  if quote:
   if esc:esc=False
   elif c=='\\':esc=True
   elif c==quote:quote=None
   continue
  if c in ['\"',"'"]:quote=c;continue
  if c==op:depth+=1
  elif c==cl:
   depth-=1
   if depth==0:return s[start:i+1]
node='node'
for marker,name in [(',T=[','towns'),('REGIONS=[','regions')]:
 expr=literal(marker[:-1]);js="const vm=require('node:vm');process.stdout.write(JSON.stringify(vm.runInNewContext('('+"+json.dumps(expr)+"+')',Object.create(null),{timeout:1000,contextCodeGeneration:{strings:false,wasm:false}})));"
 data=json.loads(subprocess.check_output([node,'-e',js]));Path('work/florida_atlas/'+name+'.json').write_text(json.dumps(data,indent=2))
towns=json.loads(Path('work/florida_atlas/towns.json').read_text());print('Towns',len(towns))
for t in towns:print(t['id'],t['name'],t['lat'],t['lon'],' / '.join(x[0] for x in t.get('todo',[])))
