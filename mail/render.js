// Florida Coastal: builds the top 5 email (HTML) and the personal Shortlist PDF.
// Runs in Node (for testing) and in Supabase Edge Functions (Deno).
// The caller passes in pdf-lib, fontkit, font/logo bytes and an image loader.

const C = {
  ink: "#152A2E", rust: "#C65213", rustDark: "#A8440E", peach: "#E3A66D",
  tint: "#FBEEE5", muted: "#56696C", line: "#DFE6E5", paper: "#F3F6F5",
  sea: "#1B6E78", white: "#FFFFFF", soft: "#C9D4D3",
};
const SITE = "https://www.floridacoastal.co";
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

const F_BODY = "'DM Sans','Helvetica Neue',Arial,sans-serif";
const F_HEAD = "'Fraunces',Georgia,'Times New Roman',serif";

function townBlock(t, i) {
  const picks = (t.picks || []).map((p) =>
    `<p style="margin:6px 0 0 0;font-family:${F_BODY};font-size:15px;line-height:1.5;color:${C.ink};"><b style="color:${C.rustDark};">${esc(p.name)}.</b> ${esc(p.note)}</p>`).join("");
  const cell = (label, val, big, pad) => `<td class="stack" width="33%" valign="top" style="padding:${pad};font-family:${F_BODY};"><p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.muted};">${label}</p><p style="margin:4px 0 0 0;${big ? `font-family:${F_HEAD};font-size:22px;` : "font-size:15px;line-height:1.4;"}color:${C.ink};">${esc(val)}</p></td>`;
  return `
  <tr><td class="px" style="padding:${i ? 38 : 30}px 40px 0 40px;">
    <a href="${link(t)}"><img src="${t.mail_img}" width="520" height="292" alt="${esc(t.name)}" style="display:block;width:100%;max-width:520px;height:auto;border:0;border-radius:12px;"></a>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;"><tr>
      <td width="58" valign="top" style="font-family:${F_HEAD};font-weight:600;font-size:46px;line-height:1;color:${C.rust};">${i + 1}</td>
      <td valign="top">
        <p style="margin:0 0 4px 0;font-family:${F_BODY};font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.muted};">${esc(t.coast)} &middot; ${esc(t.area)}</p>
        <h2 class="town-h" style="margin:0;font-family:${F_HEAD};font-weight:400;font-size:32px;line-height:1.15;color:${C.ink};">${esc(t.name)}</h2>
      </td></tr></table>
    <p style="margin:12px 0 18px 0;font-family:${F_BODY};font-size:16px;line-height:1.6;color:${C.ink};">${esc(t.blurb)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};border-bottom:1px solid ${C.line};"><tr>
      ${cell("Median home", t.price || "Ask us", true, "14px 10px 14px 0")}
      ${cell("Airport", t.airport, false, "14px 10px")}
      ${cell("Heads up", t.watch, false, "14px 0 14px 10px")}
    </tr></table>
    ${picks ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;"><tr><td style="background:${C.tint};border-radius:10px;padding:14px 18px;">
      <p style="margin:0;font-family:${F_BODY};font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.rust};">Your first weekend</p>${picks}</td></tr></table>` : ""}
    <p style="margin:14px 0 0 0;"><a href="${link(t)}" style="font-family:${F_BODY};font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.sea};text-decoration:none;">Explore ${esc(t.name)} &rarr;</a></p>
  </td></tr>`;
}

export function buildEmail(lead, picks, opts = {}) {
  const name = firstName(lead.name);
  const names = picks.map((t) => t.name);
  const list = names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names.at(-1) : names[0] || "";
  const hasPdf = opts.hasPdf !== false;
  const saved = isSaved(lead);
  const subject = opts.subject || (saved ? "The Florida towns you saved" : "Your top 5 Florida towns");
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light">
<title>${esc(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap" rel="stylesheet">
<style>body{margin:0;padding:0;background:${C.paper}}a{color:${C.sea}}@media (max-width:620px){.container{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.hero-h{font-size:38px!important}.town-h{font-size:28px!important}.stack{display:block!important;width:100%!important;padding:0 0 14px 0!important}}</style>
</head><body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.paper};">${esc(list)}, with the honest details on each.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${C.white};border-radius:14px;overflow:hidden;">
  <tr><td class="px" style="padding:26px 40px 20px 40px;"><a href="${SITE}/?${UTM}"><img src="${SITE}/img/logo.png" width="190" alt="Florida Coastal" style="display:block;width:190px;height:auto;border:0;"></a></td></tr>
  <tr><td class="px" style="padding:0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="3" style="height:3px;line-height:3px;font-size:0;background:${C.rust};background-image:linear-gradient(90deg,${C.rust},${C.peach} 60%,${C.white});border-radius:2px;">&nbsp;</td></tr></table></td></tr>
  <tr><td class="px" style="padding:34px 40px 8px 40px;">
    <p style="margin:0 0 12px 0;font-family:${F_BODY};font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.rust};">${saved ? "Saved from your visit" : "Find Your Mile &middot; Your results"}</p>
    <h1 class="hero-h" style="margin:0;font-family:${F_HEAD};font-weight:400;font-size:46px;line-height:1.1;letter-spacing:-.01em;color:${C.ink};">${saved ? `Your saved<br>Florida towns` : `Your top ${picks.length}<br>Florida towns`}</h1>
    <p style="margin:18px 0 0 0;font-family:${F_BODY};font-size:17px;line-height:1.6;color:${C.muted};">${name ? `Hi ${esc(name)}, here` : "Here"} ${saved ? `are the ${picks.length === 1 ? "town" : picks.length + " towns"} you looked at, with the honest details on each.` : `are the ${picks.length === 5 ? "five" : picks.length} towns that fit how you want to live, with the honest details on each.`}${hasPdf ? ` Your personal Florida Shortlist is attached as a PDF${picks.length > 1 ? ", with " + (picks.length === 5 ? "all five" : "them") + " side by side" : ""}. It's a good one to print or share.` : ""}</p>
  </td></tr>
  ${opts.guideUrl ? `<tr><td class="px" style="padding:26px 40px 0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.tint};border-radius:12px;"><tr>
    <td width="112" valign="top" style="padding:18px 0 18px 18px;"><a href="${opts.guideUrl}"><img src="${SITE}/img/guide/cover-thumb.jpg" width="94" alt="The Move and Belong Guide" style="display:block;width:94px;height:auto;border:0;"></a></td>
    <td valign="top" style="padding:18px 18px 18px 16px;font-family:${F_BODY};">
      <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.rust};">Your free guide</p>
      <p style="margin:0 0 6px 0;font-family:${F_HEAD};font-size:22px;line-height:1.2;color:${C.ink};">The Move and Belong Guide</p>
      <p style="margin:0 0 10px 0;font-size:14.5px;line-height:1.5;color:${C.ink};">Finding the town is the easy part. This is how to go from new in town to knowing people in your first 90 days.</p>
      <a href="${opts.guideUrl}" style="font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.sea};text-decoration:none;">Read the guide &rarr;</a>
    </td></tr></table></td></tr>` : ""}
  ${picks.map(townBlock).join("")}
  <tr><td class="px" style="padding:40px 40px 0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-left:3px solid ${C.rust};padding:4px 0 4px 18px;">
    <p style="margin:0 0 6px 0;font-family:${F_BODY};font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.rust};">The honest part</p>
    <p style="margin:0;font-family:${F_HEAD};font-size:19px;line-height:1.45;color:${C.ink};">Florida homeowners insurance averages about $10,384 a year for $250K of coverage. Get a quote and check the flood zone before you fall for any address.</p>
    <p style="margin:10px 0 0 0;"><a href="${SITE}/articles/insurance.html?${UTM}" style="font-family:${F_BODY};font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.sea};text-decoration:none;">What nobody tells you about it &rarr;</a></p>
  </td></tr></table></td></tr>
  <tr><td style="padding:40px 0 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ink};"><tr><td class="px" align="center" style="padding:40px 40px 38px 40px;">
    <img src="${SITE}/img/mail/our-story.jpg" width="76" height="76" alt="Mark and Betsy Scott" style="display:block;width:76px;height:76px;border-radius:50%;border:3px solid ${C.white};margin:0 auto 18px auto;">
    <h2 style="margin:0;font-family:${F_HEAD};font-weight:400;font-size:28px;line-height:1.2;color:${C.white};">Questions about any of these?</h2>
    <p style="margin:12px auto 24px auto;max-width:420px;font-family:${F_BODY};font-size:16px;line-height:1.6;color:${C.soft};">Just reply to this email. The Scott family reads every message, and we've lived on this coast for 20 years. No sales calls.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td style="background:${C.rust};border-radius:999px;"><a href="mailto:hello@floridacoastal.co?subject=Question%20about%20my%20top%205" style="display:inline-block;padding:14px 30px;font-family:${F_BODY};font-size:15px;font-weight:700;letter-spacing:.02em;color:${C.white};text-decoration:none;">Ask a local</a></td></tr></table>
    <p style="margin:26px 0 0 0;font-family:${F_HEAD};font-style:italic;font-size:17px;color:${C.peach};">Mark and Betsy Scott</p>
  </td></tr></table></td></tr>
  <tr><td class="px" align="center" style="padding:24px 40px 28px 40px;background:${C.paper};">
    <img src="${SITE}/img/logo-mark.png" width="28" alt="" style="display:block;width:28px;height:auto;margin:0 auto 10px auto;border:0;">
    <p style="margin:0;font-family:${F_BODY};font-size:13px;line-height:1.6;color:${C.muted};">Florida is 1,350 miles of coastline. We'll help you find your mile.</p>
    <p style="margin:8px 0 0 0;font-family:${F_BODY};font-size:12px;line-height:1.6;color:#7E8F92;"><a href="${SITE}/find-your-mile.html?${UTM}" style="color:${C.muted};">Retake the quiz</a> &nbsp;&middot;&nbsp; <a href="${SITE}/privacy.html" style="color:${C.muted};">Privacy</a> &nbsp;&middot;&nbsp; <a href="mailto:hello@floridacoastal.co?subject=Unsubscribe" style="color:${C.muted};">Unsubscribe</a><br>You're getting this because you asked for your towns${opts.guideUrl ? " and the Move and Belong Guide" : ""} on floridacoastal.co. Town details are for information and should be confirmed locally.</p>
  </td></tr>
