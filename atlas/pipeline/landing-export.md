# Fixed-camera landing export

1. Keep all approved geometry, building recipes, palette, lighting and the 45° orthographic tilt unchanged. `fixed_landings.py` only plans cameras, chooses source-positioned public hero points/callouts and exports images.
2. Inputs: existing landing manifest, catalog/package registry, the packages' OSM-derived `land.json`, source OSM geometry/cover/district extracts, and Census 2025 Florida place boundaries (`cb_2025_12_place_500k`). Restore raw source material from the manifests and Geofabrik Florida snapshot; keep it outside Git. Set `ATLAS_SOURCE_WORK` to the original source-work directory if it is elsewhere. Dependencies: Pillow, Shapely, pyproj and pyshp.
3. Run `python prepare_landings.py` (or `python fixed_landings.py plan`, followed by `python fixed_landings.py refine` and `python fixed_landings.py calls`). It stages `outputs/fixed-landings/planned-index.json` and `capture-queue.json`; published files remain untouched. Town span is **5.0 km**, or **7.0 km** only for miami, tampa, jacksonville, st-petersburg, ftl, west-palm-beach, fort-myers, orlando if added. Close is **2.0 km**. Phone crops halve widths: 2.5 km / 3.5 km and 1.0 km. Town and Close share exactly one projected target. There are no other spans.
4. Before applying an exception to an unlisted mainland waterfront, the refinement step tries nearby public town-center features within 1.2 km of the original camera center and requires all four frames to meet 55%. Framing searches the accurate land polygon, including sand, with one target constrained by the tighter Close/phone hero box. Mainland heroes stay in the middle 40%; narrow-island/water-constrained coastal contexts use the middle 60%. The normal land target is 55%; the exception targets 25% Town and 35% Close. Fixed zoom and a public hero in the town/locality take priority. Remaining water shortfalls stay flagged, never corrected by stretching land or changing zoom. Search uses a 5 m simplified polygon; final reported areas use the original polygon. The map retains north orientation and 45° tilt; coastlines supply their natural diagonals. Shared-center and Close hero limits can prevent a literal lower-third shoreline at the wider zoom; prioritize fixed zoom, public hero and land coverage in the user's stated order.
5. `fixed-landing-overrides.json` contains reviewed OSM public hero choices and locality evidence. Census polygon containment verifies incorporated places/CDPs. Named unincorporated places without a municipal polygon use an explicitly identified OSM place/public feature and official locality reference; `hero_verification.boundary.kind` distinguishes this from polygon containment. No municipal boundary is fabricated.
6. For the additive high-density pass, capture the **same published render URLs** at a **1600 × 1000 viewport with `deviceScaleFactor: 2`**, producing actual **3200 × 2000** screenshots. Use `python landing_2x.py prepare`, then `node capture_landings_2x.cjs`. The latter requires Playwright and installed Google Chrome (set `NODE_PATH` to your Playwright package directory if necessary). Serve the repository locally on port 8785, or set `ATLAS_EXPORT_BASE` to the served `/atlas/landing/` URL. Wait for `body[data-ready="true"]` to be attached, pending assets to finish, and the final GPU redraw. Save screenshots and camera/viewport/DPR/error sidecars under `outputs/landing-2x/captures/`. Do not run the framing planner or modify the scene. Run `python landing_2x.py stage --follow` alongside capture: it encodes both quality candidates, records capture hashes, and removes only its own temporary PNGs to bound disk use. The approved original captures remain untouched. Captures are resumable; use the published `landing/index.json`, not an outdated planned manifest.
7. Run `python finalize_landings.py --density=2`. It adds `<id>@2x.webp` and `<id>-close@2x.webp` at **3200 × 2000**, and `<id>-m@2x.webp` and `<id>-close-m@2x.webp` as the centered **1600 × 2000** crop (`x=800…2400`) of the same render. Encode WebP at quality **82**, method **6**; if the desktop or phone category average exceeds **700,000** or **450,000** bytes respectively, use quality **76** for that category. Report both the quality-82 average and selected-quality average in `landing/qa/retina-report.json`. Match the existing capture transport's untagged Display P3 channel encoding using the macOS Display P3 ICC profile; no renderer materials, lights or palette values change. `landing/retina-review.html` links all contact-sheet pages. This mode verifies hashes of all original images, the landing manifest, camera queue and flight assets; it never writes them. **Keep all existing 1x files exactly unchanged.** The original `python finalize_landings.py` command remains available only for an explicitly authorized 1x rebuild.
8. Run `python check_landings.py`. It checks all 668 sizes/formats, exact widths, zoom ratios, shared target, tilt, hero centrality and 2–4 Town / 1–3 Close OSM callouts in both crops, each at least 8% of frame width from every edge (128 desktop pixels, 64 phone pixels). Review the sheets and fix non-water failures. Permitted island water exceptions remain visible in the report. Measured water percentages are projected ground-plane polygon areas, not a color-threshold guess or a claim that tree/building side faces are water.
9. For this **2x-only pass**, do not run `sync_walkthrough.py` or `publish_town_flight.py`: finalize already places matching new `@2x` files in `atlas/landing/` and `img/atlas/`, while the site continues to use its untouched 1x files. Run `python landing_2x.py verify` and inspect the new sheets before pushing **atlas only**. The flight painting is already **8192 px** wide, so leave both flight rasters and their manifest unchanged. For a separately authorized 1x/camera update, the original publish sequence is `python sync_walkthrough.py`, then `python publish_town_flight.py`.

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

### Landing polish: one water recipe and named callouts

Keep the published `landing/index.json` as the camera/hero baseline. Copy it to
`outputs/fixed-landings/planned-index.json`; **do not run the framing planner**
for a color or callout-only pass. `fixed_landings.py calls` keeps every camera,
span and hero unchanged and selects only named OSM features visible in both
exports. Unnamed features without a named alternative in-frame are dropped.
The callout-name audit records the omissions, including Sanibel's Close frame.

Run `landing_water.py` before browser capture. It clips a single shared water
texture to the approved land polygons, with light teal `#8bcfc9`, mid teal-blue
`#3593ae` and a 1.2 km smooth shore transition for every town. Mapped inland
water polygons and river/canal ways use the shallow color. This is an illustrated
color treatment, not bathymetry; no shoreline coordinates are moved. Rendered
water uses an unlit material so lighting does not create per-town color shifts.
The original sunlight, tilt and architecture recipes remain unchanged. 30A uses
the same town display transform as other town packages; broad Town frames use
the full source forest mask rather than only a neighborhood canopy patch.

After capture/finalize, run `check_landings.py`. It rejects empty or `Mapped…`
callout names and runs `check_water_palette.py` against all 668 images. Water
samples use the geographic mask, exclude a 20 m shoreline margin and neutral occluders (boats, bridges and roofs). For frames with at least 1% open-water coverage in the sampling mask, at least 60% of samples must remain water-like. Palette tolerance is 22 channel values, with at most 5% or three boundary/occlusion pixels outside it. Sparse river frames are identified separately for visual review. Frames
with no open-water sample are reported explicitly. The desktop capture transport
uses display-P3 channel values without an ICC tag, so the QA compares recipe
endpoints in that same capture space. Per-town display water shifts are disabled
in `img/atlas/town-tones.json`; the existing sharpening remains.

Outputs: `landing/qa/callout-name-audit.json`, `water-palette.json`, camera-lock
proof and the new polish contact sheets. Raw OSM inputs and captures remain
ignored; generated water textures are distributable OSM-derived illustration
assets under `regions/landing-water/`.
