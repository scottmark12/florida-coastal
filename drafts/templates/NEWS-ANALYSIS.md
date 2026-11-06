# News Analysis template

For data and current events stories (elections, migration, insurance, storms). Guides about places keep the regular layout.

Example: articles/florida-newcomers-2026-election.html (Nov 6, 2026).

## How it looks
- One centered reading column, about 680px.
- Small rust kicker in caps, then the headline in DM Sans medium (light on phones), then the dek in DM Sans light.
- Byline row with a name, date and read time, under a thin rule.
- Wide lead photo under the byline, with a caption.
- All DM Sans: body regular 18.5px, subheads medium, captions light.
- Charts and tables start with a 2px ink rule and a DM Sans title. No rounded cards.
- Party colors are muted: Democrats soft blue, Republicans soft red. Rust is only for the kicker and buttons.
- Ends with the top 5 button and the More guides band (other news analysis only).

## How it works
- Set "layout": "news" in the draft. Optional fields: "by", "kicker", "cap", "alt". See drafts/templates/news-analysis.json.
- The app's newsView() renders it. Styles are in site CSS under "Nov 6 2026 patch: News Analysis article template".
- News layout articles stay off the home page feed and out of the More guides band on regular guides. They show on the Guides page under their category tab.

## Writing rules
- Open on a real place and a checkable fact, then the twist.
- Tie it to the reader: what it means for someone choosing where to live.
- Short paragraphs, plain words. Stats notation (r, p, R²) goes in "About this analysis", not the body.
- Link every source inline and list them at the end. Results that are not final say "unofficial".
- One pull quote. One "Before you choose a town" box linking our guides.
- A "Towns in this story" list. Group towns by something neutral (like where newcomers are moving), never by who lives there.
- Fair housing: never suggest where a group of people lives or should live. Keep the line in About this analysis.
- No em dashes.

## Images
Three files per image: img/x.jpg, img/w/x.webp (1600 wide) and img/w/m/x.webp (800 wide). Give body images width and height. Charts can be jpg too.
