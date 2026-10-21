"""Add high-density exports without writing any approved 1x asset or metadata."""
from pathlib import Path
import argparse, hashlib, json, statistics, math, time, shutil, os
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageDraw, ImageCms

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
A = ROOT / 'atlas'
OUT = P / 'outputs/landing-2x'
INDEX = A / 'landing/index.json'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def original_files(index):
    files = [INDEX, A/'landing/capture-queue.json', ROOT/'img/atlas/flight-regions.webp', ROOT/'img/atlas/flight-regions-m.webp', ROOT/'img/atlas/flight-regions.json']
    for town in index['towns']:
        for view in town['views'].values():
            for key in ['desktop', 'mobile']:
                for folder in [A/'landing', ROOT/'img/atlas']:
                    file = folder/view[key]
                    if file.exists(): files.append(file)
    return sorted(set(files))

def prepare():
    OUT.mkdir(parents=True, exist_ok=True)
    index = json.loads(INDEX.read_text())
    baseline = {str(p.relative_to(ROOT)): sha(p) for p in original_files(index)}
    lock = OUT/'baseline.json'
    if lock.exists():
        assert json.loads(lock.read_text()) == baseline, 'Approved baseline changed since prepare'
    else: lock.write_text(json.dumps(baseline, indent=2)+'\n')
    queue = []
    for town in index['towns']:
        for key in ['town', 'street']:
            view = town['views'][key]
            queue.append(dict(town_id=town['town_id'], view=key, url=view['render_url'], camera=view['camera'],
                              desktop=view['desktop'].replace('.webp','@2x.webp'), mobile=view['mobile'].replace('.webp','@2x.webp')))
    (OUT/'capture-queue.json').write_text(json.dumps(queue, indent=2)+'\n')
    print(f'Prepared {len(queue)} exact published render URLs; {len(baseline)} original files locked', flush=True)

def verify_baseline():
    baseline = json.loads((OUT/'baseline.json').read_text())
    changed = [name for name, digest in baseline.items() if sha(ROOT/name) != digest]
    assert not changed, f'Original files changed: {changed}'
    return len(baseline)

def encode(item, quality, kind):
    stem = item['town_id']+'-'+item['view']
    meta = json.loads((OUT/'captures'/f'{stem}.json').read_text())
    def same(a,b):
        if isinstance(a,dict): return a.keys()==b.keys() and all(same(a[k],b[k]) for k in a)
        if isinstance(a,list): return len(a)==len(b) and all(same(x,y) for x,y in zip(a,b))
        if isinstance(a,(int,float)): return math.isclose(a,b,rel_tol=0,abs_tol=1e-9)
        return a==b
    assert same(meta['camera'],item['camera']), stem+' camera changed'
    assert meta['viewport'] == '1600×1000' and meta['deviceScaleFactor'] == 2, stem
    assert not meta['errors'], (stem, meta['errors'])
    with Image.open(OUT/'captures'/f'{stem}.png') as source:
        assert source.size == (3200,2000), (stem, source.size)
        # The approved 1x capture transport stored Display P3 channel values
        # without an ICC tag. Match that encoding, not a new color treatment.
        image = ImageCms.profileToProfile(source.convert('RGB'), ImageCms.createProfile('sRGB'),
                    '/System/Library/ColorSync/Profiles/Display P3.icc', outputMode='RGB')
        image.info.clear()
        if kind == 'mobile': image = image.crop((800,0,2400,2000))
        folder = A/'landing' if quality == 82 else OUT/'quality-76'
        folder.mkdir(exist_ok=True)
        file = folder/item[kind]
        image.save(file, 'WEBP', quality=quality, method=6)
        return dict(town_id=item['town_id'], view=item['view'], kind=kind, file=file.name,
                    width=image.width, height=image.height, bytes=file.stat().st_size, quality=quality, sha256=sha(file))

def stage(follow=False):
    queue=json.loads((OUT/'capture-queue.json').read_text());folder=OUT/'staged';folder.mkdir(exist_ok=True)
    while True:
        pending=[]
        for item in queue:
            stem=item['town_id']+'-'+item['view'];marker=folder/(stem+'.json')
            if marker.exists(): continue
            try:
                json.loads((OUT/'captures'/(stem+'.json')).read_text())
                if not (OUT/'captures'/(stem+'.png')).exists(): continue
            except (FileNotFoundError,json.JSONDecodeError): continue
            pending.append(item)
        def process(item):
            stem=item['town_id']+'-'+item['view'];png=OUT/'captures'/(stem+'.png')
            rows=[encode(item,q,kind) for q in [82,76] for kind in ['desktop','mobile']]
            (folder/(stem+'.json')).write_text(json.dumps({'capture_sha256':sha(png),'files':rows},indent=2)+'\n')
            png.unlink() # Generated temporary capture only; keep original 1x captures.
            print('Staged',stem,flush=True)
        with ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(process,pending))
        completed=len(list(folder.glob('*.json')))
        if completed==len(queue) or not follow: print('Staged total',completed,flush=True);return
        time.sleep(1)

