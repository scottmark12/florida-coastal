const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function browser({search='',cookie='',team=false,ua='Mozilla/5.0 Safari/605.1',webdriver=false}={}) {
 let now=0;const events={},timers=[],posts=[],local=new Map(team?[['fc-team','1']]:[]),session=new Map();
 const storage=m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)});
 const c={URL,URLSearchParams,Math,Date,JSON,console,performance:{now:()=>now},navigator:{userAgent:ua,webdriver,language:'en'},location:{hostname:'www.floridacoastal.co',pathname:'/',hash:'',search,origin:'https://www.floridacoastal.co',href:'https://www.floridacoastal.co/'+search},screen:{width:1280,height:720},innerWidth:1280,localStorage:storage(local),sessionStorage:storage(session),setInterval:f=>timers.push(f),setTimeout:()=>{},fetch:(url,opts)=>{posts.push(JSON.parse(opts.body));return Promise.resolve({ok:true});}};
 c.document={visibilityState:'visible',cookie,referrer:'',addEventListener:(n,f)=>(events[n]??=[]).push(f)};
 c.addEventListener=(n,f)=>(events[n]??=[]).push(f);c.window=c;
 vm.createContext(c);
 return {c,posts,load:file=>vm.runInContext(fs.readFileSync(file,'utf8'),c),advance:ms=>{now+=ms;timers.forEach(f=>f());},fire:(n,e={})=>(events[n]??[]).forEach(f=>f(e))};
}
test('foreground time stops when hidden; snapshots remain cumulative',()=>{
 const b=browser();b.load('assets/fc-engagement.js');b.advance(10000);b.advance(10000);
 assert.deepEqual(b.posts.map(e=>JSON.parse(e.detail).s),[10,20]);
 b.c.document.visibilityState='hidden';b.fire('visibilitychange');b.advance(90000);
 assert.equal(b.posts.length,2);
 b.c.document.visibilityState='visible';b.fire('visibilitychange');b.advance(10000);
 assert.equal(JSON.parse(b.posts.at(-1).detail).s,30);b.fire('pagehide');assert.equal(b.posts.length,3);
});
test('idle foreground tab counts no more than one minute without activity',()=>{
 const b=browser();b.load('assets/fc-engagement.js');b.advance(120000);
 assert.equal(JSON.parse(b.posts.at(-1).detail).s,60);
 b.fire('pointerdown');b.advance(10000);assert.equal(JSON.parse(b.posts.at(-1).detail).s,70);
});
for(const settings of [{search:'?team=1'},{team:true},{cookie:'fc_team=1'},{ua:'Mozilla/5.0 ChatGPT-User/1.0'},{webdriver:true}]){
 test('team/automation excluded '+JSON.stringify(settings),()=>{
  const b=browser(settings);b.load('assets/fc-connect.js');b.load('assets/fc-engagement.js');b.advance(10000);assert.equal(b.posts.length,0);
 });
}
test('team marking excludes analytics without changing real lead behavior',async()=>{
 const b=browser({team:true});b.load('assets/fc-connect.js');await b.c.FC.lead({kind:'newsletter',email:'fixture@example.invalid'});
 assert.equal(b.posts.length,1);assert.equal(b.posts[0].status,'new');
});
test('link tracking drops query strings and fragments',()=>{
 const b=browser();b.load('assets/fc-engagement.js');b.fire('click',{target:{closest:()=>({href:'https://www.floridacoastal.co/quiz?email=private#secret'})}});
 assert.deepEqual(JSON.parse(b.posts[0].detail),{to:'/quiz'});
});
