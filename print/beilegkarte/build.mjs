// Erzeugt die Beilegkarte als druckfertige PDFs.
//
//   node print/beilegkarte/build.mjs
//
// Ergebnis (im selben Ordner):
//   nodotempo-beilegkarte-A4-zuhause.pdf   – 4 Karten pro A4-Blatt, Vorder- und Rückseite
//   nodotempo-beilegkarte-A6-druckerei.pdf – eine Karte A6 mit 3 mm Beschnitt für Online-Druckereien
//
// Texte lassen sich unten in FRONT und BACK anpassen. Benötigt Playwright/Chromium.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW ?? "playwright");

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../..");

// ─── Inhalte ────────────────────────────────────────────────────────────────

const company = {
  owner: "[Vor- und Nachname]",
  street: "[Straße Hausnummer]",
  city: "[PLZ Ort]",
  email: "hallo@nodotempo.de",
  web: "nodotempo.de",
  instagram: "@nodotempo",
};

const logoPath = fs
  .readFileSync(path.join(root, "components/LogoScript.tsx"), "utf8")
  .match(/const PATH =\s*"([^"]+)"/)[1];

const logo = `<svg class="logo" viewBox="-795 -322 1615 472" fill="currentColor" aria-label="Nodotempo"><path d="${logoPath}"/></svg>`;

const mark = `<svg class="mark" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12.5" cy="16" r="8.5"/><circle cx="19.5" cy="16" r="8.5"/><line x1="19.5" y1="16" x2="19.5" y2="10.5"/></svg>`;

const FRONT = `
  <div class="front">
    <div class="front-main">
    <p class="eyebrow">Danke</p>
    ${logo}
    <div class="rule"></div>
    <p class="lead">Schön, dass du da bist.</p>
    <p class="text">
      Dein Armband wurde von Hand geknüpft und mit Sorgfalt für dich verpackt.
      Wir hoffen, es begleitet dich lange – neben der Uhr oder ganz für sich.
    </p>
    <p class="motto"><em>Nodo</em> – der Knoten. <em>Tempo</em> – die Zeit.</p>
    </div>
    <div class="foot">${mark}<span>${company.web} &nbsp;·&nbsp; ${company.instagram}</span></div>
  </div>`;

const BACK = `
  <div class="back">
    <section>
      <h2>Anlegen &amp; anpassen</h2>
      <p>Schiebe die beiden Knoten auseinander, um die Schlaufe zu weiten. Armband überstreifen und an beiden Enden
      ziehen, bis es angenehm sitzt – etwa ein Finger breit Luft.</p>
    </section>
    <section>
      <h2>Pflege</h2>
      <p>Bei Bedarf mit lauwarmem Wasser und etwas milder Seife von Hand waschen und an der Luft trocknen lassen.
      Nicht in den Trockner geben.</p>
    </section>
    <section>
      <h2>Material</h2>
      <p>Paracord, geflochtene Kordel:</p>
      <p class="checks"><span class="box"></span>100 % Polyamid (Nylon) <span class="box gap"></span>100 % Polyester</p>
    </section>
    <section>
      <h2>Fragen, Umtausch, Rückgabe</h2>
      <p>Du hast 30 Tage Zeit. Schreib uns einfach an <strong>${company.email}</strong> – wir kümmern uns darum.</p>
    </section>
    <div class="share">Zeig uns deinen Look: <strong>${company.instagram}</strong></div>
    <p class="maker">
      Hersteller: Nodotempo · ${company.owner} · ${company.street} · ${company.city} · ${company.email}
    </p>
  </div>`;

// ─── Gestaltung ─────────────────────────────────────────────────────────────

// Schriften werden direkt eingebettet, damit sie im PDF sicher enthalten sind.
const font = (file) =>
  "data:font/woff2;base64," + fs.readFileSync(path.join(root, "node_modules", file)).toString("base64");

