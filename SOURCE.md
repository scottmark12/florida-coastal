# Where the site's source lives

**This repo is the source of truth for floridacoastal.co.** Vercel deploys whatever is on `main`.

The site was first generated from a single file, `site.html`, by `build.js`. That file is retired as of Oct 29, 2026. Every change since Oct 21 was made here directly, so `site.html` is weeks behind. **Never rebuild the site from `site.html` or any old `build.js` / `build_site.js`.** It would wipe out the live design, copy, photos, email capture and town page changes.

## How to change the site

- **App logic and page templates:** `assets/app.<hash>.js` (one shared bundle). Edit it in place with exact string replacements, checking each one matches exactly once.
- **Styles:** `assets/site.<hash>.css`. Add overrides at the end under a dated comment, for example `/* ===== Nov 3 2026 patch: ... ===== */`.
- **Change a function in place, don't wrap it.** As of Nov 5 2026 there are no `name=function(){ old() ... }` overrides left in the bundle. Edit the real function so each piece lives in one place.
- **The page draws once,** from the single `route();` at the very end of the bundle. Don't add extra `route()` calls after a patch.
- **Before and after a change:** `python3 tools/check.py save before`, make the change, then `python3 tools/check.py compare before`. It walks the home page, Vibe Map, Slider Map, the quiz through to the email thank you, and a sample of town, area and article pages on phone and desktop, and lists any step whose page changed or threw an error. Supabase calls are answered locally, so it never writes leads or events.
- **After editing either file:** run `python3 tools/rehash.py` to rename them by content hash and repoint every page.
- **If page markup changed:** run `python3 tools/prerender.py <pages>` so the saved HTML matches what the app renders. Use `"index.html?hero=a"` for the home page (the hero A/B test would otherwise pick a variant at random).
- **New photos** need three files: `img/x.jpg`, `img/w/x.webp` (1600 wide) and `img/w/m/x.webp` (800 wide). The app swaps the jpg for the webp versions.
- **New articles:** `python3 tools/add_article.py`.

## Change log

A plain English log of every change is kept in the Florida Coastal claude.ai project docs: `florida-coastal-site-patches.md` (through Oct 28) `florida-coastal-site-patches-oct29.md` and `florida-coastal-site-patches-oct29-evening.md`.
