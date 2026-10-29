# Nearest hospital and trauma center per town

Built Oct 29, 2026. Output is the `HEALTH` object in `assets/app.*.js` (between `HEALTH_DATA_START` and `HEALTH_DATA_END`): `town id: [hospital, miles, trauma center, level, miles]`.

- Candidate hospital locations: HIFLD hospitals (2018) plus OpenStreetMap (Oct 29, 2026). `kcoords.txt` holds each facility's coordinates by id.
- `verify_*.json`: every candidate checked for current name and whether it is open as a full hospital with a 24/7 ER (keep true/false, with note and source).
- `trauma.json`: FL DOH Florida Trauma Centers list dated Jul 23, 2026, coordinates from the DOH map layer. Only adult Level I and II centers are used.
- `build_health.py` picks the nearest kept hospital and nearest adult trauma center for each town (straight line miles from town center). `health_report.txt` shows the pick and the runner up.

Known changes coming: Lee Memorial Hospital (Fort Myers) is to be replaced by Lee Health Fort Myers about Dec 2027. Cape Canaveral Hospital (Cocoa Beach) moves to a new Merritt Island hospital in the first half of 2027. Re-check both then.
