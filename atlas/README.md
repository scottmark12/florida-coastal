# Florida Coastal illustrated atlas

Branch handoff for integration. Nothing outside `atlas/` is changed. **Do not merge or commit to `main` as part of this handoff; main deploys the live site.** The existing site has not been wired to this atlas.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/atlas/explore_coast.html`. No build, API key or external JS CDN is needed to view the committed atlas. All runtime assets and review links are relative. Serve `.glb.gz` and `.trees.json.gz` as binary gzip files **without an HTTP Content-Encoding: gzip header**: the viewer decompresses these explicitly. Requires a modern browser with WebGL and DecompressionStream.

Useful links: [atlas](explore_coast.html), [landing gallery](landing/review.html), [landing manifest](landing/index.json), [catalog](regions/catalog.json), [districts](regions/districts.json).

## Finished/built coverage

Here “finished” means the existing approved or review-ready detailed package, not a new blanket production approval. 30A and Miami were approved; Tampa Bay, St. Pete/Clearwater and Sarasota have built review packages. Naples/Marco has passed the locked pipeline and visual review. Physical mid-range-phone loading time is still unverified. Price sources are dated snapshots, not live pricing.

| Package | Catalog town IDs with landing images | Review |
|---|---|---|
| 30A, frozen approved reference | `30a` | [30A](regions/30a-review/index.html) |
| Miami | `miami`, `southbeach` | [Miami](regions/packages/miami/atlas-review.html) |
| Tampa Bay | `tampa`, `gibsonton`, `apollo-beach`, `ruskin`, `sun-city-center` | [Tampa](regions/packages/tampa-south-shore/atlas-review.html) |
| St. Pete/Clearwater | `hudson`, `port-richey`, `new-port-richey`, `holiday`, `tarpon-springs`, `palm-harbor`, `oldsmar`, `dunedin`, `safety-harbor`, `clearwaterbeach`, `clearwater`, `belleair-beach`, `indian-rocks-beach`, `indian-shores`, `redington-shores`, `north-redington-beach`, `redington-beach`, `madeira-beach`, `treasure-island`, `st-petersburg`, `gulfport`, `st-pete-beach`, `tierra-verde` | [St. Pete](regions/packages/st-pete-clearwater/atlas-review.html) |
| Sarasota/Bradenton/Venice | `ami`, `longboat`, `bradenton`, `bradenton-beach`, `cortez`, `englewood`, `sarasota`, `siesta-key`, `venice` | [Sarasota](regions/packages/sarasota-bradenton/atlas-review.html) |
| Naples/Marco/Everglades | `naples`, `marco-island`, `everglades-city`, `chokoloskee` | [Naples/Marco](regions/packages/naples-marco/atlas-review.html) |
| Emerald Coast beyond 30A | `perdido-key`, `pensacola`, `gulf-breeze`, `pensacola-beach`, `navarre`, `navarre-beach`, `mary-esther`, `fort-walton-beach`, `okaloosa-island`, `shalimar`, `valparaiso`, `destin`, `niceville`, `miramar-beach`, `freeport`, `pcb`, `panama-city` | [Emerald Coast](regions/packages/emerald-coast/atlas-review.html) |
| Jacksonville | `jacksonville` | [Jacksonville](regions/packages/jacksonville/atlas-review.html) |
| Forgotten Coast | `mexico-beach`, `port-st-joe`, `apalachicola`, `st-george-island`, `carrabelle`, `st-teresa`, `st-marks` | [Forgotten Coast](regions/packages/forgotten-coast/atlas-review.html) |
| Nature Coast | `keaton-beach`, `steinhatchee`, `horseshoe-beach`, `suwannee`, `cedarkey`, `inglis`, `yankeetown`, `crystal-river`, `ozello`, `homosassa`, `weeki-wachee`, `hernando-beach`, `aripeka` | [Nature Coast](regions/packages/nature-coast/atlas-review.html) |


Remaining towns in Fort Myers, Keys, Palm Beaches, Fort Lauderdale, Treasure Coast, Space Coast, Daytona and First Coast beyond Jacksonville retain overview coverage and are not finished detailed packages. They do not receive landing exports yet.

## Landing images

45 towns × four WebP files: `<town-id>.webp` and `<town-id>-m.webp` are the wider Town view; `<town-id>-close.webp` and `<town-id>-close-m.webp` retain the Street close view. Desktop is 1600×1000; phone is 800×1000. These are actual Town-view renders from this atlas, with UI, labels and selection markers hidden. The phone image is the centered half-width crop of the same camera view, with identical camera position/target and vertical extent. Each pair's camera, rendering URL and district lon/lat list are in `landing/index.json`.

The 30A catalog entry describes a corridor, so its representative Town image is centered on Seaside; the exact representative center is recorded. Every image now uses its sourced hero point, recorded with a one-line reason. To regenerate a screenshot, serve the atlas and use the manifest's relative render URL at the corresponding viewport. `landing=1` enables the clean render mode. Wait for `body[data-ready="true"]`; `body[data-camera]` exposes the actual orthographic camera. Save as WebP at the specified dimensions. Images were inspected as a contact sheet; browser console checks found no errors during export.

**Attribution must appear beside the landing images in the live walkthrough**, since these deliberately contain no UI labels: © OpenStreetMap contributors, ODbL; ESA WorldCover 2021 v200 (CC BY 4.0) and Tampa/USF 2021 canopy where used. See package canopy sources, [OSM copyright](https://www.openstreetmap.org/copyright), and [WorldCover DOI](https://doi.org/10.5281/zenodo.7254221). Rendered crowns and building heights are illustrative, not surveys.

## Rebuild the viewer

Node 20+:

```sh
cd atlas/pipeline
npm ci
npm run build:viewer
```

Source: `pipeline/work/atlas_regions/app.js` and `pipeline/work/coastal_pipeline/v3/atlas-layer.js`. The latter is the adapter used by v4 despite its historical folder name. Output: `regions/app.js`. CSS/HTML entry point: `explore_coast.html`. Existing approved 30A rendering remains in the shared app. The quiz bridge, features, routes and roads remain in `regions/` for Claude to connect to the site's real quiz state.

## Build a detailed region

Python 3.11+; use a virtual environment:

```sh
cd atlas/pipeline
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python fetch_inputs.py tampa-south-shore
python build_region.py tampa-south-shore
```

Substitute `miami`, `st-pete-clearwater` or `sarasota-bradenton`. Region manifests and recipes are under `pipeline/work/coastal_pipeline/v4/<region>/`. District/price files and normalized land, roads and shoreline inputs are committed. Raw sources are intentionally absent. `fetch_inputs.py` restores OSM and canopy inputs from documented public endpoints; current OSM may differ from the reviewed historical snapshot. Acquisition can fail or be rate-limited; it fails explicitly rather than inventing missing features. Normalized reviewed coastlines are retained; refreshing those deliberately is a separate geography change requiring a new overlay review.

The build uses the frozen shared implementation, writes tiled geometry, source-only canopy, accuracy CSV, overlay, price CSV and report, then copies the package into `regions/packages/<region>/`. Outputs/caches under `pipeline/outputs/` are ignored. There are no committed symlinks; the wrapper creates a temporary local output link when running. Run `npm run build:viewer` after viewer changes. If intentionally editing locked implementation, review the changes, then run `python work/coastal_pipeline/v4/lock.py` before building.

The exported accuracy numbers compare serialized geometry to OSM source data; they are not independent survey accuracy. Release gates include <150m source-edge error, height/width limits, sourced price evidence, canopy source evidence and <4MB initial region assets. Refresh screenshots/landing exports after rebuilding; old images are not automatically new validation.

30A is the frozen reference and predates the generic v4 exporter. Its historical build/refinement scripts, scale configuration, normalized geometry and district data are included under `pipeline/work/30a_*`, plus its landmark helpers. Do not overwrite it by running a generic v4 region build. Its old acquisition/refinement scripts are retained for maintenance, not advertised as a single-command reproduction of the approved snapshot.

## Shared rules

Buildings start at 3× real height; houses without OSM height use 1–2 real stories. Height is capped at 3× narrow footprint width; classified houses use a stricter 1.2× silhouette cap. Historic residences have painted wood palettes and pitched roofs. Historic broad oaks come from source canopy, with 80% display retention after the latest thinning; the 55% canopy calibration in old audit records is before that thinning. Palms require explicit source evidence. Labels remain at geographic anchors with short leaders; mobile Region views use dots and district cards collapse controls. See `pipeline/work/coastal_pipeline/v4/README.md`, `rules.json`, regional `recipes.json` and the source code for complete rules.

## Excluded inputs and where to restore them

- **OSM extracts:** Overpass at `https://overpass-api.de/api/interpreter`, with alternate public endpoints in `fetch_inputs.py`. Bounds and district anchors come from the committed manifest/district files. The exact historical download is not archived in Git.
- **ESA WorldCover rasters:** 2021 v200 COGs at `https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/`; `fetch_worldcover.py` reads small district windows. Metadata sidecars retain bounds, tile URL and class selection.
- **Tampa canopy:** City/USF 2021 raster layer 11, `https://gis.waterinstitute.usf.edu/arcgis/rest/services/Maps/Tampa_2021_TreeCanopy/MapServer`; `fetch_tampa_canopy_raster.py` restores Hyde Park and Seminole masks.
- **FWC land cover:** `https://gis.myfwc.com/hosting/rest/services/Open_Data/Cooperative_Land_Cover/MapServer/1`; `fetch_forest_cover.py` restores mapped wooded classes within region bounds.
- **Census raw GIS:** public TIGER/Line and cartographic boundaries at `https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html`. Existing normalized context polygons are included, not raw ZIP/shapefiles. Historical acquisition code is under `pipeline/work/coast_geography` and `pipeline/work/florida_atlas`.
- **OSM overlay tiles:** re-fetched by `proof.py` from `https://tile.openstreetmap.org/{z}/{x}/{y}.png`; respect OSM tile usage policy. Review overlay images are included, tile caches are not.
- **Other historical 30A imagery/source snapshots:** endpoints are in its acquisition scripts/metadata; downloaded aerials and price-page HTML are excluded. Price source URLs and dates remain in district records/CSVs.
- **Dependencies/caches:** `node_modules`, virtual environments, Python packages, pickle caches, raw image tiles and logs are excluded. Install dependencies with the commands above.

