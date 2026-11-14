// Florida Coastal: builds the lead emails (HTML, in the website style) and the personal Shortlist PDF.
// Runs in Node (for testing) and in Supabase Edge Functions (Deno).
// The caller passes in pdf-lib, fontkit, font/logo bytes and an image loader.

// Email palette: the website's (Nov 13 2026 redesign). Ink, muted text, warm greige panels, hairlines.
const C = { ink: "#152A2E", white: "#FFFFFF", gray: "#3E4F52", soft: "#6B7678", band: "#F2EFEA", hair: "#E4E0D8", chip: "#D9D6CF" };
const SITE = "https://www.floridacoastal.co";
// Mailing address for every email footer (CAN-SPAM). fc-send sets it from fc_email_settings.postal_address.
let ADDRESS = "";
export function setAddress(a) { ADDRESS = String(a || "").trim(); }
const addrHtml = () => ADDRESS ? `<br>Florida Coastal &middot; ${esc(ADDRESS)}` : "";
export const addrText = () => ADDRESS ? `\n\nFlorida Coastal, ${ADDRESS}\nTo unsubscribe, reply with "unsubscribe".` : `\n\nTo unsubscribe, reply with "unsubscribe".`;
const UTM = "utm_source=email&utm_campaign=top5";

const SCORE_LABELS = [
  ["beaches", "Beaches"], ["water", "On the water"], ["dining", "Dining and arts"],
  ["nightlife", "Nightlife"], ["meet", "Meeting people"], ["walk", "Walkability"],
  ["outdoors", "Outdoors"], ["quiet", "Peace and quiet"], ["afford", "Affordability"],
  ["airport", "Airport access"],
];

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const firstName = (n) => {
  const f = String(n || "").trim().split(/\s+/)[0] || "";
  if (!f || /test|claude/i.test(f)) return "";
  return f.charAt(0).toUpperCase() + f.slice(1);
};
const monthYear = (d) => d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "America/New_York" });
const link = (t) => `${t.url}?${UTM}`;
const isSaved = (lead) => !!(lead && lead.answers && !Array.isArray(lead.answers) && lead.answers.source === "town_page");

// Skip anything whose dates have all passed ("July 4, 2026", "October 2025")
const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];
function isStale(note, now) {
  const re = /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(?:(\d{1,2}),?\s+)?(20\d\d)\b/gi;
  let m, found = false, future = false;
  while ((m = re.exec(note))) {
    found = true;
    const mo = MONTHS.indexOf(m[1].toLowerCase()), yr = +m[3], day = m[2] ? +m[2] : 28;
    if (new Date(Date.UTC(yr, mo, day, 23)) >= now) future = true;
  }
  return found && !future;
}
function choosePicks(t, now) {
  const ok = (p) => p && !isStale(p.note, now);
  const todo = (t.pick_todo || []).filter(ok), meet = (t.pick_meet || []).filter(ok);
  const out = [];
  if (todo[0]) out.push(todo[0]);
  const m = meet.find((x) => !out.some((o) => o.name === x.name)) || todo[1];
  if (m) out.push(m);
  return out;
}
export function pickTowns(lead, towns, now = new Date()) {
  const byId = new Map(towns.map((t) => [t.id, t]));
  const list = Array.isArray(lead.matches) ? lead.matches : [];
  return list.map((m) => byId.get(m.id)).filter(Boolean).slice(0, 5).map((t) => ({ ...t, picks: choosePicks(t, now) }));
}

/* ---------------------------------------------------------------- EMAIL */
/* Nov 13 2026: emails use the WEBSITE's style (Mark: "use our website style not pdf style").
   Like floridacoastal.co: DM Sans headlines in sentence case with tight tracking, Libre Caslon only for town names
   and article titles, small caps labels, rounded photos and cards, warm greige panels, ink pill buttons with an
   arrow, small caps links with an arrow, the site's footer line. The PDFs keep their own print style.
   Gmail doesn't load web fonts, so the serif falls back to Georgia and DM Sans to Helvetica/Arial. */

/* One tap "when are you moving?" links. Each lands on their No. 1 town page; the site logs it as event
   "timeline" with the lead id, so later emails can branch without a form. */
const TL = [["this-year", "This year"], ["1-2-years", "In 1 to 2 years"], ["dreaming", "Just dreaming"]];
function tlLink(lead, t, key) {
  const base = (t && t.url) || SITE + "/find-your-mile.html";
  return `${base}?utm_source=email&utm_campaign=top5&utm_content=tl-${key}-L${lead.id}`;
}

const F_BODY = "'DM Sans','Helvetica Neue',Arial,sans-serif";
const F_HEAD = "'Libre Caslon Display','Libre Caslon Text',Georgia,'Times New Roman',serif";
const F_TEXT = "'Libre Caslon Text',Georgia,'Times New Roman',serif";
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital@0;1&display=swap" rel="stylesheet">`;
const LOGO = `${SITE}/img/fc-logo-arch-line-ink.png`;

/* building blocks (inline styles, table layout, so Outlook and Gmail keep them) */
const PX = "40px";
const R16 = "16px";
const row = (inner, pad = `0 ${PX}`) => `<tr><td class="px" style="padding:${pad};">${inner}</td></tr>`;
const P = (t, extra = "") => `<p style="margin:0 0 16px 0;font-family:${F_BODY};font-size:16px;line-height:1.65;color:${C.ink};${extra}">${t}</p>`;
const label = (t, extra = "") => `<p style="margin:0 0 10px 0;font-family:${F_BODY};font-size:11.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:${C.gray};${extra}">${t}</p>`;
// headlines read like the site's: DM Sans 500, sentence case, tight tracking
const h1 = (t) => `<h1 class="hero-h" style="margin:0;font-family:${F_BODY};font-weight:500;font-size:36px;line-height:1.08;letter-spacing:-.025em;color:${C.ink};">${t}</h1>`;
const h2 = (t) => `<h2 style="margin:0 0 10px 0;font-family:${F_BODY};font-weight:500;font-size:24px;line-height:1.15;letter-spacing:-.02em;color:${C.ink};">${t}</h2>`;
const townName = (t, size = 26) => `<span style="font-family:${F_HEAD};font-weight:400;font-size:${size}px;line-height:1.1;color:${C.ink};">${t}</span>`;
const deck = (t, extra = "") => `<p style="margin:14px 0 0 0;font-family:${F_BODY};font-size:17px;line-height:1.6;color:${C.gray};${extra}">${t}</p>`;
const sign = (who = "Mark and Betsy Scott") => `<p style="margin:20px 0 0 0;font-family:${F_TEXT};font-style:italic;font-size:17px;color:${C.ink};">${who}</p>`;
const btn = (href, text, dark = true) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${dark ? C.ink : C.white};border-radius:999px;"><a href="${href}" style="display:inline-block;padding:13px 26px;font-family:${F_BODY};font-size:15px;font-weight:500;color:${dark ? C.white : C.ink};text-decoration:none;">${text} &rarr;</a></td></tr></table>`;
const more = (href, text) => `<a href="${href}" style="font-family:${F_BODY};font-size:12.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:${C.ink};text-decoration:underline;text-underline-offset:3px;">${text} &rarr;</a>`;
const rule = (pad = `0 ${PX}`, color = C.hair) => `<tr><td class="px" style="padding:${pad};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" style="height:1px;line-height:1px;font-size:0;background:${color};">&nbsp;</td></tr></table></td></tr>`;
// photos sit inside the margins with rounded corners, like the site's cards
const photo = (src, href, alt, cap) => `<tr><td class="px" style="padding:0 ${PX};">${href ? `<a href="${href}">` : ""}<img src="${src}" width="520" alt="${esc(alt)}" style="display:block;width:100%;max-width:520px;height:auto;border:0;border-radius:${R16};">${href ? "</a>" : ""}</td></tr>
  ${cap ? `<tr><td class="px" style="padding:8px ${PX} 0 ${PX};font-family:${F_BODY};font-size:13px;line-height:1.4;color:${C.soft};">${cap}</td></tr>` : ""}`;
