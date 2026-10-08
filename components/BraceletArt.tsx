import type { Product } from "@/lib/products";

// Gezeichnete Produktvorschau, die angezeigt wird, solange für einen Artikel
// noch keine Fotos in public/produkte/<slug>/ liegen.

type Art = Product["art"];

const W = 400;
const H = 500;
const CX = 200;
const CY = 250;
const RX = 128;
const RY = 60;

function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount));
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function point(t: number) {
  return { x: CX + RX * Math.cos(t), y: CY + RY * Math.sin(t), depth: Math.sin(t) };
}

/** Parameter t für n Punkte mit gleichem Abstand entlang der Ellipse */
function evenlySpaced(n: number) {
  const steps = 720;
  const start = Math.PI / 2;
  const lengths = [0];
  for (let i = 1; i <= steps; i++) {
    const a = point(start + ((i - 1) / steps) * Math.PI * 2);
    const b = point(start + (i / steps) * Math.PI * 2);
    lengths.push(lengths[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
  }
  const total = lengths[steps];
  return Array.from({ length: n }, (_, k) => {
    const target = (k / n) * total;
    let i = 0;
    while (lengths[i + 1] < target) i++;
    const frac = (target - lengths[i]) / (lengths[i + 1] - lengths[i] || 1);
    return start + ((i + frac) / steps) * Math.PI * 2;
  });
}

function tangentDeg(t: number) {
  return (Math.atan2(RY * Math.cos(t), -RX * Math.sin(t)) * 180) / Math.PI;
}

export function BraceletArt({ art, className, label }: { art: Art; className?: string; label?: string }) {
  const id = `a${(art.style + art.primary + (art.secondary ?? "") + art.accent).replace(/[^a-z0-9]/gi, "")}`;
  const secondary = art.secondary ?? art.primary;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={label ?? "Produktabbildung"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="42%" r="75%">
          <stop offset="0%" stopColor={shade(art.background, 0.45)} />
          <stop offset="100%" stopColor={art.background} />
        </radialGradient>
        <radialGradient id={`${id}-bead1`} cx="34%" cy="30%" r="75%">
          <stop offset="0%" stopColor={shade(art.primary, 0.55)} />
          <stop offset="35%" stopColor={shade(art.primary, 0.1)} />
          <stop offset="100%" stopColor={shade(art.primary, -0.45)} />
        </radialGradient>
        <radialGradient id={`${id}-bead2`} cx="34%" cy="30%" r="75%">
          <stop offset="0%" stopColor={shade(secondary, 0.55)} />
          <stop offset="35%" stopColor={shade(secondary, 0.1)} />
          <stop offset="100%" stopColor={shade(secondary, -0.45)} />
        </radialGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shade(art.accent, 0.6)} />
          <stop offset="45%" stopColor={art.accent} />
          <stop offset="55%" stopColor={shade(art.accent, -0.25)} />
          <stop offset="100%" stopColor={shade(art.accent, 0.3)} />
        </linearGradient>
        <linearGradient id={`${id}-link`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={shade(art.primary, -0.15)} />
          <stop offset="40%" stopColor={secondary} />
          <stop offset="60%" stopColor={art.primary} />
          <stop offset="100%" stopColor={shade(art.primary, -0.3)} />
        </linearGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      <ellipse cx={CX} cy={CY + RY + 48} rx={RX * 0.95} ry={20} fill="#000" opacity="0.16" filter={`url(#${id}-blur)`} />

      {art.style === "beads" && <Beads id={id} />}
      {art.style === "chain" && <Chain id={id} />}
      {art.style === "leather" && <Leather id={id} art={art} />}
      {art.style === "cord" && <Cord id={id} art={art} />}
    </svg>
  );
}

function Beads({ id }: { id: string }) {
  const items = evenlySpaced(24)
    .map((t, i) => ({ i, t, ...point(t) }))
    .sort((a, b) => a.y - b.y);

  return (
    <g>
      {items.map(({ i, t, x, y, depth }) => {
        const scale = 0.84 + 0.16 * ((depth + 1) / 2);
        const r = 15.5 * scale;
        const dim = depth < 0 ? -depth * 0.35 : 0;
        if (i === 0) {
          // Metall-Element vorne in der Mitte
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${tangentDeg(t)})`}>
              <rect x={-9} y={-r * 1.02} width={18} height={r * 2.04} rx={4} fill={`url(#${id}-metal)`} />
              <rect x={-9} y={-r * 1.02} width={18} height={r * 2.04} rx={4} fill="none" stroke="#000" strokeOpacity="0.12" />
            </g>
          );
        }
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={`url(#${id}-bead${i % 3 === 1 ? 2 : 1})`} />
            {dim > 0 && <circle cx={x} cy={y} r={r} fill="#000" opacity={dim} />}
          </g>
        );
      })}
    </g>
  );
}

