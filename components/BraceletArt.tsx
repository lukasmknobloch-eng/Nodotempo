import type { Product } from "@/lib/products";

// Gezeichnete Produktvorschau eines geknüpften Kordelarmbands mit zwei
// Schiebeknoten. Wird angezeigt, solange für einen Artikel noch keine Fotos in
// public/produkte/<slug>/ liegen.

type Art = Product["art"];

const W = 400;
const H = 500;
const CX = 200;
const CY = 248;
const RX = 112;
const RY = 148;
const GAP = 11; // Abstand der beiden Kordelstränge im Knotenbereich
const T1 = -1.15; // Beginn des doppelt gelegten Bereichs
const T2 = 0.25; // Ende des doppelt gelegten Bereichs

export function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount));
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function artId(art: Art) {
  return `c${(art.primary + art.secondary).replace(/[^a-z0-9]/gi, "")}`;
}

/** Punkt auf der Ellipse, optional nach außen versetzt */
function at(t: number, offset = 0) {
  const nx = Math.cos(t) / RX;
  const ny = Math.sin(t) / RY;
  const len = Math.hypot(nx, ny);
  return {
    x: CX + RX * Math.cos(t) + (nx / len) * offset,
    y: CY + RY * Math.sin(t) + (ny / len) * offset,
  };
}

function arcPath(from: number, to: number, offset: number) {
  const steps = 40;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const p = at(from + ((to - from) * i) / steps, offset);
    return `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ");
}

function tangentDeg(t: number) {
  return (Math.atan2(RY * Math.cos(t), -RX * Math.sin(t)) * 180) / Math.PI;
}

function hashRotation(art: Art) {
  let h = 0;
  for (const ch of art.primary + art.secondary) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return (Math.abs(h) % 36) - 22; // −22° … 13°
}

/** Musterdefinition der Kordel (Rautenmuster wie bei geflochtener Kordel) */
export function CordPattern({ art, id }: { art: Art; id: string }) {
  return (
    <pattern id={`${id}-pat`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="6" height="6" fill={art.primary} />
      <rect x="1.6" y="1.6" width="2.8" height="2.8" fill={art.secondary} />
      <path d="M0 0H6M0 0V6" stroke={shade(art.primary, -0.3)} strokeWidth="0.6" />
    </pattern>
  );
}

function Strand({ d, id, art, width = 10 }: { d: string; id: string; art: Art; width?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={shade(art.primary, -0.45)} strokeWidth={width + 2} />
      <path d={d} stroke={`url(#${id}-pat)`} strokeWidth={width} />
      <path d={d} stroke="#fff" strokeOpacity="0.2" strokeWidth={width * 0.25} transform="translate(-1 -1.2)" />
    </g>
  );
}

function Knot({ t, id, art }: { t: number; id: string; art: Art }) {
  const p = at(t, GAP / 2);
  const edge = shade(art.primary, -0.45);
  return (
    <g transform={`translate(${p.x} ${p.y}) rotate(${tangentDeg(t)})`}>
      <ellipse rx="17" ry="14" fill={`url(#${id}-pat)`} stroke={edge} strokeWidth="1.4" />
      {[-9, -3, 3, 9].map((x) => (
        <path key={x} d={`M ${x} -13 Q ${x + 4} 0 ${x} 13`} stroke={edge} strokeWidth="1.3" fill="none" strokeOpacity="0.75" />
      ))}
      <ellipse rx="12" ry="5" cy="-5" fill="#fff" opacity="0.14" />
    </g>
  );
}

function Tail({ from, to, id, art }: { from: number; to: number; id: string; art: Art }) {
  const end = at(to, GAP);
  return (
    <g>
      <Strand d={arcPath(from, to, GAP)} id={id} art={art} />
      <circle cx={end.x} cy={end.y} r="5" fill={shade(art.primary, -0.5)} />
      <circle cx={end.x} cy={end.y} r="2.4" fill={shade(art.secondary, -0.2)} opacity="0.7" />
    </g>
  );
}

export function BraceletArt({ art, className, label }: { art: Art; className?: string; label?: string }) {
  const id = artId(art);
  const loop = arcPath(0, Math.PI * 2, 0) + " Z";
  const outer = arcPath(T1, T2, GAP);
  const tailA = { from: T1, to: T1 - 0.16 };
  const tailB = { from: T2, to: T2 + 0.16 };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={label ?? "Produktabbildung"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="45%" r="75%">
          <stop offset="0%" stopColor={shade(art.background, 0.5)} />
          <stop offset="100%" stopColor={art.background} />
        </radialGradient>
        <CordPattern art={art} id={id} />
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-bg)`} />

      <g transform={`rotate(${hashRotation(art)} ${CX} ${CY})`}>
        {/* Schatten */}
        <g transform="translate(5 8)" filter={`url(#${id}-blur)`} opacity="0.22" stroke="#000" fill="none" strokeWidth="12">
          <path d={loop} />
          <path d={arcPath(T1 - 0.16, T2 + 0.16, GAP)} />
        </g>

        <Strand d={loop} id={id} art={art} />
        <Strand d={outer} id={id} art={art} />
        <Tail {...tailA} id={id} art={art} />
        <Tail {...tailB} id={id} art={art} />
        <Knot t={T1 + 0.08} id={id} art={art} />
        <Knot t={T2 - 0.08} id={id} art={art} />
      </g>
    </svg>
  );
}

/** Runder Farbtupfer im Kordelmuster, z. B. für die Farbauswahl */
export function CordSwatch({ art, size = 44 }: { art: Art; size?: number }) {
  const id = `${artId(art)}-sw`;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
      <defs>
        <CordPattern art={art} id={id} />
      </defs>
      <circle cx="22" cy="22" r="21" fill={`url(#${id}-pat)`} />
      <circle cx="22" cy="22" r="20.5" fill="none" stroke="#000" strokeOpacity="0.12" />
    </svg>
  );
}
