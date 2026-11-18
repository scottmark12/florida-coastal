# Site source

This folder is the source for the tool pages and the town pages. The build turns it into the served
pages; Vercel runs the build on every push, and the built files are not in git.

| Page | Source | Served file |
|---|---|---|
| Home | `pages/index.html` | `index.html` |
| Map (Regions, Vibe Map, Slider Map) | `pages/map.html` | `map.html` |
| Quiz | `pages/find-your-mile.html` | `find-your-mile.html` |
| Quiz results | `pages/quiz-results.html` | `quiz-results.html` |
| Compare | `pages/compare.html` | `compare.html` |
| Beach Towns | `pages/towns/index.html` | `towns/index.html` |
| 167 town pages | `templates/town.html` + `towns/<id>.html` | `towns/<id>.html` |

**Edit the files here, then build.** Never edit a served page or anything in `/assets/v3/`.

```
cd tools/site && npm install      # once
npm run site                      # builds every page into the repo for local testing
cd ../.. && python3 tools/visual_check.py snap after && python3 tools/visual_check.py diff before after
```

Nov 18 2026: this folder had fallen weeks behind the live site (edits went straight into the served
files after launch). It was brought back in line from the live files and checked page by page: the
built pages match what was live, and the screenshots match pixel for pixel apart from photo
compression. Since then the served files are build output only.

## What's where

- `pages/` Page HTML. Placeholders like `{{css:map-1}}`, `{{js:map-1}}`, `{{data:...}}` and
  `{{asset:...}}` become real file paths at build time. `{{static:/assets/fc-ga.js}}` (also
  fc-connect.js, fc-page.css) points at a content hashed copy of that file, and
  `{{static:/img/map/fl-compass-noband.js}}` at the map outline in `/assets/v3/data/`.
  `{{include:/assets/fc-ga.js}}` pastes a file in. Small scripts stay in the page between
  `{{inline-js}}` markers and styles between `{{inline-css}}` markers; both are minified.
- `pages/index.html` (the homepage) keeps all its styles and scripts inline for speed, one block per
  original patch, in order. It starts with `<!-- photos as written -->`, so the build leaves its
  hand picked photo sizes alone.
- `css/` Page stylesheets, one per run of styles in the original page, in the original order.
  Each block keeps a `/* #id */` comment naming the `<style id>` it came from, so dated patches
  are still easy to find. `town.css` is shared by all 167 town pages.
- `js/` Page code. `map-1/` is the map app, split into numbered parts the build joins in order (01 core, 02 vibes, 03 sliders, 04 phone panel, 05 app start, 06 picks, 07 guide, 08 panel extras, 09 resize; a folder of .js files under `js/` always builds as one script); `quiz-*.js` the quiz; `home-1.js` the home
  page map and carousel; `beach-towns-*.js`, `compare-1.js`, `results-1.js` the rest.
- `data/` Town data as plain JSON. `towns.json` is the town list shared by the map and the quiz;
  `map-ld.json` holds the scores and ranks behind the Slider Map; `compare-d.json`,
  `results-td.json` and `beach-towns-*.json` belong to those pages. Each becomes a cached file
  that declares the same global the page always used (`T`, `LD`, `D`, ...).
- `templates/town.html` The shared shell of every town page: head, header, footer, mini map and
  contact form scripts. `{{town:...}}` slots are filled from each town's file.
- `towns/<id>.html` One per town: a JSON line with what the mini map and form need (id, name,
  nearby towns), the town's SEO block, then its page content.
- `manifest.json` Which data files the pages use. Shared files come from the `{{asset:...}}` markers.
- `js/quiz-3.js` and `js/compare-1.js` start with `// photos as written` (full photos for the quiz
  backgrounds and the Ask a local photo). Data files keep their photo addresses as written too.

## How the build makes the site fast

- Styles, code and data load from `/assets/v3/` with a content hash in the file name, cached for a
  year (`vercel.json`); a changed file gets a new name, so nobody is stuck on an old copy.
- The map and quiz share one cached town list instead of each page carrying its own copy.
- Photos: every photo is also saved at 480px and 960px wide (`img/<dir>/s/`, `img/<dir>/m/`).
  Pages ask for the small copy and a tiny script in each page head picks the size each photo is
  actually shown at, so a 200px tile downloads a 30KB file instead of a 400KB original.
- Shared files (`fc-connect.js`, `fc-aka.js`, `dm-titles.js`, the map outline, site styles) are
  minified into one versioned folder `/assets/v3/s-<hash>/`. `fc-menu.js` and `fc-search.js`
  stay at `/assets/` because they locate the site, and each other, from their own address.

## Old tools

`tools/site/extract.js` made this folder from the pre-launch pages with inline code. It can't read
built pages and is kept for the record only.

## Shared files outside src (Nov 12 2026)
- `assets/fc-header.css`: the desktop header style every redesign page shares (logo size, left edge, quiz button). Listed in `manifest.json`, so the build versions it.
- `assets/articles-v3.js` and `assets/articles-v3.css`: the magazine layout of `articles/index.html`. They draw from the same `ARTICLES` list as the app, so a new article (tools/add_article.py) shows up without edits.
- `img/fc-favicon.svg` (white mark on dark tab bars, logo blue on light), `img/fc-favicon.png`, `img/fc-favicon-180.png`.
- `tools/town_swap.py` and `tools/town_swap_pages.py` were the one time Nov 12 town list change (6 added, 6 merged). Kept for the record; do not rerun.

## Popular right now (Beach Towns)
`src/data/beach-towns-views.json` holds different visitors per town over the last 30 days, with the dates
the page prints under the cards. To refresh: run `tools/explored.sql` (read only) against Supabase, save the
JSON it returns, then `python3 tools/explored.py <file>` and build. The same numbers label the region map.
