# GA4 measurement repair — November 14, 2026

Florida Coastal's primary GA4 property is `properties/556566254`, stream `G-TK3LC2KYBN`.
The existing secondary tag `G-CGLXM7THVK` is retained for page measurement. Custom business events explicitly target the primary stream.

## Coverage and exclusions

All served HTML pages use one synchronous, content-addressed GA bootstrap. It loads Google's SDK asynchronously only on floridacoastal.co and www.floridacoastal.co. Preview/local/admin hosts, recognized automation, and team-marked browsers do not load it. Old inline GA initialization is removed to prevent duplicate configurations. Source templates use the same bootstrap.

`?team=1` marks this browser as a team device. `?team=0` restores counting. Links from the team admin use `?team=1`.

## Business events

- `quiz_start`: existing quiz-start trigger; not a key event.
- `quiz_complete`: existing successful quiz-completion trigger; intended key event.
- `generate_lead`: only after a successful saved signup/inquiry; intended key event. Includes only an allowlisted `lead_kind`.

No email, phone, name, free-form message, quiz answers, or database/session identifiers are passed as custom GA event parameters. Failed submissions and preview submissions do not create GA conversions. The custom admin engagement timer remains separate from Google's own engagement measurement.

Confirmed in GA4 Admin → Events on November 14, 2026: `quiz_complete` and `generate_lead` are both marked as key events, counted once per event, with no default monetary value. The website already sends these coded events; no URL-based derived event rule was created. Existing key-event definitions were retained. The OpenSEO connector exposes read access only; settings were applied in the authenticated Analytics UI.

## Reporting baseline and provisional target

Exclude *.vercel.app hostnames when reviewing historical reports. Do not delete historical visits or pretend their measurement rules matched today's setup. Property dates use America/Chicago; the redesign source commit was November 13 at 3:31 p.m. Pacific.

Use a provisional recovery target of 65% engaged sessions over a rolling seven-day period of clean production traffic. This is based on the site's earlier performance, not an industry benchmark. Pair it with quiz completions / quiz starts and saved leads / sessions. Establish average engagement-time targets separately for articles, town pages, and quiz after seven complete days of clean data; do not infer a sitewide target from mixed preview traffic.

Validate standard GA4 reports after processing; event registration and key-event settings apply going forward.
