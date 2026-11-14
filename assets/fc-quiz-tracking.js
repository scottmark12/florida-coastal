/* One funnel per attempt. Question events contain positions, never selected answers. */
(function(){
  var attempt,viewed,answered,finished;
  function reset(){attempt=Math.random().toString(36).slice(2,10)+Date.now().toString(36);viewed=new Set();answered=new Set();finished=false;window.__qs=0;}
  function send(event,detail){if(window.FC)window.FC.track(event,JSON.stringify(detail));}
  function question(event,step,total,seen){
    if(!Number.isInteger(step)||step<0||step>=total||seen.has(step))return;
    seen.add(step);send(event,{v:2,attempt:attempt,question:step+1,total:total});
  }
  reset();
  window.FCQuiz={reset:reset,view:function(step,total){question('quiz_question_view',step,total,viewed);},answer:function(step,total){question('quiz_question_answer',step,total,answered);},complete:function(top){
    if(finished)return;finished=true;
    send('quiz_complete',{v:2,attempt:attempt});
    send('quiz_top5',{v:2,attempt:attempt,top:top.slice(0,5).map(function(t){return {id:t.id,fit:t.fit};})});
  }};
})();
