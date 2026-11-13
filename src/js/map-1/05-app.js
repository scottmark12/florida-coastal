/* Save search, start up, back button navigation, list view */
// save search
function shareURL(){const q=new URLSearchParams();const ci=curReg();if(ci>=0)q.set('region',REG[ci][0]);if(S.style)q.set('style',S.style);if(S.price)q.set('price',S.price);if(S.mode!='explore')q.set('mode',S.mode);if(S.mode=='sliders'){const sv=SLC.filter(([k])=>slOn(k,S.sl[k])).map(([k])=>k+':'+S.sl[k]).join(',');if(sv)q.set('sv',sv);if(S.slBud!=null)q.set('bud',S.slBud);if(S.slPr)q.set('where','r:'+S.slPr);else if(S.slPc)q.set('where',S.slPc)}return location.origin+location.pathname+'?'+q.toString()}
function sumText(){const ci=curReg(),parts=[ci>=0?REG[ci][0]:'All of Florida'];if(S.style)parts.push(VIBES[S.style]);if(S.price){const[a,b]=S.price.split('-').map(Number);parts.push(`$${a>=1000?a/1000+'M':a+'K'} to ${b>=99999?'any':'$'+(b>=1000?b/1000+'M':b+'K')}`)}if(S.mode=='sliders'){const n=SLC.filter(([k])=>slOn(k,S.sl[k])).length;if(n)parts.push(`${n} priorities set`)}return parts.join(' · ')}
document.querySelector('.save').onclick=()=>{$('svb').classList.remove('sent');$('svsum').textContent=sumText();$('svl').value=shareURL();$('sv').classList.add('on');setTimeout(()=>$('sve').focus(),50)};
$('svx').onclick=()=>$('sv').classList.remove('on');$('sv').onclick=e=>{if(e.target.id=='sv')$('sv').classList.remove('on')};
$('svc').onclick=()=>{$('svl').select();try{navigator.clipboard.writeText($('svl').value)}catch(e){}$('svc').textContent='Copied'};
$('svgo').onclick=()=>{const e=$('sve').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){$('sve').style.borderColor='#B3261E';$('sve').focus();return}
 const fin=m=>{$('svdone').textContent=m;$('svb').classList.add('sent')};let msg='Saved search';try{msg='Saved search: '+shareURL()+'\n'+sumText()}catch(x){}
 FC.lead({kind:'matches',email:e,message:msg.slice(0,2000)}).then(r=>fin(r.preview?'Preview: saved as a test, no email sent.':`We'll send the link to ${e}. Open it anytime to pick up right here.`)).catch(()=>fin(FC.LIVE?"That didn't send. Check your connection and try again.":'Preview only: this works once the new site is live. Nothing was sent.'))};
addEventListener('resize',()=>{render();list()});
// start: zoomed in like Compass
if(params.get('price')){S.price=params.get('price');const[a,b]=S.price.split('-');$('pmin').value=a;$('pmax').value=b}
const st0=params.get('style')||'';if(st0){S.style=st0;$('sty').value=st0;$('sty').classList.add('on')}
const r0=REG.find(r=>r[0]==params.get('region'))||REG.find(r=>r[0]=='Southwest Gulf');S.region=r0[0];S.vb=fit(r0.slice(1));tags();render();list();
if(params.get('mode')=='vibes'){setTimeout(shSync,80);S.mode='vibes';document.body.classList.add('vibes');document.querySelectorAll('#mode button').forEach(b=>b.classList.toggle('on',b.dataset.m=='vibes'));if(S.style){document.body.classList.add('pick');S.region='';tags();S.vb=fit(ALL,.02);S.gT0=performance.now()}else{S.region='';tags();S.vb=fit(ALL,.02)}render();list()}
if(params.get('mode')=='sliders'){setMode('sliders');const pr=params.get('sv');if(pr)pr.split(',').forEach(x=>{const[a,b]=x.split(':');if(a in S.sl)S.sl[a]=+b});if(params.get('bud')!=null){S.slBud=+params.get('bud');S.sl.afford=LK.BUDSET[5-S.slBud][1]}const wh=params.get('where');if(wh){if(wh.startsWith('r:')){const r=LK.REGIONS.find(r=>r.id==wh.slice(2));if(r){S.slPr=r.id;S.slPc=R7OF[r.id]}}else S.slPc=wh}if(pr||wh||params.get('bud')!=null)slRender()}
if(!['vibes','sliders'].includes(params.get('mode'))){S.region='';tags();S.vb=fit(ALL,.02);setMode('regions');const rs=rGet(),rq0=params.get('region')||rs,rq=rq0?r7of(rq0):null;if(rq&&VIBES['r:'+rq])setTimeout(()=>pickStyle('r:'+rq),80)}
// ---- Navigation (Nov 11): Back button works through map states, list view, search bar ----
function navURL(){const q=new URLSearchParams();const m=S.mode=='sliders'?'sliders':(S.sub=='regions'?'regions':'vibes');q.set('mode',m);
 if(m=='regions'&&isR(S.style))q.set('region',S.style.slice(2));if(m=='vibes'&&S.style&&!isR(S.style))q.set('style',S.style);
 if(S.pop)q.set('open',S.pop.id);if(S.listOn)q.set('view','list');return location.pathname+'?'+q.toString()}
