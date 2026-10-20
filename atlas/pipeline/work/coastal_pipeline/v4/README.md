# Locked Florida Coastal pipeline v4.5

`pipeline-lock.json` records the exact shared exporter, source validator, scale/palette rules, water treatment, OSM overlay auditor, atlas renderer, package publisher and runner. The runner checks all hashes before and after each build. Region-specific source data, district recipes, prices and editorial corrections remain external inputs, not modifications to the locked renderer.

Run with the workspace Python:

    python work/coastal_pipeline/v4/run.py work/coastal_pipeline/v4/<region>/manifest.json

A candidate is registered in the existing `explore_coast.html` only after source validation, the 150 m source-alignment gate, height-to-footprint limit and 4 MB region-geometry gate pass. An unsuccessful run is not registered as a new approved package. Every successful run writes its OSM overlay, center CSV, price-source CSV, exact pipeline lock and region review page. Screenshots must be captured from the actual atlas at 390 and 1440 pixels before marking visual review complete; embedded live views are not screenshot evidence.

The source adapter must supply complete coast and water geometry, district building footprints, roads, land cover and mapped district anchors. Representative anchors must say what feature they represent. A published median requires a source, metric, reporting period and retrieval date. A listing range requires at least ten source records. Missing measurements are not converted into verified measurements.

The rendering recipes are data: wall and roof colors, colored trim, gable/flat/stepped roof, facade detail, source references, optional geographic style zones and mapped landmark IDs. The approved South Beach recipe uses bright mint, pink, butter yellow and white, with colored trim along the Ocean Drive/Collins zone.

Requested build order is recorded in `queue.json`. Do not skip an unresolved failed build or mark a pending region complete. Miami and the approved 30A assets remain intact while candidates are built separately.

## Authorized v4.1 revision

The unchanged v4 Tampa candidate failed at 8,822,078 compressed geometry bytes and 821,064 tree points. The user authorized a shared revision and Miami revalidation. The original v4 lock is retained separately. v4.1 uses a 5 m overview land tolerance and 8 m cover tolerance, preserves unsimplified ground in spatial tiles, and loads compressed tree-point tiles only around the selected district. The coastline audit uses spatial indexing without changing the distance calculation. Miami passed at 2,092,919 region-geometry bytes, 0.0136 m maximum anchor serialization error and 6.2904 m maximum coastline-source difference. Source alignment is not a survey.

Rollout stopped on a real ENOSPC write failure while saving a Miami screenshot. Reproducible failed Tampa geometry was cleared; its sources and failure evidence remain. This historical storage interruption was subsequently resolved. No remaining region has been published as complete.

Storage recovered to approximately 1.6 GB after the ENOSPC event; Miami screenshots were recovered and verified. Tampa v4.1 rerun resumed.

Available space subsequently recovered to 4.5 GB; no user cleanup confirmation is needed to continue.

## Current locked revision: v4.2

The user authorized revising the shared exporter and revalidating Miami. Full source ground and canopy are spatially tiled, and trees load only around the selected district. The overview coastline tolerance remains 5 m; distant land-cover outlines use 25 m tolerance. Unsimplified town land-cover geometry remains in the detail tiles. Neither building heights nor footprints nor district anchors changed. The strict 4 MB geometry and 150 m source-alignment gates remain in place.

Miami was rebuilt and visually checked at 390 and 1440 px for Region, South Beach and Brickell. Region geometry is 2,075,902 bytes; maximum coastline-source deviation is 6.2904 m and anchor serialization deviation is 0.0136 m. Approved Miami source hashes and protected 30A asset hashes pass. Actual midrange-phone timing is not measured.

The expanded nine-district Tampa candidate is being rerun. v4.1 failed at 4,233,346 bytes; that failure was not waived. Some remaining OpenStreetMap inputs have repeatedly failed at the public Overpass mirrors and are retained as incomplete rather than substituted.

## Reuse contract