</table></td></tr></table></body></html>`;
  const text = [`${name ? `Hi ${name}, here` : "Here"} are your top 5 Florida towns:`, "",
    ...picks.map((t, i) => `${i + 1}. ${t.name} (${t.coast}, ${t.area})\n${t.blurb}\nMedian home: ${t.price || "ask us"} | Airport: ${t.airport} | Heads up: ${t.watch}\n${link(t)}\n`),
    ...(opts.guideUrl ? [`Your free Move and Belong Guide: ${opts.guideUrl}`, ""] : []),
    "Questions? Just reply. We read every message.", "", "Mark and Betsy Scott", "Florida Coastal", SITE].join("\n");
  return { subject, html, text };
}

/* ------------------------------------------------------------------ PDF */

export async function buildPdf(lead, picks, deps) {
  const { PDFDocument, rgb, fontkit, fonts, logoPng, markPng, loadImage, now = new Date() } = deps;
  const ops = deps.ops; // pushGraphicsState, popGraphicsState, rectangle, clip, endPath
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255); };
  const K = Object.fromEntries(Object.entries(C).map(([k, v]) => [k, hex(v)]));

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const f = {
    head: await doc.embedFont(fonts.frauncesRegular, { subset: true }),
    headBold: await doc.embedFont(fonts.frauncesSemiBold, { subset: true }),
    body: await doc.embedFont(fonts.dmRegular, { subset: true }),
    bold: await doc.embedFont(fonts.dmBold, { subset: true }),
  };
  const logo = await doc.embedPng(logoPng);
  const mark = await doc.embedPng(markPng);
  let coverImg = null;
  if (deps.coverUrl) { try { coverImg = await doc.embedJpg(await loadImage(deps.coverUrl)); } catch (_) {} }
  const photos = [];
  for (const t of picks) {
    try { photos.push(await doc.embedJpg(await loadImage(t.mail_img))); } catch (_) { photos.push(null); }
  }
  const name = firstName(lead.name);
  doc.setTitle(name ? `${name}'s Florida Shortlist` : "Your Florida Shortlist");
  doc.setAuthor("Florida Coastal");
  doc.setSubject("Your top 5 Florida beach towns");

  const W = 612, H = 792, M = 50;
  const total = picks.length + 3;

  // helpers
  const wrap = (text, font, size, width) => {
    const words = String(text || "").split(/\s+/); const lines = []; let cur = "";
    for (const w of words) { const t = cur ? cur + " " + w : w; if (font.widthOfTextAtSize(t, size) > width && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur); return lines;
  };
  const para = (pg, text, x, y, o) => {
    const lines = wrap(text, o.font, o.size, o.width); const lh = o.lh || o.size * 1.45;
    lines.forEach((l, i) => pg.drawText(l, { x, y: y - i * lh, size: o.size, font: o.font, color: o.color || K.ink }));
    return y - lines.length * lh;
  };
  const caps = (pg, text, x, y, size, color, font = f.bold, spacing = 1.2) => {
    let cx = x; for (const ch of String(text).toUpperCase()) { pg.drawText(ch, { x: cx, y, size, font, color }); cx += font.widthOfTextAtSize(ch, size) + spacing; }
    return cx;
  };
  const capsWidth = (text, size, font = f.bold, spacing = 1.2) => [...String(text).toUpperCase()].reduce((a, ch) => a + font.widthOfTextAtSize(ch, size) + spacing, 0);
  const gradRule = (pg, x, y, w, h = 2.5) => {
    const steps = 60; for (let i = 0; i < steps; i++) {
      const p = i / steps; const a = p < 0.6 ? p / 0.6 : 1; const fade = p < 0.6 ? 1 : 1 - (p - 0.6) / 0.4;
      const from = [0xC6, 0x52, 0x13], to = [0xE3, 0xA6, 0x6D];
      const c = from.map((v, k) => (v + (to[k] - v) * a) / 255);
      pg.drawRectangle({ x: x + p * w, y, width: w / steps + 0.5, height: h, color: rgb(c[0], c[1], c[2]), opacity: Math.max(0, fade) });
    }
  };
  // draw an image filling a box, cropped to the box (like CSS object-fit: cover)
  const cover = (pg, img, x, y, w, h, focusY = 0.5) => {
    const s = Math.max(w / img.width, h / img.height), iw = img.width * s, ih = img.height * s;
    pg.pushOperators(ops.pushGraphicsState(), ops.rectangle(x, y, w, h), ops.clip(), ops.endPath());
    pg.drawImage(img, { x: x - (iw - w) / 2, y: y - (ih - h) * (1 - focusY), width: iw, height: ih });
    pg.pushOperators(ops.popGraphicsState());
  };
  const dots = (pg, x, y, n, r = 3.6, gap = 11) => { for (let i = 0; i < 5; i++) pg.drawCircle({ x: x + i * gap, y, size: r, color: i < n ? K.rust : K.line }); };
  const header = (pg, n, label) => {
    pg.drawImage(mark, { x: M, y: H - 64, width: 15, height: 18 });
    caps(pg, label, M + 24, H - 58, 8.5, K.ink);
    const r = `Florida Coastal  ·  ${n} of ${total}`; pg.drawText(r, { x: W - M - f.body.widthOfTextAtSize(r, 9), y: H - 58, size: 9, font: f.body, color: K.muted });
    gradRule(pg, M, H - 74, W - 2 * M);
  };
  const footer = (pg, text) => {
    pg.drawLine({ start: { x: M, y: 46 }, end: { x: W - M, y: 46 }, thickness: 0.6, color: K.line });
    pg.drawText(text, { x: M, y: 32, size: 8.5, font: f.body, color: K.muted });
    const r = "floridacoastal.co"; pg.drawText(r, { x: W - M - f.bold.widthOfTextAtSize(r, 8.5), y: 32, size: 8.5, font: f.bold, color: K.rust });
  };

  /* --- cover --- */
  {
    const pg = doc.addPage([W, H]);
    pg.drawImage(logo, { x: M, y: H - 70, width: 170, height: 170 * 132 / 697 });
    const ph = 344, py = H - 96 - ph;
    const cimg = coverImg || photos[0];
    if (cimg) cover(pg, cimg, 0, py, W, ph);
    else pg.drawRectangle({ x: 0, y: py, width: W, height: ph, color: K.ink });
    gradRule(pg, 0, py - 4, W, 4);
    let y = py - 48;
    caps(pg, "Your Florida Shortlist", M, y, 10, K.rust, f.bold, 1.6);
    y -= 44;
    const nWord = ["", "One town", "Two towns", "Three towns", "Four towns", "Five towns"][picks.length] || "Your towns";
    pg.drawText(isSaved(lead) ? `${nWord} you saved.` : `${nWord} that fit`, { x: M, y, size: 38, font: f.head, color: K.ink });
    y -= 44;
    if (!isSaved(lead)) pg.drawText("how you want to live.", { x: M, y, size: 38, font: f.head, color: K.ink });
    y -= 30;
    const who = name ? `Prepared for ${name}  ·  ${monthYear(now)}` : `Prepared for you  ·  ${monthYear(now)}`;
    pg.drawText(who, { x: M, y, size: 11, font: f.body, color: K.muted });
    y -= 34;
    const colW = (W - 2 * M) / 2;
    picks.forEach((t, i) => {
      const col = i < 3 ? 0 : 1, row = i < 3 ? i : i - 3;
      const x = M + col * colW, yy = y - row * 40;
      pg.drawText(String(i + 1), { x, y: yy - 4, size: 22, font: f.headBold, color: K.rust });
      pg.drawText(t.name, { x: x + 26, y: yy, size: 14, font: f.head, color: K.ink });
      pg.drawText(`${t.coast} · ${t.area}`, { x: x + 26, y: yy - 14, size: 8.5, font: f.body, color: K.muted });
    });
    footer(pg, isSaved(lead) ? "Saved from your visit to floridacoastal.co" : "Matched from your answers on Find Your Mile");
  }

  /* --- one page per town --- */
  const NOOP = { drawText() {}, drawRectangle() {}, drawLine() {}, drawCircle() {}, drawImage() {}, pushOperators() {} };
  picks.forEach((t, i) => {
    // measure first, then pick the tallest photo that still fits above the footer
    let ph = 230;
    while (ph > 120 && townPage(NOOP, t, i, ph) < 58) ph -= 10;
    const pg = doc.addPage([W, H]);
    townPage(pg, t, i, ph);
  });
  function townPage(pg, t, i, ph) {
    header(pg, i + 2, "The Shortlist");
    const pw = W - 2 * M, py = H - 92 - ph;
    if (photos[i]) cover(pg, photos[i], M, py, pw, ph);
    let y = py - 44;
    pg.drawText(String(i + 1), { x: M, y: y - 6, size: 46, font: f.headBold, color: K.rust });
    const tx = M + (i + 1 >= 10 ? 60 : 40);
    caps(pg, `${t.coast} · ${t.area}`, tx, y + 18, 8.5, K.muted);
    pg.drawText(t.name, { x: tx, y: y - 8, size: 30, font: f.head, color: K.ink });
    y -= 34;
    y = para(pg, t.blurb, M, y, { font: f.body, size: 11.5, width: pw, color: K.ink });
    y -= 4;
    if (t.day) y = para(pg, t.day, M, y, { font: f.head, size: 11.5, width: pw, color: K.muted });

    // facts 2x2
    y -= 12;
    pg.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.6, color: K.line });
    const facts = [["Median home", t.price || "Ask us for current prices"], ["Airport", t.airport], ["Season", t.season], ["Heads up", t.watch]];
    const fw = pw / 2 - 10; let rowY = y - 16; let rowMin = rowY;
    facts.forEach(([lab, val], k) => {
      const x = M + (k % 2) * (pw / 2 + 10);
      if (k === 2) { rowY = rowMin - 10; }
      caps(pg, lab, x, rowY, 7.5, K.muted);
      const big = k === 0 && t.price && t.price.length < 12;
      const end = big ? (pg.drawText(t.price, { x, y: rowY - 20, size: 18, font: f.head, color: K.ink }), rowY - 26)
        : para(pg, val, x, rowY - 15, { font: f.body, size: 10, width: fw, color: K.ink, lh: 13 });
      rowMin = Math.min(rowMin, end);
    });
    y = rowMin - 6;
    pg.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.6, color: K.line });

    // scorecard
    y -= 20;
    caps(pg, "How it scores", M, y, 8.5, K.rust);
    y -= 18;
    const sc = t.scores || {};
    SCORE_LABELS.forEach(([k, lab], j) => {
      const col = j % 2, row = Math.floor(j / 2);
      const x = M + col * (pw / 2 + 10), yy = y - row * 16;
      pg.drawText(lab, { x, y: yy, size: 9.5, font: f.body, color: K.ink });
      dots(pg, x + 150, yy + 3.2, sc[k] || 0);
    });
    y -= 5 * 16 + 10;

    // first weekend
    if (t.picks && t.picks.length) {
      const inner = pw - 32;
      const blocks = t.picks.map((p) => wrap(`${p.name}. ${p.note}`, f.body, 10, inner));
      const bh = 34 + blocks.reduce((a, b) => a + b.length * 13.5 + 4, 0);
      const by = y - bh;
      pg.drawRectangle({ x: M, y: by, width: pw, height: bh, color: K.tint });
      let yy = by + bh - 20;
      caps(pg, "Your first weekend", M + 16, yy, 8, K.rust);
      yy -= 17;
      t.picks.forEach((p, k) => {
        const lines = blocks[k];
        lines.forEach((l, li) => {
          if (li === 0 && l.startsWith(p.name)) {
            const nm = p.name + "."; pg.drawText(nm, { x: M + 16, y: yy, size: 10, font: f.bold, color: K.rustDark });
            pg.drawText(l.slice(nm.length), { x: M + 16 + f.bold.widthOfTextAtSize(nm, 10), y: yy, size: 10, font: f.body, color: K.ink });
          } else pg.drawText(l, { x: M + 16, y: yy, size: 10, font: f.body, color: K.ink });
          yy -= 13.5;
        });
        yy -= 4;
      });
      y = by;
    }
    footer(pg, `Full town guide: floridacoastal.co/towns/${t.id}`);
    return y;
  }

  /* --- side by side --- */
  {
    const pg = doc.addPage([W, H]);
    header(pg, picks.length + 2, "Side by side");
    let y = H - 118;
    pg.drawText(picks.length === 5 ? "Your five, side by side" : "Side by side", { x: M, y, size: 28, font: f.head, color: K.ink });
    y -= 22;
    para(pg, "Scores run 1 to 5 and rate what each town offers. The best in each row is marked in bold.", M, y, { font: f.body, size: 10.5, width: W - 2 * M, color: K.muted });
    y -= 34;
    const labW = 118, cw = (W - 2 * M - labW) / Math.max(1, picks.length);
    // column heads
    picks.forEach((t, i) => {
      const x = M + labW + i * cw;
      pg.drawText(String(i + 1), { x, y, size: 16, font: f.headBold, color: K.rust });
      wrap(t.name, f.head, 11, cw - 8).slice(0, 2).forEach((l, k) => pg.drawText(l, { x, y: y - 16 - k * 13, size: 11, font: f.head, color: K.ink }));
    });
    y -= 50;
    const rows = [["Median home", (t) => t.price || "Ask us"], ...SCORE_LABELS.map(([k, l]) => [l, k])];
    rows.forEach(([lab, key], r) => {
      const rh = r === 0 ? 30 : 24;
      if (r % 2 === 0) pg.drawRectangle({ x: M - 6, y: y - rh + 16, width: W - 2 * M + 12, height: rh, color: K.paper });
      pg.drawText(lab, { x: M, y: y + 2 - (r === 0 ? 4 : 0), size: 9.5, font: f.bold, color: K.ink });
      if (typeof key === "function") {
        picks.forEach((t, i) => para(pg, key(t), M + labW + i * cw, y - 2, { font: f.head, size: 11.5, width: cw - 8, color: K.ink, lh: 12 }));
      } else {
        const vals = picks.map((t) => (t.scores || {})[key] || 0); const best = Math.max(...vals);
        picks.forEach((t, i) => {
          const v = vals[i], x = M + labW + i * cw;
          dots(pg, x + 3, y + 5, v, 3.1, 9);
          pg.drawText(String(v), { x: x + 52, y: y + 2, size: 9.5, font: v === best ? f.bold : f.body, color: v === best ? K.rust : K.muted });
        });
      }
      y -= rh;
    });
    y -= 18;
    caps(pg, "The airport drive", M, y, 8, K.rust);
    y -= 16;
    picks.forEach((t, i) => { y = para(pg, `${i + 1}. ${t.name}: ${t.airport}`, M, y, { font: f.body, size: 9.5, width: W - 2 * M, color: K.ink, lh: 13 }); });
    footer(pg, "Scores last checked October 2026. Details should be confirmed locally.");
  }

  /* --- before you visit + note --- */
  {
    const pg = doc.addPage([W, H]);
    header(pg, total, "Before you visit");
    let y = H - 118;
    pg.drawText("Before you fall for an address", { x: M, y, size: 28, font: f.head, color: K.ink });
    y -= 32;
    const items = [
      ["Visit in August, not just February.", "The town you love in winter is the town you live in all summer. Go once in the heat."],
      ["Get an insurance quote for a real address.", "Homeowners and flood both. It can change the math more than the price of the house."],
      ["Look up the flood zone and evacuation zone.", "FEMA's flood map and floridadisaster.org/knowyourzone, for any address you're serious about."],
      ["Drive to the airport at rush hour.", "And to the grocery store and the beach. The drives you'll actually make every week."],
      ["Spend a Saturday morning at the market.", "It's the fastest way to see who lives there and how the town feels when it isn't on vacation."],
      ["Ask a local.", "Reply to your email with any question. We'll give you the honest answer."],
    ];
    items.forEach(([a, b]) => {
      pg.drawRectangle({ x: M, y: y - 3, width: 11, height: 11, borderColor: K.rust, borderWidth: 1.2 });
      pg.drawText(a, { x: M + 22, y, size: 11.5, font: f.bold, color: K.ink });
      y = para(pg, b, M + 22, y - 15, { font: f.body, size: 10, width: W - 2 * M - 22, color: K.muted, lh: 13.5 });
      y -= 12;
    });
    // note block
    const bh = 190, by = Math.max(70, y - 24 - bh);
    pg.drawRectangle({ x: M, y: by, width: W - 2 * M, height: bh, color: K.ink });
    let ny = by + bh - 36;
    caps(pg, "From our family", M + 28, ny, 8.5, K.peach);
    ny -= 30;
    ny = para(pg, "In 2005 we had two weeks to pick a Florida town to retire and raise three kids. We built Florida Coastal so you can make this choice with more than two weeks and a guess.", M + 28, ny,
      { font: f.head, size: 15, width: W - 2 * M - 56, color: K.white, lh: 21 });
    ny -= 10;
    pg.drawText("Mark and Betsy Scott", { x: M + 28, y: ny, size: 11, font: f.bold, color: K.peach });
    ny -= 16;
    pg.drawText("Coming to this coast for more than 20 years  ·  hello@floridacoastal.co", { x: M + 28, y: ny, size: 9.5, font: f.body, color: K.soft });
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

function shell(subject, preheader, rows) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap" rel="stylesheet">
<style>body{margin:0;padding:0;background:${C.paper}}a{color:${C.sea}}@media (max-width:620px){.container{width:100%!important}.px{padding-left:22px!important;padding-right:22px!important}.hero-h{font-size:34px!important}}</style></head>
<body style="margin:0;padding:0;background:${C.paper};"><div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${C.white};border-radius:14px;overflow:hidden;">
<tr><td class="px" style="padding:26px 40px 20px 40px;"><a href="${SITE}/?${UTM}"><img src="${SITE}/img/logo.png" width="170" alt="Florida Coastal" style="display:block;width:170px;height:auto;border:0;"></a></td></tr>
<tr><td class="px" style="padding:0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="3" style="height:3px;line-height:3px;font-size:0;background:${C.rust};background-image:linear-gradient(90deg,${C.rust},${C.peach} 60%,${C.white});">&nbsp;</td></tr></table></td></tr>
${rows}
<tr><td class="px" align="center" style="padding:24px 40px 28px 40px;background:${C.paper};"><p style="margin:0;font-family:${F_BODY};font-size:12px;line-height:1.6;color:#7E8F92;"><a href="${SITE}/privacy.html" style="color:${C.muted};">Privacy</a> &nbsp;&middot;&nbsp; <a href="mailto:hello@floridacoastal.co?subject=Unsubscribe" style="color:${C.muted};">Unsubscribe</a><br>Florida Coastal &middot; floridacoastal.co</p></td></tr>
</table></td></tr></table></body></html>`;
}
const P = (t, extra = "") => `<p style="margin:0 0 16px 0;font-family:${F_BODY};font-size:16px;line-height:1.65;color:${C.ink};${extra}">${t}</p>`;

export function buildGuideEmail(lead, picks, guideUrl) {
  const name = firstName(lead.name);
  const subject = "Have you picked your three yet?";
  const top = picks[0] ? esc(picks[0].name) : "";
  const url = guideUrl || SITE + "/articles/first-90-days.html";
  const items = [
    ["Serve something.", "Rotary, Kiwanis, the chamber, Habitat. You meet the people who run the town."],
    ["Believe something.", "A church or synagogue, a small group. A weekly rhythm and real care for newcomers."],
    ["Play something.", "A pickleball league, a run club, a fishing or sailing club. The same faces every week."],
  ].map(([a, b]) => `<tr><td valign="top" width="22" style="padding:4px 0 12px 0;font-family:${F_HEAD};font-size:18px;color:${C.rust};">&bull;</td><td style="padding:4px 0 12px 0;font-family:${F_BODY};font-size:15px;line-height:1.55;color:${C.ink};"><b>${a}</b> ${b}</td></tr>`).join("");
  const rows = `
<tr><td class="px" style="padding:34px 40px 6px 40px;">
  <p style="margin:0 0 12px 0;font-family:${F_BODY};font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.rust};">From the Move and Belong Guide</p>
  <h1 class="hero-h" style="margin:0 0 18px 0;font-family:${F_HEAD};font-weight:400;font-size:40px;line-height:1.12;color:${C.ink};">Pick your three.</h1>
  ${P(`${name ? `Hi ${esc(name)}, a` : "A"} few days ago you found your five${top ? `, with ${top} at the top` : ""}. If you only do one thing from the guide, do this: pick three groups that meet in person on a schedule, from three different parts of life. You can even look them up before you move.`)}
</td></tr>
<tr><td class="px" style="padding:6px 40px 0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items}</table></td></tr>
<tr><td class="px" align="left" style="padding:14px 40px 34px 40px;">${P("Search your town plus the thing plus \"club\" or \"league\". Then go to the next meeting, alone if you have to.")}<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${C.rust};border-radius:999px;"><a href="${url}" style="display:inline-block;padding:14px 30px;font-family:${F_BODY};font-size:15px;font-weight:700;color:${C.white};text-decoration:none;">Open the guide</a></td></tr></table>
  <p style="margin:22px 0 0 0;font-family:${F_BODY};font-size:15px;line-height:1.6;color:${C.muted};">Want help finding the groups in your town? Just reply.<br><span style="font-family:${F_HEAD};font-style:italic;color:${C.rustDark};">Mark and Betsy Scott</span></p></td></tr>`;
  const text = `${name ? `Hi ${name}, a` : "A"} few days ago you found your five. If you only do one thing from the Move and Belong Guide, pick three groups that meet in person on a schedule: serve something, believe something, play something.\n\nThe guide: ${url}\n\nWant help finding the groups in your town? Just reply.\nMark and Betsy Scott\nFlorida Coastal`;
  return { subject, html: shell(subject, "The one thing from the guide we'd do this week.", rows), text };
}

export function buildNoteEmail(lead, picks) {
  const name = firstName(lead.name);
  const names = picks.map((t) => t.name);
  const list = names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names.at(-1) : names[0] || "your towns";
  const subject = "Which one are you leaning toward?";
  const body = [
    `Hi${name ? " " + name : ""},`,
    `It's been about a week since you found your towns on Florida Coastal: ${list}.`,
    `I'm curious which one you're leaning toward, and what's still giving you pause. Hit reply and tell me. I read every one, and I'm happy to hop on a quick call if that's easier.`,
    `Mark Scott<br>Florida Coastal`,
  ];
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:24px 16px;background:#FFFFFF;">
<div style="max-width:560px;font-family:'DM Sans','Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:1.6;color:${C.ink};">${body.map((b) => `<p style="margin:0 0 16px 0;">${b}</p>`).join("")}
<p style="margin:24px 0 0 0;font-size:12px;color:#7E8F92;"><a href="mailto:hello@floridacoastal.co?subject=Unsubscribe" style="color:#7E8F92;">Unsubscribe</a></p></div></body></html>`;
  const text = body.join("\n\n").replace("<br>", "\n");
  return { subject, html, text };
}

export function buildWelcomeEmail(lead, guideUrl) {
  const name = firstName(lead.name);
  const subject = "Your Move and Belong Guide";
  const url = guideUrl || SITE + "/articles/first-90-days.html";
  const items = [
    ["Plan to be exhausted for 90 days.", "Put the work in up front, so you can enjoy the friendships for years."],
    ["Join three communities.", "Serve something, believe something, play something. Then get involved."],
    ["Be the host.", "Don't wait for an invite. People remember who had them over first."],
  ].map(([a, b]) => `<tr><td valign="top" width="22" style="padding:4px 0 12px 0;font-family:${F_HEAD};font-size:18px;color:${C.rust};">&bull;</td><td style="padding:4px 0 12px 0;font-family:${F_BODY};font-size:15px;line-height:1.55;color:${C.ink};"><b>${a}</b> ${b}</td></tr>`).join("");
  const rows = `