`.gitignore` excludes source downloads and caches. Gitignore cannot express a file-size threshold; `python pipeline/check_handoff.py` rejects any deliverable over 50,000,000 bytes and checks relative links, camera consistency, catalog IDs, image dimensions and the portable pipeline lock. No file in this handoff exceeds that threshold.

## Landing hero framing (2026-10-18)

The 28 existing town landing pairs are centered on individually chosen, sourced hero points. `landing/index.json` retains its original fields and adds `hero` and `callouts`. `landing/hero-sources.json` records the OSM feature links and projected callout positions. `landing/review.html` shows the images and one-line reasons. Coordinates are WGS84; camera coordinates remain atlas kilometers. Every callout is inside both crops with a 3% edge margin. These are geographic points, not new geometry or visible labels baked into the images.

Desktop is 1600×1000; phone is the central 800×1000 crop at the same camera position, tilt and vertical span. Existing spans are unchanged (30A 1.4 km, other towns 2.8 km). `python pipeline/check_landings.py` validates image dimensions, camera/hero alignment and projected callout visibility; results are in `landing/validation.json`.

Exceptions: Sun City Center has an inland recreation-campus hero, not a coastal waterfront. Ruskin uses the county's Domino Park boat-ramp location; the frame exposes sparse detail toward the southern edge of the existing approved package. No geometry was extended to hide that limitation. The other hero choices and reasons are in the manifest. Source positions identify the mapped feature, not an independent survey measurement.

