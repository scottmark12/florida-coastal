# Florida Coastal region pipeline — v3

The approved 30A release remains in `outputs/30a_locked`. This revision is a **Miami test candidate**, not a replacement for that approved release. The Miami test exposed missing common exporter behavior; these fixes are now in the shared engine. It would be inaccurate to call the earlier v2 test a successful unchanged run.

## Reusable sequence

1. **Collect and freeze inputs.** A region manifest names its bounding box, OSM snapshot, district file, price file, land, shoreline, land cover and roads. Fetch full OSM ways and relation member geometry, not center-only results. Preserve OSM type/ID, tags and source URLs. Keep cached responses; record failures. District-specific source preparation belongs in an adapter, never an `if region == Miami` rendering branch.
2. **Normalize geography.** Use the shared NAD83 Albers projection, kilometer world units, and glTF axes `(east, height, -north)`. Polygonize coastline using OSM's land-on-left convention, preserve islands and polygon holes, subtract inland water. Roads remain at source positions. Optional lower-resolution context must sit outside the detailed review rectangle and disclose its source. Miami uses existing US Census context outside its OSM core.
3. **Validate inputs.** Reject missing building polygons, missing source/license metadata, missing style recipes, unsourced prices, or absent independent OSM place nodes. Match source controls by OSM node ID. Do not turn missing controls into zero error. OSM place nodes are label anchors, not surveyed neighborhood centroids.
4. **Apply one scale rule.** `rules.json.scale` is authoritative: building height is `min(real height × 3, short footprint width × 3)`. Width is the shorter side of the minimum oriented bounding rectangle. Prefer meter height, then storeys × 3 m. Missing height defaults to two storeys and remains flagged in inventory. Trees use real-height × 5, capped at crown width × 3. Assumptions are not verified measurements. No geographic displacement is permitted for visual emphasis.
5. **Assign district recipes.** Recipes contain wall colors, roof colors, roof form (`gable`, `flat`, `bermuda`), facade detail and source. Pick colors deterministically by OSM ID. Maintain courtyard holes. Gables use actual ridge planes; Bermudian roofs have seven courses. A landmark override is keyed by OSM type/ID, with named source, optional tier profile and facade framing. Tier fractions and setbacks are illustrative, not architectural surveys. District style recipes are authored data, not automatic recognition of every house's architecture.
6. **Compose ground and planting.** Cream land, white mapped beaches, sage/olive canopy and stepped turquoise water. Separate water-band elevations prevent overlapping surfaces from flickering. Sample planting in mapped parks and near streets, reject placements intersecting building or road geometry. Planting is illustrative; no surveyed tree-density claim. Keep small roads in Town tiles and major roads in the base.
7. **Export by level.** Base geometry is shared. Region LOD retains taller buildings and a deterministic sample of smaller buildings at their real footprints. Town detail lives in one-kilometer GLB tiles loaded around the chosen district. Gzip every GLB. No giant county model loaded on every tap. Measure base + Region transfer size separately from all lazy-loaded Town tiles. Record missing heights and every tile size.
8. **Apply shared UI rules.** Orthographic camera at 45°. Labels stay horizontal; alternate sides by longitude, move labels only, hide lower priority collisions, leaders ≤40 px. Below 700 px Region view shows true-position dots without building clusters. Tap selects Town view. District selector contains only the chosen region. Canvas fills the viewport. Phone card opens a 42 px controls bar 10 px above its actual measured top. Close restores controls. These contracts are shared from `v2/ui-rules.mjs`.
9. **Prove source alignment.** Export CSV with model float32 coordinates, inverse lon/lat, OSM node coordinates, source URL and meter error. Read serialized land triangles from the GLB, recover boundary edges, and measure each source coastline vertex against those edges. Draw actual exported edges over attributed OSM tiles using the Region camera. Report any error >150 m. These checks prove export fidelity to OSM; they do not independently validate OSM against a survey. Context outside the detailed rectangle is excluded from the OSM accuracy claim.
10. **Review and release.** Check Region and each district at 390, 768 and 1440 widths; inspect roofs, neighborhood styles, source positions, controls and console errors. Record load timing and download bytes. Browser viewport emulation is not a physical midrange-phone benchmark. Verify 30A's lock hashes. Only promote after visual approval, satisfactory data provenance, and physical-device performance verification.

## Commands

From the project root, with NumPy, Shapely 2.2, Pillow and PyProj available:

```sh
python work/coastal_pipeline/v3/engine.py work/coastal_pipeline/v3/miami.json
python work/coastal_pipeline/v3/proof.py work/coastal_pipeline/v3/miami.json
```

Bundle `v3/viewer.js` as ESM using the project's existing Three.js and esbuild dependencies; copy `v3/index.html` beside the output assets. `v3/run.py` automates export, proof and viewer bundling with the bundled Node runtime. Source preparation is separate; rebuilding from frozen inputs does not fetch new data or rewrite rules.

## Style recipe format

```json
{
  "walls": ["#f3d7be", "#eed3cb", "#c9dfd5", "#f5ecd6"],
  "roofs": ["#e6ddc7"],
  "roof": "flat",
  "detail": "deco",
  "source": "https://www.miamiandbeaches.com/l/attractions/art-deco-district/2116"
}
```

A manifest maps each district ID to one recipe. Existing 30A recipes remain in the rule vocabulary; the approved 30A assets are not regenerated or changed by a Miami run.

## Price evidence

Miami cards currently provide **two dated asking-price examples per district**, with addresses, amounts, sources and date. This is useful evidence but **not a representative verified neighborhood range** and does not meet that stronger acceptance criterion. Do not relabel these examples as typical market ranges. Prices, availability, fees and insurance require separate current review before launch.

## Licensing

OSM vectors: © OpenStreetMap contributors, ODbL 1.0, https://www.openstreetmap.org/copyright. OSM tiles appear only in the attributed QA overlay, not in the live 3D map. Context: existing US Census TIGER/Line/state atlas data; US Government works are public domain, https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html. The product is not endorsed by the Census Bureau. No satellite imagery is deployed. Building colors and landmark profiles are original schematic interpretations; source references remain in rules and district data.
