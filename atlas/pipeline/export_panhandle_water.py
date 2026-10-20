"""Rebuild the legacy coast wash using the same regional water recipe.
Run from atlas/pipeline; input is the existing atlas shoreline, projected in km.
"""
import sys,json
from pathlib import Path
sys.path.insert(0,'work/coastal_pipeline/v4')
from water_wash import emerald_wash,shape
source=Path('work/coastal_pipeline/v4/panhandle-shoreline.json')
out=Path('../regions/emerald-water');out.mkdir(exist_ok=True)
emerald_wash(shape(json.loads(source.read_text())),(-355,588,10,762),out,4096)