### Naples/Marco release

Naples, Marco Island, Everglades City and Chokoloskee have detailed packages and hero landing pairs. Initial regional assets total 2,284,184 bytes; maximum exported coastline deviation is 84.799 m and maximum district-anchor deviation is 0.008 m. The review page includes the OSM overlay, accuracy and price CSVs, phone/desktop captures and landing links. Manual input work: recovered Marco buildings/streets through OSM API map tiles after Overpass failures; fitted the regional camera to the east–west town extent; extended Census background context to the wider frame. The renderer, style recipes and shared rules were not changed.

For an unavailable Overpass district download, `python osm_api_fallback.py REGION TOWN` (from `pipeline/`) obtains the same building/highway selection using four bounded requests to `https://api.openstreetmap.org/api/0.6/map`. The downloaded file remains ignored; do not merge its other features into the reviewed geography input.

### Pensacola city package (2026-10-19)

City-specific detailed coverage, hero/callouts and both landing sizes are available. [Review](regions/packages/pensacola/atlas-review.html). Initial assets: 511348 bytes; maximum shoreline/source alignment error: 131.629 m. Sourced citywide median is labeled as such. Other towns in the parent coastal region remain at their previous coverage. Manual input fixes are documented in the review and source-conflicts.json. Shared renderer and pipeline rules are unchanged.

### Jacksonville city package (2026-10-19)

City-specific detailed coverage, hero/callouts and both landing sizes are available. [Review](regions/packages/jacksonville/atlas-review.html). Initial assets: 1351886 bytes; maximum shoreline/source alignment error: 68.903 m. Sourced citywide median is labeled as such. Other towns in the parent coastal region remain at their previous coverage. Manual input fixes are documented in the review and source-conflicts.json. Shared renderer and pipeline rules are unchanged.

The Pensacola and Jacksonville source inputs use the dated Geofabrik Florida snapshot `florida-261017.osm.pbf` (MD5 `7748a39378ba82af00e5fbc35603143c`), from https://download.geofabrik.de/north-america/us/florida.html. Raw PBF/downloads remain excluded. The optional `pipeline/extract_osm_snapshot.py` acquisition adapter requires `pip install osmium`; it writes the same raw input schema from a local snapshot. Normalized, reviewed inputs remain the source for rebuilding. Do not regenerate them without rechecking the documented source conflicts and bridge-type normalization.

