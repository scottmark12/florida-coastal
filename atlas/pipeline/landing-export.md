# Two-level landing export

1. Build each affected region with `python build_region.py <package>` and rebuild the viewer with `npm run build:viewer`.
2. Restore the Florida OSM PBF from the existing Geofabrik source recorded in the input manifests. Run `python export_bridges.py <snapshot.osm.pbf>`; then `python tile_bridges.py`. `python check_bridges.py` checks source-to-serialized alignment. Bridge widths use mapped width or lanes; missing widths, deck clearance and pier spacing are illustrative. No shoreline is moved.
3. For marina refreshes, run `python extract_marinas.py <snapshot.osm.pbf> <comma-separated-town-ids>` and pass the generated index to `python boats.py <index.json>`. Raw extracts stay under ignored downloads. Occupancy is illustrative, with mapped dock positions, land clearance and hull spacing checked.
4. Run `python prepare_landings.py`. The existing street cameras are preserved once as `close_camera` / `close_mobile_camera`; reruns do not widen them again. Town spans are 5–6 km in most cases, up to 8 km for major cities, with explicit smaller spans for small towns. Hero coordinates do not move.
5. Serve the repository root and capture each relative URL in `landing/capture-queue.json` at **1600 × 1000** using the browser. Wait for `body[data-ready="true"]`, then save the screenshot PNG in `pipeline/outputs/landing-captures/<town-id>-<town|street>.png`. Save a JSON sidecar with the actual parsed `body[data-camera]`, `body[data-viewport]` as `viewport`, and browser error entries as `errors`. The actual camera must match the manifest framing.
6. Run `python finalize_landings.py`. It writes `<id>.webp`, `<id>-m.webp`, `<id>-close.webp` and `<id>-close-m.webp`. Phone files are the centered 800 × 1000 crop of the same render and camera, not a stretched desktop image. Both camera records and per-frame callouts live in `views.town` and `views.street`; compatibility fields remain at the top level.
7. Run `python check_landings.py`, inspect the gallery and representative individual images, and run the static handoff checks. Any callout outside a frame must be filtered from that frame's list, never moved geographically. Rendered images are not evidence of physical-phone load speed.

## Height and style rules

Use OSM height (including feet) first, then OSM building levels. Only a house with neither gets the 1–2 story default. Apartments, condos, hotels, resorts, and buildings of at least 1,500 m² within 300 m of a mapped beach get a clearly flagged area/type estimate when both are missing. The shared constants and exact estimate formula are in `work/coastal_pipeline/v4/rules.json`, under `scale.coastalBuildings`. Display height remains 3× real/estimated height, capped at 3× footprint width; house silhouettes retain their approved stricter cap.

District recipes can restrict the area-based exception with `coastalHeightZones` (an empty list excludes bay-only frontage, as in Pensacola city). They may specify `towerRecipe`, which applies to qualifying resort/condo buildings while the surrounding houses retain their district recipe. Pensacola's historic red brick center, beach condo pastels, and Destin's fishing-village cottages are explicit recipes. Emerald/Forgotten shoreline washes use the existing wider green-turquoise bands, fading into deep blue; they illustrate water character rather than bathymetry.

## Publish to the site walkthrough

After checking the landing files, run `python sync_walkthrough.py` from any directory.
It requires every catalog town to have two verified cameras and all four correctly
sized images, copies the exports into the site's `img/atlas/` directory, rebuilds
the walkthrough's landing catalog, and updates HTML references to a content-hashed
runtime. It keeps the old runtime for cached pages. Review
`landing/walkthrough-coverage.json` and `landing/walkthrough-review.html` before
release. Missing imagery fails this step instead of silently shipping a regional
map fallback. To capture newly added towns, use their saved `town-views.json` hero
camera with `landing=1`; record the actual DOM camera and errors as in step 5 above.

## Illustrated town-to-town flight

`python build_flight_map.py` stitches the approved `region-images.json` exports
onto `region-backdrop.json`, using their saved orthographic cameras. It exports
8192 px desktop and 4096 px phone WebPs in the site's `img/atlas/` folder. Offshore
water is matched to the context; outer image edges fade, and the blank paper
extension in the Tampa reference allows the existing context to show through.
No source geometry or region artwork is changed. Hero anchors use the landing
manifest's projected coordinates, with the atlas's 45 degree tilt.

Then run `python publish_town_flight.py`. It embeds the latest image revisions,
bounds and anchors with `site-town-flight.js` in a newly hashed site runtime,
updates HTML references, and retains previous runtimes for cached pages.

After rebuilding the flight raster, run `python build_town_tones.py` before
`publish_town_flight.py`. It measures each landing image's dominant water color
against the regional raster at its saved camera footprint, producing selective
RGB display recipes in `img/atlas/town-tones.json`. The walkthrough applies these
with a feathered SVG color-key filter; the original WebPs, model materials and
geometry stay intact. Colors outside the source water family pass through
unchanged. Transfers are capped at 48 RGB steps per channel, and scenes without
sufficient water pixels receive no recipe. Both Town/Close and desktop/phone
variants are measured independently against the regional surroundings.