1. Acquire complete OSM ways/relations for coast, water, buildings and roads; normalize land cover and district anchors. The source adapter now refuses incomplete town snapshot sets. Keep all source links and licenses with the manifest.
2. Supply district cards and dated price evidence. Each recipe declares wall/roof palettes, a supported roof shape, trim/detail and a character reference. Palettes are editorial interpretations; footprints remain OSM geometry.
3. Build using the locked runner. Building height is 3× the known real height, capped at 3× the shorter oriented footprint width, including the roof. Missing heights remain flagged assumptions. The tree rule is 5× real height with the footprint cap; canopy placement is illustrative, not a surveyed inventory.
4. Retain the approved horizontal-label and phone behavior: true-position anchors, leaders at most 40 px, collision suppression, no region clusters below 700 px, and collapsed controls when a phone district card opens.
5. Audit serialized land edges against every input coastline vertex and serialize district anchors to the accuracy CSV. Under 150 m proves source alignment only. It is not independent real-world survey accuracy.
6. Export overview geometry plus spatial town/ground/tree tiles. Capture actual Region and representative Town screenshots at 390 and 1440 px. Check the package integrity report, source medians, overlay, console, and protected 30A hashes before delivery. Physical-phone timing must be measured separately.

## Final exporter lock: v4.3

Water PNGs now use an indexed palette that preserves every decoded RGBA pixel exactly. The exporter checks that equality. The release gate now includes base geometry, regional buildings, scene metadata, water PNG and water metadata together under 4,000,000 bytes, not only the geometry subtotal. Miami's initial package is 2,463,834 bytes. Its reviewed geometry and decoded imagery are unchanged from v4.2.

Tampa has nine sourced districts and eight inspected 390/1440 px screenshots. Its initial package is 3,994,760 bytes, with maximum source-coast deviation 102.3764 m. A manual input fix adds the existing Census land context outside the OSM rectangle so the package no longer ends in an artificial water strip. That base was rebuilt using the locked engine's identical surface/export functions, with building, road and tree tiles retained. The coastline audit and full package integrity check were rerun. Actual phone timing remains unverified.

Rollout is currently blocked at St. Pete by incomplete OpenStreetMap downloads; see rollout-blockers.json and queue.json. Remaining regional editorial inputs are prepared but are not completed region reviews. No unattended continuation is scheduled.

## St. Pete completion and v4.4 lock

St. Pete/Clearwater source downloads recovered on retry. The complete 13-district package initially exceeded the total 4 MB budget. The shared mesh exporter now chooses indexed overview vertices only where compression improves, with an exact decoded-triangle equality check. Detailed town tiles retain their prior layout. No source position, footprint, height, district style or coastline was removed. This is serialization, not geometric simplification. `mesh_export.py` is included in the implementation lock, and the source overlay auditor reads both indexed and unindexed GLB primitives.

Existing St. Pete and Miami overviews were passed through that same shared export function. Exact before/after triangle comparisons are retained as `lossless-mesh-check.json`. Miami was visually revalidated at 390/1440 pixels for Region, South Beach and Brickell, with no observed console errors. Its source-coast difference remains 6.2904 m.

St. Pete initial assets total 3,963,868 bytes; geometry is 3,313,428 bytes, maximum source-coast deviation 84.2831 m, maximum anchor serialization difference 0.0151 m, 90,280 buildings and 751,900 illustrative trees in spatial tiles. The integrity check covers 1,928 detail geometry tiles. Region, Downtown, Historic Old Northeast and St. Pete Beach were inspected and captured at 390/1440 pixels; phone tap-to-town/collapsed controls passed. Physical-phone load timing remains unverified. Protected 30A and Tampa hashes pass.

Manual input fixes: preserve Census land outside the OSM rectangle, frame the long peninsula with room above phone controls, and put Downtown/Old Northeast first in the St. Pete district choices. The remaining queue is recorded separately; no unattended continuation is scheduled.

## v4.5 — source-backed canopy and historic residential recipe

