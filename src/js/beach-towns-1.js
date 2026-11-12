(function(){var MOB=innerWidth<=760;var r=document.documentElement;
if(/iPhone|iPod/.test(navigator.userAgent)){var gap=screen.height-innerHeight;if(gap>=90&&gap<=260){var t=Math.min(84,Math.round(gap*.48)+4);r.style.setProperty('--gt',t+'px');r.style.setProperty('--gb',(gap-t+44)+'px')}}
function f(){var az=document.querySelector('section.az');if(!az)return;var on=scrollY<az.offsetTop-2;r.classList.toggle('tsnap',on)}

function SH(){var ar=document.getElementById('ar');if(ar){var scrim=null,top=null,lh=null,more=null;
function K(t){var m=/\$([\d.]+)\s*([KM])/.exec(t);if(!m)return null;return parseFloat(m[1])*(m[2]=='M'?1000:1)}
function F(v){return v>=1000?'$'+(v/1000).toFixed(2).replace(/\.?0+$/,'')+'M':'$'+Math.round(v)+'K'}
function dress(){if(!ar.classList.contains('show'))return;var on=document.querySelector('#cg .ct.on');
if(!ar.classList.contains('sheet')){ar.classList.add('sheet');r.classList.add('sheet-open');scrim=document.createElement('div');scrim.className='sh-scrim';scrim.onclick=close;document.body.appendChild(scrim);ar.scrollTop=0}
if(!top){top=document.createElement('div');top.className='sh-top';top.innerHTML='<span class="sh-grab"></span><button class="sh-x" aria-label="Close">×</button><h3></h3><p></p>';ar.insertBefore(top,ar.firstChild);top.querySelector('.sh-x').onclick=close}
if(on){var i=on.querySelector('i');top.style.backgroundImage=i?i.style.backgroundImage:'';top.querySelector('h3').textContent=on.querySelector('b').textContent}
var v=[].map.call(document.querySelectorAll('#grid .card .mt b'),function(b){return b.textContent}).join(' ').match(/\$[\d.]+\s*[KM]/g)||[];v=v.map(K).filter(Boolean).sort(function(a,b){return a-b});
var n=document.querySelectorAll('#grid .card').length;top.querySelector('p').textContent=n+' towns'+(v.length?' · '+F(v[0])+' to '+F(v[v.length-1]):'');
if(!lh){lh=document.createElement('div');lh.className='sh-lh'}var g=document.getElementById('grid');if(lh.nextSibling!==g)ar.insertBefore(lh,g);lh.textContent='Towns';
var axi=ar.querySelector('.axi');if(axi&&!axi.dataset.c){axi.dataset.c=1;var p=axi.querySelector('p:last-of-type');if(p&&p.textContent.length>170){axi.classList.add('clamp');var b=document.createElement('button');b.className='ax-more';b.textContent='More';b.onclick=function(e){e.stopPropagation();axi.classList.remove('clamp');b.remove()};axi.appendChild(b)}}}
function close(){ar.classList.remove('show','sheet');r.classList.remove('sheet-open');if(scrim){scrim.remove();scrim=null}document.querySelectorAll('#cg .ct.on').forEach(function(b){b.classList.remove('on')});document.getElementById('cg').classList.remove('any');var sec=document.getElementById('regions');scrollTo(0,sec.offsetTop)}
new MutationObserver(function(){setTimeout(dress,0)}).observe(ar,{attributes:true,childList:true,subtree:true});
addEventListener('keydown',function(e){if(e.key==='Escape'&&ar.classList.contains('sheet'))close()});
var y0=null;ar.addEventListener('touchstart',function(e){y0=ar.scrollTop<=0?e.touches[0].clientY:null},{passive:true});ar.addEventListener('touchend',function(e){if(y0!==null&&e.changedTouches[0].clientY-y0>110)close();y0=null},{passive:true})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',SH);else SH();
if(MOB){r.classList.add('tsnap');addEventListener('scroll',f,{passive:true});addEventListener('load',f);f()}})();