// a greige panel, like the site's price and guide cards
const panel = (inner, pad = "20px 22px") => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${C.band};border-radius:${R16};padding:${pad};">${inner}</td></tr></table>`;
const section = (lab, inner) => panel(`${label(lab)}${inner}`);

function masthead(lab, utm) {
  return `<tr><td class="px" style="padding:28px ${PX} 0 ${PX};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td valign="middle"><a href="${SITE}/?${utm}"><img src="${LOGO}" width="150" alt="Florida Coastal" style="display:block;width:150px;height:auto;border:0;"></a></td>
    <td valign="middle" align="right"><a href="${SITE}/find-your-mile.html?${utm}" style="display:inline-block;padding:8px 16px;background:${C.ink};border-radius:999px;font-family:${F_BODY};font-size:13px;font-weight:500;color:${C.white};text-decoration:none;">Take the quiz</a></td>
  </tr></table></td></tr>
  ${lab ? row(label(lab, "margin:0;"), `30px ${PX} 10px ${PX}`) : `<tr><td style="padding:30px 0 0 0;"></td></tr>`}`;
}
function footer(why, utm) {
  return `<tr><td class="px" style="padding:44px ${PX} 34px ${PX};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid ${C.hair};padding:22px 0 0 0;">
    <img src="${LOGO}" width="120" alt="Florida Coastal" style="display:block;width:120px;height:auto;border:0;margin:0 0 8px 0;">
    <p style="margin:0 0 14px 0;font-family:${F_BODY};font-size:13px;line-height:1.5;color:${C.gray};">167 beach towns, Pensacola to Fernandina.</p>
    <p style="margin:0;font-family:${F_BODY};font-size:12px;line-height:1.7;color:${C.soft};"><a href="${SITE}/towns/?${utm}" style="color:${C.gray};">Beach Towns</a> &nbsp;&middot;&nbsp; <a href="${SITE}/find-your-mile.html?${utm}" style="color:${C.gray};">Take the quiz</a> &nbsp;&middot;&nbsp; <a href="${SITE}/privacy.html" style="color:${C.gray};">Privacy</a> &nbsp;&middot;&nbsp; <a href="mailto:hello@floridacoastal.co?subject=Unsubscribe" style="color:${C.gray};">Unsubscribe</a>${why ? `<br>${why}` : ""}<br>Florida Coastal &middot; floridacoastal.co${ADDRESS ? " &middot; " + esc(ADDRESS) : ""}</p>
  </td></tr></table></td></tr>`;
}
function page(subject, preheader, rows) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
${FONTS}
<style>body{margin:0;padding:0;background:${C.white}}a{color:${C.ink}}@media (max-width:620px){.container{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.hero-h{font-size:30px!important}.stack{display:block!important;width:100%!important;padding:0 0 14px 0!important;border-left:0!important}}</style>
</head><body style="margin:0;padding:0;background:${C.white};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.white};">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.white};"><tr><td align="center" style="padding:0;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${C.white};">
${rows}
</table></td></tr></table></body></html>`;
}

function timelineAsk(lead, t) {
  const pill = ([k, text]) => `<td style="padding:0 8px 8px 0;"><a href="${tlLink(lead, t, k)}" style="display:inline-block;padding:9px 16px;border:1px solid ${C.chip};border-radius:999px;font-family:${F_BODY};font-size:14px;font-weight:500;white-space:nowrap;color:${C.ink};text-decoration:none;background:${C.white};">${text}</a></td>`;
  return row(`${label("One tap, so we send the right things")}${h2("When are you thinking of moving?")}
     <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:4px;"><tr>${TL.map(pill).join("")}</tr></table>`, `30px ${PX} 0 ${PX}`);
}

/* Nov 13 2026 (Mark): "the emails should send a pdf that we built attached, on one page". The email is a short
   cover letter for the PDF: the details live in the attachment, not in the email. */
