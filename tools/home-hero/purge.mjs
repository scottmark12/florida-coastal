import {PurgeCSS} from 'purgecss';
import fs from 'fs';
const R='/home/claude/florida-coastal';
const files=JSON.parse(fs.readFileSync('css_files.json','utf8')).filter(f=>!f.startsWith('/assets/fonts.css'));
const content=['/home/claude/perf/new.nostyle.html',R+'/assets/fc-menu.js',R+'/assets/fc-connect.00e32fdbb6.js',R+'/assets/v3/s-4a9806437f/dm-titles.js',R+'/assets/fc-engagement.js'];
let out='';
for(const f of files){
  const path=R+f.split('?')[0];
  const res=await new PurgeCSS().purge({content,css:[path],
    safelist:{standard:['solid','hid','on','open','glass','qx','go','hcta-vis','on-home','active','is-open','show'],
              deep:[/^fcm/,/^fcs/,/^fcq/,/^fch/,/^nav/,/^mob-cta/,/^qexp/,/^fc-/,/^hx-/],greedy:[/fcm/,/fcs-/]},
    keyframes:true,fontFace:false,variables:false});
  const css=res[0].css; out+=`/* ${f} */\n`+css+'\n';
  console.log(f, fs.statSync(path).size, '->', css.length);
}
fs.writeFileSync('purged.css',out);
