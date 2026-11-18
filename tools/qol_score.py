"""Quality of life score (Nov 18 2026, Mark approved "top 30 by the score").

One number, 0 to 100, for what everyday life feels like in a town. Each category is the town's
rank out of 167 turned into a 0 to 1 percentile, then weighted:
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEIGHTS = [  # key, weight, plain label
    ('beach', 15, 'Beaches'),
    ('walk', 15, 'Walkability'),
    ('outdoors', 15, 'Outdoors and wellness'),
    ('quiet', 10, 'Peace and quiet'),
    ('dining', 10, 'Dining and arts'),
    ('meet', 10, 'Meeting people'),
    ('charm', 10, 'Coastal charm'),
    ('airport', 5, 'Airport access'),
    ('edu', 5, 'Public schools'),
    ('afford', 5, 'Affordability'),
]
assert sum(w for _, w, _ in WEIGHTS) == 100
TOP = 30


def scores(ld=None):
    ld = ld or json.load(open(os.path.join(ROOT, 'src/data/map-ld.json')))
    n = len(ld)
    s = {i: sum(w * (1 - (ld[i]['rk'][k] - 1) / (n - 1)) for k, w, _ in WEIGHTS) for i in ld}
    order = sorted(s, key=lambda i: (-s[i], i))
    return {i: round(s[i]) for i in s}, order