const css = `
@font-face { font-family: "Cormorant Garamond"; font-weight: 400; font-style: normal;
  src: url("${font("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2")}"); }
@font-face { font-family: "Cormorant Garamond"; font-weight: 400; font-style: italic;
  src: url("${font("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2")}"); }
@font-face { font-family: "Cormorant Garamond"; font-weight: 500; font-style: normal;
  src: url("${font("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2")}"); }
@font-face { font-family: "Manrope"; font-weight: 400;
  src: url("${font("@fontsource/manrope/files/manrope-latin-400-normal.woff2")}"); }
@font-face { font-family: "Manrope"; font-weight: 600;
  src: url("${font("@fontsource/manrope/files/manrope-latin-600-normal.woff2")}"); }

:root { --green: #14291f; --green-soft: #3b4f44; --gold: #a8865a; --line: #c9cfc9; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #fff; }
body { font-family: "Manrope", sans-serif; color: var(--green); -webkit-print-color-adjust: exact; print-color-adjust: exact; }

.sheet { position: relative; display: grid; page-break-after: always; overflow: hidden; }
.sheet:last-child { page-break-after: auto; }
.card { position: relative; overflow: hidden; display: flex; }
.card > div { flex: 1; }

/* Vorderseite */
.front { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 12mm 12mm 10mm; }
.front-main { margin: auto 0; display: flex; flex-direction: column; align-items: center; }
.eyebrow { font-size: 6.5pt; font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); }
.logo { width: 62mm; height: auto; margin-top: 5mm; color: var(--green); }
.rule { width: 12mm; height: 0.3mm; background: var(--gold); margin: 7mm 0 6mm; }
.lead { font-family: "Cormorant Garamond", serif; font-size: 15pt; line-height: 1.2; }
.text { font-size: 7.6pt; line-height: 1.6; color: var(--green-soft); margin-top: 3.5mm; max-width: 66mm; }
.motto { font-family: "Cormorant Garamond", serif; font-size: 10pt; margin-top: 5mm; }
.motto em { font-style: italic; }
.foot { display: flex; align-items: center; gap: 2mm; font-size: 6.5pt; letter-spacing: 0.12em; color: var(--green-soft); }
.mark { width: 4.2mm; height: 4.2mm; color: var(--green); }

/* Rückseite */
.back { display: flex; flex-direction: column; padding: 11mm 11mm 8mm; }
.back section { padding: 3.6mm 0; border-bottom: 0.2mm solid var(--line); }
.back section:first-child { padding-top: 0; }
.back h2 { font-family: "Cormorant Garamond", serif; font-weight: 500; font-size: 11.5pt; line-height: 1.2; margin-bottom: 1.2mm; }
.back p { font-size: 7.6pt; line-height: 1.55; color: var(--green-soft); }
.back strong { color: var(--green); font-weight: 600; }
.checks { display: flex; align-items: center; gap: 1.6mm; margin-top: 1.2mm; color: var(--green) !important; }
.box { display: inline-block; width: 2.8mm; height: 2.8mm; border: 0.25mm solid var(--green); border-radius: 0.4mm; }
.box.gap { margin-left: 3mm; }
.share { font-size: 7.6pt; text-align: center; margin-top: 5mm; color: var(--green-soft); }
.maker { margin-top: auto; font-size: 5.6pt !important; line-height: 1.5; text-align: center; color: var(--green-soft); }

/* Schnittmarken (A4-Variante) */
.cut { position: absolute; background: #9aa39d; }
`;

const page = (body, w, h) => `<!doctype html><html lang="de"><head><meta charset="utf-8">
<style>${css} @page { size: ${w}mm ${h}mm; margin: 0; }</style></head><body>${body}</body></html>`;

// A4: 4 Karten (105 × 148,5 mm) füllen das Blatt exakt – nur zwei Schnitte nötig.
function a4Sheet(content) {
  const cards = Array.from({ length: 4 }, () => `<div class="card">${content}</div>`).join("");
  const marks = [
    // senkrechter Schnitt (Mitte), oben und unten am Rand
    `<div class="cut" style="left:105mm;top:3mm;width:0.2mm;height:6mm"></div>`,
    `<div class="cut" style="left:105mm;bottom:3mm;width:0.2mm;height:6mm"></div>`,
    // waagerechter Schnitt (Mitte), links und rechts am Rand
    `<div class="cut" style="top:148.5mm;left:3mm;height:0.2mm;width:6mm"></div>`,
    `<div class="cut" style="top:148.5mm;right:3mm;height:0.2mm;width:6mm"></div>`,
  ].join("");
  return `<div class="sheet" style="width:210mm;height:297mm;grid-template-columns:105mm 105mm;grid-template-rows:148.5mm 148.5mm">${cards}${marks}</div>`;
}

// A6 mit 3 mm Beschnitt auf jeder Seite (111 × 154 mm), Inhalt im A6-Format mittig.
function a6Sheet(content) {
  return `<div class="sheet" style="width:111mm;height:154mm;padding:3mm;grid-template-columns:105mm;grid-template-rows:148mm"><div class="card">${content}</div></div>`;
}

async function render(browser, html, file, w, h) {
  const p = await browser.newPage();
  await p.setContent(html, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.join(dir, file), width: `${w}mm`, height: `${h}mm`, printBackground: true, preferCSSPageSize: true });
  await p.close();
}

const browser = await chromium.launch();
await render(browser, page(a4Sheet(FRONT) + a4Sheet(BACK), 210, 297), "nodotempo-beilegkarte-A4-zuhause.pdf", 210, 297);
await render(browser, page(a6Sheet(FRONT) + a6Sheet(BACK), 111, 154), "nodotempo-beilegkarte-A6-druckerei.pdf", 111, 154);

// Vorschaubild (Vorder- und Rückseite nebeneinander)
const preview = await browser.newPage({ viewport: { width: 900, height: 640 }, deviceScaleFactor: 2 });
await preview.setContent(
  `<!doctype html><html><head><meta charset="utf-8"><style>${css}
   body{background:#e9e6e0;display:flex;gap:40px;justify-content:center;align-items:center;height:640px}
   .card{width:105mm;height:148mm;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.15)}</style></head>
   <body><div class="card">${FRONT}</div><div class="card">${BACK}</div></body></html>`,
  { waitUntil: "load" },
);
await preview.evaluate(() => document.fonts.ready);
await preview.screenshot({ path: path.join(dir, "vorschau.png") });
await browser.close();
console.log("Fertig:", fs.readdirSync(dir).filter((f) => /\.(pdf|png)$/.test(f)).join(", "));
