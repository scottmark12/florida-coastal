/* One funnel per attempt. Nov 18 2026 (Mark: "yes, save answers"): answer events also carry the
   chosen option (question key, option index and its title) and quiz_complete carries every final
   answer, so we can see what people want. These go to our own Supabase only; fc-ga.js still sends
   Google nothing but the question number. Never names, emails or free text. */
(function(){
  var attempt,viewed,answered,finished;
  function reset(){attempt=Math.random().toString(36).slice(2,10)+Date.now().toString(36);viewed=new Set();answered=new Set();finished=false;window.__qs=0;}
  function send(event,detail){if(window.FC)window.FC.track(event,JSON.stringify(detail));}
  function clean(a){if(!a||typeof a!=='object')return null;return {k:String(a.k||'').slice(0,24)||null,a:Number.isInteger(a.a)?a.a:null,label:String(a.label||'').slice(0,80)||null};}
  function question(event,step,total,seen,ans){
    if(!Number.isInteger(step)||step<0||step>=total||seen.has(step))return;
    seen.add(step);var d={v:2,attempt:attempt,question:step+1,total:total};
    var c=clean(ans);if(c){d.k=c.k;d.a=c.a;d.label=c.label;}
    send(event,d);
  }
  reset();
  window.FCQuiz={reset:reset,view:function(step,total){question('quiz_question_view',step,total,viewed);},answer:function(step,total,ans){question('quiz_question_answer',step,total,answered,ans);},complete:function(top,answers){
    if(finished)return;finished=true;
    var d={v:2,attempt:attempt};
    if(Array.isArray(answers))d.answers=answers.slice(0,12).map(clean);
    send('quiz_complete',d);
    send('quiz_top5',{v:2,attempt:attempt,top:top.slice(0,5).map(function(t){return {id:t.id,fit:t.fit};})});
  }};
})();
