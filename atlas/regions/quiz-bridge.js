/* Include after Florida Coastal's existing app script, beside the atlas iframe.
   Uses the live quiz's ranking function; does not duplicate its scoring. */
(function(){
 function publish(){
  if(typeof rankedTowns!=='function'||typeof S==='undefined')return;
  const payload={top5:rankedTowns().slice(0,5).map(t=>({id:t.id})),weights:{...S.w}};
  window.dispatchEvent(new CustomEvent('floridacoastal:results',{detail:payload}));
  const frame=document.querySelector('iframe[data-florida-coastal-atlas]');
  if(frame?.contentWindow){const origin=new URL(frame.src,location.href).origin;frame.contentWindow.postMessage({type:'floridacoastal:results',payload},origin)}
 }
 window.addEventListener('hashchange',publish);
 window.addEventListener('floridacoastal:quiz-updated',publish);
 window.addEventListener('load',publish);
 document.querySelector('iframe[data-florida-coastal-atlas]')?.addEventListener('load',publish);
 document.addEventListener('change',()=>queueMicrotask(publish));
 document.addEventListener('click',()=>queueMicrotask(publish));
 window.exportFloridaCoastalMapMatches=function(){
  if(typeof rankedTowns!=='function'||typeof S==='undefined')return;
  const payload={top5:rankedTowns().slice(0,5).map(t=>({id:t.id})),weights:{...S.w}};
  const url=URL.createObjectURL(new Blob([JSON.stringify(payload)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='florida-coastal-matches.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
})();
