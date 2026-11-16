# Home hero: Florida as the Vibe Map (Nov 16 2026)

index.html is generated from `index.nov13.html` (the live page before this change) by:

    python3 build_home.py   # swaps in the hero, drops the old map section, defers scripts, lazy images
    node purge.mjs          # keeps only the CSS rules this page uses (needs purgecss + clean-css)
    python3 assemble.py     # inlines the CSS and the hero script, writes index.html

The scripts were written in a scratch folder (/home/claude/perf); fix the paths at the top of each
before rerunning. hero.py holds the hero markup, CSS and script; hero-data.json holds the Florida
outline, mask and the 167 town positions (from src/data/towns.json).

Tracking (fc_events through FC.track, live host only): hero_seen (tiles on first screen 1/0 and
window height), hero_style (tile tap, style key), hero_style_open (second tap opens the map),
hero_clear, hero_pause, hero_top5, hero_vibe, hero_all, hero_map (detail = picked style or empty),
hero_tiles_scroll. GA4 only gets the existing allowlisted events.
