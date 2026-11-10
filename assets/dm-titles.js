// Preview title fonts. ?dm=0 Caslon everywhere, ?dm=1 DM Sans everywhere (like the live site),
// ?dm=2 split: tools in DM Sans, stories (town names, articles, our story) in Caslon. Remembered for this tab.
(function(){
var q=new URLSearchParams(location.search).get('dm'),mode='0';
try{if(q!==null)sessionStorage.setItem('fcdm',q);mode=sessionStorage.getItem('fcdm')||'0'}catch(e){mode=q||'0'}
if(mode!=='1'&&mode!=='2')return;
var DM="font-family:'DM Sans',system-ui,sans-serif!important;font-weight:500!important;letter-spacing:-.02em!important";
// Tool titles: questions, page titles, controls, sign up boxes, lead forms
var TOOLS=['.qq','.qin h1','.qr h1','.qsl h3','#short h2','.hero h1','.sec h2','.band h2','.recv b','#h','aside .card h3','.hx-new','.hx-back','.news h2'];
// Home step headlines that work as tools (map, styles, town row)
var HOME_TOOL=['Not ready to move yet','Then get to know','What should home feel like','See the towns others'];
var css=mode==='1'
 ? ".recv b,h1,h2,h3,h4,.qq,[class*=title]{"+DM+"}"
 : TOOLS.join(',')+"{"+DM+"}";
var s=document.createElement('style');s.textContent=css;(document.head||document.documentElement).appendChild(s);
function setDM(el){el.style.setProperty('font-family',"'DM Sans',system-ui,sans-serif",'important');el.style.setProperty('font-weight','500','important');el.style.setProperty('letter-spacing','-.02em','important')}
function fix(){
 if(mode==='1'){document.querySelectorAll('body *').forEach(function(el){if(/Caslon Display/i.test(getComputedStyle(el).fontFamily))setDM(el)});return}
 document.querySelectorAll(TOOLS.join(',')).forEach(setDM);
 document.querySelectorAll('h2').forEach(function(h){var t=h.textContent.trim();if(HOME_TOOL.some(function(p){return t.indexOf(p)===0}))setDM(h)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){fix();setTimeout(fix,600)});else{fix();setTimeout(fix,600)}
setInterval(fix,1500);
})();