### Pensacola-Beach city package (2026-10-19)

City-specific detailed coverage, hero/callouts and both landing sizes are available. [Review](regions/packages/pensacola-beach/atlas-review.html). Initial assets: 200094 bytes; maximum shoreline/source alignment error: 4.989 m. Sourced citywide median is labeled as such. Other towns in the parent coastal region remain at their previous coverage. Manual input fixes are documented in the review and source-conflicts.json. Shared renderer and pipeline rules are unchanged.

### Panama-City city package (2026-10-19)

City-specific detailed coverage, hero/callouts and both landing sizes are available. [Review](regions/packages/panama-city/atlas-review.html). Initial assets: 1048697 bytes; maximum shoreline/source alignment error: 33.06 m. Sourced citywide median is labeled as such. Other towns in the parent coastal region remain at their previous coverage. Manual input fixes are documented in the review and source-conflicts.json. Shared renderer and pipeline rules are unchanged.

### Pcb city package (2026-10-19)

City-specific detailed coverage, hero/callouts and both landing sizes are available. [Review](regions/packages/pcb/atlas-review.html). Initial assets: 753891 bytes; maximum shoreline/source alignment error: 33.06 m. Sourced citywide median is labeled as such. Other towns in the parent coastal region remain at their previous coverage. Manual input fixes are documented in the review and source-conflicts.json. Shared renderer and pipeline rules are unchanged.

### Destin city package (2026-10-19)

City-specific detailed coverage, hero/callouts and both landing sizes are available. [Review](regions/packages/destin/atlas-review.html). Initial assets: 436647 bytes; maximum shoreline/source alignment error: 5.011 m. Sourced citywide median is labeled as such. Other towns in the parent coastal region remain at their previous coverage. Manual input fixes are documented in the review and source-conflicts.json. Shared renderer and pipeline rules are unchanged.

### Illustrated marina boats (2026-10-19)

Source-positioned docks carry illustrative moored boats, not live vessel traffic. Land, buildings, scale and canopy rules are unchanged. Run `python fetch_boats.py` from `atlas/pipeline` to restore excluded OSM extracts and regenerate boat sidecars. Source windows are in `pipeline/work/coastal_pipeline/boat-sources.json`; counts and omissions are in `regions/boats-report.json`. Raw XML goes under ignored `pipeline/work/coastal_pipeline/raw/boats/`. `build_region.py` reapplies the committed boat sidecar and checks the combined 4 MB limit. After changing land geometry, regenerate boats to rerun land-clearance checks. Downtown Panama City marina remains unpopulated because of its documented closure. Runtime boat files are gzip compressed.

### Emerald and Forgotten Coast water recipe
`pipeline/work/coastal_pipeline/v4/water-recipes.json` controls the vivid green-turquoise shore bands (220 m and 550 m), blue-turquoise transition (1.15 km), and deep blue (2.4 km). Edges blend across 100 m. These are illustrative color distances, not bathymetry. The default wash for all other regions is unchanged. Set `waterRecipe: "emerald-forgotten"` on any future package manifest in these two regions; current Emerald packages select it automatically.

Rebuild package washes by running `python work/coastal_pipeline/v4/water_wash.py work/coastal_pipeline/v4/<package>/manifest.json` from `pipeline`, then publish the resulting `shore-wash.png` and `.json`. Run `python export_panhandle_water.py` for the existing 30A/Forgotten Coast/state overview layer. Its compact projected shoreline is derived from the atlas's existing geography; no land, building or coastline geometry is changed. Legacy water bands are hidden in those region views so they do not compete with the new wash.

Town-entry camera overrides live in `regions/town-views.json`. Destin opens on the existing HarborWalk landing hero (1.4 km desktop, 0.9 km phone); district coordinates, labels, landing cameras and callouts are unchanged. Visible building tiles follow the camera center.

### Forgotten Coast detailed towns (2026-10-19)

Port St. Joe, Apalachicola, St. George Island, Carrabelle and St. Marks now have detailed packages, town-entry hero cameras, source-linked prices, OSM overlays, and desktop/phone landing images with callouts. [Review all five](regions/packages/forgotten-coast/atlas-review.html). St. Teresa was initially blocked by missing OSM footprints; the supplemental source update below resolves that gap. St. Marks pricing explicitly discloses a one-sale, older sample.

