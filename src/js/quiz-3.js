(function(){
const PH=[['img/c/st-augustine-aerial.webp','St. Augustine'],['img/c/ormond-beach.webp','Ormond Beach'],['img/c/key-west.webp','Key West'],['img/c/bradenton-beach.webp','Bradenton Beach'],['img/c/keywest-street.webp','Key West'],['img/c/skyway-arrival.webp','Sunshine Skyway'],['img/c/north-palm-beach.webp','North Palm Beach'],['img/c/destin.webp','Destin'],['img/c/stuart.webp','']];
PH.forEach(p=>{const i=new Image();i.src=p[0]});
document.body.classList.add('qphoto');if(new URLSearchParams(location.search).get('bar')==='blue')document.body.classList.add('bar-blue');
const mw=document.querySelector('.mapw'),box=document.createElement('div');box.id='qph';
box.innerHTML=PH.map(p=>`<div class="ph" style="background-image:url('${p[0]}')"></div>`).join('');
mw.parentElement.insertBefore(box,mw.nextSibling);
const cap=document.createElement('div');cap.id='qcap';mw.parentElement.insertBefore(cap,box.nextSibling);
let cur=-1;function show(n){if(n===cur)return;cur=n;box.querySelectorAll('.ph').forEach((e,i)=>e.classList.toggle('on',i===n));cap.textContent=PH[n]?PH[n][1]:''}

const mini=document.createElement('div');mini.id='qmini';box.parentElement.insertBefore(mini,cap);
const B=[-87.62,-79.97,24.48,31.02],mx0=X(B[0]),mx1=X(B[1]),my0=Y(B[3]),my1=Y(B[2]);
const land=document.querySelector('#base path.mc').getAttribute('d');
mini.innerHTML=`<svg viewBox="${mx0} ${my0} ${mx1-mx0} ${my1-my0}"><defs><clipPath id="mclip"><polygon points="${[[-87.6,31.0],[-85.0,31.0],[-84.86,30.7],[-82.2,30.57],[-82.02,30.4],[-81.9,30.55],[-81.4,30.72],[-79.0,30.72],[-79.0,24.0],[-87.6,24.0]].map(p=>X(p[0])+','+Y(p[1])).join(' ')}"/></clipPath></defs><path d="${land}" fill="#fff" fill-opacity=".95" clip-path="url(#mclip)"/><g id="mdots"></g></svg>`;
const ku=(mx1-mx0)/150;
function miniDots(){const g=document.getElementById('mdots');if(!g)return;if(!qAny()){g.innerHTML='';return}
 const top=qRank().slice(0,5).map(t=>t.id),ts=new Set(top);let h='';
 T.forEach(t=>{if(ts.has(t.id)||qp(t)<70)return;h+=`<circle class="mo" cx="${X(t.lo)}" cy="${Y(t.la)}" r="${2.4*ku}" fill="#E07A3F"/>`});
 top.forEach((id,i)=>{const t=T.find(x=>x.id==id);h+=`<circle class="mt" style="animation-delay:${i*.15}s" cx="${X(t.lo)}" cy="${Y(t.la)}" r="${(i?4:5)*ku}" fill="#E07A3F" stroke="#fff" stroke-width="${1.3*ku}"/>`});
 g.innerHTML=h}
const mob=()=>innerWidth<901;
const SUBS={3:['Sand and water right out front','Close enough to ride over with a towel','Easy to get to whenever I want'],4:{2:'People I know by name, and that is plenty'},5:['I want an airport close by','A decent drive to the airport is fine','I can make a day of getting there'],7:['Keeping costs low','A comfortable middle','Room to stretch','Open to the top end']};
Object.entries(SUBS).forEach(([qi,m])=>Object.entries(m).forEach(([oi,t])=>{const o=SQ[qi]&&SQ[qi].o[oi];if(o&&!o[1])o[1]=t}));
const d0=qDraw;qDraw=function(){d0();show(Math.min(Q.step,PH.length-1));miniDots();if(qAny()&&!window.__qs){window.__qs=1;window.FC&&FC.track('quiz_start')}};if(mob()){const r=$('res');r.parentElement.insertBefore(mini,r.nextSibling);const cen=()=>{mini.style.transform='none';const b=mini.getBoundingClientRect();mini.style.transform=`translateX(${innerWidth/2-(b.left+b.width/2)}px)`};requestAnimationFrame(cen);setTimeout(cen,400);addEventListener('resize',cen)}show(Q.step);miniDots();qDraw();
qDone=function(){window.QLOCK=false;qRank();miniDots();
 const a=Q.ans.map(x=>x==null?'x':x).join(''),TOP=qRank().slice(0,5).map(t=>({id:t.id,fit:qp(t),name:t.n,why:qWhy(t,3)})),go2=()=>{location.href='quiz-results-v3.html?a='+a+'&t='+TOP.map(x=>x.id+'.'+x.fit).join(',')};
 try{sessionStorage.setItem('fc-top5',JSON.stringify({a:a,top:TOP}))}catch(e){}
 if(window.FC){FC.track('quiz_complete');FC.track('quiz_top5',a+'|'+TOP.map(x=>x.id+':'+x.fit).join(','))}
 document.getElementById('qrvn').textContent=T.length;
 const lab=Q.ans.map((x,i)=>x==null?null:SQ[i].o[x][0]).filter(t=>t&&!/^Not sure/.test(t));
 const c=document.getElementById('qrvc');c.innerHTML=lab.slice(0,4).map(t=>`<span class="chip">${t}</span>`).join('')+(lab.length>4?`<span class="chip">+${lab.length-4} more</span>`:'');
 document.getElementById('qrvs').onclick=e=>{e.preventDefault();go2()};
 const r=mini.getBoundingClientRect(),ar=r.height/r.width;document.body.appendChild(mini);
 Object.assign(mini.style,{position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',right:'auto',bottom:'auto',margin:'0',transform:'none',zIndex:40,transition:'none',padding:'0'});
 mini.classList.add('fly');show(PH.length-1);document.body.classList.add('reveal');
 const ease='cubic-bezier(.22,.9,.24,1)';
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  const W=Math.min(innerWidth*.7,innerHeight*.58/ar,520);
  mini.style.transition=`left 1.1s ${ease},top 1.1s ${ease},width 1.1s ${ease}`;
  Object.assign(mini.style,{left:(innerWidth-W)/2+'px',top:(innerHeight-W*ar)/2+'px',width:W+'px'});
  setTimeout(()=>mini.classList.add('pulse'),700);
 }));
 setTimeout(()=>{
  const sp=document.getElementById('qrvmap');sp.style.height=(96*ar)+'px';const t=sp.getBoundingClientRect();
  mini.classList.remove('pulse');mini.classList.add('rest');mini.style.transition=`left .9s ${ease},top .9s ${ease},width .9s ${ease}`;
  Object.assign(mini.style,{left:t.left+'px',top:t.top+'px',width:t.width+'px'});
  document.body.classList.add('reveal2');
  [...c.children].forEach((e,i)=>setTimeout(()=>e.classList.add('in'),500+i*280));
  setTimeout(go2,3200);
 },2100)};
})();
