# Fixed-frame landing repair pass

All 167 public heroes, all callouts, the zoom spans, palette colors and the
1.2 km water transition are retained. The only camera exception is Dania Beach:
both targets move 500 m south, at identical zoom and tilt, under the user's
explicit port/airport exception. Its existing public Ocean Park hero stays put.

The four numbered requests cover five towns. The focused review and contact
sheet are `landing/fix-review.html` and `landing/qa/fix-contact.jpg`.

- Juno Beach and West Palm Beach: full-frame OSM extraction and approved parent
  land geometry now extend west past the frame, with 600 m source padding.
- 30A: no repeated grove/sine pattern. Tree positions use deterministic irregular
  scatter inside the existing forest mask, with ordinary modeled crowns.
- New Port Richey: the OSM road grid was present but residential footprints and
  canopy were incomplete. 13,974 non-overlapping Microsoft imagery footprints
  supplement OSM, using the unchanged 1–2 story house rule. WorldCover tree and
  mangrove classes supply measured canopy extent. These are imagery-derived
  footprints, not OSM IDs; provenance is preserved in the inventory.
- Dania: WorldCover extends across the previously clipped mangrove area, mapped
  paths remain visible, and the port-side northwest corner is reduced by the
  authorized southward framing adjustment. [Florida State Parks](https://www.floridastateparks.org/mizell)
  describes the mangrove-lined Whiskey Creek landscape. [Port Everglades](https://www.porteverglades.net/environment/partnerships/)
  documents its Dania Cutoff Canal site.
- The all-town extent audit also found source-edge failures in Jupiter, Lake
  Park and New Smyrna Beach. Their inputs and Town exports were extended without
  moving their cameras or changing their styles.

## Rebuild

Use Python 3.10+ and `requirements.txt` (Shapely 2.1+ is required by the locked
exporter; this pass was built with Python 3.12). From the pipeline directory:

1. `python repair_landing_inputs.py --seed`
2. Restore the excluded Geofabrik Florida OSM PBF from
   https://download.geofabrik.de/north-america/us/florida.html. Run
   `python extract_landing_snapshot.py landing-repair/juno-beach,landing-repair/west-palm-beach,landing-repair/new-port-richey,landing-repair/dania-beach,landing-repair/jupiter,landing-repair/lake-park,landing-repair/nsb /path/to/florida.osm.pbf`.
   The reviewed original snapshot is `florida-261017.osm.pbf`; Jupiter's repair
   also used a complete Overpass frame query. Re-downloaded data can differ.
3. `python repair_landing_inputs.py --prepare`
4. `python repair_landing_canopy.py juno-beach west-palm-beach new-port-richey dania-beach jupiter lake-park nsb`
5. Restore the Microsoft footprint tile referenced by the existing
   `work/coastal_pipeline/downloads/ms-dataset-links.csv` index from
   https://github.com/microsoft/GlobalMLBuildingFootprints, then run
   `python repair_landing_buildings.py`. Raw imagery inputs are ignored.
6. `python build_region.py landing-repair/TOWN` for each configured town. The
   scale, styles and geometry engine are unchanged. Register the new package;
   preserve the existing district records and relative review links.
7. Capture only changed views from `landing/capture-queue.json` at 1600×1000.
   `finalize_landing_repairs.py` checks each camera against the baseline and
   publishes the desktop and centered phone crops. It requires the original
   index and before images under ignored `outputs/landing-fix/`.
8. `python check_landings.py` checks all 167 towns: sources and framing, named
   callouts, every image's water palette, detailed land extent plus full-frame
   offshore water coverage, and large repeating canopy blocks in 30A's Town pair.
   `check_landing_textures.py IMAGE...` can inspect any other export.
9. Sync walkthrough assets with `sync_walkthrough.py` and
   `publish_town_flight.py`. Keep the uniform-water display recipes empty.

## Proof

`landing/qa/data-extents.json` audits 668 frames. Land cannot fall outside its
package acquisition envelope; offshore water must stay inside the separately
georeferenced uniform-water layer. Census backdrop alone is insufficient.
`texture-blocks.json` flags spectral periodicity across large vegetation windows;
it is an artifact heuristic, not a botanical classifier. The pre-fix 30A image
fails this check, and the scattered replacement passes.
`fix-invariants.json` lists the Dania exception and unchanged protected fields.