const PDFS = {
  guide: { url: SITE + "/guides/move-and-belong-guide.pdf", name: "Move-and-Belong-Guide.pdf" },
  flood: { url: SITE + "/downloads/florida-beach-towns-flood-risk.pdf", name: "Florida-Beach-Towns-Flood-Risk.pdf" },
};
// "attached" card: a greige panel with a small PDF mark, the file name and what's inside
const attached = (name, inside) => panel(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td valign="top" width="48"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="32" height="40" align="center" valign="middle" style="width:32px;height:40px;background:${C.white};border:1px solid ${C.chip};border-radius:6px;font-family:${F_BODY};font-size:9px;font-weight:600;letter-spacing:.06em;color:${C.ink};">PDF</td></tr></table></td>
    <td valign="top" style="font-family:${F_BODY};"><p style="margin:0 0 4px 0;font-size:11.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:${C.gray};">Attached</p><p style="margin:0 0 6px 0;font-size:17px;font-weight:500;letter-spacing:-.01em;color:${C.ink};">${esc(name)}</p><p style="margin:0;font-size:14.5px;line-height:1.55;color:${C.gray};">${inside}</p></td>
  </tr></table>`);

export function buildEmail(lead, picks, opts = {}) {
  const name = firstName(lead.name);
  const names = picks.map((t) => t.name);
  const list = names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names.at(-1) : names[0] || "";
  const hasPdf = opts.hasPdf !== false;
  const saved = isSaved(lead);
  const subject = opts.subject || (saved ? "The Florida towns you saved" : "Your Florida Shortlist is here");
  const n = picks.length === 5 ? "five" : picks.length;
  const t1 = picks[0];
  const intro = `${name ? `Hi ${esc(name)}, here` : "Here"} ${saved ? `are the ${picks.length === 1 ? "town" : picks.length + " towns"} you saved` : `are the ${n} towns that fit how you want to live`}. Everything we know about each one is in the PDF.`;
  const rowsList = picks.map((t, i) => `<tr><td width="34" valign="baseline" style="padding:11px 0;border-top:1px solid ${C.hair};font-family:${F_BODY};font-size:15px;font-weight:500;line-height:1;color:${C.soft};">${i + 1}</td><td valign="baseline" style="padding:11px 0;border-top:1px solid ${C.hair};"><a href="${link(t)}" style="text-decoration:none;">${townName(esc(t.name), 21)}</a></td><td align="right" valign="baseline" style="padding:11px 0;border-top:1px solid ${C.hair};font-family:${F_BODY};font-size:13.5px;color:${C.gray};">${esc(t.coast)}</td></tr>`).join("");
  const rows = `
  ${masthead(saved ? "Saved from your visit" : "Your Florida Shortlist", UTM)}
  ${row(`${h1(saved ? "Your saved Florida towns" : "Your Florida Shortlist")}${deck(intro)}`, `30px ${PX} 24px ${PX}`)}
  ${t1 ? photo(t1.mail_img, link(t1), t1.name, `Your No. 1, ${esc(t1.name)}.`) : ""}
  ${row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowsList}</table>`, `22px ${PX} 0 ${PX}`)}
  ${hasPdf ? row(attached(`${name ? name + "'s " : "Your "}Florida Shortlist`, `A page for each town: home prices, the airport drive, the season, the honest heads up and your first weekend. Then ${picks.length > 1 ? (picks.length === 5 ? "all five" : "all of them") + " side by side" : "a checklist before you visit"}. Good to print or forward to whoever's moving with you.`), `22px ${PX} 0 ${PX}`) : ""}
  ${!saved && lead && lead.id ? timelineAsk(lead, t1) : ""}
  ${row(`${P(`Questions about any of these? Just reply. We read every message${opts.guideUrl ? `, and our free guide to your first 90 days in a new town is <a href="${opts.guideUrl}" style="color:${C.ink};">here</a>` : ""}.`, "margin-bottom:0;")}${sign()}`, `26px ${PX} 0 ${PX}`)}
  ${footer(`You're getting this because you asked for your towns on floridacoastal.co. Town details are for information and should be confirmed locally.`, UTM)}`;
  const html = page(subject, `${list}. Your Shortlist PDF is attached.`, rows);
  const text = [`${name ? `Hi ${name}, here` : "Here"} are your top Florida towns. Everything we know about each one is in the attached PDF.`, "",
    ...picks.map((t, i) => `${i + 1}. ${t.name} (${t.coast})  ${link(t)}`), "",
    ...(opts.guideUrl ? [`Your free Move and Belong Guide: ${opts.guideUrl}`, ""] : []),
    "Questions? Just reply. We read every message.", "", "Mark and Betsy Scott", "Florida Coastal", SITE].join("\n");
  return { subject, html, text };
}


/* Nov 13 2026 (Mark): "for 30a it's not visit the airport during rush hour, it's spend a week during high season".
   Towns with a busy season get "spend a week in high season"; towns that are steady all year keep the airport drive. */
function highSeason(t) {
  const s = String((t && t.season) || "").toLowerCase();
  if (!/bus|lively|packed/.test(s) || /year round|all year|most of the year/.test(s)) return null;
  if (/november through april|winter/.test(s)) return /summer/.test(s) && /winter/.test(s) && s.indexOf("summer") < s.indexOf("winter") ? "summer" : "winter";
  if (/april through october|summer/.test(s)) return "summer";
  if (/spring/.test(s)) return "spring";
  if (/scallop/.test(s)) return "scallop season";
  return null;
}
function seasonCheck(t, html = true) {
  const s = String((t && t.name) || "").replace(/\s*\(.*\)$/, "");
  const hs = highSeason(t);
  const e = html ? esc : (x) => x;
  if (hs) return ["Spend a week there in high season.", `For ${e(s)} that's ${hs}: the traffic, the busy beaches and the wait for a table. If you still love it then, that's a good sign.`];
  return ["Drive to the airport at rush hour.", `For ${e(s)} that's ${e((t && t.airport) || "the nearest airport")}. Do it on a weekday at 5pm.`];
}
// Each town's own "before you fall for it" checklist: t.honest, built by tools/mail/honest.py from the town page
// (season, insurance, flood score, HOA, airport, know before you go). Falls back to a generic list.
function honestChecks(t) {
  if (t && Array.isArray(t.honest) && t.honest.length) return t.honest;
  return [
    ["Visit in August, not just February.", "Summer is hot everywhere on this coast, so go once in the heat."],
    ["Get an insurance quote for a real address.", "Homeowners and flood both. It can change the math more than the price of the house."],
    ["Check the flood zone before you make an offer.", "Look up the flood zone and evacuation zone for the exact address."],
    seasonCheck(t, false),
  ];
}

/* ------------------------------------------------------------------ PDF */
/* Nov 13 2026, v2: matches Mark's sample (Shortlist-sample-Sarah_2.pdf). Editorial: full bleed cover
   photo with the title in white caps, Libre Caslon Display caps for titles and numbers, Libre Caslon
   Text italic for the softer lines, DM Sans for everything you read, ink hairlines, bars for scores. */

const PC = {
  ink: "#152A2E", white: "#FFFFFF", muted: "#6B6E73", line: "#E3E6E8", off: "#E6E7E9", mid: "#B9BCC0",
};

