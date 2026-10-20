from pathlib import Path
p=Path('work/coastal_pipeline/v3/engine.py');s=p.read_text().replace("for width,color in [(.6,'#52b7c5'),(.3,'#65c9cc'),(.12,'#91ded5')]:surf(coast.buffer(width).difference(land),.0002,color)","for z,(width,color) in enumerate([(.45,'#52b7c5'),(.22,'#65c9cc'),(.07,'#91ded5')]):surf(coast.simplify(.003).buffer(width,quad_segs=2).difference(land).simplify(.001),.0002+z*.0003,color)")
s=s.replace("p.buffer(width,cap_style=2)","p.simplify(.001).buffer(width,cap_style=2,join_style=2,quad_segs=1)")
s=s.replace("cover.append(p);surf(p,.003,'#c3cfac')","cover.append(p);surf(p.simplify(.001),.003,'#c3cfac')")
s=s.replace("rgb=[int(color[i:i+2],16)/255 for i in [1,3,5]];mats.append", "rgb=[int(color[i:i+2],16)/255 for i in [1,3,5]];rgb=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb];mats.append")
p.write_text(s)
p=Path('work/coastal_pipeline/v3/viewer.js');s=p.read_text().replace("'#b3b59b',2","'#b3b59b',1.25").replace("'#fff5df',2.4","'#fff5df',1.7")
s=s.replace("function resize(){const w=innerWidth,h=innerHeight;", "function resize(){const w=innerWidth,h=innerHeight;$('#controls').style.bottom=w<700&&!$('#card').hidden?(h-$('#card').getBoundingClientRect().top+10)+'px':'';")
p.write_text(s)
