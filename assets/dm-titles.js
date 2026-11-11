// Preview title fonts, remembered for this tab:
// ?dm=0 Caslon everywhere · ?dm=1 DM Sans everywhere (live site) · ?dm=2 first split
// ?dm=3 "Caslon names things": town names and article titles in Caslon, every other title DM Sans
// ?dm=4 town names only in Caslon, everything else (articles too) DM Sans
(function(){
var q=new URLSearchParams(location.search).get('dm'),mode='0';
try{if(q!==null)sessionStorage.setItem('fcdm',q);mode=sessionStorage.getItem('fcdm')||'3'}catch(e){mode=q||'3'}
if(['1','2','3','4'].indexOf(mode)<0)return;
var DMF="'DM Sans',system-ui,sans-serif";
function setDM(el){el.style.setProperty('font-family',DMF,'important');el.style.setProperty('font-weight','500','important');el.style.setProperty('letter-spacing','-.02em','important')}
var TOWN=['.mt-tx b','.cm-bd b','.hb-t b','.tx h1','.qhero h2','.grid .card h3','.pop h3','.nb-c b','.near b','.pn h1','main > h1','.tv-h h1','.thero h1','body.town h1'];
var ART=['.ed-lead h3','.ed-latest b','.ed-card h3','.art h3','.cguides .cg-lb b','.cguides .cg-c b'];
var TOOLS=['.qq','.qin h1','.qr h1','.qsl h3','#short h2','.hero h1','.sec h2','.band h2','.recv b','#h','aside .card h3','.hx-new','.hx-back','.news h2'];
var HOME_TOOL=['Not ready to move yet','Then get to know','Find your stretch','What should home feel like','See the towns others'];
function isTown(el){
 if(TOWN.some(function(s){return el.matches(s)}))return true;
 // town page title: the first h1 on a town page
 if(/\/towns\/(?!index)[a-z0-9-]+-v\d\.html/.test(location.pathname)&&el.tagName==='H1')return true;
 return false}
function fix(){
 if(mode==='2'){document.querySelectorAll(TOOLS.join(',')).forEach(setDM);document.querySelectorAll('h2').forEach(function(h){var t=h.textContent.trim();if(HOME_TOOL.some(function(p){return t.indexOf(p)===0}))setDM(h)});return}
 var keep=function(el){return isTown(el)||(mode==='3'&&ART.some(function(s){return el.matches(s)}))};
 document.querySelectorAll('body *').forEach(function(el){
  if(!el.firstChild)return;
  var f=getComputedStyle(el).fontFamily;if(!/Caslon/i.test(f))return;
  if(/italic/.test(getComputedStyle(el).fontStyle))return; // bylines and captions stay
  if(el.closest('[class*=ed-latest] b, .ed-lead h3')&&mode==='3')return;
  if(keep(el))return;
  // reading text set in Caslon Text (paragraphs) stays; only titles switch
  if(/Caslon Text/i.test(f)&&!/^(H[1-6]|B|STRONG)$/.test(el.tagName)&&!el.matches('.recv b,.pop h3'))return;
  setDM(el)})}
if(mode==='1'){var s=document.createElement('style');s.textContent=".recv b,h1,h2,h3,h4,.qq{font-family:"+DMF+"!important;font-weight:500!important;letter-spacing:-.02em!important}";(document.head||document.documentElement).appendChild(s);
 fix=function(){document.querySelectorAll('body *').forEach(function(el){if(/Caslon Display/i.test(getComputedStyle(el).fontFamily))setDM(el)})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){fix();setTimeout(fix,600)});else{fix();setTimeout(fix,600)}
setInterval(fix,1500);
})();