export async function buildPdf(lead, picks, deps) {
  const { PDFDocument, rgb, fontkit, fonts, loadImage, now = new Date() } = deps;
  const ops = deps.ops; // the pdf-lib module: graphics operators, PDFName, PDFString
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255); };
  const K = Object.fromEntries(Object.entries(PC).map(([k, v]) => [k, hex(v)]));

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const emb = (b) => doc.embedFont(b, { subset: true });
  const f = {
    disp: await emb(fonts.caslonDisplay), // titles, town names, numbers
    text: await emb(fonts.caslonText), // the family note
    ital: await emb(fonts.caslonItalic), // the softer lines
    body: await emb(fonts.dmRegular),
    med: await emb(fonts.dmMedium),
    semi: await emb(fonts.dmSemiBold),
  };
  const logo = deps.logoWhitePng ? await doc.embedPng(deps.logoWhitePng) : null;
  const jpg = async (url) => { try { return url ? await doc.embedJpg(await loadImage(url)) : null; } catch (_) { return null; } };
  const coverImg = (await jpg(deps.coverUrl));
  const photos = [];
  for (const t of picks) photos.push(await jpg(t.mail_img));
  const name = firstName(lead.name);
  const saved = isSaved(lead);
  doc.setTitle(name ? `${name}'s Florida Shortlist` : "Your Florida Shortlist");
  doc.setAuthor("Florida Coastal");
  doc.setSubject("Your top 5 Florida beach towns");

  const W = 612, H = 792, M = 45, R = W - M, PW = R - M;

  /* ---- drawing helpers ---- */
  const wrap = (text, font, size, width) => {
    const words = String(text || "").split(/\s+/).filter(Boolean); const lines = []; let cur = "";
    for (const w of words) { const t = cur ? cur + " " + w : w; if (font.widthOfTextAtSize(t, size) > width && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur); return lines;
  };
  // draws wrapped text from baseline y; returns the last baseline
  const para = (pg, text, x, y, o) => {
    const lines = wrap(text, o.font, o.size, o.width);
    lines.forEach((l, i) => pg.drawText(l, { x, y: y - i * o.lh, size: o.size, font: o.font, color: o.color || K.ink }));
    return y - (Math.max(1, lines.length) - 1) * o.lh;
  };
  const SP = 0.16; // letter spacing for small caps labels, in em
  const capsW = (text, size, font = f.med) => [...String(text).toUpperCase()].reduce((a, ch) => a + font.widthOfTextAtSize(ch, size) + size * SP, 0);
  const caps = (pg, text, x, y, size, color = K.ink, font = f.med) => {
    let cx = x; for (const ch of String(text).toUpperCase()) { pg.drawText(ch, { x: cx, y, size, font, color }); cx += font.widthOfTextAtSize(ch, size) + size * SP; }
    return cx;
  };
  const capsRight = (pg, text, y, size, color = K.ink) => caps(pg, text, R - capsW(text, size), y, size, color);
  const right = (pg, text, xr, y, size, font, color = K.ink) => pg.drawText(text, { x: xr - font.widthOfTextAtSize(text, size), y, size, font, color });
  const rule = (pg, y, { x1 = M, x2 = R, color = K.ink, t = 1 } = {}) => pg.drawLine({ start: { x: x1, y }, end: { x: x2, y }, thickness: t, color });
  const hair = (pg, y, x1 = M) => rule(pg, y, { x1, color: K.line, t: 0.6 });
  // an image filling a box, cropped to it (CSS object-fit: cover)
  const cover = (pg, img, x, y, w, h, focusY = 0.5) => {
    const s = Math.max(w / img.width, h / img.height), iw = img.width * s, ih = img.height * s;
    pg.pushOperators(ops.pushGraphicsState(), ops.rectangle(x, y, w, h), ops.clip(), ops.endPath());
    pg.drawImage(img, { x: x - (iw - w) / 2, y: y - (ih - h) * (1 - focusY), width: iw, height: ih });
    pg.pushOperators(ops.popGraphicsState());
  };
  // a clickable area (link annotation); skipped quietly if the runtime lacks the low level pdf-lib exports
  const linkTo = (pg, x, y, w, h, url) => {
    if (!ops.PDFName || !ops.PDFString || !pg.node || !doc.context) return;
    try {
      const a = doc.context.obj({ Type: "Annot", Subtype: "Link", Rect: [x, y, x + w, y + h], Border: [0, 0, 0],
        A: { Type: "Action", S: "URI", URI: ops.PDFString.of(url) } });
      pg.node.addAnnot(doc.context.register(a));
    } catch (_) {}
  };
  const townUrl = (t) => `${t.url || SITE + "/towns/" + t.id + ".html"}?utm_source=pdf&utm_campaign=top5`;
  let pageNo = 1;
  const header = (pg, label) => capsRight(pg, label, 758, 6.75, K.muted);
  const footer = (pg, note) => {
    if (note) pg.drawText(note, { x: M, y: 50, size: 8, font: f.ital, color: K.muted });
    const l = "YOUR FLORIDA SHORTLIST  ·  FLORIDACOASTAL.CO";
    caps(pg, l, M, 30, 6.75);
    linkTo(pg, M, 26, capsW(l, 6.75), 12, `${SITE}/?utm_source=pdf&utm_campaign=top5`);
    right(pg, String(pageNo), R, 29, 11, f.disp);
  };
  // bars for a 1 to 5 score
  const bars = (pg, x, y, n, { w = 13, h = 4.5, gap = 2.5, on = K.ink } = {}) => {
    for (let i = 0; i < 5; i++) pg.drawRectangle({ x: x + i * (w + gap), y, width: w, height: h, color: i < n ? on : K.off });
  };
  const fitSize = (text, font, size, width, min) => { let s = size; while (s > min && font.widthOfTextAtSize(text, s) > width) s -= 0.5; return s; };
  const nWords = ["", "One town", "Two towns", "Three towns", "Four towns", "Five towns"];

  /* --- cover: full bleed photo, title in white --- */
  {
    const pg = doc.addPage([W, H]);
    const cimg = coverImg || photos[0];
    if (cimg) cover(pg, cimg, 0, 0, W, H);
    pg.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(0, 0, 0), opacity: cimg ? 0.3 : 1 });
    if (logo) pg.drawImage(logo, { x: M, y: 740, width: 112, height: 112 * logo.height / logo.width });
    capsRight(pg, saved ? "Saved from your visit" : "Your Florida Shortlist", 744, 7, K.white);
    rule(pg, 734, { color: K.white });
    const nWord = (nWords[picks.length] || "Your towns").toUpperCase();
    const head = saved ? [nWord, "YOU SAVED"] : [nWord, picks.length === 1 ? "THAT FITS YOU" : "THAT FIT YOU"];
    const hs = Math.min(...head.map((l) => fitSize(l, f.disp, 66, PW, 40)));
    head.forEach((l, i) => pg.drawText(l, { x: M, y: 664 - i * hs * 0.9, size: hs, font: f.disp, color: K.white }));
    const when = monthYear(now);
    const sub = `Prepared for ${name || "you"}, ${when}. The honest details on each town${picks.length > 1 ? ", and all of them side by side" : ""}.`;
    para(pg, sub, M, 664 - (head.length - 1) * hs * 0.9 - 34, { font: f.ital, size: 13.5, width: 290, lh: 18.5, color: K.white });
    pg.drawText("Mark and Betsy Scott", { x: M, y: 36, size: 11, font: f.ital, color: K.white });
    caps(pg, "floridacoastal.co", R - capsW("floridacoastal.co", 6.75), 37, 6.75, K.white);
    linkTo(pg, R - capsW("floridacoastal.co", 6.75), 33, capsW("floridacoastal.co", 6.75), 12, `${SITE}/?utm_source=pdf&utm_campaign=top5`);
  }

  /* --- one page per town --- */
  const NOOP = { drawText() {}, drawRectangle() {}, drawLine() {}, drawImage() {}, pushOperators() {} };
  picks.forEach((t, i) => {
    // measure first; if the page runs long, trim the photo until it fits above the footer
    let ph = 240;
    while (ph > 150 && townPage(NOOP, t, i, ph) < 64) ph -= 10;
    pageNo = i + 2;
    townPage(doc.addPage([W, H]), t, i, ph);
  });
  function townPage(pg, t, i, ph) {
    const real = pg !== NOOP;
    header(pg, `Town No. ${i + 1}`);
    const top = 742, py = top - ph;
    if (photos[i]) cover(pg, photos[i], 0, py, W, ph);
    else pg.drawRectangle({ x: 0, y: py, width: W, height: ph, color: K.off });
    const lift = 240 - ph; // everything below moves up when the photo is trimmed
    const Y = (y) => y + lift;
    pg.drawText([t.coast, t.area].filter(Boolean).join(", "), { x: M, y: Y(489), size: 8, font: f.ital, color: K.muted });

    // the rank, then the name in caps
    const num = String(i + 1);
    pg.drawText(num, { x: 43, y: Y(436), size: 60, font: f.disp, color: K.ink });
    const nx = 43 + f.disp.widthOfTextAtSize(num, 60) + 14;
    const nm = String(t.name).toUpperCase();
    pg.drawText(nm, { x: nx, y: Y(438), size: fitSize(nm, f.disp, 30, R - nx, 18), font: f.disp, color: K.ink });
    rule(pg, Y(426));

    let y = para(pg, t.blurb, M, Y(406), { font: f.body, size: 12, width: PW, lh: 16.5 });
    if (t.day) y = para(pg, t.day, M, y - 20.5, { font: f.ital, size: 10.5, width: PW, lh: 14.5 });

    // the four facts
    const lab = y - 41.5;
    rule(pg, lab + 15);
    const colX = [45, 179.5, 314, 448.5];
    const facts = [["Median home", t.price || "Ask us for current prices"], ["Airport", t.airport], ["Season", t.season], ["Heads up", t.watch]];
    let low = lab;
    facts.forEach(([l, v], k) => {
      caps(pg, l, colX[k], lab, 6.75);
      if (k === 0 && t.price && t.price.length < 10) { pg.drawText(t.price, { x: 44, y: lab - 27, size: 26, font: f.disp, color: K.ink }); low = Math.min(low, lab - 32.8); }
      else low = Math.min(low, para(pg, v || "", colX[k], lab - 14, { font: f.body, size: 9, width: 118, lh: 12.2 }));
    });
    hair(pg, low - 20.2);

    // how it scores, two columns
    y = low - 40.2;
    caps(pg, "How it scores", M, y, 6.75);
    right(pg, "out of 5", R, y, 8.5, f.ital, K.muted);
    y -= 17;
    const sc = t.scores || {};
    SCORE_LABELS.forEach(([k, label], j) => {
      const x = j % 2 ? 321 : M, xr = j % 2 ? R : 291, yy = y - Math.floor(j / 2) * 16.5, v = sc[k] || 0;
      pg.drawText(label, { x, y: yy, size: 9.25, font: f.body, color: K.ink });
      bars(pg, xr - 96, yy + 1, v);
      right(pg, String(v), xr, yy - 0.5, 11, f.disp);
    });
    y -= 4 * 16.5;

    // your first weekend
    if (t.picks && t.picks.length) {
      rule(pg, y - 14);
      y -= 32;
      caps(pg, "Your first weekend", M, y, 6.75);
      const tx = 175, tw = 378;
      t.picks.forEach((p, k) => {
        // wrap the whole line as plain text, then set the name in semibold
        const nm = `${p.name}.`, lines = wrap(`${nm} ${p.note || ""}`, f.body, 9.75, tw);
        lines.forEach((l, li) => {
          if (li === 0 && l.startsWith(nm)) {
            pg.drawText(nm, { x: tx, y, size: 9.75, font: f.semi, color: K.ink });
            pg.drawText(l.slice(nm.length).trimStart(), { x: tx + f.semi.widthOfTextAtSize(nm + " ", 9.75), y, size: 9.75, font: f.body, color: K.ink });
          } else pg.drawText(l, { x: tx, y, size: 9.75, font: f.body, color: K.ink });
          if (li < lines.length - 1) y -= 13.5;
        });
        if (k < t.picks.length - 1) y -= 18.5;
      });
    }
    if (real) { linkTo(pg, 0, py, W, ph, townUrl(t)); footer(pg); }
    return y;
  }

  /* --- side by side --- */
  {
    pageNo = picks.length + 2;
    const pg = doc.addPage([W, H]);
    header(pg, "Side by side");
    const title = picks.length === 5 ? "YOUR FIVE, SIDE BY SIDE" : picks.length === 1 ? "YOUR TOWN, AT A GLANCE" : "SIDE BY SIDE";
    pg.drawText(title, { x: M, y: 700, size: fitSize(title, f.disp, 36, PW, 24), font: f.disp, color: K.ink });
    rule(pg, 686);
    pg.drawText("Scores run 1 to 5 and rate what each town offers. The best in each row is in bold.", { x: M, y: 666, size: 10.5, font: f.ital, color: K.ink });
    const x0 = 169, cw = (R - x0) / 5; // same column width whatever the count, so it reads like a table
    const colX = (i) => x0 + i * cw;
    let lines = 1;
    picks.forEach((t, i) => {
      pg.drawText(String(i + 1), { x: colX(i), y: 626, size: 22, font: f.disp, color: K.ink });
      const nl = wrap(t.name, f.med, 9.5, cw - 8).slice(0, 3);
      nl.forEach((l, k) => pg.drawText(l, { x: colX(i), y: 610 - k * 12, size: 9.5, font: f.med, color: K.ink }));
      lines = Math.max(lines, nl.length);
      linkTo(pg, colX(i), 594, cw - 8, 44, townUrl(t));
    });
    let y = 610 - (lines - 1) * 12 - 4; // 594 for two line names
    rule(pg, y);
    pg.drawText("Median home", { x: M, y: y - 23, size: 9.25, font: f.body, color: K.ink });
    picks.forEach((t, i) => pg.drawText(t.price || "Ask us", { x: colX(i), y: y - 25, size: t.price ? 16 : 9.5, font: t.price ? f.disp : f.body, color: K.ink }));
    y -= 42;
    hair(pg, y);
    SCORE_LABELS.forEach(([k, label]) => {
      const vals = picks.map((t) => (t.scores || {})[k] || 0), best = Math.max(...vals);
      pg.drawText(label, { x: M, y: y - 15, size: 9.25, font: f.body, color: K.ink });
      picks.forEach((t, i) => {
        const v = vals[i], top = v === best;
        pg.drawText(String(v), { x: colX(i), y: y - 16, size: 10.5, font: top ? f.semi : f.body, color: top ? K.ink : K.muted });
        bars(pg, colX(i) + 14, y - 14, v, { w: 6, h: 4, gap: 2, on: top ? K.ink : K.mid });
      });
      y -= 26;
      hair(pg, y);
    });
    y -= 32;
    rule(pg, y);
    y -= 18;
    caps(pg, "The airport drive", M, y, 6.75);
    y -= 18;
    picks.forEach((t, i) => {
      pg.drawText(String(i + 1), { x: M, y: y - 1, size: 12, font: f.disp, color: K.ink });
      const nl = wrap(t.name, f.med, 9.5, 100);
      nl.forEach((l, k) => pg.drawText(l, { x: 63, y: y - k * 13, size: 9.5, font: f.med, color: K.ink }));
      const end = para(pg, t.airport || "", x0, y, { font: f.body, size: 9.5, width: R - x0, lh: 13 });
      y = Math.min(y - (nl.length - 1) * 13, end) - 21;
    });
    footer(pg, "Scores last checked October 2026. Details should be confirmed locally.");
  }

  /* --- before you visit + the family note --- */
  {
    pageNo = picks.length + 3;
    const pg = doc.addPage([W, H]);
    header(pg, "Before you visit");
    pg.drawText("BEFORE YOU FALL", { x: M, y: 700, size: 40, font: f.disp, color: K.ink });
    pg.drawText("FOR AN ADDRESS", { x: M, y: 662.8, size: 40, font: f.disp, color: K.ink });
    rule(pg, 648.8);
    const items = [
      ["Visit in August, not just February.", "The town you love in winter is the town you live in all summer. Go once in the heat."],
      ["Get an insurance quote for a real address.", "Homeowners and flood both. It can change the math more than the price of the house."],
      ["Look up the flood zone and evacuation zone.", "FEMA's flood map and floridadisaster.org/knowyourzone, for any address you're serious about."],
      ["Drive to the airport at rush hour.", "And to the grocery store and the beach. The drives you'll actually make every week."],
      ["Spend a Saturday morning at the market.", "It's the fastest way to see who lives there and how the town feels when it isn't on vacation."],
      ["Ask a local.", "Reply to your email with any question. We'll give you the honest answer."],
    ];
    let y = 622.8;
    items.forEach(([a, b], k) => {
      pg.drawRectangle({ x: M, y: y - 2, width: 10, height: 10, borderColor: K.ink, borderWidth: 0.9 });
      pg.drawText(a, { x: 69, y, size: 11.5, font: f.med, color: K.ink });
      const end = para(pg, b, 69, y - 16, { font: f.body, size: 9.75, width: R - 69, color: K.muted, lh: 13.5 });
      if (k < items.length - 1) { hair(pg, end - 19.5, 69); y = end - 35.5; }
    });

    rule(pg, 250);
    caps(pg, "From our family", M, 230, 6.75);
    let ny = para(pg, "In 2005 we had two weeks to pick a Florida town to retire and raise three kids. We built Florida Coastal so you can make this choice with more than two weeks and a guess.", M, 200,
      { font: f.text, size: 17, width: 475, lh: 23 });
    pg.drawText("Mark and Betsy Scott", { x: M, y: ny - 33, size: 12, font: f.ital, color: K.ink });
    const contact = "Coming to this coast for more than 20 years  ·  ", mail = "hello@floridacoastal.co";
    pg.drawText(contact + mail, { x: M, y: ny - 49, size: 9, font: f.body, color: K.muted });
    linkTo(pg, M + f.body.widthOfTextAtSize(contact, 9), ny - 52, f.body.widthOfTextAtSize(mail, 9), 12, "mailto:hello@floridacoastal.co?subject=Question%20about%20my%20Shortlist");
    footer(pg, "Rules and rates change. Confirm the details for any address with the source.");
  }

  return await doc.save();
}

