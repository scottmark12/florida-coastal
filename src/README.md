# Redesign site source

This folder is the source for the redesign pages (the ones that replace the live site at launch):

| Page | Source | Served file |
|---|---|---|
| Home | `pages/home-v2.html` | `home-v2.html` |
| Map (Regions, Vibe Map, Slider Map) | `pages/vibe-v3.html` | `vibe-v3.html` |
| Quiz | `pages/quiz-photo.html` | `quiz-photo.html` |
| Quiz results | `pages/quiz-results-v3.html` | `quiz-results-v3.html` |
| Compare | `pages/compare-v3.html` | `compare-v3.html` |
| Beach Towns | `pages/towns/index-v2.html` | `towns/index-v2.html` |
| 167 town pages | `templates/town.html` + `towns/<id>-v3.html` | `towns/<id>-v3.html` |

**Edit the files here, then build.** The served pages and everything in `/assets/v3/` are generated;
changes made to them directly are overwritten by the next build.

```
cd tools/site && npm install      # once
npm run site                      # builds every page (about 40 seconds)
cd ../.. && python3 tools/visual_check.py snap after && python3 tools/visual_check.py diff before after
```

## What's where

- `pages/` Page HTML. Placeholders like `{{css:map-1}}`, `{{js:map-1}}`, `{{data:...}}` and
  `{{asset:/assets/fc-connect.js}}` become real file paths at build time. Small scripts stay in
  the page between `{{inline-js}}` markers and are minified.
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
- `towns/<id>-v3.html` One per town: a JSON line with what the mini map and form need (id, name,
  nearby towns), the town's SEO block, then its page content.
- `manifest.json` Written by extract: which data files and shared files the pages use.

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

## Starting over from pages with inline code

`node tools/site/extract.js --from <git ref>` reads the redesign pages as they were at that commit
(with their styles, code and data inline) and rewrites this folder from them. Use it to fold in
changes someone made directly to the served pages, then build and run the visual check.

## Shared files outside src (Nov 12 2026)
- `assets/fc-header.css`: the desktop header style every redesign page shares (logo size, left edge, quiz button). Listed in `manifest.json`, so the build versions it.
- `assets/articles-v3.js` and `assets/articles-v3.css`: the magazine layout of `articles/index.html`. They draw from the same `ARTICLES` list as the app, so a new article (tools/add_article.py) shows up without edits.
- `img/fc-favicon.svg` (white mark on dark tab bars, logo blue on light), `img/fc-favicon.png`, `img/fc-favicon-180.png`.
- `tools/town_swap.py` and `tools/town_swap_pages.py` were the one time Nov 12 town list change (6 added, 6 merged). Kept for the record; do not rerun.
