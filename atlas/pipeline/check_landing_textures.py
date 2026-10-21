"""Flag large periodic canopy blocks using image-space spectral concentration.
160 px windows, 80 px stride, at least 70% vegetation; high-pass/Hann-windowed
luminance. Four or more windows with >10% power in 12 frequency bins flags a
large repeating block. Roads, water and tiny isolated patterns are excluded.
Default release scope is the repaired 30A Town pair; callers may pass any image.
"""
import json,sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter
from fixed_landings import A

def measure(file):
 a=np.array(Image.open(file).convert('RGB')).astype(float);g=a.mean(2);green=(a[:,:,1]>a[:,:,0]+4)&(a[:,:,1]>a[:,:,2]+15);scores=[]
 for y in range(0,a.shape[0]-160+1,80):
  for x in range(0,a.shape[1]-160+1,80):
   if green[y:y+160,x:x+160].mean()<.7:continue
   p=g[y:y+160,x:x+160];p=p-gaussian_filter(p,2);p*=np.hanning(160)[:,None]*np.hanning(160)[None,:];power=abs(np.fft.fft2(p))**2;power[:3,:3]=0;score=float(np.partition(power.flatten(),-12)[-12:].sum()/max(1,power.sum()));scores.append({'x':x,'y':y,'score':round(score,6)})
 repeating=[s for s in scores if s['score']>.1]
 return {'image':str(file),'vegetation_windows':len(scores),'periodic_windows':len(repeating),'status':'FAIL' if len(repeating)>=4 else 'pass','flagged_windows':repeating}
def check(fail=True):
 rows=[measure(A/'landing'/f) for f in ['30a.webp','30a-m.webp']];report={'method':__doc__,'rows':rows,'failures':[r for r in rows if r['status']=='FAIL']};(A/'landing/qa/texture-blocks.json').write_text(json.dumps(report,indent=2)+'\n');print('Canopy texture check:',len(report['failures']),'large periodic blocks')
 if fail:assert not report['failures'],report['failures']
 return report
if __name__=='__main__':
 if len(sys.argv)>1:print(json.dumps([measure(Path(f)) for f in sys.argv[1:]],indent=2))
 else:check()