let navT=null;function navSync(){clearTimeout(navT);navT=setTimeout(()=>{if(S.restoring)return;const u=navURL(),cur=location.pathname+location.search;if(u==cur)return;
 const prevOpen=new URLSearchParams(location.search).get('open'),nowOpen=S.pop&&S.pop.id,swap=prevOpen&&nowOpen&&prevOpen!=nowOpen;
 if(S.navReady&&!swap&&!S.auto)history.pushState({fc:1},'',u);else history.replaceState({fc:1},'',u)},120)}
[['setMode'],['pickStyle'],['openPop'],['closePop']].forEach(([n])=>{const f=window[n];window[n]=function(){const r=f.apply(this,arguments);navSync();return r}});
{const b0=$('back').onclick;$('back').onclick=function(){b0.apply(this,arguments);navSync()}}
addEventListener('popstate',()=>{const q=new URLSearchParams(location.search),m=q.get('mode')||'regions';S.restoring=1;
 listShow(q.get('view')=='list',true);
 const want=m=='regions'?(q.get('region')?'r:'+q.get('region'):''):m=='vibes'?(q.get('style')||''):'';
 const curM=S.mode=='sliders'?'sliders':(S.sub=='regions'?'regions':'vibes');if(curM!=m)setMode(m);
 setTimeout(()=>{if(m!='sliders'){if(want&&S.style!=want)pickStyle(want);else if(!want&&S.style)$('back').onclick()}
  const o=q.get('open');setTimeout(()=>{if(o){const t=T.find(t=>t.id==o);if(t&&(!S.pop||S.pop.id!=o))openPop(t)}else if(S.pop)closePop();setTimeout(()=>{S.restoring=0},200)},350)},120)});
// list view
function listTowns(){if(S.mode=='sliders'&&S.top&&S.top.length)return [S.top.slice(0,15).map(id=>T.find(t=>t.id==id)),'Your top 15'];
 if(S.style)return [vOrder(),VIBES[S.style]];return [T.slice(),'All '+T.length+' beach towns']}
function listShow(on,quiet){let el=$('mlist');if(!el){el=document.createElement('div');el.id='mlist';el.className='mlist';document.body.appendChild(el)}
 S.listOn=!!on;document.body.classList.toggle('list-on',S.listOn);if(!on){if(!quiet)navSync();return}
 const [L,title]=listTowns();el.innerHTML=`<div class="ml-hd"><button type="button" class="ml-map" onclick="listShow(false)">‹ Map</button><b>${title}</b><span>${L.length} towns</span></div><div class="ml-list">${L.map((t,i)=>`<a class="ml-row" href="towns/${t.id}-v3.html"><span class="ph" style="background-image:url('${t.img}')">${S.mode=='sliders'&&S.top.length?`<i>${i+1}</i>`:''}</span><span class="tx"><small>${LD[t.id].rn}</small><b>${t.n}</b><em>${t.b||''}</em></span></a>`).join('')}</div>`;el.scrollTop=0;if(!quiet)navSync()}
(function(){const r=$('res');if(!r)return;/* Nov 12: List button removed, the full sheet is the list */
 const hd=document.querySelector('body > header');if(hd){const sb=document.createElement('button');sb.type='button';sb.className='msearch';sb.innerHTML='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><span>Search a town, region or ZIP</span>';sb.onclick=()=>{if(window.FCS)FCS.open('');else location.href='towns/index-v2.html'};hd.appendChild(sb)}})();
setTimeout(()=>{S.navReady=1;const q=new URLSearchParams(location.search);if(q.get('view')=='list')listShow(true,true);history.replaceState({fc:1},'',navURL())},1500);
S.booted=1;
if(params.get('open')){const t=T.find(t=>t.id==params.get('open'));if(t)setTimeout(()=>{S.restoring=1;openPop(t);setTimeout(()=>{S.restoring=0},300)},450)}
