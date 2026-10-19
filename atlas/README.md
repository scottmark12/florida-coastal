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
| Tampa Bay | `tampa`, `apollo-beach`, `ruskin`, `sun-city-center` | [Tampa](regions/packages/tampa-south-shore/atlas-review.html) |
| St. Pete/Clearwater | `dunedin`, `clearwaterbeach`, `gulfport`, `clearwater`, `indian-rocks-beach`, `madeira-beach`, `new-port-richey`, `safety-harbor`, `st-pete-beach`, `st-petersburg`, `tarpon-springs`, `treasure-island` | [St. Pete](regions/packages/st-pete-clearwater/atlas-review.html) |
| Sarasota/Bradenton/Venice | `ami`, `longboat`, `bradenton`, `bradenton-beach`, `cortez`, `englewood`, `sarasota`, `siesta-key`, `venice` | [Sarasota](regions/packages/sarasota-bradenton/atlas-review.html) |

| Naples/Marco/Everglades | `naples`, `marco-island`, `everglades-city`, `chokoloskee` | [Naples/Marco](regions/packages/naples-marco/atlas-review.html) |

Other regions retain their existing overview/legacy GLBs. They are **not finished detailed packages**, and do not receive landing exports: Fort Myers, Keys, Palm Beaches, Fort Lauderdale, Treasure Coast, Space Coast, Daytona, First Coast, Forgotten Coast, Nature Coast and the remaining Emerald Coast. Configuration and editorial preparations that already existed are included; this handoff does not finish them.

## Landing images

37 towns × two WebP files: `<town-id>.webp` at 1600×1000, `<town-id>-m.webp` at 800×1000. These are actual Town-view renders from this atlas, with UI, labels and selection markers hidden. The phone image is the centered half-width crop of the same camera view, with identical camera position/target and vertical extent. Each pair's camera, rendering URL and district lon/lat list are in `landing/index.json`.

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