def finish():
    verify_baseline()
    queue = json.loads((OUT/'capture-queue.json').read_text())
    stage();rows=[]; averages={}; qualities={}
    candidates=[r for item in queue for r in json.loads((OUT/'staged'/(item['town_id']+'-'+item['view']+'.json')).read_text())['files']]
    for kind, target in [('desktop',700_000),('mobile',450_000)]:
        group=[r for r in candidates if r['quality']==82 and r['kind']==kind]
        initial = statistics.mean(row['bytes'] for row in group)
        if initial > target:
            group=[r for r in candidates if r['quality']==76 and r['kind']==kind]
            for row in group:
                dest=A/'landing'/row['file']
                if not dest.exists() or sha(dest)!=row['sha256']: shutil.copyfile(OUT/'quality-76'/row['file'],dest)
        for row in group:
            file=A/'landing'/row['file']
            assert sha(file)==row['sha256']
            with Image.open(file) as im: assert im.size==(row['width'],row['height'])
            mirror=ROOT/'img/atlas'/row['file']
            if not mirror.exists(): os.link(file,mirror)
            else: assert sha(mirror)==row['sha256'], 'Existing 2x site mirror differs'
        averages[kind]={'quality_82_average_bytes':initial, 'average_bytes':statistics.mean(row['bytes'] for row in group), 'target_bytes':target}
        qualities[kind]=group[0]['quality'];rows.extend(group)
        print(kind, averages[kind], 'quality',qualities[kind], flush=True)
    locked=verify_baseline()
    report={'towns':len(queue)//2,'images':len(rows),'viewport':[1600,1000],'deviceScaleFactor':2,
            'method':6,'averages':averages,'quality':qualities,'site_mirror':'img/atlas/','original_files_verified_unchanged':locked,
            'flight_painting':{'width':Image.open(ROOT/'img/atlas/flight-regions.webp').width,'action':'unchanged: already 8192 pixels wide'},'files':rows}
    (A/'landing/qa/retina-report.json').write_text(json.dumps(report,indent=2)+'\n')
    proof=[]
    for item in queue:
        stem=item['town_id']+'-'+item['view']
        proof.append(dict(town_id=item['town_id'],view=item['view'],**json.loads((OUT/'captures'/(stem+'.json')).read_text()),
                          capture_sha256=json.loads((OUT/'staged'/(stem+'.json')).read_text())['capture_sha256']))
    (A/'landing/qa/retina-capture-proof.json').write_text(json.dumps(proof,indent=2)+'\n')
    (A/'landing/qa/retina-preservation.json').write_text((OUT/'baseline.json').read_text())
    # One compact row per town; full-resolution files remain directly linked.
    links=[]
    for offset in range(0,len(queue),24):
        entries=queue[offset:offset+24];sheet=Image.new('RGB',(800,270*len(entries)//2),'#f5f0e3');draw=ImageDraw.Draw(sheet)
        for n,item in enumerate(entries):
            with Image.open(A/'landing'/item['desktop']) as image:
                image.thumbnail((390,244));sheet.paste(image,((n%2)*400,(n//2)*270+20))
            draw.text(((n%2)*400+5,(n//2)*270+3),item['town_id']+' / '+item['view'],fill='#294a43')
        name=f'retina-contact-{offset//24+1:02}.jpg';sheet.save(A/'landing/qa'/name,quality=85)
        links.append(f'<p><img src="qa/{name}" alt="2x export contact sheet" style="width:100%;max-width:800px"></p>')
    (A/'landing/retina-review.html').write_text('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>2x landing exports</title><body style="background:#f5f0e3;font:16px system-ui;color:#294a43"><h1>2x landing exports · 167 towns</h1><p>Same cameras and artwork. Original 1x files unchanged. <a href="qa/retina-report.json">Size and preservation report</a></p>'+''.join(links))
    print('Verified',locked,'original files unchanged;',len(rows),'new 2x exports',flush=True)
    shutil.rmtree(OUT/'quality-76',ignore_errors=True)

def water_qa():
    from check_water_palette import check
    index=json.loads(INDEX.read_text())
    for town in index['towns']:
        for view in town['views'].values():
            for key in ['desktop','mobile']: view[key]=view[key].replace('.webp','@2x.webp')
    check(index,report_path=A/'landing/qa/retina-water-palette.json')
    verify_baseline()

if __name__ == '__main__':
    parser=argparse.ArgumentParser();parser.add_argument('command',choices=['prepare','stage','finish','verify','water']);parser.add_argument('--follow',action='store_true');args=parser.parse_args()
    {'prepare':prepare,'stage':lambda:stage(args.follow),'finish':finish,'verify':verify_baseline,'water':water_qa}[args.command]()
