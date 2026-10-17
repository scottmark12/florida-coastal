# Miami manual fixes

- Replaced the earlier center-only building responses with full OSM footprint geometry, including multipolygon relations; recovered failed western coverage in a separate request.
- Replaced the cached county GIS core land, water, cover and road inputs with attributable OSM layers. Kept the existing US Census atlas only as context outside the detailed core.
- Replaced five approximate guide anchors with named OSM place nodes. Coconut Grove and Coral Gables needed substantial anchor changes. OSM place labels are not surveyed or universally agreed town centers.
- Authored five district style recipes: Brickell glass and cream towers; Edgewater pale waterfront slabs and bands; South Beach pastel stucco with Deco parapets; Coral Gables warm stucco and terracotta gables; Coconut Grove softer cottage colors and metal/tile roofs. Recipe assignment is schematic, not a surveyed facade inventory.
- Added footprint-keyed schematic profiles for Miami Tower and Freedom Tower, framing for One Thousand Museum, and the Colony Hotel palette. These are illustrative interpretations of identifiable buildings.
- Added dated, address-level asking-price evidence for all five district cards. The two examples per district are explicitly labeled and do **not** establish a representative market range.
- Extended the common exporter with geographic Town tiles and a separate Region LOD; corrected linear color export, water-layer overlap, context complexity and planting collision checks. These are reusable engine fixes discovered by the Miami test, so the original v2 workflow did not pass unchanged.
- Kept 30A locked; the Miami test is a separate local review page.

## Remaining acceptance limits

- Buildings without meter heights or storey counts retain flagged two-storey assumptions; see `inventory.json` and `report.json`.
- Prices need a representative, consistently defined market-range dataset before that acceptance criterion passes.
- Physical midrange-phone loading and local recognition of every district cannot be certified from desktop viewport testing.
- Accuracy files measure alignment with the OSM source and serialized geometry, not independent survey accuracy.