export async function render(lead, towns, deps) {
  const picks = pickTowns(lead, towns, deps.now || new Date());
  if (picks.length === 0) throw new Error("No matching towns for lead " + lead.id);
  const email = buildEmail(lead, picks, { hasPdf: true, guideUrl: deps.guideUrl });
  const pdf = await buildPdf(lead, picks, { coverUrl: picks[0].region_img, ...deps });
  const nm = firstName(lead.name);
  return { ...email, pdf, filename: `${nm ? nm + "s-" : ""}Florida-Shortlist.pdf`.replace(/[^A-Za-z0-9.-]/g, "") , picks };
}


/* ------------------------------------------------------- FOLLOW UPS */

/* designed emails: masthead, rows, footer (the house style, same as the top 5 email) */
function shell(subject, preheader, rows, lab = "Florida Coastal", utm = UTM) {
  return page(subject, preheader, `${masthead(lab, utm)}${rows}${footer("", utm)}`);
}
const bullets = (items) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items.map(([a, b], i) =>
  `<tr><td valign="top" width="34" style="padding:13px 0 12px 0;border-top:1px solid ${C.hair};font-family:${F_BODY};font-size:15px;font-weight:500;line-height:1.5;color:${C.soft};">${i + 1}</td><td style="padding:12px 0 12px 0;border-top:1px solid ${C.hair};font-family:${F_BODY};font-size:15.5px;line-height:1.55;color:${C.ink};"><b style="font-weight:600;">${a}</b> ${b}</td></tr>`).join("")}</table>`;

export function buildGuideEmail(lead, picks, guideUrl) {
  const name = firstName(lead.name);
  const subject = "Have you picked your three yet?";
  const top = picks[0] ? esc(short(picks[0])) : "";
  const rows = `
