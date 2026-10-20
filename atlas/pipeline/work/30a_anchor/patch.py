from pathlib import Path
p=Path('work/atlas_regions/app.js');s=p.read_text()
s=s.replace("mobile=matchMedia('(max-width:650px)').matches","mobile=matchMedia('(max-width:699px)').matches")
s=s.replace("const mapHeight=mobile&&isThirty()&&level==='region'?Math.round(innerWidth*.72):innerHeight;","const mapHeight=innerHeight;")
s=s.replace("target.set(mobile?-203:-199,0,-708);span=48", "target.set(innerWidth<700?-204:-199,0,innerWidth<700?-705:-708);span=innerWidth<700?32:48")
a=s.index('function label(text,');b=s.index('\nfunction makeLabels()',a)
s=s[:a]+'''function label(text,x,y,kind,onClick,priority=1){
 const b=document.createElement('button');b.className='map-label '+kind;b.textContent=text;b.onclick=onClick;$('#labels').append(b);
 const leader=document.createElementNS('http://www.w3.org/2000/svg','line');leader.setAttribute('stroke','#8a927a');leader.setAttribute('stroke-width','1');$('#leaders').append(leader);
 let anchor=null,d=null;if(isThirty()&&level==='region'&&kind==='district-label'){
  d=districts.find(d=>d.name===text&&d.town==='30a');if(d){anchor=document.createElement('button');anchor.className='district-anchor';anchor.setAttribute('aria-label','Explore '+text);anchor.dataset.district=d.id;anchor.innerHTML=districtGlyph(d).split('<span>')[0];anchor.onclick=()=>flyToDistrict(d);$('#labels').append(anchor);b.onclick=anchor.onclick;}
 }
 labels.push({b,x,y,priority,leader,anchor,d});
}'''+s[b:]
a=s.index('function placeDistrictArt(){');b=s.index('\nfunction illustrateThirty',a)
s=s[:a]+'''function placeDistrictArt(){
 if(!isThirty()||level!=='region')return;
 const mapRect=renderer.domElement.getBoundingClientRect(),header=$('header').getBoundingClientRect(),controls=$('#controls').getBoundingClientRect();
 const ls=labels.filter(l=>l.anchor).sort((a,b)=>a.x-b.x),used=[];
 const ranks={seaside:100,alys:95,rosemary:90,grayton:85,'dune-allen':80,'inlet-beach':75,watercolor:70,'blue-mountain-beach':65,watersound:60,seagrove:55,seacrest:50,'santa-rosa-beach':45};
 ls.forEach((l,i)=>{const p=new THREE.Vector3(l.x,.004,-l.y).project(camera);l.ax=mapRect.left+(p.x*.5+.5)*mapRect.width;l.ay=mapRect.top+(-p.y*.5+.5)*mapRect.height;l.side=i%2?-1:1;
  l.anchor.classList.toggle('coast-dot',innerWidth<700);l.anchor.style.left=l.ax+'px';l.anchor.style.top=l.ay+'px';l.anchor.dataset.screenX=l.ax;l.anchor.dataset.screenY=l.ay;l.anchor.dataset.worldX=l.x;l.anchor.dataset.worldY=l.y;
  l.anchor.style.visibility=p.z<=1&&l.ax>=0&&l.ax<=innerWidth&&l.ay>=0&&l.ay<=innerHeight?'visible':'hidden';l.b.style.visibility='hidden';l.leader.style.display='none';
 });
 for(const l of [...ls].sort((a,b)=>(ranks[b.d.id]||0)-(ranks[a.d.id]||0))){
  if(l.anchor.style.visibility==='hidden')continue;const w=l.b.offsetWidth,h=l.b.offsetHeight;const x=l.ax,y=l.ay+l.side*(innerWidth<700?28:34),box={left:x-w/2,right:x+w/2,top:y-h/2,bottom:y+h/2};
  const collides=q=>!(box.right+5<q.left||box.left-5>q.right||box.bottom+4<q.top||box.top-4>q.bottom);
  if(box.left<5||box.right>innerWidth-5||box.top<5||box.bottom>innerHeight-26||collides(header)||collides(controls)||used.some(collides))continue;
  l.b.style.left=x+'px';l.b.style.top=y+'px';l.b.style.visibility='visible';used.push(box);
  const endY=y-l.side*h/2;l.leader.setAttribute('x1',l.ax);l.leader.setAttribute('y1',l.ay);l.leader.setAttribute('x2',x);l.leader.setAttribute('y2',endY);l.leader.dataset.length=Math.abs(endY-l.ay);l.leader.style.display='block';
 }
}
let pendingFlight=null;
function flyToDistrict(d){pendingFlight={target:target.clone(),span,position:camera.position.clone(),left:camera.left,right:camera.right,top:camera.top,bottom:camera.bottom};weights.airport=0;openDistrict(d)}
function animateFlight(from,token){
 const to={target:target.clone(),span,position:camera.position.clone(),left:camera.left,right:camera.right,top:camera.top,bottom:camera.bottom};const start=performance.now();document.body.dataset.flying='true';
 function frame(now){if(token!==packageToken){document.body.dataset.flying='false';return}const t=Math.min(1,(now-start)/650),e=t*t*(3-2*t);target.lerpVectors(from.target,to.target,e);span=THREE.MathUtils.lerp(from.span,to.span,e);camera.position.lerpVectors(from.position,to.position,e);for(const k of ['left','right','top','bottom'])camera[k]=THREE.MathUtils.lerp(from[k],to[k],e);camera.lookAt(target);camera.updateProjectionMatrix();render();if(t<1)requestAnimationFrame(frame);else{document.body.dataset.flying='false';setCamera();render()}}
 requestAnimationFrame(frame);
}
'''+s[b:]
s=s.replace('const token=++packageToken;', 'const token=++packageToken,flight=pendingFlight;pendingFlight=null;')
s=s.replace("makeLabels();highlight();render();document.body.dataset.ready", "makeLabels();highlight();if(flight)animateFlight(flight,token);else render();document.body.dataset.ready")
# Suppress map building instances as well as the anchored glyphs at phone Region zoom.
s=s.replace('o.count=count;o.instanceMatrix.needsUpdate=true;', "o.count=isThirty()&&level==='region'&&innerWidth<700?0:count;o.instanceMatrix.needsUpdate=true;")
p.write_text(s)
