#!/usr/bin/env python3
"""Charm v3 from tools/charm_rubric_nov8.txt. Parts H L S W A (0 to 2) plus P postcard pretty.
Weights H 1, L 1, S 1, W .5, A 1, P 1.5 (max 12, scaled to 10). Cities with tower skylines minus 1.5, hamlets cap at 6.5,
then the small adj nudges. Map and historic data (charm_data.py) only breaks exact ties."""
import json, sys
rub, adj, sets = {}, {}, {"p2": set(), "p0": set(), "city": set(), "hamlet": set()}
for l in open("tools/charm_rubric_nov8.txt"):
    l = l.split()
    if not l or l[0].startswith("#"): continue
    if l[0] == "adj": adj[l[1]] = float(l[2]); continue
    if l[0] in sets: sets[l[0]].update(l[1:]); continue
    rub[l[0]] = list(map(int, l[1]))
score = {}
for k, (H, L, S, W, A) in rub.items():
    P = 2 if k in sets["p2"] else 0 if k in sets["p0"] else (1 if S >= 1 and A >= 1 else 0)
    v = (H + L + S + .5 * W + A + 1.5 * P) / 12 * 10
    if k in sets["city"]: v -= 1.5
    if k in sets["hamlet"]: v = min(v, 6.5)
    score[k] = round(v + adj.get(k, 0), 2)
json.dump(score, sys.stdout)
