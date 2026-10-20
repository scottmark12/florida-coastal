const FLIGHT_MAP={"desktop":"img/atlas/flight-regions.webp?v=d40751de9f","mobile":"img/atlas/flight-regions-m.webp?v=733d9e8500","bounds":[-425.188847735177,-742.9916716839022,558.5359493042099,226.6666331151739],"towns":{"30a":[-205.33973846763203,-497.2413052606578],"dunedin":[118.52465669123623,-315.2005027495337],"clearwaterbeach":[114.97532158970833,-312.40658491166175],"gulfport":[126.95377094961746,-293.61217260833354],"ami":[125.13016793495929,-277.71497136270335],"longboat":[133.36442117705857,-267.1517968023523],"apollo-beach":[155.6928547200065,-298.1671112402987],"clearwater":[117.52061525388183,-311.62273609585554],"indian-rocks-beach":[113.30330435526676,-306.1862913883372],"madeira-beach":[119.7589943445045,-297.3188816122514],"new-port-richey":[125.22170561625978,-334.02222791345497],"ruskin":[153.04679451629025,-290.45569942099337],"safety-harbor":[129.05307990615043,-313.60268861313966],"st-pete-beach":[124.25104700442442,-291.4340888543139],"st-petersburg":[134.5017064568625,-296.47078340621255],"sun-city-center":[162.225478598969,-292.2674921064501],"tampa":[151.01290613592246,-310.4870825096993],"tarpon-springs":[121.48744781079378,-326.4088575915796],"treasure-island":[120.56636741542025,-296.2674409133483],"bradenton":[141.31539722314756,-275.10313380767855],"bradenton-beach":[128.6198991401283,-272.33925598053673],"cortez":[129.66469492071693,-272.364438950335],"englewood":[162.20557588146886,-232.6659308897244],"sarasota":[143.3482648377456,-262.2454809462915],"siesta-key":[143.0583116676493,-256.8275723830206],"venice":[152.42927355363904,-243.78548272605602],"miami":[381.9260525560732,-143.41746781499154],"southbeach":[387.5553211373281,-143.81117607351865],"naples":[219.20149873296256,-168.54807738447045],"marco-island":[225.7409071565093,-154.17220270105844],"everglades-city":[261.47356183591376,-147.63284967572454],"chokoloskee":[264.05906097637387,-143.88968853254846],"pensacola":[-308.49336690182474,-505.41070012946017],"jacksonville":[224.793824950257,-497.4753082884472],"pensacola-beach":[-301.84537297204264,-499.5725101037233],"panama-city":[-160.05587894793337,-483.6188017858642],"pcb":[-180.5019253030766,-488.740914277758],"destin":[-240.86926101452974,-503.56993607696745],"port-st-joe":[-126.14598448763898,-456.65516773765785],"apalachicola":[-94.97975249638793,-449.81310736567184],"st-george-island":[-83.3841326707911,-444.602604324769],"carrabelle":[-64.07756438425336,-459.0164454900419],"st-marks":[-20.08162685130476,-482.8108796753313],"st-teresa":[-42.94834463020165,-465.4254516680304],"mexico-beach":[-137.2673548965128,-467.6438416096074],"cedarkey":[94.18752446456139,-403.21464232055644],"crystal-river":[136.72462604043787,-384.79829546315545],"homosassa":[134.374020137449,-376.0074009111028],"ozello":[130.8787484903484,-379.0512280224976],"steinhatchee":[59.11207863203964,-444.93617131666747],"perdido-key":[-327.98161625315595,-497.63689789600494],"gulf-breeze":[-304.82969044462965,-501.36390792885067],"navarre":[-274.9336851699442,-504.5398334788732],"navarre-beach":[-274.9112888501443,-502.86048682345194],"fort-walton-beach":[-250.2457191945155,-504.31779607658723],"okaloosa-island":[-248.90091837445502,-503.54029054968936],"mary-esther":[-255.89816948533465,-505.0921949741585],"shalimar":[-247.08713089050204,-506.6835982646152],"niceville":[-238.58153302486048,-513.2832407743243],"valparaiso":[-238.60896414629053,-512.4382735215427],"miramar-beach":[-229.21578062657323,-502.1008554449785],"freeport":[-205.0120305224914,-511.40557489448423],"keaton-beach":[39.15604051951193,-456.67936110138277],"horseshoe-beach":[68.45093493437354,-427.01268269747663],"suwannee":[82.950284295743,-418.23374422101],"yankeetown":[124.8409109727234,-395.1516610620551],"inglis":[129.39577347575997,-394.8000194061598],"hernando-beach":[131.25457997854875,-353.29849955645835],"weeki-wachee":[139.21750358334276,-354.98900352623866],"aripeka":[130.3400213373642,-348.30941547842446],"oldsmar":[130.5604578173398,-316.7958388044466],"palm-harbor":[120.55360524328151,-320.42251117021743],"belleair-beach":[113.8347686458046,-307.6262752801656],"indian-shores":[113.53497466273747,-302.7510390326907],"redington-shores":[114.53495193754456,-301.1914278840166],"north-redington-beach":[115.85934660633794,-299.78836349775645],"redington-beach":[116.80487046208214,-299.2062606775082],"tierra-verde":[126.04477973998121,-290.02014347851235],"holiday":[118.88568081346217,-327.95600922153335],"port-richey":[124.851557368493,-335.8650206764736],"hudson":[126.13669574670934,-342.6991009704342],"gibsonton":[158.63969100855115,-303.61968084318534],"captiva":[180.1324943840106,-198.70371787257054],"matlacha":[191.71658637934416,-207.28848335112437],"keywest":[222.53561478025637,-44.869423075808804],"islamorada":[340.1498561565159,-75.66470195520012],"ftl":[384.995689269526,-170.65495275190426],"delray":[391.66299635514684,-197.5165540501949],"jupiter":[388.203555992862,-235.61664449102392],"fortpierce":[362.5977106825433,-274.72675561506173],"cocoa":[332.3844751273711,-345.92665379960357],"nsb":[301.60815047236764,-397.8231006096802],"daytona":[290.5596367572123,-412.68939427669994],"flagler":[278.2756751536275,-432.3330157755401],"staug":[259.22213449434486,-464.40767222549283],"jaxbeach":[250.99042445845237,-495.77029348199113],"fernandina":[242.618208953997,-525.3225213410755],"bonita-springs":[221.33577763040137,-184.87629606168153],"cape-coral":[204.4658658586557,-202.15690711900166],"fort-myers":[211.43296123482136,-208.36823435083437],"fort-myers-beach":[204.24597946371452,-193.47591554688202],"port-charlotte":[189.16149821411827,-234.45504732802107],"punta-gorda":[193.14039987092454,-231.27844706740512],"sanibel-island":[196.86915412132367,-193.15084307720616],"key-largo":[357.9793170003936,-88.83332142930098],"bal-harbour":[387.43461726108495,-152.60957687960533],"boca-raton":[389.98123130785234,-188.97478334173334],"dania-beach":[388.3237198273766,-165.5393929188761],"hallandale":[387.9751665017277,-159.81609205132398],"highland-beach":[391.77625163732915,-192.573087302866],"hollywood":[388.1697474823762,-162.75222359615728],"lauderdale-by-the-sea":[389.435725537822,-176.2277733453104],"lighthouse-point":[390.05559355800153,-182.8064700034571],"north-miami-beach":[383.73598261727057,-155.77675659991257],"north-palm-beach":[390.45372518574237,-226.15081578318222],"palm-beach":[393.61536071845546,-216.65364228797068],"palm-beach-gardens":[383.03068571675686,-225.66645001043958],"riviera-beach":[393.19411196310284,-222.88381094792385],"sunny-isles-beach":[387.7710218869736,-156.6151737968205],"west-palm-beach":[392.00351633575,-217.22241490615758],"wilton-manors":[385.3070243984384,-173.64960537240853],"jensen-beach":[372.4361597262599,-259.50382494086455],"port-st-lucie":[363.5798205165681,-260.7064049165597],"sebastian":[347.58590557413316,-302.3192534982117],"stuart":[370.0269413556462,-255.0959674897952],"vero-beach":[358.8740004156034,-290.07989210251185],"indialantic":[336.66744712612467,-324.44674547354794],"melbourne-beach":[336.9020822801977,-322.4689509774738],"palm-bay":[335.4666860555751,-320.24002790693027],"satellite-beach":[334.37292933181163,-330.21882600819947],"titusville":[311.82544430674744,-364.8682554005236],"west-melbourne":[326.40828863992806,-322.7074784077207],"atlantic-beach":[249.51675245942,-498.58543210302304],"neptune-beach":[250.19626801273134,-498.16634509751094],"ponte-vedra-beach":[251.89679752364893,-491.7605106476577],"st-augustine-beach":[263.88698065080916,-461.71184768640774],"daytona-beach-shores":[292.75898837331425,-409.02149926420833],"ormond-beach":[286.24424480082456,-417.482905442158],"palm-coast":[271.71156009943377,-439.32366785434925],"port-orange":[292.42618750049826,-406.5309449530975],"south-daytona":[291.0823699725185,-408.6072906531309],"boynton-beach":[392.3100468024864,-202.6067812353895],"lake-worth-beach":[392.78669573241655,-209.40153146240382],"juno-beach":[391.0084390225141,-231.33905601401304],"tequesta":[386.757284970501,-236.47821269605407],"lantana":[392.77666941896763,-207.1090344549806],"lake-park":[391.64509799598596,-223.89787341248038],"palm-beach-shores":[393.41178817642077,-222.34334351823676],"hobe-sound":[383.1682090452197,-244.42380329511064],"port-salerno":[376.27763026683493,-251.18197014005034],"palm-city":[368.3772228130155,-253.38723284999486],"sewalls-point":[375.43664236523637,-255.04115354697356],"indian-river-shores":[356.38257221597974,-294.92831832372894],"hutchinson-island":[375.7621374096243,-259.45009903700355],"melbourne":[333.4300631959997,-323.276003457096],"cape-canaveral":[333.05522827480706,-349.010084549435],"merritt-island":[325.06392443209523,-345.2415260982871],"rockledge":[321.68581775483955,-342.4148623587175],"cocoa-village":[320.4159743068313,-344.64179093834025],"indian-harbour-beach":[333.5799512057735,-328.37061069376176],"ponce-inlet":[298.4996824074873,-401.2987756072546],"edgewater":[301.07190011796416,-394.48883147794515],"holly-hill":[288.42773725567145,-412.9583213131014],"ormond-by-the-sea":[285.1821517554625,-420.76410514290006],"beverly-beach":[276.3553713317534,-435.01389956809976],"vilano-beach":[260.42346044796477,-466.3243151891276],"crescent-beach":[265.24839916994614,-454.80063966845444]}};
const flightMapImages=new Map();
function flightMapTexture(){
 const path=window.innerWidth<700?FLIGHT_MAP.mobile:FLIGHT_MAP.desktop;
 if(!flightMapImages.has(path)){const image=new Image();image.src=path;flightMapImages.set(path,image);}
 return flightMapImages.get(path);
}
if(location.pathname.endsWith('/find-your-mile.html')){
 if(window.requestIdleCallback)requestIdleCallback(()=>flightMapTexture(),{timeout:1500});else setTimeout(()=>flightMapTexture(),1000);
}
async function prepareRevealView(root) {
  const current=document.querySelector('.fs-rv,.fs-rvp .fs-map')?.querySelector('.dot.hot')?.getAttribute('data-id');
  const world=document.createElement('div');
  world.className='flight-world';
  world.style.cssText='position:absolute;inset:0;overflow:visible;pointer-events:none';
  const texture=flightMapTexture(),b=FLIGHT_MAP.bounds;
  const point=town=>FLIGHT_MAP.towns[town.id];
  world.innerHTML=`<svg viewBox="${b[0]} ${b[1]} ${b[2]-b[0]} ${b[3]-b[1]}" role="img" aria-label="Illustrated regional atlas, travel between towns"><image href="${texture.src}" x="${b[0]}" y="${b[1]}" width="${b[2]-b[0]}" height="${b[3]-b[1]}" preserveAspectRatio="none"/>${T.filter(town=>point(town)).map(town=>{const p=point(town);return `<circle class="dot ${town.id===current?'hot':''}" data-id="${town.id}" cx="${p[0]}" cy="${p[1]}" r="0.01"/>`}).join('')}</svg>`;
  world.querySelector('svg').style.cssText='width:100%;height:100%;display:block';
  root.querySelector('.fs-map').appendChild(world);
  const images = [texture,...root.querySelectorAll('.lnd img,.rv-card .ph img,.rvp-hero img')];
  for(const illustrated of root.querySelectorAll('.illus-img')) {
    const image=new Image();image.src=illustrated.getAttribute('href');images.push(image);
  }
  const decoded = images.map(image => {
    if (image.complete && image.naturalWidth) return Promise.resolve();
    if (image.decode) return image.decode().catch(() => {});
    return new Promise(resolve => {
      image.addEventListener('load', resolve, {once:true});
      image.addEventListener('error', resolve, {once:true});
    });
  });
  let deadline;
  await Promise.race([
    Promise.all(decoded),
    new Promise(resolve => { deadline = setTimeout(resolve, 4000); })
  ]);
  clearTimeout(deadline);
  const aerial = root.querySelector('.lnd img');
  if (aerial && (!aerial.complete || !aerial.naturalWidth)) aerial.closest('.lnd').remove();
}
// Town textures and the regional SVG follow one virtual camera in screen/world
// coordinates. Scale changes exponentially, so lift-off and landing feel like a
// continuous change of altitude rather than a full-screen image dissolve.
// Town textures and the regional SVG follow one virtual camera in screen/world
// coordinates. Scale changes exponentially, so lift-off and landing feel like a
// continuous change of altitude rather than a full-screen image dissolve.
// Town textures and the regional SVG follow one virtual camera in screen/world
// coordinates. Scale changes exponentially, so lift-off and landing feel like a
// continuous change of altitude rather than a full-screen image dissolve.
// Town textures and the regional SVG follow one virtual camera in screen/world
// coordinates. Scale changes exponentially, so lift-off and landing feel like a
// continuous change of altitude rather than a full-screen image dissolve.
// Town textures and the regional SVG follow one virtual camera in screen/world
// coordinates. Scale changes exponentially, so lift-off and landing feel like a
// continuous change of altitude rather than a full-screen image dissolve.
// Town textures and the regional SVG follow one virtual camera in screen/world
// coordinates. Scale changes exponentially, so lift-off and landing feel like a
// continuous change of altitude rather than a full-screen image dissolve.
// Town textures and the regional SVG follow one virtual camera in screen/world
// coordinates. Scale changes exponentially, so lift-off and landing feel like a
// continuous change of altitude rather than a full-screen image dissolve.
function flyTo(id, finished, destination) {
  const root = document.querySelector('.fs-rv,.fs-rvp');
  if (!root) return 0;
  const map = root.querySelector('.fs-map');
  const original = [...map.querySelectorAll('svg')].find(node => node.getBoundingClientRect().width > 0);
  const world = destination?.querySelector('.flight-world')?.cloneNode(true);
  if(world)map.insertBefore(world,map.firstChild);
  const svg = world?.querySelector('svg') || original;
  if(world&&original)original.style.visibility='hidden';
  if (!svg || !svg.animate) return 0;
  const from = svg.querySelector('.dot.hot');
  const to = svg.querySelector(`.dot[data-id="${id}"]`);
  if (!from || !to) return 0;
  const a = from.getBoundingClientRect(), b = to.getBoundingClientRect(), bounds = svg.getBoundingClientRect();
  const source = {x:a.left+a.width/2,y:a.top+a.height/2};
  const delta = {x:b.left+b.width/2-source.x,y:b.top+b.height/2-source.y};
  const fromTown = T.find(town => town.id === from.getAttribute('data-id'));
  const toTown = T.find(town => town.id === id);
  const km = fromTown && toTown ? Math.hypot((toTown.lon-fromTown.lon)*111.32*Math.cos((toTown.lat+fromTown.lat)*Math.PI/360),(toTown.lat-fromTown.lat)*110.57) : 100;
  const nativeScale=svg.getScreenCTM().a;
  const baseScale=nativeScale;
  const oldAerial = map.querySelector('.lnd');
  const nextAerial = destination && destination.querySelector('.fs-map .lnd');
  let incoming;
  if (nextAerial) {
    incoming = nextAerial.cloneNode(true);
    incoming.classList.add('flight-layer');
    incoming.setAttribute('aria-hidden','true');
    incoming.style.opacity='0';
    map.appendChild(incoming);
  }
  // Measure the incoming texture after attachment: detached DOM has no layout.
  const texture = (node, townId) => {
    if (!node) return {node:null,center:source,scale:baseScale};
    const rect=node.getBoundingClientRect(),box=node.querySelector('.lnd-box').getBoundingClientRect();
    const entry=LANDING[townId],close=!!S.lndClose&&entry&&entry.chw;
    const half=entry ? close ? node.classList.contains('m')?entry.cmhw:entry.chw : node.classList.contains('m')?entry.mhw:entry.hw : 2.5;
    const center={x:box.left+box.width/2,y:box.top+box.height/2};
    node.style.transformOrigin=`${center.x-rect.left}px ${center.y-rect.top}px`;
    return {node,center,scale:box.width/(2*half)};
  };
  const departure=texture(oldAerial,fromTown?.id),arrival=texture(incoming,id);
  const startScale=departure.scale,endScale=arrival.scale;
  const viewport=map.getBoundingClientRect();
  const cruise=Math.min(Math.min(startScale,endScale)*.12,Math.min(viewport.width,viewport.height)*.64/(km+45));
  const duration=Math.round(Math.min(4600,3000+km*2.5));
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
  const mix=(a,b,t)=>a+(b-a)*t;
  const exponential=(a,b,t)=>Math.exp(mix(Math.log(a),Math.log(b),t));
  const regional=[],outgoing=[],entering=[];
  const rawFrom={x:Number(from.getAttribute('cx')),y:Number(from.getAttribute('cy'))};
  const rawTo={x:Number(to.getAttribute('cx')),y:Number(to.getAttribute('cy'))};
  for(let i=0;i<=120;i++) {
    const time=i/120,travel=smooth((time-.17)/.66);
    const scale=time<.42?exponential(startScale,cruise,smooth(time/.42)):time>.58?exponential(cruise,endScale,smooth((time-.58)/.42)):cruise;
    const anchor={x:mix(departure.center.x,arrival.center.x,travel),y:mix(departure.center.y,arrival.center.y,travel)};
    const camera={x:delta.x/baseScale*travel,y:delta.y/baseScale*travel};
    const oldPosition={x:anchor.x-camera.x*scale,y:anchor.y-camera.y*scale};
    const newPosition={x:anchor.x+(delta.x/baseScale-camera.x)*scale,y:anchor.y+(delta.y/baseScale-camera.y)*scale};
    const pixelsPerUnit=scale/baseScale*nativeScale;
    regional.push([mix(rawFrom.x,rawTo.x,travel)-(anchor.x-viewport.left)/pixelsPerUnit,mix(rawFrom.y,rawTo.y,travel)-(anchor.y-viewport.top)/pixelsPerUnit,viewport.width/pixelsPerUnit,viewport.height/pixelsPerUnit]);
    const oldScale=scale/startScale,newScale=scale/endScale;
    outgoing.push({'--flight-edge':`${60+40*Math.min(1,oldScale)}%`,offset:time,opacity:time<.5?smooth((oldScale-.055)/.32):0,transform:`translate(${oldPosition.x-departure.center.x}px,${oldPosition.y-departure.center.y}px) scale(${oldScale})`});
    entering.push({'--flight-edge':`${60+40*Math.min(1,newScale)}%`,offset:time,opacity:time>.5?smooth((newScale-.055)/.32):0,transform:`translate(${newPosition.x-arrival.center.x}px,${newPosition.y-arrival.center.y}px) scale(${newScale})`});
  }
  svg.setAttribute('preserveAspectRatio','none');
  svg.style.overflow='visible';
  if(world)world.querySelectorAll('circle,text,rect').forEach(node=>node.style.visibility='hidden');
  if(world)world.querySelectorAll('path,line').forEach(node=>node.style.vectorEffect='non-scaling-stroke');
  const travelLabel=root.querySelector('.rvp-maplabel');
  if(travelLabel&&fromTown&&toTown)travelLabel.textContent=short(fromTown)+' → '+short(toTown);
  root.classList.add('flying');
  from.classList.add('depart');to.classList.add('arrive');
  to.style.setProperty('--late',Math.round(.7*duration)+'ms');
  const options={duration,easing:'linear',fill:'forwards'};
  departure.node?.animate(outgoing,options);
  arrival.node?.animate(entering,options);
  let complete=false;
  const done=()=>{if(!complete){complete=true;clearTimeout(deadline);finished();}};
  // Changing the viewBox repaints the complete coastline on Safari as well as
  // Chromium. A composited SVG transform can cache only its initial visible crop.
  const started=performance.now();
  const tick=now=>{
    if(complete)return;
    if(!root.isConnected){done();return;}
    const progress=Math.max(0,Math.min(1,(now-started)/duration)),index=progress*120;
    const a=regional[Math.floor(index)],b=regional[Math.min(120,Math.floor(index)+1)];
    svg.setAttribute('viewBox',a.map((v,i)=>mix(v,b[i],index%1)).join(' '));
    if(progress<1)requestAnimationFrame(tick);else done();
  };
  const deadline=setTimeout(done,duration+400);
  tick(started);
  return duration;
}