${row(`${h1("Pick your three")}${deck(`${name ? `Hi ${esc(name)}, a` : "A"} few days ago you found your towns${top ? `, with ${top} at the top` : ""}. If you only do one thing from our guide, do this.`)}`, `30px ${PX} 0 ${PX}`)}
${row(bullets([
    ["Serve something.", "Rotary, Kiwanis, the chamber, Habitat."],
    ["Believe something.", "A congregation or a small group."],
    ["Play something.", "A pickleball league, a run club, a fishing or sailing club."],
  ]), `20px ${PX} 0 ${PX}`)}
${row(`${P(`Three groups that meet in person on a schedule, from three parts of life. Look them up before you move, then go to the next meeting, <i style="font-family:${F_TEXT};">alone if you have to.</i>`)}
  ${attached("The Move and Belong Guide", "Our 14 page guide to your first 90 days in a new town: the five rules, the dip, Florida's seasons and storms, a 90 day plan and a page for your people.")}
  ${P("Want help finding the groups in your town? Just reply.", "margin-top:22px;margin-bottom:0;")}${sign()}`, `20px ${PX} 0 ${PX}`)}`;
  const text = `${name ? `Hi ${name}, a` : "A"} few days ago you found your towns. If you only do one thing from our guide: pick three groups that meet in person on a schedule. Serve something, believe something, play something.\n\nThe Move and Belong Guide is attached.\n\nWant help finding the groups in your town? Just reply.\nMark and Betsy Scott\nFlorida Coastal`;
  return { subject, html: shell(subject, "The one thing from our guide we'd do this week. The guide is attached.", rows, "From the Move and Belong Guide", U("guide")), text, attach: { url: guideUrl || PDFS.guide.url, name: PDFS.guide.name } };
}

/* plain letters from a person (Basecamp, Superhuman style): no images, no buttons, just a note.
   Same ink and type as everything else, and a signature in italic serif. */
function plain(subject, paras, who) {
  const sig = paras.at(-1);
  const body = paras.slice(0, -1);
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title>${FONTS}</head><body style="margin:0;padding:24px 18px;background:#FFFFFF;">
<div style="max-width:560px;font-family:${F_BODY};font-size:16px;line-height:1.65;color:${C.ink};">${body.map((b) => `<p style="margin:0 0 16px 0;">${b}</p>`).join("")}
<p style="margin:22px 0 0 0;font-family:${F_TEXT};font-style:italic;font-size:18px;line-height:1.4;color:${C.ink};">${sig.replace(/<br>.*$/, "")}</p><p style="margin:2px 0 0 0;font-size:13px;color:${C.gray};">Florida Coastal</p>
<p style="margin:30px 0 0 0;padding-top:12px;border-top:1px solid ${C.hair};font-size:12px;line-height:1.6;color:${C.gray};"><a href="${SITE}/?${U("letter")}" style="color:${C.gray};">floridacoastal.co</a> &middot; <a href="mailto:hello@floridacoastal.co?subject=Unsubscribe" style="color:${C.gray};">Unsubscribe</a>${ADDRESS ? "<br>" + esc(ADDRESS) : ""}</p></div></body></html>`;
  const text = paras.join("\n\n").replace(/<br>/g, "\n").replace(/<[^>]+>/g, "");
  return { subject, html, text };
}

