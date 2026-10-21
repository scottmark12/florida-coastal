# Fixed-camera landing export

1. Keep all approved geometry, building recipes, palette, lighting and the 45° orthographic tilt unchanged. `fixed_landings.py` only plans cameras, chooses source-positioned public hero points/callouts and exports images.
2. Inputs: existing landing manifest, catalog/package registry, the packages' OSM-derived `land.json`, source OSM geometry/cover/district extracts, and Census 2025 Florida place boundaries (`cb_2025_12_place_500k`). Restore raw source material from the manifests and Geofabrik Florida snapshot; keep it outside Git. Set `ATLAS_SOURCE_WORK` to the original source-work directory if it is elsewhere. Dependencies: Pillow, Shapely, pyproj and pyshp.
3. Run `python prepare_landings.py` (or `python fixed_landings.py plan`, followed by `python fixed_landings.py refine` and `python fixed_landings.py calls`). It stages `outputs/fixed-landings/planned-index.json` and `capture-queue.json`; published files remain untouched. Town span is **5.0 km**, or **7.0 km** only for miami, tampa, jacksonville, st-petersburg, ftl, west-palm-beach, fort-myers, orlando if added. Close is **2.0 km**. Phone crops halve widths: 2.5 km / 3.5 km and 1.0 km. Town and Close share exactly one projected target. There are no other spans.
4. Before applying an exception to an unlisted mainland waterfront, the refinement step tries nearby public town-center features within 1.2 km of the original camera center and requires all four frames to meet 55%. Framing searches the accurate land polygon, including sand, with one target constrained by the tighter Close/phone hero box. Mainland heroes stay in the middle 40%; narrow-island/water-constrained coastal contexts use the middle 60%. The normal land target is 55%; the exception targets 25% Town and 35% Close. Fixed zoom and a public hero in the town/locality take priority. Remaining water shortfalls stay flagged, never corrected by stretching land or changing zoom. Search uses a 5 m simplified polygon; final reported areas use the original polygon. The map retains north orientation and 45° tilt; coastlines supply their natural diagonals. Shared-center and Close hero limits can prevent a literal lower-third shoreline at the wider zoom; prioritize fixed zoom, public hero and land coverage in the user's stated order.
5. `fixed-landing-overrides.json` contains reviewed OSM public hero choices and locality evidence. Census polygon containment verifies incorporated places/CDPs. Named unincorporated places without a municipal polygon use an explicitly identified OSM place/public feature and official locality reference; `hero_verification.boundary.kind` distinguishes this from polygon containment. No municipal boundary is fabricated.
6. Capture each staged relative URL in the shared viewer at **1600 × 1000** after `body[data-ready="true"]`. Save PNGs to `outputs/fixed-landings/captures/<id>-<town|street>.png` and sidecars with the DOM `data-camera`, `data-viewport` and actual browser error entries. Render all geometry already in the package; do not change the scene for screenshots. Sidecars must match the plan.
7. Run `python finalize_landings.py`. It writes the same four filenames: `<id>.webp`, `<id>-m.webp`, `<id>-close.webp`, `<id>-close-m.webp`. Phone is the centered 800 × 1000 crop of the identical desktop render, so lighting and tilt match. Existing schema fields remain; `qa`, `frame_class`, source links and verification records are additive. It generates `landing/fixed-camera-review.html`, one contact-sheet row per town, paginated JPEG sheets, a full-sheet JPEG, and QA CSV/JSON under `landing/qa/`.
8. Run `python check_landings.py`. It checks all 668 sizes/formats, exact widths, zoom ratios, shared target, tilt, hero centrality and 2–4 Town / 1–3 Close OSM callouts in both crops, each at least 8% of frame width from every edge (128 desktop pixels, 64 phone pixels). Review the sheets and fix non-water failures. Permitted island water exceptions remain visible in the report. Measured water percentages are projected ground-plane polygon areas, not a color-threshold guess or a claim that tree/building side faces are water.
9. Run `python sync_walkthrough.py`, then `python publish_town_flight.py`. The existing site uses the unchanged image filenames; regenerated camera metadata now uses the actual camera center rather than assuming the hero is centered. The region raster, art and display-color recipes are unchanged. Inspect the walkthrough and contact sheets before pushing **atlas only**.

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

The display filter ends with a restrained 3×3 edge-sharpening kernel (center
1.48, four neighbors −0.12, sum 1). This preserves flat colors and alpha while
slightly improving roof/street edge contrast. It also applies to scenes without
a water-color recipe. It does not create detail absent from the original render.

The walkthrough uses one continuous canvas and one projected world camera.
The regional raster and geographically anchored town textures are drawn together;
only the camera moves. Town textures use the same selective color transfer and
sharpening, plus feathered map-space edges. Their visibility follows projected
size, rather than timed sliding or crossfading DOM panels. The canvas remains
after arrival, retaining up to four recent detail textures. Town/Close uses the
same camera for a 900 ms zoom. Destination images decode before flight; phone
Photo mode and reduced-motion navigation retain their existing fallback behavior.