Every export must obtain canopy extent from mapped tree land cover or OSM tree/woodland data. There is no default roadside planting and a park/golf polygon alone is not evidence of trees. `source_canopy.py` unions mapped woodland, reads explicit OSM tree nodes and applies measured land-cover rasters, then clips trunks away from source buildings, streets and water. A district with no source-backed canopy fails export. Crown placements inside canopy areas are illustrative, not surveyed stems; the source date and spatial resolution remain in the manifest and `canopy-sources.json`.

Input acquisition: `fetch_worldcover.py REGION` reads only local windows of the ESA WorldCover 2021 v200 10 m COGs (tree class 10 and mangrove class 95; CC BY 4.0). `fetch_forest_cover.py REGION` adds Florida FWC Cooperative Land Cover forest/wooded-wetland classes. Higher-resolution local sources override WorldCover: `fetch_tampa_canopy_raster.py` obtains the City of Tampa/USF 2021 classified canopy for Hyde Park and Seminole Heights. Keep OSM geography unchanged. Do not substitute generic density when a source is unavailable; acquire another supported source or flag the failure.

Historic residential recipe is in `rules.json > canopy.historicResidential`: warm cream, peach, ochre and muted painted wood, pitched gables, fine horizontal siding, and broad live-oak illustrations in light varied greens. Apply explicitly to Hyde Park, Seminole Heights, Historic Old Northeast, Coconut Grove and comparable historic residential recipes. Existing approved packages are not silently rebuilt when their input recipes change. Species is editorial unless OSM supplies species. Three-times building height and the height/footprint cap remain unchanged.

Review both affected Tampa towns at 390 and 1440 pixels. Keep roofs/streets visible through the sourced crown distribution. Validate the 4 MB initial bundle, coastline/anchor checks and console before publication. Physical-phone timing still requires real hardware.

Canopy sampling is limited to the renderer's reachable Town views (district boxes of ±2.6 km, beyond its maximum ±2.5 km tree draw range). Full source rasters/forest polygons are retained. This removes invisible trees from export work without replacing or moving land-cover boundaries. Land point-in-polygon tests use a prepared spatial index. Geometry caching hashes the actual construction code and all geometry inputs; canopy-only iterations reuse identical building/coast meshes.

New source canopy uses broad, low live-oak crown geometry and varied light sage tones. Existing 0/1 legacy tree types are unchanged. The atlas displays dataset attribution; source dates, resolutions and individual-tree limitations are downloadable with each review.

## v4.6 — domestic scale and broad historic canopy

House classification retains OSM `building`, use tags, height and levels. Explicit house types, and small unclassified footprints in a historic residential recipe, receive domestic silhouettes. Missing heights use deterministic one- or two-storey defaults (3m/storey); levels-only houses are capped at two storeys. Original OSM height remains in the inventory. All display heights start at 3× real height and remain below 3× the narrow footprint dimension; houses use a tighter 1.2× silhouette cap. Houses keep pitched roofs and do not receive apartment facade bands.

Historic `canopy: live-oak` recipes calibrate circular crown projections to 55% of a 1.7km, land-only neighborhood window, on a 10m audit grid. The radius stays between 9m and 22m. This is an illustration coverage metric, not surveyed canopy coverage. Trunks still originate only in mapped canopy or explicit OSM trees; no fallback planting. The exported `crownProfiles` records the achieved percentage and radius. Existing explicit palm evidence remains required.

`landmarks` may specify `recipe` and `illustratedRealHeightMeters` with a source and an editorial note; the source height is retained separately. `linearLandmarks` selects OSM path classes within a geographic bounding box and a maximum distance to the real coastline. It specifies a display width; promenade rails use the edge nearest the coast. These recipes are portable inputs, with no district-specific engine branch.

Display refinement: historic broad-oak crowns retain 80% of source points using a stable coordinate hash. Crown size and source positions are unchanged; the 55% calibration is before display thinning.