export function buildNoteEmail(lead, picks) {
  const name = firstName(lead.name);
  const names = picks.map((t) => t.name);
  const list = names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names.at(-1) : names[0] || "your towns";
  return plain("Which one are you leaning toward?", [
    `Hi${name ? " " + esc(name) : ""},`,
    `It's been about a week since you found your towns on Florida Coastal: ${esc(list)}.`,
    `I'm curious which one you're leaning toward, and what's still giving you pause. Hit reply and tell me. I read every one, and I'm happy to hop on a quick call if that's easier.`,
    `Mark Scott<br>Florida Coastal`,
  ]);
}

export function buildWelcomeEmail(lead, guideUrl) {
  const name = firstName(lead.name);
  const subject = "Your Move and Belong Guide";
  const rows = `
<tr><td style="padding:24px 0 0 0;"></td></tr>
${photo(`${SITE}/img/guide/cover-wide.jpg`, "", "Two people walking over the dunes to the beach at sunset", "")}
${row(`${h1("The boxes are the easy part")}${deck(`${name ? `Hi ${esc(name)}, here` : "Here"}'s the Move and Belong Guide. It's what we'd tell a friend who just signed the papers on a Florida town.`)}`, `30px ${PX} 0 ${PX}`)}
${row(`${attached("The Move and Belong Guide", "14 pages on going from new in town to knowing people in your first 90 days. Print it, check it off, fill in your people.")}
  ${P(`Still picking your town? Our free quiz matches you to the Florida beach towns that fit how you want to live. ${more(`${SITE}/find-your-mile.html?${U("welcome")}`, "See your top 5 towns")}`, "margin-top:22px;")}
  ${P("After this, one short letter a month about the coast. Questions? Just reply.", "margin-bottom:0;")}${sign()}`, `22px ${PX} 0 ${PX}`)}`;
  const text = `${name ? `Hi ${name}, here` : "Here"}'s the Move and Belong Guide. It's attached.\n\nStill picking your town? Take the free quiz: ${SITE}/find-your-mile.html\n\nAfter this, one short letter a month about the coast. Questions? Just reply.\nMark and Betsy Scott\nFlorida Coastal`;
  return { subject, html: shell(subject, "Your guide to your first 90 days in a new town is attached.", rows, "Your free guide", U("welcome")), text, attach: { url: guideUrl || PDFS.guide.url, name: PDFS.guide.name } };
}

/* ======================================================================
   Nov 4 2026: the Shortlist series. One email at a time, each with one job.
   Day 0  top5    Your Florida Shortlist (above): PDF, one tap timeline, reply ask, forward to partner
   Day 1  town    A Saturday in your No. 1 town
   Day 3  guide   Pick your three (Move and Belong)
   Day 5  story   We had two weeks (Dad's story, plain text)
   Day 7  note    Which one are you leaning toward? (plain text, reply)
   Day 10 honest  Before you fall for your No. 1 town (the honest checklist)
   Day 14 next    Branches on timeline: This year -> see it in person; otherwise -> test drive it
   Then   letter  The Coast Report, once a month, same four parts every time
   Every email: one link that matters, a reason to reply, signed by a person.
   ====================================================================== */
const U = (step) => `utm_source=email&utm_campaign=${step}`;
const short = (t) => String((t && t.name) || "").replace(/\s*\(.*\)$/, "");
const LABEL = { nightlife: "nightlife", meet: "meeting people", quiet: "peace and quiet", walk: "walkability", water: "the water", beaches: "beaches", dining: "dining", outdoors: "the outdoors", afford: "price", airport: "the airport" };
function strengths(t) {
  return Object.entries(t.scores || {}).filter(([, v]) => v >= 4).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => LABEL[k]).filter(Boolean);
}
const and = (a) => a.length > 1 ? a.slice(0, -1).join(", ") + " and " + a.at(-1) : a[0] || "";

/* Day 1: A Saturday in your No. 1 town (Airbnb / Zillow: go deep on the one place they care about) */
export function buildTownEmail(lead, picks) {
  const t = picks[0]; if (!t) return null;
  const name = firstName(lead.name), s = short(t), good = strengths(t), url = `${t.url}?${U("town")}`;
  const subject = `A Saturday in ${s}`;
  const picksHtml = (t.picks || []).map((p) => `<p style="margin:0 0 8px 0;font-family:${F_BODY};font-size:15px;line-height:1.55;color:${C.ink};"><b style="font-weight:600;">${esc(p.name)}.</b> ${esc(p.note)}</p>`).join("");
  const rows = `
${row(`${h1(`A Saturday in ${esc(s)}`)}${deck(`${name ? `Hi ${esc(name)}. ` : ""}Of your five, ${esc(s)} came out on top. Here's what a regular Saturday there looks like.`)}`, `30px ${PX} 26px ${PX}`)}
${photo(t.mail_img, url, t.name, `${esc(t.coast)}, ${esc(t.area)}`)}
${row(`<p style="margin:0 0 22px 0;font-family:${F_BODY};font-size:20px;line-height:1.5;letter-spacing:-.01em;color:${C.ink};">${esc(t.day || t.blurb)}</p>
  ${picksHtml ? section("Your first weekend", picksHtml) : ""}
  ${P(`${good.length ? `It scored best for you on <b style="font-weight:600;">${esc(and(good))}</b>. ` : ""}${t.season ? `The season: ${esc(t.season)}. ` : ""}${t.watch ? `The honest part: ${esc(t.watch)}.` : ""}`, "margin-top:14px;")}`, `22px ${PX} 0 ${PX}`)}
${row(`${btn(url, `See all of ${esc(s)}`)}
  ${P(`What would you want to know about ${esc(s)} that a website can't tell you? Hit reply. We answer every one.`, "margin-top:22px;margin-bottom:0;")}${sign()}`, `6px ${PX} 0 ${PX}`)}`;
  const text = `${name ? `Hi ${name}. ` : ""}Of your five, ${s} came out on top. A Saturday there:\n\n${t.day || t.blurb}\n\nThe season: ${t.season}. The honest part: ${t.watch}.\n\n${url}\n\nWhat would you want to know about ${s} that a website can't tell you? Hit reply.\nMark and Betsy Scott`;
  return { subject, html: shell(subject, `What a regular Saturday in ${s} looks like.`, rows, "Your No. 1 town", U("town")), text };
}

