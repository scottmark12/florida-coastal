import json, math, os, sys
D = os.path.dirname(os.path.abspath(__file__))

def hav(a, b, c, d):
    r = 3958.8
    p1, p2 = math.radians(a), math.radians(c)
    dp, dl = p2 - p1, math.radians(d - b)
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(h))

towns = json.load(open(f"{D}/towns.json"))
kc = {}
for tok in open(f"{D}/kcoords.txt").read().split():
    k, ll = tok.split(":")
    la, lo = ll.split(",")
    kc[int(k)] = (float(la), float(lo))

hosp, unsure, dropped = [], [], []
seen = set()
for reg in ("north", "central", "south"):
    for r in json.load(open(f"{D}/verify_{reg}.json")):
        k = r.get("k")
        if k is not None:
            k = int(k)
            if k in seen:
                continue
            seen.add(k)
        if r.get("keep") is True:
            if k is not None:
                la, lo = kc[k]
            else:
                la, lo = float(r["lat"]), float(r["lon"])
            hosp.append(dict(k=k, name=r["name"].strip(), city=r.get("city", ""), lat=la, lon=lo))
        elif r.get("keep") is None:
            unsure.append(r)
        else:
            dropped.append(r)

# merge kept hospitals that are the same place under the same name
uniq = []
for h in hosp:
    if any(u["name"] == h["name"] and hav(u["lat"], u["lon"], h["lat"], h["lon"]) < 1.0 for u in uniq):
        continue
    uniq.append(h)

tr = json.load(open(f"{D}/trauma.json"))
centers = [c for c in tr["centers"] if c.get("lat") is not None]

def mi(x):
    return max(1, int(round(x)))

out, report = {}, []
for tid, tname, la, lo in towns:
    hs = sorted(uniq, key=lambda h: hav(la, lo, h["lat"], h["lon"]))
    h = hs[0]
    hd = hav(la, lo, h["lat"], h["lon"])
    adult = [c for c in centers if "level" in c and ("Level I" in c["level"])]
    cs = sorted(adult, key=lambda c: hav(la, lo, c["lat"], c["lon"]))
    c = cs[0]
    cd = hav(la, lo, c["lat"], c["lon"])
    lvl = "Level I" if "Level I" in c["level"] and "Level II" not in c["level"] else "Level II"
    cname = (c.get("public_name") or c["name"]).strip()
    out[tid] = [h["name"], mi(hd), cname, lvl, mi(cd)]
    report.append(f"{tid:24s} {h['name'][:46]:46s} {hd:5.1f} | {cname[:40]:40s} {lvl} {cd:5.1f} | 2nd: {hs[1]['name'][:30]} {hav(la, lo, hs[1]['lat'], hs[1]['lon']):.1f}")

json.dump(out, open(f"{D}/health_out.json", "w"), indent=0)
open(f"{D}/health_report.txt", "w").write("\n".join(report))
print(len(uniq), "hospitals kept;", len(dropped), "dropped;", len(unsure), "unsure;", len(centers), "trauma centers")
for r in unsure:
    print("UNSURE", r.get("k"), r.get("name"), "|", r.get("note"))
