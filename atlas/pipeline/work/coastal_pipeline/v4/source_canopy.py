"""Source-only canopy: no roadside or district-density fallback planting."""
import json, math
from pathlib import Path
import numpy as np
from shapely import points, contains_xy, prepare
from PIL import Image
from shapely.strtree import STRtree
from geometry import *

def source_canopy(m, elements, districts, recipes, land, building_polys, roads, rules):
    prepare(land) # Indexed point-in-land tests; identical geography and placement.
    occupied=STRtree(building_polys); street=STRtree(roads); areas=[]; explicit=[]; provenance=[]
    seen=set()
    for e in elements:
        key=(e['type'],e['id'])
        if key in seen:continue
        seen.add(key);t=e.get('tags',{});source=f"https://www.openstreetmap.org/{e['type']}/{e['id']}"
        if t.get('natural')=='tree' and 'lon' in e:
            p=project(Point(e['lon'],e['lat']));explicit.append((p,1 if 'palm' in (t.get('species','')+t.get('genus','')).lower() else 2,source))
        elif t.get('natural') in ['wood','tree_row'] or t.get('landuse') in ['forest','orchard']:
            if t.get('natural')=='tree_row' and len(e.get('geometry',[]))>1:
                p=project(LineString([(q['lon'],q['lat']) for q in e['geometry']])).buffer(.004)
            else:
                raw=polygons(e)
                if raw.is_empty:continue
                p=project(make_valid(raw))
            p=p.intersection(land)
            if not p.is_empty:areas.append(p);provenance.append(source)
    measured=m['inputs'].get('canopy')
    if measured:
        data=json.load(open(measured['path']))
        for f in data['features']:
            p=project(make_valid(shape(f['geometry']))).intersection(land)
            if not p.is_empty:areas.append(p)
        provenance.append(measured['source'])
    if not areas and not explicit and not m['inputs'].get('canopyRasters'):raise RuntimeError('No mapped canopy or OSM trees. Supply canopy data; sparse defaults are prohibited.')
    # Merge overlaps so tree density cannot multiply where source polygons overlap.
    merged=unary_union(areas);rng=np.random.default_rng(1701);out=[];keys=set();spacing=rules['canopy']['spacingMeters']/1000
    def append(p,kind):
        key=(round(p.x/0.003),round(p.y/0.003))
        if key in keys or not land.covers(p):return
        # Trunk must be outside roofs and roadways; crowns can overhang naturally.
        if len(occupied.query(p.buffer(.001),predicate='intersects')) or len(street.query(p.buffer(.002),predicate='intersects')):return
        keys.add(key);out.append([round(p.x,5),round(p.y,5),kind])
    visible=unary_union([box(d["x"]-2.6,d["y"]-2.6,d["x"]+2.6,d["y"]+2.6) for d in districts]);prepare(visible)
    for poly in parts(merged):
        if not visible.intersects(poly):continue
        x0,y0,x1,y1=poly.bounds
        xs=np.arange(x0,x1,spacing);ys=np.arange(y0,y1,spacing)
        for y in ys:
            xx=xs+rng.uniform(-spacing*.2,spacing*.2,len(xs));yy=np.full(len(xs),y)+rng.uniform(-spacing*.2,spacing*.2,len(xs))
            keep=contains_xy(poly,xx,yy)&contains_xy(visible,xx,yy)
            for x,y2 in zip(xx[keep],yy[keep]):append(Point(x,y2),2)
    raster_stats=[]
    for raster in m['inputs'].get('canopyRasters',[]):
        pixels=np.array(Image.open(raster['path']).convert('RGB'));x0,y0,x1,y1=raster['bounds'];height,width=pixels.shape[:2]
        mask=np.max(np.abs(pixels.astype(int)-np.array(raster['canopyRGB'])),axis=2)<8
        if mask.mean()<.01:raise RuntimeError('Canopy raster has no usable tree class: '+raster['path'])
        extent=project(box(x0,y0,x1,y1));a,b,c,d=extent.bounds
        # Measured land cover supersedes generalized OSM woodland within its extent.
        out[:]=[p for p in out if not extent.covers(Point(p[0],p[1]))];keys.clear();keys.update((round(p[0]/.003),round(p[1]/.003)) for p in out)
        before=len(out)
        for yy in np.arange(b,d,spacing):
            for xx in np.arange(a,c,spacing):
                xx2=xx+rng.uniform(-spacing*.15,spacing*.15);yy2=yy+rng.uniform(-spacing*.15,spacing*.15);lon,lat=I.transform(xx2*1000,yy2*1000)
                col=int((lon-x0)/(x1-x0)*width);row=int((y1-lat)/(y1-y0)*height)
                if 0<=row<height and 0<=col<width and mask[row,col]:append(Point(xx2,yy2),2)
        provenance.append(raster['source']);raster_stats.append({'district':raster['district'],'source':raster['source'],'year':raster['surveyYear'],'bounds':raster['bounds'],'mapped_canopy_fraction':float(mask.mean()),'rendered_crowns':len(out)-before})
    # Individually mapped OSM trees take precedence over coarse raster classification.
    for p,kind,source in explicit:append(p,kind)
    # Calibrate illustrated crowns over land at neighborhood scale, retaining all sourced trunks.
    crown_profiles={}
    for district in districts:
        if recipes[district['style']].get('canopy')!='live-oak':continue
        x,y=district['x'],district['y'];candidates=[Point(p[0],p[1]) for p in out if p[2]==2 and abs(p[0]-x)<1.2 and abs(p[1]-y)<1.2]
        if not candidates:continue
        xx,yy=np.meshgrid(np.arange(x-.85,x+.85,.01),np.arange(y-.85,y+.85,.01));samples=points(xx.ravel(),yy.ravel());samples=samples[contains_xy(land,xx.ravel(),yy.ravel())]
        index=STRtree(candidates);_,distances=index.query_nearest(samples,return_distance=True,all_matches=False)
        radius=float(np.clip(np.quantile(distances,.55),.009,.022))
        crown_profiles[district['id']]={'radiusMeters':round(radius*1000,2),'overheadGreenFraction':round(float(np.mean(distances<=radius)),4),'windowMeters':1700,'method':'10m land-only grid, union of illustrated circular crown projections; sourced trunks unchanged; not a surveyed canopy percentage'}
    rows=[]
    for d in districts:
        area=Point(d['x'],d['y']).buffer(1.65);count=sum(1 for p in out if abs(p[0]-d['x'])<1.65 and abs(p[1]-d['y'])<1.65)
        coverage=merged.intersection(area).area
        row={'district':d['id'],'mapped_canopy_km2_within_1650m':round(coverage,5),'rendered_crowns_in_town_view':count,'source_only':True,'species':'Live-oak illustration; species is editorial unless OSM supplies species','individual_stems_surveyed':False};rows.append(row)
        if count==0:raise RuntimeError('No source-backed canopy in district '+d['id']+'; supply land-cover or OSM tree inputs.')
    return out,{'rule':'Source-only canopy; no sparse fallback or invented roadside planting','spacing_m':spacing*1000,'crown_profiles':crown_profiles,'measured_rasters':raster_stats,'source_polygon_count':len(areas),'osm_tree_nodes':len(explicit),'source_links':sorted(set(provenance)),'districts':rows,'note':'Canopy extent is sourced; crown positions within mapped canopy are illustrative. OSM completeness varies.'}
