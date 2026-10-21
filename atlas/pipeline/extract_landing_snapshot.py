"""Existing snapshot extraction with native empty-tag filtering.
Schema, selectors and source features are unchanged. Avoid Python callbacks for
untagged coordinate nodes while retaining native location caching.
"""
import osmium
from pathlib import Path
code=Path(__file__).with_name('extract_osm_snapshot.py').read_text()
old="handler=Extract();handler.apply_file(str(source),locations=True,idx='flex_mem')"
new="""handler=Extract()
processor=osmium.FileProcessor(str(source)).with_locations().with_areas().with_filter(osmium.filter.EmptyTagFilter())
for obj in processor:
 if obj.is_node():handler.node(obj)
 elif obj.is_way():handler.way(obj)
 elif obj.is_relation():handler.relation(obj)
 elif obj.is_area():handler.area(obj)"""
assert old in code;exec(compile(code.replace(old,new),str(Path(__file__).with_name('extract_osm_snapshot.py')),'exec'))
