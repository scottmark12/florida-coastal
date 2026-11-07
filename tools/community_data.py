#!/usr/bin/env python3
"""Active community life: real data for the "Meet people" slider.

What it measures (places, never who lives there):
  1. Third places within a mile of the town center (40%): cafes, bars, pubs, restaurants,
     gyms and studios, sports centers, courts and fields, community and arts centers, markets.
     Source: OpenStreetMap via the Overpass API.  "Everyone goes out."
  2. Newcomer share (25%): residents who lived in a different county, state or country a year ago.
     Source: Census ACS 5 year, table B07001.  "Everyone is looking for new friends."
  3. Walkable center (20%): the town's walkability rank we already have.  "You run into people."
  4. Small and active (15%): full credit from about 8,000 to 80,000 people, fading above and below.
     Big cities have plenty to do but are easier to be anonymous in; tiny villages have little.

Calibration: Encinitas, CA is scored with the same inputs and should land near the top.

Needs network access to overpass-api.de and api.census.gov (allow them for this workspace).
  python3 tools/community_data.py towns.json pop.json walkrank.json  > community.json
towns.json: [{id,name,lat,lon}], pop.json: {id: population}, walkrank.json: {id: rank}
"""
import json, sys, time, math, urllib.request, urllib.parse

OVERPASS = "https://overpass-api.de/api/interpreter"
TAGS = "cafe|bar|pub|biergarten|restaurant|community_centre|arts_centre|marketplace|fitness_centre|sports_centre|pitch|dance"
UA = {"User-Agent": "FloridaCoastal-community-score/1.0"}


def third_places(lat, lon, r=1600):
    q = f'[out:json][timeout:60];nwr(around:{r},{lat},{lon})[~"^(amenity|leisure)$"~"^({TAGS})$"];out count;'
    req = urllib.request.Request(OVERPASS, data=urllib.parse.urlencode({"data": q}).encode(), headers=UA)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as f:
                return int(json.load(f)["elements"][0]["tags"]["total"])
        except Exception:
            time.sleep(10 * (attempt + 1))
    return None


def acs_newcomers(state="12"):
    """{place name lowercased: share of residents who moved in from outside the county in the last year}"""
    v = "NAME,B07001_001E,B07001_049E,B07001_065E,B07001_081E"
    url = f"https://api.census.gov/data/2023/acs/acs5?get={v}&for=place:*&in=state:{state}"
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=90) as f:
        rows = json.load(f)
    out = {}
    for name, tot, dc, ds, ab, *_ in rows[1:]:
        tot = int(tot or 0)
        if tot:
            key = name.split(",")[0].replace(" city", "").replace(" town", "").replace(" village", "").replace(" CDP", "").lower()
            out[key] = (int(dc or 0) + int(ds or 0) + int(ab or 0)) / tot
    return out


def scale(p):
    if p <= 0: return 0
    if 8000 <= p <= 80000: return 1
    return max(0, 1 - abs(math.log10(p / (8000 if p < 8000 else 80000))) / 1.3)


def pct_rank(d, reverse=False):
    xs = sorted((v, k) for k, v in d.items() if v is not None)
    n = len(xs) - 1 or 1
    r = {k: i / n for i, (v, k) in enumerate(xs)}
    return {k: (1 - v if reverse else v) for k, v in r.items()}


def main():
    towns = json.load(open(sys.argv[1])); pop = json.load(open(sys.argv[2])); walk = json.load(open(sys.argv[3]))
    towns = towns + [{"id": "encinitas", "name": "Encinitas", "lat": 33.0456, "lon": -117.2926}]
    pop["encinitas"] = 62007
    tp = {}
    for t in towns:
        tp[t["id"]] = third_places(t["lat"], t["lon"]); time.sleep(2)
        print(t["name"], tp[t["id"]], file=sys.stderr)
    nc = acs_newcomers("12"); nc.update(acs_newcomers("06"))
    new = {t["id"]: nc.get(t["name"].split(" (")[0].lower()) for t in towns}
    walk = dict(walk); walk["encinitas"] = 10  # downtown Encinitas walk rank estimate, calibration only
    a, b, c = pct_rank(tp), pct_rank(new), pct_rank(walk, reverse=True)
    score = {}
    for t in towns:
        k = t["id"]
        parts = [(a.get(k), .40), (b.get(k), .25), (c.get(k), .20), (scale(pop.get(k, 0)), .15)]
        have = [(v, w) for v, w in parts if v is not None]
        score[k] = round(sum(v * w for v, w in have) / sum(w for v, w in have), 4)
    json.dump({"score": score, "third_places": tp, "newcomers": new}, sys.stdout, indent=1)


if __name__ == "__main__":
    main()