Rebuild each with `python build_region.py <town-id>` from `pipeline/`, using the committed normalized inputs. Raw sources use the Geofabrik 2026-10-17 Florida snapshot above, ESA WorldCover 2021, and OSM API map extracts for docks; restore downloads with the existing acquisition adapters. Source URLs and manual input corrections are recorded in each manifest and source-conflicts.json where applicable. Apalachicola excludes a documented straight river-mouth closure from physical-shoreline control checks, while retaining its water/land polygons. St. George Island uses the mapped lighthouse-park centroid as its district anchor. Shared renderer, rules and lock remain unchanged.

### Mexico Beach, St. Teresa and Cape San Blas update

Mexico Beach is a selectable town with its canal/shoreline hero and sourced market median. Port St. Joe Region view now includes the full Cape San Blas peninsula; tap Cape San Blas to enter its neighborhood view. The approved Port St. Joe downtown hero and existing buildings remain in place.

St. Teresa uses 244 supplemental Microsoft Global ML Building Footprints. Cape San Blas fills gaps with the same open imagery-derived source, excluding overlaps with mapped OSM buildings. These are not current field surveys; source imagery dates vary. The shared renderer and locked scale/style rules are unchanged. Negative IDs are explicitly local supplemental IDs, not OSM objects. `building-sources.json` and the source GeoJSON subset accompany the inputs. Microsoft data is CDLA Permissive 2.0; OSM is ODbL.

Restore excluded supplemental downloads with `python supplement_st_teresa.py` and `python supplement_cape_buildings.py` from `pipeline/`. Then use the normal `python build_region.py <package-id>`. The build wrapper publishes truthful supplemental attribution without modifying the locked engine. `extract_osm_snapshot.py` also accepts an optional per-town `source_bounds` window for a long peninsula; the Cape acquisition entry is not a separate top-level town. Initial regional assets remain under 4 MB. Source overlays measure model/source agreement, not an independent survey.

### Town navigation (v4.8)

The coastal-region selector directly lists every catalog town in that region. Selecting a town opens its Town view. District choices appear only in Town view and are filtered to the selected town, even when the underlying geometry package serves several towns. A single same-name center uses an About button instead of a duplicate district level. The zoom controls are labeled Florida / Nearby / Town; their existing cameras and URL levels are unchanged. Phone cards retain the slim navigation bar. This user-requested UI revision updates only the viewer portion of the lock; geography, recipes, scale and export rules are unchanged. Rebuild the viewer with `npm ci && npm run build:viewer` from `pipeline/`.

### Full coastal-region framing (v4.9)

Region fits all towns in the selected catalog region, reserving space for the header and controls on desktop and phone. It uses the existing coastal-region overview architecture over continuous statewide terrain; Town retains the approved detailed packages and hero cameras. Town markers stay at their catalog coordinates; labels may move to avoid collisions. No model exports or style recipes changed.

## Two landing zooms, mapped bridges, and coastal height rules (v5.0)

All 82 finished towns have two hero-centered zooms and 328 landing images. Most Town images span 5–6 km; Tampa, Miami and Jacksonville span 8 km, and smaller towns use tighter context. The Street camera preserves the previous close span. `landing/index.json` keeps existing compatibility fields and adds `views.town` / `views.street`, both desktop and phone cameras, and separate per-frame callouts. The gallery compares both zooms side by side. See [export steps](pipeline/landing-export.md).

Bridge geometry comes from every highway/rail bridge way (at least 3 m long) in the existing Geofabrik Florida 2026-10-17 snapshot. Warm decks, pale rails and piers follow the mapped centerlines. The runtime loads only intersecting 10 km bridge tiles. Width uses OSM width/lanes when available; missing width, clearance and pier spacing are illustration estimates. [Coverage](regions/bridges-report.json), [source inventory](regions/bridges.json.gz), and [serialized alignment check](regions/bridges-validation.json) accompany the export. The statewide intermediate mesh stays in ignored pipeline outputs. Raw PBF data is re-downloadable from the existing Geofabrik source recorded above.

The Emerald Coast rebuild preserves footprints and explicit OSM heights/levels, adds flagged type/area estimates for untagged coastal condos/hotels/resorts, and keeps the 3× display and footprint caps. Pensacola historic blocks retain red brick; Pensacola Beach/PCB use white and pastel condos; Destin keeps fishing-village buildings and a separate resort recipe. Mapped marina docks and marina water areas receive illustrative fleets; Destin also has a source-aligned HarborWalk shoreline berth recipe where OSM lacks individual slip detail. Emerald and Forgotten Coast use the existing wider vivid green-turquoise wash to deep blue. Boat occupancy and missing height estimates are not field surveys.


### Nature Coast detailed packages (2026-10-19)