/* Day 5: our story (the founder letter: why we built this, told once, honestly). DAD TO APPROVE. */
export function buildStoryEmail(lead, picks) {
  const name = firstName(lead.name), s = short(picks[0]);
  return plain("We had two weeks", [
    `Hi${name ? " " + esc(name) : ""},`,
    `In 2005 Betsy and I sold our business and had about two weeks to pick a Florida town. Three kids, a house in Atlanta to sell, and a lot of advice from people who had never lived where they were sending us.`,
    `We picked Tallahassee because everyone said it was the best place in Florida to raise kids. They were right about that. What nobody told us is that the right town depends on the life you want once you get there, not the one in the brochure.`,
    `Years later we found our own mile on 30A. Live music on the weekends, good fishing a couple of miles offshore, most days a sunset and a view. Not a ton going on, but enough. We've ridden out a few hurricanes there too, Michael in 2018 included: a week without power, streets closed, some trees down. It's part of the deal, and we'd rather you hear that from us.`,
    `That's why we built Florida Coastal. So you get more than two weeks and a guess.`,
    `${s ? `What's the one thing about ${esc(s)} you'd want to ask someone who lives nearby?` : "What's the one thing you'd want to ask someone who lives here?"} Hit reply. I read every one.`,
    `Mark Scott<br>Florida Coastal`,
  ]);
}

/* Day 10: the honest checklist (Wirecutter / Consumer Reports: tell them the downside, earn the trust) */
export function buildHonestEmail(lead, picks) {
  const t = picks[0]; if (!t) return null;
  const name = firstName(lead.name), s = short(t);
  const subject = `Before you fall for ${s}`;
  const checks = honestChecks(t).map(([a, b], i) => `<tr><td valign="top" width="30" style="padding:13px 0;border-top:1px solid ${C.hair};"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="12" height="12" style="width:12px;height:12px;border:1.5px solid ${C.ink};border-radius:3px;font-size:0;line-height:0;">&nbsp;</td></tr></table></td><td style="padding:11px 0;border-top:1px solid ${C.hair};font-family:${F_BODY};font-size:15.5px;line-height:1.5;color:${C.ink};"><b style="font-weight:600;">${esc(a)}</b> ${esc(b)}</td></tr>`).join("");
  const rows = `
${row(`${h1(`Before you fall for ${esc(s)}`)}${deck(`${name ? `Hi ${esc(name)}, every` : "Every"} town on your list has a catch. That's not a reason to cross one off, it's a reason to check before you sign.`)}`, `30px ${PX} 0 ${PX}`)}
${row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${checks}</table>`, `20px ${PX} 0 ${PX}`)}
${row(`${attached("Florida Beach Towns Ranked by Flood Risk", "Our report on 50 beach towns: how much land floods at high tide, how much sits in FEMA's high risk zone, one score for each, and the floods people remember.")}
  ${P("Stuck on one of these? Reply and tell us which. We'll point you to the right source.", "margin-top:22px;margin-bottom:0;")}${sign()}`, `20px ${PX} 0 ${PX}`)}`;
  const text = `${name ? `Hi ${name}, every` : "Every"} town on your list has a catch. Before you fall for ${s}:\n\n${honestChecks(t).map(([a, b], i) => `${i + 1}. ${a} ${b}`).join("\n")}\n\nOur flood report is attached.\n\nStuck on one? Reply and tell us which.\nMark and Betsy Scott`;
  return { subject, html: shell(subject, "Four things we'd check before signing anything. Our flood report is attached.", rows, "The honest part", U("honest")), text, attach: PDFS.flood };
}

/* Day 14: the next step, by timeline (real estate nurture: hot leads get a person, everyone else gets time) */
export function buildNextEmail(lead, picks, timeline) {
  const t = picks[0]; if (!t) return null;
  const name = firstName(lead.name), s = short(t), soon = timeline === "this-year";
  if (soon) return plain(`Want to see ${s} in person?`, [
    `Hi${name ? " " + esc(name) : ""},`,
    `You said you're thinking of moving this year, so here's the honest shortcut: one weekend on the ground in ${esc(s)} will tell you more than another month of reading.`,
    `If you want help planning it, reply with roughly when you could go. We'll point you to the parts of town worth seeing, and if we know a good local there, we'll introduce you. If you'd rather talk it through, we're happy to do a quick call.`,
    `And if ${esc(s)} isn't the one anymore, tell me that too. Your list can change.`,
    `Mark Scott<br>Florida Coastal`,
  ]);
  const url = `${t.url}?${U("next")}`;
  return plain(`How to test drive ${s}`, [
    `Hi${name ? " " + esc(name) : ""},`,
    `When you're ready to get serious about ${esc(s)}, here's the best way we know to test a town before you buy in it:`,
    `<b>Rent for a few weeks, twice.</b> Once in the busiest month and once in the quietest. Live like you live there: grocery runs, the drive to the doctor, the Saturday thing you'd actually do every week.`,
    `<b>Go to one thing that meets every week.</b> A run club, a church, a pickleball night. If you'd go back, that's a good sign.`,
    `From here on we'll send one letter a month about the coast: one town worth knowing, one number, one honest heads up. <a href="${url}" style="color:${C.ink};">${esc(s)} is here</a> whenever you want to look again.`,
    `Mark Scott<br>Florida Coastal`,
  ]);
}

/* Monthly: The Coast Report (James Clear 3-2-1 style: the same four parts every month, so it's fast to read and easy to write).
   issue = { month, gem:{town,text,url,img?}, number:{big,text}, heads:{text}, question } . Mark approves each one before it sends. */
export function buildLetterEmail(lead, issue) {
  const name = firstName(lead.name);
  const subject = `The Coast Report: ${issue.month}`;
  const part = (k, body, first) => row(section(k, body), `${first ? 30 : 34}px ${PX} 0 ${PX}`);
  const rows = `
${row(`${h1("The Coast Report")}${deck(`${name ? `Hi ${esc(name)}, here's` : "Here's"} this month on the Florida coast. Four things, two minutes.`)}`, `30px ${PX} 0 ${PX}`)}
${part("One town worth knowing", `<p style="margin:0 0 10px 0;">${townName(esc(issue.gem.town), 28)}</p>${issue.gem.img ? `<img src="${issue.gem.img}" width="476" alt="${esc(issue.gem.town)}" style="display:block;width:100%;max-width:476px;height:auto;border:0;border-radius:12px;margin:0 0 12px 0;">` : ""}${P(esc(issue.gem.text))}${issue.gem.url ? more(`${issue.gem.url}?${U("letter")}`, "See the town") : ""}`, true)}
${part("One number", `<p style="margin:0 0 8px 0;font-family:${F_BODY};font-weight:500;font-size:48px;line-height:1;letter-spacing:-.03em;color:${C.ink};">${esc(issue.number.big)}</p>${P(esc(issue.number.text))}`)}
${part("One honest heads up", P(esc(issue.heads.text)))}
${part("One question for you", `<p style="margin:0 0 12px 0;font-family:${F_TEXT};font-style:italic;font-size:20px;line-height:1.4;color:${C.ink};">${esc(issue.question)}</p>${P("Hit reply. We read every one, and the best answers end up in next month's letter.", "margin-bottom:0;")}${sign()}`)}`;
  return { subject, html: shell(subject, `${issue.gem.town}, ${issue.number.big} and one question.`, rows, issue.month, U("letter")), text: `The Coast Report: ${issue.month}\n\n${issue.gem.town}: ${issue.gem.text}\n\n${issue.number.big}: ${issue.number.text}\n\nHeads up: ${issue.heads.text}\n\n${issue.question} Hit reply.\nMark and Betsy Scott` };
}