<tr><td class="px" style="padding:34px 40px 6px 40px;">
  <p style="margin:0 0 12px 0;font-family:${F_BODY};font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.rust};">Your free guide</p>
  <h1 class="hero-h" style="margin:0 0 18px 0;font-family:${F_HEAD};font-weight:400;font-size:40px;line-height:1.12;color:${C.ink};">The boxes are the easy part.</h1>
  ${P(`${name ? `Hi ${esc(name)}, here` : "Here"}'s the Move and Belong Guide. It's what we'd tell a friend who just signed the papers on a Florida town: how to go from new in town to knowing people in your first 90 days.`)}
</td></tr>
<tr><td class="px" style="padding:6px 40px 0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items}</table></td></tr>
<tr><td class="px" align="left" style="padding:14px 40px 30px 40px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${C.rust};border-radius:999px;"><a href="${url}" style="display:inline-block;padding:14px 30px;font-family:${F_BODY};font-size:15px;font-weight:700;color:${C.white};text-decoration:none;">Read the guide</a></td></tr></table>
  ${P(`Still picking your town? Our free quiz matches you to the Florida beach towns that fit how you want to live. <a href="${SITE}/find-your-mile.html?${UTM.replace("top5", "welcome")}" style="color:${C.sea};font-weight:700;">Find your top 5</a>`, "margin-top:22px;")}
  <p style="margin:0;font-family:${F_BODY};font-size:15px;line-height:1.6;color:${C.muted};">After this, one short letter a month about the coast. Questions? Just reply.<br><span style="font-family:${F_HEAD};font-style:italic;color:${C.rustDark};">Mark and Betsy Scott</span></p></td></tr>`;
  const text = `${name ? `Hi ${name}, here` : "Here"}'s the Move and Belong Guide: ${url}\n\nStill picking your town? Take the free quiz: ${SITE}/find-your-mile.html\n\nAfter this, one short letter a month about the coast. Questions? Just reply.\nMark and Betsy Scott\nFlorida Coastal`;
  return { subject, html: shell(subject, "How to go from new in town to knowing people in your first 90 days.", rows), text };
}
