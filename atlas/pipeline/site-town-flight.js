async function prepareRevealView(root) {
  const current=document.querySelector('.fs-rv,.fs-rvp .fs-map')?.querySelector('.dot.hot')?.getAttribute('data-id');
  const world=document.createElement('div');
  world.className='flight-world';
  world.style.cssText='position:absolute;inset:0;overflow:visible;pointer-events:none';
  const point=(lon,lat)=>[PAD+(lon-LON0)*COS*K,PAD+(LAT0-lat)*K];
  const outline=rings=>rings.map(ring=>'M'+ring.map(p=>point(...p).join(' ')).join('L')+'Z').join('');
  const coast=outline(COAST_FL),neighbors=outline(COAST_NB),size=mapSize();
  world.innerHTML=`<svg viewBox="0 0 ${size.w} ${size.h}" role="img" aria-label="Travel between towns"><path d="${neighbors}" fill="#FBF6EA"/><path d="${coast}" fill="none" stroke="#C5E5E5" stroke-width="20"/><path d="${coast}" fill="none" stroke="#E7F5F4" stroke-width="10"/><path class="fl-land" d="${coast}" fill="#FBF6EA"/>${T.map(town=>{const p=point(town.lon,town.lat);return `<circle class="dot ${town.id===current?'hot':''}" data-id="${town.id}" cx="${p[0]}" cy="${p[1]}" r="1"/>`}).join('')}</svg>`;
  world.querySelector('svg').style.cssText='width:100%;height:100%;display:block';
  root.querySelector('.fs-map').appendChild(world);
  const images = [...root.querySelectorAll('.lnd img,.rv-card .ph img,.rvp-hero img')];
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
  const baseScale = Math.max(.01,Math.hypot(delta.x,delta.y)/Math.max(1,km));
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
  const nativeScale=svg.getScreenCTM().a;
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
    const progress=Math.min(1,(now-started)/duration),index=progress*120;
    const a=regional[Math.floor(index)],b=regional[Math.min(120,Math.floor(index)+1)];
    svg.setAttribute('viewBox',a.map((v,i)=>mix(v,b[i],index%1)).join(' '));
    if(progress<1)requestAnimationFrame(tick);else done();
  };
  const deadline=setTimeout(done,duration+400);
  tick(started);
  return duration;
}
