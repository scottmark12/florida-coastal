"""Builds each town's own "before you fall for it" checklist from the details on its town page,
and writes it into mail/towns.json as t.honest = [[title, detail], ...] (Nov 13 2026, Mark: "each of these
towns should be personalized"). Run from the repo root after the town pages or mail/towns.json change:
    python3 tools/mail/honest.py            (or FC_PAGES=/path/to/site python3 tools/mail/honest.py)
Every line comes from the town's own page (Season, Insurance, Flood risk, HOA, Airport, Know before you go)."""
import re, html, json, os

PAGES = os.environ.get("FC_PAGES", ".")

def details(tid):
    p = os.path.join(PAGES, f"towns/{tid}.html")
    if not os.path.exists(p): return {}
    s = open(p, encoding="utf-8").read()
    i = s.find("The details"); j = s.find("Nearby and similar", i)
    if i < 0: return {}
    parts = [html.unescape(x).strip() for x in re.sub(r"\s+", " ", re.sub("<[^>]+>", "|", s[i:j if j > 0 else i + 8000])).split("|")]
    parts = [x for x in parts if x]
    keys = ["Home prices", "Insurance", "Flood risk", "Heads up", "HOA", "Getting around", "Season", "Airport", "Hospital",
            "Why people love it", "Know before you go", "Think twice if", "Schools"]
    d = {}
    for k, v in zip(parts, parts[1:]):
        if k in keys and v not in keys and k not in d: d[k] = v
    return d

def clean(x):
    x = re.sub(r"\.\.+", ".", x).strip()
    return x if x.endswith((".", "!", "?")) else x + "."

def first_sentence(x):
    # split on sentence ends, but not after short abbreviations like St. or Ft.
    parts = re.split(r"(?<!\bSt\.)(?<!\bFt\.)(?<!\bMt\.)(?<=[.!?])\s+(?=[A-Z])", x.strip())
    return clean(parts[0])

def short(name):
    return re.sub(r"\s*\(.*\)$", "", name)

def high_season(season):
    s = season.lower()
    if not re.search(r"bus|lively|packed", s) or re.search(r"year round|all year|most of the year", s): return None
    if re.search(r"november through april|winter", s):
        return "summer" if ("summer" in s and "winter" in s and s.index("summer") < s.index("winter")) else "winter"
    if re.search(r"april through october|summer", s): return "summer"
    if "spring" in s: return "spring"
    return None

def hours(airport):
    m = re.search(r"about (\d+(?:\.\d+)?|an?|one|two) (hour|hours|minute|minutes)", airport)
    if not m: return 0
    n = {"a": 1, "an": 1, "one": 1, "two": 2}.get(m.group(1), None)
    n = float(m.group(1)) if n is None else n
    return n if m.group(2).startswith("hour") else n / 60

def checks(t, d):
    n = short(t["name"]); out = []
    season = d.get("Season") or t.get("season") or ""
    hs = high_season(season)
    # 1. the season
    if hs == "summer":
        out.append(["Spend a week there in summer.", f"That's high season in {n} ({season[0].lower() + season[1:]}). The traffic, the crowds, the wait for a table. If you still love it then, that's a good sign."])
    elif hs in ("winter", "spring"):
        out.append(["Visit in August, not just in season.", f"{n} is at its busiest in {hs}. Summer is hot and quiet, and it's a big part of the year. Go once in the heat."])
    else:
        out.append(["Visit in August, not just February.", (f"The season in {n}: {season[0].lower() + season[1:]}. " if season else "") + "Summer is hot everywhere on this coast, so go once in the heat."])
    # 2. insurance, with the local number when the page has one
    ins = d.get("Insurance", "")
    local = first_sentence(ins) if ins and not ins.lower().startswith("statewide") else ""
    if local.lower().startswith("varies"): local = "Insurance " + local[0].lower() + local[1:]
    out.append(["Get an insurance quote for a real address.", (local + " " if local else "") + "Homeowners and flood both. It can change the math more than the price of the house."])
    # 3. flood: our score when the town is on the ranking
    fr = d.get("Flood risk", "")
    m = re.match(r"([\d.]+) of 10", fr)
    if m:
        out.append(["Check the flood zone before you make an offer.", f"{n} scores {m.group(1)} of 10 on our flood ranking of 50 beach towns, where 10 is the highest risk. Then look up the zone for the exact address."])
    else:
        heads = d.get("Heads up", t.get("watch", ""))
        lead = f"The heads up here: {heads[0].lower() + heads[1:]}" if heads else ""
        lead = clean(lead) + " " if lead else ""
        tail = "Then look up the exact address." if "flood" in heads.lower() else "Look up the flood zone and evacuation zone for the exact address."
        out.append(["Check the flood zone before you make an offer.", lead + tail])
    # 4. the one thing that's most particular to this town
    hoa = d.get("HOA", ""); air = d.get("Airport") or t.get("airport", ""); know = d.get("Know before you go", "")
    if hoa and not re.match(r"(rare|none|uncommon|few|not common|not many)", hoa.lower()) and re.search(r"\$|common|high|dues|condo|assessment", hoa.lower()):
        h = clean(hoa)
        m2 = re.match(r"^((?:very |fairly |somewhat )?common)\.\s*", h, re.I)
        if m2: h = f"HOAs are {m2.group(1).lower()} here. " + h[m2.end():]
        elif re.match(r"^(?:very |fairly |somewhat )?common\b", h, re.I): h = "HOAs are " + h[0].lower() + h[1:]
        out.append(["Read the HOA or condo budget.", h.strip()])
    elif hours(air) >= 1:
        out.append(["Make the drive to the airport once.", f"From {n} it's {air}. Do it before you buy, not after."])
    elif know:
        out.append(["Know this going in.", clean(know)])
    else:
        out.append(["Drive to the airport at rush hour.", f"For {n} that's {air}. Do it on a weekday at 5pm."])
    return out

def main():
    path = "mail/towns.json"
    towns = json.load(open(path, encoding="utf-8"))
    for t in towns:
        t["honest"] = checks(t, details(t["id"]))
    json.dump(towns, open(path, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(len(towns), "towns written")

if __name__ == "__main__":
    main()
