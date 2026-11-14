/* GA4 runs only on the public production host. Previews and team devices never load Google tags. */
(function () {
  if (window.FCGA) return;
  var primary='G-TK3LC2KYBN', ids=[primary,'G-CGLXM7THVK'];
  var q=new URLSearchParams(location.search).get('team'), team=q==='1';
  try {
    if(q==='1')localStorage.setItem('fc-team','1');
    if(q==='0')localStorage.removeItem('fc-team');
    if(q!=='0')team=team||localStorage.getItem('fc-team')==='1';
  } catch(e) {}
  if(q==='1'||q==='0')document.cookie='fc_team='+(q==='1'?'1':'0')+'; domain=.floridacoastal.co; path=/; SameSite=Lax; max-age='+(q==='1'?'31536000':'0')+'; Secure';
  if(q!=='0')team=team||/(^|; )fc_team=1/.test(document.cookie);
  var bot=/bot\b|bot\/|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|facebookexternalhit|facebookcatalog|meta-externalagent|embedly|whatsapp|telegram|discord|skypeuripreview|vkshare|pinterest|google-inspectiontool|googleother|mediapartners|yandex|baidu|semrush|ahrefs|petal|bytespider|chatgpt-user|oai-searchbot|claude|anthropic|perplexity|uptime|pingdom|monitor|statuscake|python|curl|wget|go-http|java\/|node-fetch|axios|okhttp|phantom|puppeteer|playwright|electron/i;
  var live=/^(www\.)?floridacoastal\.co$/.test(location.hostname)&&!team&&!navigator.webdriver&&!bot.test(navigator.userAgent||'');
  ids.forEach(function(id){window['ga-disable-'+id]=!live;});
  window.FCGA={enabled:live,event:function(name,kind){
    if(!live)return;
    var event,params={send_to:primary};
    if(name==='quiz_start'||name==='quiz_complete'){
      event=name;params.quiz_name='town_match';
    }else if(name==='lead'){
      event='generate_lead';
      params.lead_kind=['newsletter','quiz','top5','local','agent','guide','ask'].indexOf(kind)>=0?kind:'other';
    }else return;
    // Never send email, name, phone, free-form messages, answers or Supabase IDs to Google.
    window.gtag('event',event,params);
  }};
  if(!live)return;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag('js',new Date());
  ids.forEach(function(id){window.gtag('config',id);});
  var tag=document.createElement('script');tag.async=true;
  tag.src='https://www.googletagmanager.com/gtag/js?id='+primary;
  document.head.appendChild(tag);
})();
