# Florida Coastal site

Two sites live in this repo until launch:

- **Live site** (`index.html`, `map.html`, `find-your-mile.html`, `towns/<id>.html`, `areas/`, `articles/`
  and the app bundle `assets/app.<hash>.js`): see `SOURCE.md`.
- **Redesign** (`home-v2.html`, `vibe-v3.html`, `quiz-photo.html`, `quiz-results-v3.html`,
  `compare-v3.html`, `towns/index-v2.html`, `towns/<id>-v3.html`): **built from `src/`.**

## Changing a redesign page

Edit the source in `src/` (see `src/README.md`), never the served page or `/assets/v3/`, which the
build overwrites. Then:

```
cd tools/site && npm install && npm run site
cd ../.. && python3 tools/visual_check.py snap after && python3 tools/visual_check.py diff before after
```

`visual_check.py` screenshots every redesign page and key map, quiz and slider states on phone
and desktop with a frozen clock, so two runs of the same code match pixel for pixel. Take a
`before` set first, make the change, take `after`, and check that only what you meant to change
moved.

If someone has edited a served redesign page directly, fold it back into `src/` with
`node tools/site/extract.js --from <commit with those edits>` before building.

Preview first: changes go to the `redesign-preview` branch, never straight to `main`, until Mark says go.
