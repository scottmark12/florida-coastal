import re,subprocess,sys
sys.path.insert(0,'/home/claude/perf'); import hero
out=open('new.nostyle.html').read()
css=open('fonts.inline.css').read()+'\n'+open('purged.css').read()+'\n'+hero.css()
open('all.css','w').write(css)
mini=subprocess.run(['node','-e',"const C=require('clean-css');const fs=require('fs');const r=new C({level:1}).minify(fs.readFileSync('all.css','utf8'));if(r.errors.length)console.error(r.errors);process.stdout.write(r.styles)"],capture_output=True,text=True,cwd='/home/claude/perf')
assert mini.returncode==0, mini.stderr
css_m=mini.stdout
dead=re.compile(r'dk-hero|vhero|\.hq|\.hb-|\.hn-|hero-note|dk-l\b|dk-eyebrow')
def keep(m):
    sels=m.group(1)
    parts=[x for x in sels.split(',') if not dead.search(x)]
    return (','.join(parts)+'{'+m.group(2)+'}') if parts else ''
before=len(css_m)
for _ in range(2):
    css_m=re.sub(r'([^{}@]+)\{([^{}]*)\}',keep,css_m)
    css_m=re.sub(r'@media[^{]*\{\s*\}','',css_m)
print('dead rules removed',before,'->',len(css_m))
css_m+=('html body .cmap .cm-steps{list-style:none;margin:22px 0 0;padding:0;counter-reset:s;display:flex;flex-direction:column;gap:16px;max-width:400px}'
 'html body .cmap .cm-steps li{counter-increment:s;position:relative;padding-left:40px;font-size:16px;line-height:1.5;color:#3E4F52}'
 'html body .cmap .cm-steps li::before{content:"0" counter(s);position:absolute;left:0;top:2px;font-size:12px;letter-spacing:.14em;font-weight:600;color:#152A2E}'
 'html body .cmap .cm-steps b{display:block;font-weight:500;font-size:18px;color:#152A2E;margin-bottom:2px}'
 'html body .cmap .cm-ctas{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:26px}'
 'html body .cmap .cm-ctas .cm-link{margin:0!important}'
 'html body .cmap .cm-alt{margin-top:18px!important}'
 '@media (max-width:760px){html body .cmap h2{font-size:30px!important}html body .cmap .cm-steps{margin-top:14px;gap:9px}html body .cmap .cm-steps li{font-size:14px;line-height:1.4;padding-left:30px}html body .cmap .cm-steps li::before{top:1px;font-size:11px}html body .cmap .cm-steps b{display:inline;font-size:15.5px;margin:0 4px 0 0}html body .cmap .cm-ctas{margin-top:16px}}'
 '@media (max-width:760px) and (max-height:760px){html body .cmap .cm-lbl{margin-bottom:-4px}html body .cmap h2{font-size:26px!important}html body .cmap .cm-steps{margin-top:10px;gap:6px}html body .cmap .cm-steps li{font-size:13px;line-height:1.35}html body .cmap .cm-steps b{font-size:14.5px}html body .cmap .cm-ctas{margin-top:10px}html body .cmap .cm-ctas a+a{display:none}}'
 '@media (max-width:760px) and (max-height:620px){html body .cmap .cm-steps li span{display:none}html body .cmap .cm-steps{gap:4px}html body .cmap .cm-ctas{display:none}}')
css_m+='html body.pl main>section.news:not(#a):not(#b):not(#c):not(#d):not(#e){background-image:none!important}'
style='<style id="fc-home">'+css_m+'</style>'
anchor='<script type="application/ld+json">'
assert out.count(anchor)==1
out=out.replace(anchor,style+anchor)
js='<script id="fh-js">'+hero.js()+'</script>'+open('cmap_js.html').read()+open('pre_js.html').read()
assert out.count('</body>')==1
out=out.replace('</body>',js+'\n</body>')
assert out.count('<body data-v=')==1
out=out.replace('<body data-v=','<body class="pl" data-v=')
out=out.replace('addEventListener("load",function(){setTimeout(function(){var h=document.head;','addEventListener("load",function(){document.body.classList.remove("pl");setTimeout(function(){var h=document.head;')
open('/home/claude/florida-coastal/index.html','w').write(out)
import gzip
print('html',len(out),'gz',len(gzip.compress(out.encode())),'css',len(mini.stdout))
