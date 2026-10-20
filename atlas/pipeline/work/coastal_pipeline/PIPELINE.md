# Florida Coastal regional pipeline — 30A reference, version 1

The installed 30A map is the visual reference. Its versioned source, renderer, styles, data and asset hashes are saved in `outputs/30a_locked`. Do not regenerate or restyle that approved reference during a migration to another region.

## Inputs

A region manifest supplies bounds, district IDs and source coordinates, source URLs and retrieval dates, normalized building polygons, mapped land/water polygons, height fields and units, and explicit district recipes. Accept OSM ways **and multipolygon relations**; preserve inner courtyard rings. Never replace a courtyard relation with a bounding rectangle. Deduplicate relation-member ways when they carry duplicate building tags.

Supplement with sourced shoreline/coastal lakes, roads and footpaths, parks/canopy, beach access, marinas and airport routes. Each landmark requires a named source and verified anchor. Housing cards require dated asking-price evidence; asking ranges must not be presented as closed-sale medians. Missing source fields fail approval rather than receive invented values.

Use NAD83 Albers with standard parallels 24°/31.5°, origin 24°N/84°W. One model unit is one kilometer. World axes are east, height, negative north. Never translate building clusters to make room for labels.

## Scale and palette

`rules.json` is the common rulebook. Buildings: real height ×3. Trees: real height ×5. Cap total height, including roofs, at three times the shorter footprint width. Prefer verified height in meters, then sourced levels ×3 m. Otherwise record an assumed two stories. Missing tower height must trigger review, not a fictional skyline.

Cream land, turquoise shallows and deeper blue offshore; sage/olive canopy. Keep discrete water-depth bands. Sand uses the approved **100 m inland display band from the real OSM Gulf shoreline**, clipped to mapped land and water. This matches Seaside's illustration scale; it is not a measured dry-beach width. Never buffer every bay or lake edge as beach. Keep the same Gulf rule throughout 30A.

Rosemary roof swatches are weighted 3 charcoal : 2 silver : 2 copper : 1 deep green, approximately 20% lighter in mean display-RGB brightness than the former green mix. Colors are stable per building and survive view culling. Do not recolor unrelated districts through shared materials.

## District recipes

| Recipe | Massing and detail |
|---|---|
| Seaside | Pastel cottages, porch posts, hard gable planes, tin seams and ridge lines; preserve central green and verified pavilion anchors. |
| Rosemary | Warm stone, cream/gray stucco, ochre and timber walls; varied metal/copper roofs; deep green shutters; townhouse porches. |
| Alys | All mapped courtyard blocks and pedestrian lanes; white walls; seven inset Bermudian roof courses within the height envelope; preserve courtyard holes. |
| WaterColor | Lowcountry forms, generous porches, light metal roofs, muted cottage colors. |
| Other districts | Require an explicit district recipe before approval; never silently approve a generic fallback. |

The test exporter implements footprint massing, flat/gable/Bermudian roof forms and material swatches. It does **not** reproduce the approved viewer's porch/window/landmark kit or plant placement. Its generic urban fallback is deliberately marked unapproved. Miami requires district-specific recipes for Brickell/Edgewater, Art Deco South Beach, Mediterranean Coral Gables and leafy Coconut Grove; these are inputs to author, not modifications to the engine.

## Ground and vegetation

Use mapped streets and narrow footpaths. Exclude canopy from building footprints, including restored relation blocks. Keep continuous inland forest texture but use clustered trees with gaps in Town view. Palms are more common in coastal landscaping; canopy mix is illustrative, not a surveyed species inventory. Retain mapped parks, courtyards and undeveloped areas. Never fill a blank lot just to meet an aesthetic density target.

## Labels and phone rules

State: regional orientation and selected landmarks. Region: 20–30 miles across; fixed geographic building anchors. Town: neighborhood framing and ~45° camera tilt. Labels remain horizontal and alternate above/below the coast. Leader length ≤40 px; hide lower-priority collisions. Under 700 px, Region shows true-position dots instead of building clusters; tapping enters Town. Canvas fills the viewport.

On phones, opening a district card hides the chips and collapses controls into a 42 px bar, with a 10 px gap below the card. Closing restores controls. The approved implementation is `work/atlas_regions/app.js` plus `work/30a_art/style.css`. The test viewer is a basic inspection viewer, **not a replacement for this production interaction layer**. Migrating the 30A-specific interaction branches to generic region data remains a manual integration task.

## Accuracy gates

Export CSV fields: district, model x/y and geographic coordinates, independently referenced OSM coordinates, distance in meters and source URL. Keep unverified fields blank. A zero against a source copied into the model verifies source fidelity, not survey truth. Threshold: <150 m. Extract GLB triangle boundaries and compare to the source water boundaries, including unnamed water bodies. Deliver a camera-projected OSM overlay. Never label an unlicensed aerial as an approved commercial base.

The locked 30A proof uses 12 OSM place nodes and extracted GLB water boundaries. Miami's existing guide coordinates are not independent OSM controls; its CSV intentionally marks them unverified.

## Export and validation

1. Normalize source data without changing anchor positions; retain provenance.
2. Resolve relations, holes, styles and heights; record assumptions.
3. Build exact-footprint geometry with shared scale/recipe rules.
4. Export material-batched GLB plus gzip, district records, inventory and accuracy CSV.
5. Measure package bytes, scale ratios, source completeness and code/rule hashes.
6. Exercise the viewer at 390 and 1440 px; inspect console, labels, card overlap and roof planes. Run physical mid-range-phone timing before publication.
7. Reject production promotion if unresolved source/style issues remain or Region transfer exceeds 4 MB. Lazy-load detailed Town tiles rather than deleting buildings to hit the budget.
8. Archive approved sources and checksums, then promote only that region's assets.

## Reproduction

From the workspace root, with Python including numpy, shapely and pyproj:

```sh
python work/coastal_pipeline/prepare.py
python work/coastal_pipeline/run.py work/coastal_pipeline/30a.json
python work/coastal_pipeline/run.py work/coastal_pipeline/miami.json
```

`prepare.py` adapts the cached input formats to manifests; the two `run.py` invocations use identical engine and rule files. Output is under `outputs/coastal_pipeline/<region>`. The hashes in both reports prove that no city-specific code patch was made between runs. The 30A test export is separate from the approved, richer 30A renderer; do not install it over the locked map.

## Miami test result

The unchanged exporter generated 75,865 building shapes with the same height cap and produced a genuine GLB. It is **not an approved Miami illustration**. The cached source lacks verified meter heights for those buildings, district controls are not independently identified OSM nodes, landmark/style recipes need authoring, county source currency/reuse needs confirmation, and its 15.8 MB compressed model exceeds the Region budget. The approved interaction and landscaping layer still needs a generic region adapter. No speculative manual source or skyline corrections were applied to hide these failures.
