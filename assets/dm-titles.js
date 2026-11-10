// Preview toggle: ?dm=1 swaps every serif title to DM Sans like the live site, ?dm=0 switches back. Remembered for this tab.
(function(){var q=new URLSearchParams(location.search).get('dm');try{if(q==='1')sessionStorage.setItem('fcdm','1');if(q==='0')sessionStorage.removeItem('fcdm');if(sessionStorage.getItem('fcdm')!=='1')return}catch(e){if(q!=='1')return}
var s=document.createElement('style');s.textContent=".recv b,h1,h2,h3,h4,.qq,.qin h1,.qr h1,.qhero h2,.qsl h3,.ar2 h3,.bl h3,.nb h3,.sec h2,.card h3,.band h2,#short h2,.pn h1,[class*=title],[class*=-h] {font-family:'DM Sans',system-ui,sans-serif!important;font-weight:500!important;letter-spacing:-.02em!important}"+
"*{--display:'DM Sans',system-ui,sans-serif}";
(document.head||document.documentElement).appendChild(s);
new MutationObserver(function(){}).observe(document.documentElement,{childList:true});
// catch any other element still set in Caslon Display
function fix(){document.querySelectorAll('body *').forEach(function(el){var f=getComputedStyle(el).fontFamily;if(/Caslon Display/i.test(f)){el.style.setProperty('font-family',"'DM Sans',system-ui,sans-serif",'important');el.style.setProperty('font-weight','500','important');el.style.setProperty('letter-spacing','-.02em','important')}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){fix();setTimeout(fix,600)});else{fix();setTimeout(fix,600)}
setInterval(fix,1500);})();
