# Florida Coastal reusable pipeline v2

The approved 30A site is locked. This pipeline writes candidates and reports to `outputs/`; it never overwrites the installed site. Region-specific choices live in manifests and recipes, not city-name conditionals. Miami was tested with identical Python, exporter, UI and rule hashes.

## 1. Inputs and provenance

Each region manifest declares:

- `osm`: complete JSON or XML extracts, including building way geometry, relation members and independent place/control nodes. Center-only Overpass output is rejected. Courtyard relations retain inner holes; their member ways are deduplicated.
- `land`: normalized geographic land/water polygons; water is cut out of land rather than covered by decorative disks.
- `shoreline`: the actual ocean-facing coastline as lines, not every bay/lake perimeter.
- `landcover`: sourced forest, marsh, parks and other land cover in geographic coordinates.
- `roads`: sourced street, trail and pedestrian-line geometry.
- `districts`: our district file with stable IDs, true coordinates, descriptions and source links.
- `prices`: our price file, joined by district ID. A verified range needs min/max, a checked date and source URL; median benchmarks are not silently converted into ranges.

Each layer declares its source and commercial-reuse verification status. Unverified source metadata blocks promotion. Do not manufacture footprints, heights, prices or landmark coordinates to make a run pass.

The input adapters accept OSM JSON and XML. Normalized vector inputs use longitude/latitude GeoJSON. The projection is NAD83 Albers, standard parallels 24°/31.5°, origin 24°N/84°W. One exported unit is one kilometer: east, height, negative north.

## 2. Shared scale and palette

`rules.json` is the shared rulebook:

- Buildings = 3× source real height; trees = 5×. Total geometry, roofs included, is capped at 3× the shorter footprint width.
- Prefer verified meters, then building levels ×3 m. Missing height defaults to an explicitly recorded two-story assumption and remains a review item. This is not acceptable as a verified high-rise skyline.
- Cream land; white sand; turquoise shallow-water bands; deeper blue offshore; varied sage/olive canopy.
- The approved beach treatment is a 100 m inland **illustration band** from the actual Gulf shoreline, clipped to mapped land/water. Use that same width along 30A. It is not a measured claim about dry-beach width.
- Rosemary: varied stone, cream, gray, ochre and timber walls. Roof weights: 3 charcoal, 2 silver, 2 copper, 1 dark green. The approved swatches average 19.6% lighter in display RGB than the prior green mix.
- Alys: white courtyard blocks and seven stepped Bermudian roof courses within the unchanged height envelope.

## 3. District style recipe format

See `style-recipe.example.json`. Every district must name a recipe that specifies wall and roof swatches, a roof form, footprint policy, detail requirements, height policy and sources. Example roof enums implemented by the candidate exporter: `gable`, `bermuda`, `flat`. Courtyard holes are source geometry, not guessed empty centers.

The supplied recipes capture the approved 30A families: Seaside, Rosemary, Alys, WaterColor, Grayton, Watersound, Seagrove, Seacrest, Inlet and cottages. Each landmark additionally needs a verified anchor and authored model asset. Recipe text alone does not generate a recognizable landmark. Unknown district recipes block the run; a generic urban fallback cannot qualify as an approved Miami recipe.

The candidate exporter builds footprint massing, roof forms and palette variation. The richer approved porch/window/landmark kit remains a rendering integration requirement. Do not label candidate massing as visually approved 30A quality.

## 4. Ground, canopy and detail

Consume mapped land cover and paths. Use continuous inland canopy texture, clustered Town trees, lighter varied greens and more coastal palms. Exclude vegetation from building and courtyard-block footprints. Preserve actual parks, courtyards and undeveloped ground. Do not invent infill merely to eliminate blank areas.

The candidate exporter consumes normalized land cover, shoreline and roads. Detailed palm/canopy scattering and custom landmark models are not yet automatically exported by the generic massing engine; the locked 30A renderer remains the visual reference for that integration.

## 5. Label and phone rules — reusable code

`ui-rules.mjs` and `ui-rules.css` expose region-independent functions/classes:

- Host supplies projected anchor positions; the algorithm never moves the anchor or a building.
- Labels stay horizontal, alternate above/below the coast, and have leaders ≤40 px.
- Hide lower-priority collisions against accepted labels and supplied UI obstacles.
- Under 700 px, Region uses true-position dots; the host tap handler opens that district's Town camera.
- Map canvas fills the viewport.
- Opening a card collapses controls to a 42 px bar; the card sits 10 px above it. Closing restores controls. No hidden chips under the card.

`check-ui.mjs` tests anchor immobility, collisions, leader length and breakpoints at 390/768/1440 px. These are functional checks, not a physical-phone speed certification. The module is reusable code; integrating it with a new region renderer still requires end-to-end browser validation.

## 6. Accuracy gate

The CSV is calculated from model coordinates versus independently identified OSM nodes from the source extract. It contains model x/y, model longitude/latitude, source longitude/latitude, distance in meters and source URL. Missing controls produce blank error values and a blocking issue, never a fabricated zero. Threshold: under 150 m.

Zero error to OSM proves source fidelity, not independent surveyed accuracy. For geometric changes, also compare the exported GLB water/land boundaries to source geometry. The preserved 30A overlay/edge checks are in `outputs/30a_locked` and `outputs/30a_finish/verification.json`; the generic pipeline currently gates anchors and scale but does not automatically create an OSM raster overlay for a new region. That boundary-overlay integration is a remaining pipeline task and must not be represented as passed for Miami.

## 7. Candidate export and promotion

`pipeline.py` validates first. If inputs fail, it writes only `accuracy.csv` and `report.json`, with actionable manual issues. It does not fetch substitutes or export a misleading candidate.

On valid input it writes a normalized manifest and invokes the same `work/coastal_pipeline/run.py` exporter. Outputs: material-batched GLB, gzip, district records, building inventory, scale/size measurements and source-assumption notes. The output is a candidate, not an automatic production release.

Promotion requires: source/price/style gates resolved, <150 m alignment, checked water geometry, ≤4 MB Region transfer, correct 390/1440 UI, no console errors and acceptable physical-phone timing. Town detail should be separately loaded when a dense city exceeds budget. No promotion happens automatically in this code.

## 8. Run unchanged

Run from the workspace root, or extract the supplied bundle and run from its root. Install Python dependencies from `requirements.txt` and use Node for the pure label checks.

```sh
python work/coastal_pipeline/v2/pipeline.py work/coastal_pipeline/v2/30a.json
python work/coastal_pipeline/v2/pipeline.py work/coastal_pipeline/v2/miami.json
node work/coastal_pipeline/v2/check-ui.mjs
```

Only the manifest argument differs. Do not edit engine/rules between regions. Compare `engine_sha256`, `exporter_sha256`, `ui_sha256` and `rules_sha256` in the reports. The normalized input-generation script is for the existing workspace; the bundle includes its resulting inputs, so regeneration is unnecessary.

## Test status

30A input validation succeeded and generated a separate candidate; its generic massing export does not replace the richer locked site. It also exceeded the 4 MB budget when land-cover/road layers were included, so candidate promotion remains blocked.

Miami stopped at input validation: cached OSM extracts have 18,997 center-only records and zero usable building polygons; five district controls and recipes are missing; five price files lack verified ranges; geographic layer provenance/reuse is unverified. No Miami source edits or speculative fixes were made. No new region was published.
