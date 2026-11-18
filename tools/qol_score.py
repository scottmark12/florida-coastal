"""Most recommended score (Nov 18 2026). Mark: "most recommended, a mix of what it's good for
while weighting what people want."

What people want: how many people tapped each style on the Vibe Map and the homepage style
tiles (Supabase fc_events, event style_tap, distinct visitors, our own sessions excluded,
Oct 14 to Nov 9 2026). Each style points at the categories behind it, and every style gets
5 extra so new or rarely shown styles (Best Schools, Remote Work) still count.

What each town is good for: its rank out of 167 in each category as a 0 to 1 percentile.
A town is scored on its 4 best categories once weighted by demand, so it gets credit for
what it does best and isn't marked down for what it isn't. 100 = top of all four of the most
wanted categories.

Rerun tools/picks_article.py after rank changes, and refresh TAPS from Supabase now and then.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TAPS = {'oldfl': 29, 'island': 23, 'beaches': 20, 'bluezone': 19, 'dock': 16, 'sophcalm': 15, 'walk': 15,
        'social': 13, 'afford': 13, 'sophhigh': 10, 'active': 9, 'remote': 4, 'schools': 0}
SMOOTH = 5
STYLE_CATS = {'oldfl': ['charm', 'quiet'], 'island': ['beach', 'quiet'], 'beaches': ['beach'],
              'bluezone': ['outdoors', 'walk'], 'dock': ['water'], 'sophcalm': ['dining', 'charm', 'quiet'],
              'social': ['meet', 'nightlife'], 'walk': ['walk'], 'active': ['outdoors'],
              'sophhigh': ['nightlife', 'dining'], 'afford': ['afford'], 'remote': ['airport'], 'schools': ['edu']}
LABEL = {'beach': 'Beaches', 'quiet': 'Peace and quiet', 'walk': 'Walkability', 'outdoors': 'Outdoors and wellness',
         'charm': 'Coastal charm', 'water': 'Life on the water', 'afford': 'Affordability', 'nightlife': 'Nightlife',
         'dining': 'Dining and arts', 'meet': 'Meeting people', 'airport': 'Airport access', 'edu': 'Public schools'}
WORD = {k: v.lower() for k, v in LABEL.items()}
WORD['outdoors'] = 'the outdoors'
BEST_N = 4
TOP = 30
# Mark Nov 18: keep these four up top (the Beach Towns tiles he liked), then the rest by score.
PINNED = ['dunedin', 'naples', 'venice', 'fernandina']


def weights():
    w = {}
    for s, n in TAPS.items():
        for c in STYLE_CATS[s]:
            w[c] = w.get(c, 0) + (n + SMOOTH) / len(STYLE_CATS[s])
    t = sum(w.values())
    return {c: x / t for c, x in sorted(w.items(), key=lambda a: -a[1])}


WEIGHTS = weights()
PEOPLE = 65  # distinct visitors behind those taps (one person often taps several styles)
PICKS_MADE = sum(TAPS.values())


def scores(ld=None):
    """Returns ({id: 0..100}, order best first, {id: [its best categories]})."""
    ld = ld or json.load(open(os.path.join(ROOT, 'src/data/map-ld.json')))
    n = len(ld)
    cap = sum(sorted(WEIGHTS.values(), reverse=True)[:BEST_N])
    s, best = {}, {}
    for i in ld:
        c = sorted(((w * (1 - (ld[i]['rk'][k] - 1) / (n - 1)), k) for k, w in WEIGHTS.items()), reverse=True)[:BEST_N]
        s[i] = 100 * sum(x for x, _ in c) / cap
        best[i] = [k for _, k in c]
    order = sorted(s, key=lambda i: (-s[i], i))
    return {i: round(s[i]) for i in s}, order, best


def picks(ld=None):
    """The towns we recommend most: our four pinned picks, then the next best by score up to TOP."""
    q, order, best = scores(ld)
    rest = [i for i in order if i not in PINNED][:TOP - len(PINNED)]
    return PINNED + rest, q, order, best