function Chain({ id }: { id: string }) {
  const items = evenlySpaced(30)
    .map((t, i) => ({ i, t, ...point(t) }))
    .sort((a, b) => a.y - b.y);

  return (
    <g>
      {items.map(({ i, t, x, y, depth }) => {
        const scale = 0.8 + 0.2 * ((depth + 1) / 2);
        const w = (i === 0 ? 34 : 24) * scale;
        const h = 26 * scale;
        const dim = depth < 0 ? -depth * 0.4 : 0;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${tangentDeg(t)})`}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={3} fill={`url(#${id}-${i === 0 ? "metal" : "link"})`} />
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={3} fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth={0.8} />
            {i !== 0 && <line x1={-w / 2 + 3} y1={0} x2={w / 2 - 3} y2={0} stroke="#fff" strokeOpacity="0.35" strokeWidth={0.8} />}
            {dim > 0 && <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={3} fill="#000" opacity={dim} />}
          </g>
        );
      })}
    </g>
  );
}

const upperArc = (dy: number) => `M ${CX - RX} ${CY + dy} A ${RX} ${RY} 0 0 1 ${CX + RX} ${CY + dy}`;
const lowerArc = (dy: number) => `M ${CX + RX} ${CY + dy} A ${RX} ${RY} 0 0 1 ${CX - RX} ${CY + dy}`;

function Leather({ id, art }: { id: string; art: Art }) {
  const secondary = art.secondary ?? art.primary;
  return (
    <g fill="none" strokeLinecap="round">
      {[-9, 9].map((dy) => (
        <path key={`b${dy}`} d={upperArc(dy)} stroke={shade(art.primary, -0.35)} strokeWidth={13} />
      ))}
      {[-9, 9].map((dy) => (
        <g key={`f${dy}`}>
          <path d={lowerArc(dy)} stroke={art.primary} strokeWidth={14} />
          <path d={lowerArc(dy - 3)} stroke={secondary} strokeWidth={3} strokeOpacity="0.6" />
          <path d={lowerArc(dy)} stroke={shade(art.primary, 0.45)} strokeWidth={0.9} strokeDasharray="4 5" strokeOpacity="0.7" />
        </g>
      ))}
      <g transform={`translate(${CX} ${CY + RY})`}>
        <rect x={-26} y={-24} width={52} height={48} rx={7} fill={`url(#${id}-metal)`} />
        <rect x={-26} y={-24} width={52} height={48} rx={7} stroke="#000" strokeOpacity="0.15" />
        <line x1={0} y1={-24} x2={0} y2={24} stroke="#000" strokeOpacity="0.25" />
      </g>
    </g>
  );
}

function Cord({ id, art }: { id: string; art: Art }) {
  const secondary = art.secondary ?? art.primary;
  const right = point(Math.PI / 2 - 0.9);
  return (
    <g fill="none" strokeLinecap="round">
      {[-4, 4].map((dy) => (
        <path key={`b${dy}`} d={upperArc(dy)} stroke={shade(art.primary, -0.3)} strokeWidth={5} />
      ))}
      {[-4, 4].map((dy) => (
        <g key={`f${dy}`}>
          <path d={lowerArc(dy)} stroke={art.primary} strokeWidth={5.5} />
          <path d={lowerArc(dy)} stroke={shade(secondary, 0.35)} strokeWidth={5.5} strokeDasharray="1.5 3" strokeOpacity="0.5" />
        </g>
      ))}
      {/* Der Knoten */}
      <g transform={`translate(${CX} ${CY + RY})`}>
        <ellipse rx={20} ry={14} stroke={shade(art.primary, -0.2)} strokeWidth={8} />
        <path d="M -22 -6 C -6 -22, 6 22, 22 6" stroke={art.primary} strokeWidth={8} />
        <path d="M -22 6 C -6 22, 6 -22, 22 -6" stroke={shade(art.primary, 0.15)} strokeWidth={8} />
        <path d="M -22 6 C -6 22, 6 -22, 22 -6" stroke={shade(secondary, 0.5)} strokeWidth={8} strokeDasharray="1.5 3" strokeOpacity="0.4" />
      </g>
      {/* Silberelement */}
      <g transform={`translate(${right.x} ${right.y}) rotate(${tangentDeg(Math.PI / 2 - 0.9)})`}>
        <rect x={-11} y={-13} width={22} height={26} rx={5} fill={`url(#${id}-metal)`} stroke="#000" strokeOpacity="0.15" />
      </g>
    </g>
  );
}
