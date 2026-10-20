from pathlib import Path
p=Path('work/atlas_regions/app.js');s=p.read_text()
s=s.replace("$('#card').hidden=false", "$('#card').hidden=false;document.body.classList.add('card-open')")
s=s.replace("$('#card').hidden=true;selectedDistrict=null", "$('#card').hidden=true;document.body.classList.remove('card-open');selectedDistrict=null")
# A visible compact control exits the card and restores the full controls.
s=s.replace("$('#card-close').onclick=", "const slim=document.createElement('button');slim.id='controls-slim';slim.textContent='Map controls · change district';slim.onclick=()=>$('#card-close').click();$('#controls').prepend(slim);\n$('#card-close').onclick=")
s=s.replace("if(palette[m.name])m.color.set(palette[m.name]);", "if(palette[m.name])m.color.set(palette[m.name]);if(/Homes/.test(o.name+' '+o.parent?.name)){m.flatShading=true;m.roughness=.92;}")
p.write_text(s)
p=Path('work/30a_art/style.css');p.write_text(p.read_text()+'''\n#controls-slim{display:none}\n@media(max-width:699px){body.card-open #controls{bottom:32px!important;top:auto!important;left:10px;right:10px;width:auto;height:42px;max-height:42px!important;padding:0;overflow:hidden}body.card-open #controls>*{display:none!important}body.card-open #controls>#controls-slim{display:block!important;width:100%;height:42px;text-align:left;padding:8px 14px;border:0}body.card-open #card{bottom:84px;left:10px;right:10px;width:auto;max-height:235px;overflow:auto;padding:14px}body.card-open #card h2{margin-bottom:5px}body.card-open #card-copy{font-size:12px;line-height:1.4;margin:7px 0}body.card-open #card-price{font-size:10px;margin:6px 0;padding-top:6px}}\n''')