Five source-aligned town packages use the unchanged v5.0 lock: Steinhatchee, Cedar Key, Crystal River, Ozello and Homosassa. The Nature Coast review hub links each town’s OSM overlay, accuracy CSV, source-attributed asking median and both landing zooms. Town-wide prices are September 2026 Realtor.com asking medians; Ozello retains the dated October 17 sample of 16 residential listings, with its individual sample table in `pipeline/work/coastal_pipeline/v4/nature-coast/`. They are not live feeds or neighborhood sale medians.

OSM water, roads, land cover and anchors come from the Geofabrik Florida 2026-10-17 snapshot. ESA WorldCover 2021 supplies measured tree-class masks; mapped wetlands remain open marsh. Microsoft Global ML Building Footprints fills incomplete OSM coverage after excluding footprint overlaps, under CDLA Permissive 2.0. These are imagery-derived house footprints with explicitly estimated default heights, not surveyed houses or heights. Per-town `building-sources.json` and source subsets identify them separately from OSM.

Manual input work: five district palette recipes; source-positioned waterfront heroes; supplemental building footprints; and illustrative Steinhatchee marina-frontage berths where OSM has no individual slips. The renderer, scale rules, labels and phone behavior were unchanged. Every district anchor is under 0.04 m from its serialized source anchor; the maximum coastline-to-source deviation is under 38 m. These measure source fidelity, not independent ground truth. Physical-phone speed remains unverified.

Rebuild an existing normalized package from `atlas/pipeline`: restore excluded OSM and WorldCover inputs with `python fetch_inputs.py <town-id>`, then `python build_region.py <town-id>`. Supplemental normalized footprints are included; original Microsoft downloads are excluded. To refresh their source subsets, use `python supplement_nature_buildings.py`; it downloads only the three published tiles listed in `nature-building-downloads.json`. A coherent historical source archive can be normalized with `python prepare_nature_coast.py /path/to/nature-coast-source`; live OSM re-downloads can differ from the reviewed snapshot and must pass the same accuracy checks.

For mapped marina extraction, run `python extract_marinas.py /path/to/florida-261017.osm.pbf steinhatchee,cedarkey,crystal-river,ozello,homosassa`, then `python boats.py work/coastal_pipeline/downloads/marinas/index.json`. Re-apply source-positioned hero metadata with `python prepare_nature_landings.py`, capture the resulting queue through the shared viewer and finish with `python finalize_landings.py` and `python check_landings.py`. The four WebPs per town use the existing Town/Street camera schema. No raw PBF, tile downloads, canopy PNG inputs or caches are committed.


### Additional Emerald and Nature Coast communities (2026-10-19)

The atlas now includes 20 additional towns and coastal communities beyond the current website list. Emerald Coast additions: Perdido Key, Gulf Breeze, Navarre, Navarre Beach, Fort Walton Beach, Okaloosa Island, Mary Esther, Shalimar, Niceville, Valparaiso, Miramar Beach and Freeport. Nature Coast additions: Keaton Beach, Horseshoe Beach, Suwannee, Yankeetown, Inglis, Hernando Beach, Weeki Wachee and Aripeka. Existing 30A neighborhoods stay districts; they are not duplicated as new towns. The website's root town pages and quiz files were not changed.

`regions/coast-coverage.csv` lists the 31 atlas town/community entries across these two coasts. Neighboring small places inside an existing detailed package are still covered geometrically; this is a curated coastal-community roster, not a census of every named locality. Cinco Bayou, for example, is inside the Fort Walton Beach geometry; a separate priced town entry was not promoted because Realtor.com and Zillow did not publish a local median in the checked pages. No county median or home-value estimate was substituted as a local sale/listing median.

All additions use the same locked engine, scale rules, house defaults, canopy sources, palette format and phone behavior. `pipeline/coast-additions.json`, `coast-addition-prices.json` and `coast-addition-heroes.json` hold the input roster, dated published prices and real OSM hero references. Each town has its own tiled package and both landing zooms. Existing overview nodes are retained; the new shared-exporter overview meshes are appended at their source coordinates. Phone Region geometry is unchanged; the existing dot/tap behavior remains.

Manual input corrections:
- Four communities lack matching OSM place nodes in the snapshot: Perdido Key uses the Johnsons Beach locality; Gulf Breeze uses Woodland Park; Navarre Beach uses its park; Okaloosa Island uses its boat-basin park. Their source anchors and meanings are explicit, not claimed as municipal centers. Hero cameras can use a separate waterfront point.
- Gulf Breeze gives OSM coastline priority over overlapping marine Pensacola Bay water relation 2191869, retaining the mapped port shore.
- Weeki Wachee's inland window was expanded to the actual Gulf edge and completed northward using the attributed OSM API window recorded in `coast-extension-source.json` (retrieved October 19, 2026).
- Four Points' hotel-site polygon was excluded from building extrusion while its ten individual OSM roofs were retained. Sourced floor recipes distinguish the south building and low wings. Waterscape uses its published six-storey count. These use the existing illustrative metres-per-storey convention, not surveyed heights.
- OSM footprint gaps use non-overlapping Microsoft imagery footprints. Facade palettes and ancillary heights are editorial/estimated. Mapped fishing and observation piers are included without inventing vessel occupancy there. Marina input windows are limited to validated land extents.

