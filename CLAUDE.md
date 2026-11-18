# Florida Coastal site

**The one rule: `src/` is the source. Never edit a built file.** Built files are the five tool pages
(`index.html`, `map.html`, `find-your-mile.html`, `quiz-results.html`, `compare.html`),
`towns/index.html`, all 167 `towns/<id>.html` pages and everything in `assets/v3/`. They are not in
git: Vercel runs the build on every push (`vercel.json`), so an edit to a built file is lost.

Articles, area pages, About, Scoring and the other static pages are still edited in place (see
`SOURCE.md`); they are not part of the build.

## Making a change

```
cd tools/site && npm install         # once
cd ../.. && node tools/site/build.js # build into the repo (to test locally)
python3 tools/visual_check.py snap before   # before your change
# edit src/ ...
node tools/site/build.js
python3 tools/visual_check.py snap after && python3 tools/visual_check.py diff before after
```

- Where things live: `src/README.md`. Town scores, ranks and lists are in `src/data/*.json`; a
  town's own page content is `src/towns/<id>.html`; the shared town page shell is
  `src/templates/town.html`.
- Scripts that change towns, scores, prices or photos must write into `src/` (data JSON or the town
  files), then run the build. Never write into the built pages or `assets/v3/`.
- The build makes the site in a scratch folder and only swaps it in when every page has built, so a
  failed build changes nothing. `node tools/site/build.js --out DIR` builds into DIR only;
  `--dist DIR` makes the whole public site (what Vercel serves).
- New photo: put the webp in `img/c/`, run the build (it makes the m/, s/ and t/ copies), and commit
  the copies. Vercel refuses to build if a page uses a photo whose copies are missing.
- `assets/fc-ga.js`, `assets/fc-connect.js` and `assets/fc-page.css` are edited as plain files; pages
  load a content hashed copy, which the build makes when the file changes.

Preview first: push to a branch (Vercel gives it a preview link) and merge to `main` only when Mark
says go.
