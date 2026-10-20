"""External district recipes; the frozen exporter is shared and unchanged."""
import json
from pathlib import Path
P=Path(__file__).parent
# Each entry selects a district-specific palette, roof treatment, and source.
styles={
'mediterranean':(['#fff0d1','#e9ce9e','#f6e4c5','#d7b186'],['#bd8368','#cf9e7a'],'gable','stucco'),
'pastel-cottage':(['#d3eadc','#f3c9c3','#f8e1ac','#f7f0dd'],['#bdc9c3','#dce0d3'],'gable','porches'),
'glass':(['#87b9c5','#9bc9c9','#d3e8e4','#f1f1e6'],['#dfede6','#adc4c3'],'flat','balconies'),
'canal-villa':(['#f7ecd3','#d9e6d0','#efd6bf'],['#b9947c','#cdb59a'],'gable','stucco'),
'historic-brick':(['#b9856b','#d2a68b','#ead4b5','#eee4ce'],['#b5aa93','#ddd8c7'],'flat','stucco'),
'coastal-ranch':(['#e4e5cf','#c9ded3','#f2deb8','#f4eddb'],['#bac5b8','#d2d5c5'],'gable','stucco'),
'wood-cottage':(['#d1c3aa','#e4dcc4','#c7d3bf','#f1e6ca'],['#aabbb1','#c6ccc0'],'gable','porches'),
'beach-condo':(['#f5edda','#c0dcd7','#e9d9c0','#d5e8e1'],['#d4dfd3','#a8c4bd'],'flat','balconies'),
'deco':(['#bdebd7','#f7c5d1','#fae4a3','#fff9ec'],['#dce9df','#f4edda'],'flat','deco'),
'victorian':(['#f1dab8','#c5decf','#efc7bf','#f7efda'],['#a2b7ab','#b8b5a3'],'gable','porches')}
spec={
'palm-beaches':[
('boca-raton','mediterranean','https://bocahistory.org/virtual-exhibition/mizners-dream/'),
('highland-beach','beach-condo',None),('delray','pastel-cottage','https://www.delraybeachfl.gov/government/city-departments/development-services/historic-preservation/historic-districts'),
('palm-beach','mediterranean','https://www.palmbeachpreservation.org/explore-palm-beach/'),('west-palm-beach','glass',None),('riviera-beach','beach-condo',None),('north-palm-beach','coastal-ranch',None),('palm-beach-gardens','canal-villa',None),('jupiter','pastel-cottage',None)],
'fort-lauderdale':[
('hallandale','beach-condo',None),('hollywood','deco','https://www.hollywoodfl.org/1575/Historic-Preservation'),('dania-beach','pastel-cottage',None),('ftl','glass',None),('wilton-manors','coastal-ranch',None),('lauderdale-by-the-sea','coastal-ranch','https://www.visitlauderdale.com/beaches-and-beyond/beaches/lauderdale-by-the-sea/'),('lighthouse-point','canal-villa',None),('bal-harbour','glass',None),('sunny-isles-beach','glass',None),('north-miami-beach','coastal-ranch',None)],
'treasure-coast':[
('stuart','pastel-cottage',None),('jensen-beach','wood-cottage',None),('port-st-lucie','canal-villa',None),('fortpierce','historic-brick',None),('vero-beach','mediterranean',None),('sebastian','wood-cottage','https://www.visitflorida.com/places-to-go/central-east/sebastian/')],
'space-coast':[
('palm-bay','coastal-ranch',None),('west-melbourne','coastal-ranch',None),('melbourne-beach','pastel-cottage',None),('indialantic','coastal-ranch',None),('satellite-beach','beach-condo',None),('cocoa','historic-brick','https://visitcocoavillage.com/discover/historic-walking-tour'),('titusville','historic-brick',None)],
'daytona-flagler':[
('nsb','pastel-cottage',None),('port-orange','coastal-ranch',None),('south-daytona','coastal-ranch',None),('daytona-beach-shores','beach-condo',None),('daytona','beach-condo','https://daytonabeach.gov/274/Historic-Preservation'),('ormond-beach','mediterranean',None),('flagler','pastel-cottage','https://www.visitflagler.com/where-to-stay/vacation-rentals/'),('palm-coast','canal-villa',None)],
'first-coast':[
('staug','mediterranean','https://www.floridashistoriccoast.com/things-to-do/history/historic-district/'),('st-augustine-beach','pastel-cottage',None),('ponte-vedra-beach','canal-villa',None),('jaxbeach','beach-condo',None),('neptune-beach','pastel-cottage',None),('atlantic-beach','wood-cottage',None),('fernandina','victorian','https://www.ameliaisland.com/blog/exploring-history-and-architecture-in-downtown-fernandina-beach/'),('jacksonville','glass',None)],
'forgotten-coast':[
('port-st-joe','pastel-cottage',None),('apalachicola','historic-brick','https://www.floridasforgottencoast.com/business/apalachicola-historic-district/'),('st-george-island','pastel-cottage',None),('carrabelle','wood-cottage',None),('st-teresa','wood-cottage',None),('st-marks','wood-cottage',None)],
'nature-coast':[
('steinhatchee','wood-cottage',None),('cedarkey','wood-cottage','https://www.visitflorida.com/places-to-go/north-central/cedar-key/'),('crystal-river','pastel-cottage',None),('homosassa','wood-cottage',None),('ozello','wood-cottage',None)]}
defaults={
'palm-beaches':'https://www.palmbeachpreservation.org/explore-palm-beach/',
'fort-lauderdale':'https://www.visitlauderdale.com/plan-your-vacation/trip-ideas-itineraries/culture/',
'treasure-coast':'https://www.visitflorida.com/travel-ideas/articles/florida-beaches-exploring-the-treasure-coast/',
'space-coast':'https://www.visitspacecoast.com/explore/communities/cocoa-merritt-island/',
'daytona-flagler':'https://www.daytonabeach.com/things-to-do/districts/beach-street/',
'first-coast':'https://www.floridashistoriccoast.com/things-to-do/history/historic-district/',
'forgotten-coast':'https://www.floridasforgottencoast.com/maritime-museum/brief-history-of-franklin-county/',
'nature-coast':'https://myfwc.com/viewing/explore/historic-towns/'}
for region,rows in spec.items():
 p=P/region;prices=json.load(open(p/'verified-prices.json'));recipes={}
 for town,style,source in rows:
  walls,roofs,roof,detail=styles[style]
  recipes[town]={'walls':walls,'roofs':roofs,'roof':roof,'detail':detail,'source':source or defaults[region],'referenceScope':'district reference' if source else 'regional context; palette is an editorial interpretation','trim':['#f6efdc','#92b6a3']}
 missing=set(prices)-set(recipes)
 if missing:raise RuntimeError((region,missing,set(recipes)-set(prices)))
 ed={'prices':prices,'recipes':recipes,'manual_fixes':['District palettes were selected editorially from local or regional character references; these colors are not a surveyed facade inventory.']}
 if region=='forgotten-coast':ed['manual_fixes'].append('St. Teresa uses June 2026 listing data and St. Marks uses the three months ending May 2026 sale median; those older reporting windows are explicit on the cards.')
 if region=='nature-coast':
  ed['priceEvidence']={'ozello':json.load(open(p/'ozello-price-evidence.json'))}
  ed['manual_fixes'].append('Ozello has no suitable published median: calculated the median of 16 distinct residential listings and retained the individual source records.')
 (p/'editorial.json').write_text(json.dumps(ed,indent=2))
 print(region,len(recipes))
