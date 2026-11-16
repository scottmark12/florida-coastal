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
css_m+=('html body .cmap .cm-sub{margin:18px 0 0;font-size:18px;line-height:1.5;color:#3E4F52;max-width:380px}'
 'html body .cmap .cm-l .cm-link{margin-top:26px!important;display:inline-block}'
 'html body .cmap .cm-vb span:nth-child(n+3){display:none!important}'
 '@media (max-width:760px){html body .cmap .cm-sub{font-size:16px;margin-top:14px}html body .cmap .cm-l .cm-link{margin-top:18px!important}'
 'html body .cmap .cm-more{display:none!important}html body .cmap .cm-st>div:nth-child(2){display:none!important}}')
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
