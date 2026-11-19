"""Fair housing pass (Nov 19 2026): list sentences that describe who lives in a town or carry household,
age, background, religion or coded wording, from town pages and the data files that feed them."""
import re, glob, json, html, collections, sys
PAT = re.compile(r"""\b(retirees?|retired|snowbirds?|famil(y|ies)|kids|children|grandkids|grandchildren|
 young\ (professionals|families|couples|crowd|people|buyers)|military|navy|air\ force|airmen|service\ members|
 college\ students|students|executives|tradespeople|professionals|empty\ nesters?|couples|singles|
 lgbtq\w*|gay|russian|jewish|caribbean|latin\ american|canadians?|greek\ american|spanish|midwest(ern)?|northeast(ern)?|
 church|rough\ around|safe\ feeling|every\ age|all\ ages|seniors|older\ (residents|crowd|buyers)|younger|
 retirement\ (crowd|community|town)|newcomers|locals\ of\ all|who\ live\ here|residents\ (are|tend)|crowd)\b""", re.I | re.X)
OK = re.compile(r"single[- ]famil|family[- ](owned|run|room)|Scott family|font-family|Navy (Live Oaks|Pier|Point)|Naval|Navarre|Spanish (moss|fort|Florida|colonial|Quarter|Monastery|architecture|style|Revival|era|Point|explorers|settlers|mission|land grant|galleon|treasure|Main)|Hans Christian|Family Dollar|Families Park|military (base|bases|history|museum|installation)|Air Force (Base|Armament|Museum|Station)|Eglin Air Force Base|church (street|steeple)|Old (Spanish|Church)|Midwest Airlines", re.I)
SPLIT = re.compile(r"(?<=[.!?])\s+(?=[A-Z0-9\"“])")
out = []
def scan(f, text, where):
    for sent in SPLIT.split(text):
        s = sent.strip()
        if len(s) < 4: continue
        m = PAT.search(s)
        if m and not (OK.search(s) and not PAT.search(OK.sub('', s))):
            out.append({'file': f, 'where': where, 'hit': m.group(0), 'text': s})
for f in sorted(glob.glob('src/towns/*.html')):
    s = open(f).read()
    for m in re.finditer(r'>([^<>]{6,})<', s):
        t = m.group(1)
        if '{' in t and '}' in t and ';' in t: continue
        scan(f, t, 'html')
def walk(f, o, path=''):
    if isinstance(o, dict):
        for k, v in o.items(): walk(f, v, path + '.' + str(k))
    elif isinstance(o, list):
        for k, v in enumerate(o): walk(f, v, path + f'[{k}]')
    elif isinstance(o, str) and len(o) > 6 and ' ' in o:
        scan(f, o, path)
for f in sorted(glob.glob('src/data/*.json')):
    try: walk(f, json.load(open(f)))
    except Exception as e: print('skip', f, e, file=sys.stderr)
json.dump(out, open('/tmp/fh_lines.json', 'w'), indent=1, ensure_ascii=False)
c = collections.Counter(o['file'] for o in out)
print(len(out), 'lines', len({o['text'] for o in out}), 'unique')
print(c.most_common(12))