Prices are published medians with their provider, metric and actual period, not interchangeable sale-price estimates. Keaton Beach's published October 9 median covers six residential listings. Aripeka's available published sales median is a three-month window ending June 2026. Both limitations remain visible in cards and CSVs. Physical mid-range-phone loading time remains unverified.

To restore excluded inputs, run `python fetch_inputs.py <town-id>` from `pipeline`. Rebuild with `python build_region.py <town-id>`. For a fresh coherent source acquisition: run `python seed_coast_additions.py` to create the per-town catalog inputs, then run `python extract_osm_snapshot.py <comma-separated-new-ids> /path/to/florida-261017.osm.pbf`; run `python prepare_coast_additions.py`, `python acquire_addition_buildings.py`, `python supplement_addition_buildings.py` and `python correct_resort_site.py` before building. For the final Miramar frame, run `select_coast_heroes.py`, `refine_coast_heroes.py` and `fetch_coast_hero_canopy.py` before the build so measured canopy covers the Gulf-facing hero window. The explicit anchor and marine-water input adapters are `normalize_coast_addition.py`, `coast-anchor-overrides.json` and `coast-water-priority.json`. No shared normalizer, renderer or locked scale implementation was edited.

For boats/piers: extract the new-town marina windows from the PBF with `extract_marinas.py`, run `filter_coast_marinas.py`, then `boats.py work/coastal_pipeline/downloads/marinas/coast-additions-index.json` and `add_mapped_piers.py`. All raw XML/PBF, Microsoft tile downloads, masks and caches stay ignored. `merge_addition_overviews.py` reads the original overview bytes from Git commit `c0887e33`, then appends only the new package overview meshes. Re-run `register_coast_additions.py`, `select_coast_heroes.py`, `refine_coast_heroes.py` and `prepare_addition_landings.py`, capture through the shared viewer, finalize/check the landings, then run `review_coast_coverage.py`.

### Tampa and Pinellas coastal expansion

The added-town roster is `pipeline/tampa-coast-additions.json`. This adds town packages without rebuilding the existing Tampa South Shore or St. Pete/Clearwater packages. The shared scale, canopy, palette, labels and phone rules remain locked. `pipeline/tampa-approved-package-hashes.json` records the existing package hashes used by the preservation check.

Rebuild the expansion from the same excluded Geofabrik Florida PBF and Microsoft footprint downloads:

```sh
cd atlas/pipeline
python prepare_tampa_additions.py seed
python extract_osm_snapshot.py oldsmar,palm-harbor,belleair-beach,indian-shores,redington-shores,north-redington-beach,redington-beach,tierra-verde,holiday,port-richey,hudson,gibsonton /path/to/florida-261017.osm.pbf
python tampa_additions.py acquire
python select_tampa_heroes.py
python run_tampa_additions.py
# Extract mapped marinas/docks using the same town list and PBF:
python extract_tampa_marinas.py /path/to/florida-261017.osm.pbf oldsmar,palm-harbor,belleair-beach,indian-shores,redington-shores,north-redington-beach,redington-beach,tierra-verde,holiday,port-richey,hudson,gibsonton
python sync_tampa_additions.py
python tampa_additions.py merge
```

The preparation adapter records the published median's actual reporting period and listing inventory, visitor/municipal style sources, OSM reference anchors and ESA WorldCover canopy windows. Missing OSM footprints are supplemented with separately attributed, non-overlapping Microsoft imagery footprints; these are not labeled as OSM buildings. The raw files remain ignored and are re-downloadable using the recorded source URLs.

Hero points and visible callouts are in `pipeline/tampa-addition-heroes.json`. Prepare landing cameras with `python tampa_additions.py landings`, capture both views through the shared viewer using `landing/capture-queue.json`, then run `python finalize_landings.py`, `python check_landings.py`, `python finish_tampa_additions.py` and `python review_tampa_additions.py`. New-town accuracy and price CSVs, preservation results and the two regional landing galleries are exported into `landing/`.

Tampa/Pinellas expansion review galleries: [Tampa area](landing/tampa-review.html) and [St. Pete/Clearwater](landing/st-pete-review.html). The 12 added communities have 48 new WebPs. [Expansion checks](landing/tampa-expansion-report.json) include byte-identical preservation of the existing Tampa and St. Pete packages. Gibsonton needed an input-only fix for land-side classification of a 40 m² fragment at the source crop edge; no source coast vertex moved.

