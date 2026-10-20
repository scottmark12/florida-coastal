from pathlib import Path
import re,subprocess
out=Path('outputs/florida_coastal_atlas');folder=Path('work/florida_atlas/viewer_bundle');html=(out/'explore_coast.html').read_text();script=re.search(r'<script type="module">([\s\S]*?)</script>',html).group(1);(folder/'entry.js').write_text(script)
pnpm='pnpm'
subprocess.run([pnpm,'--dir',str(folder),'exec','esbuild','entry.js','--bundle','--minify','--format=iife','--platform=browser','--outfile=coast.bundle.js'],check=True)
bundle=(folder/'coast.bundle.js').read_text();html=re.sub(r'<script type="importmap">[\s\S]*?</script>','',html);a=html.index('<script type="module">');b=html.index('</script>',a)+len('</script>');html=html[:a]+'<script>'+bundle+'</script>'+html[b:];(out/'explore_coast.html').write_text(html)
(out/'THREE-LICENSE.txt').write_text((folder/'node_modules/three/LICENSE').read_text())
with (out/'README.txt').open('a') as f:f.write('\nEXPLORER: Open explore_coast.html in a desktop browser. The 3D library and atlas are embedded, so it works offline. Choose a town, then Town center or Town + suburbs; use Whole coast to return. Keep the towns folder beside it for individual GLB download links.\n')
with (out/'SOURCES.txt').open('a') as f:f.write('\nSeaside civic architecture: https://seasidefl.com/neighborhood/post-office/ and https://seasidefl.com/stay/seasides-green-spaces/\nDon CeSar interpretation: https://www.doncesar.com/\n')
print('Offline viewer bytes:',len(html))
