import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
await build({entryPoints:[path.join(root,'work/atlas_regions/app.js')],bundle:true,format:'iife',minify:true,outfile:path.join(root,'../regions/app.js'),alias:{three:path.join(root,'node_modules/three'),'three/addons':path.join(root,'node_modules/three/examples/jsm')}});