### Accurate regional presentation

Region zoom uses `regions/accurate-overviews.json` to select continuous terrain and streamed source-building meshes. These replace the old state terrain and icon scenes only at Region zoom. Approved Town packages, their styles, cameras and pipeline scale constants remain unchanged. Phones below 700 px retain coastal dots and labels; tapping a town opens its approved detailed model.

`pipeline/build_accurate_overviews.py [coastal-region-id ...]` reads the finished package registry, chooses one complete source tile where packages overlap, and retains its original wall/roof vertices. Architecture is loaded in visible 8 km sections. Tampa and Pinellas additionally fill source gaps from OSM buildings/streets and Microsoft building footprints; these are coverage buildings, not newly researched or approved towns. House height defaults and caps come from the existing shared rules.

To reacquire Tampa/Pinellas coverage, download the Florida OSM PBF from Geofabrik, then run `pipeline/extract_regional_coverage.py <florida.osm.pbf>`. Microsoft tiles are resolved through the existing `work/coastal_pipeline/downloads/ms-dataset-links.csv` source index and downloaded to the ignored raw directory. The normalized mainland fallback is Census/TIGER context (20m normalized input, 50m fallback simplification; exact local OSM overrides it); `pipeline/normalize_overview_context.py <geography.json>` produces the simplified fallback. Exact local OSM land overrides this fallback. Canopy comes from the existing measured land-cover polygons and source tree positions, softened for regional presentation. It is not an invented sparse scatter. Raw downloads remain excluded.

Regional source alignment inherits each approved package's source proof; the coverage export is not a new independent survey or a claim of current building completeness. Desktop load and memory depend on the visible architecture sections. Physical mid-range-phone timing remains unverified.

Run `pipeline/check_overviews.py` to check the registered regional files, the 4 MB initial terrain/cover budget, and byte preservation of the approved Tampa/St. Pete Town packages. Architecture is streamed separately; the initial budget does not describe the full desktop geometry transfer.

`pipeline/regional-coverage.json` defines the areas with contiguous supplemental footprint coverage. Nearby finished coverage is streamed into neighboring regional views; shader exclusions prevent overlapping buildings from being rendered twice. This flag describes export coverage, not a claim that every real building has been surveyed. Town packages remain read-only.

Tampa Bay is one navigation region, combining Tampa, the South Shore, St. Petersburg and the Gulf beaches. Its regional camera fits every listed town. The original Tampa and Pinellas source packages remain separate and unchanged; `catalog.sourceRegions` preserves their build grouping, while `catalog.regions` controls navigation. The viewer streams both source overviews without duplicating assets.

Surrounding Tampa Bay context: `pipeline/build_surrounding_context.py <florida.osm.pbf>` reads real OSM building footprints, road ways, parks, woodland, wetlands, agriculture and water areas into a subdued regional illustration. Download the snapshot from Geofabrik Florida (OpenStreetMap, ODbL); the raw PBF is excluded. This layer adds geographic context without adding destination cards or altering approved Town packages. Both Tampa Bay source overviews reuse one shared context image.

Region view uses one pre-rendered 2D WebP per coastal region (`regions/region-images.json`), with live geographic labels and quiz overlays drawn in 2D. It does not request regional GLBs, bridge meshes or town geometry. Town and State views retain their existing 3D presentation. To refresh regional images, open the shared viewer for each catalog region with `level=region&landing=1&regionalExport=1` at 2048×2048, capture its PNG and `body.dataset.camera` metadata in `pipeline/outputs/region-images/<region-id>.png/.json`, then run `python3 pipeline/finalize_region_images.py` and rebuild the viewer. The export-only URL renders the source models; the normal Region route loads images.

Sarasota–Bradenton’s regional image includes the whole Tampa Bay as northern context. `catalog.contextTowns` controls camera framing and lower-priority contextual labels; these remain linked to their own region’s Town view. `pipeline/regional-context.json` selects the source overviews included when exporting the flat image. Town packages remain unchanged.

Tampa Bay & Sarasota Coast is now one navigation region (`tampa-bay`), with all 37 towns from Hudson through Englewood in one menu and regional frame. Existing Tampa and Bradenton/Sarasota town URLs resolve to this shared region. The three original source/build groups remain in `catalog.sourceRegions`; approved town models are unchanged.

For the combined regional image, `python3 pipeline/prepare_combined_bay_image.py` reuses the calibrated approved Sarasota/full-bay capture, adds distant background margins for wide screens and writes the `tampa-bay` capture pair. Run the normal finalizer afterward. Every town stays in its original projected position.
