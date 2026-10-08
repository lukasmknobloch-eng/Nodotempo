import { CordPattern, shade } from "./BraceletArt";

// Illustration für die Startseite: Uhr und Nodotempo-Kordelarmband an einem
// Handgelenk, von oben gesehen. Wird ersetzt, sobald public/bilder/hero.jpg existiert.

const cord = { primary: "#8b2a2c", secondary: "#e2b07a", background: "#000000" };

export function HeroArt({ className }: { className?: string }) {
  const curve = "M 40 600 Q 300 520 560 600";
  const curve2 = "M 112 566 Q 190 548.6 268 545.6";
  const edge = shade(cord.primary, -0.45);
  const markers = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <svg viewBox="0 0 600 720" className={className} role="img" aria-label="Uhr und Nodotempo-Armband am Handgelenk">
      <defs>
        <radialGradient id="h-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#2a2723" />
          <stop offset="100%" stopColor="#121110" />
        </radialGradient>
        <linearGradient id="h-strap" x1="0" x2="1">
          <stop offset="0%" stopColor="#1a1715" />
          <stop offset="50%" stopColor="#2b2622" />
          <stop offset="100%" stopColor="#171412" />
        </linearGradient>
        <linearGradient id="h-case" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1e3c3" />
          <stop offset="40%" stopColor="#b8945a" />
          <stop offset="70%" stopColor="#7e6136" />
          <stop offset="100%" stopColor="#d5bb85" />
        </linearGradient>
        <radialGradient id="h-dial" cx="45%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#2c2a27" />
          <stop offset="100%" stopColor="#0d0d0c" />
        </radialGradient>
        <CordPattern art={cord} id="h-cord" />
        <filter id="h-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="600" height="720" fill="url(#h-bg)" />

      {/* Armband der Uhr */}
      <rect x="238" y="-20" width="124" height="760" fill="url(#h-strap)" />
      <line x1="247" y1="-20" x2="247" y2="740" stroke="#4a423b" strokeDasharray="5 6" />
      <line x1="353" y1="-20" x2="353" y2="740" stroke="#4a423b" strokeDasharray="5 6" />

      {/* Uhr */}
      <circle cx="304" cy="306" r="132" fill="#000" opacity="0.5" filter="url(#h-shadow)" />
      <rect x="226" y="160" width="148" height="290" rx="22" fill="url(#h-case)" opacity="0.9" />
      <circle cx="300" cy="300" r="128" fill="url(#h-case)" />
      <rect x="424" y="286" width="16" height="28" rx="4" fill="url(#h-case)" />
      <circle cx="300" cy="300" r="112" fill="#0b0b0a" />
      <circle cx="300" cy="300" r="106" fill="url(#h-dial)" />
      {markers.map((deg) => (
        <rect
          key={deg}
          x="297.5"
          y={deg % 90 === 0 ? 202 : 204}
          width="5"
          height={deg % 90 === 0 ? 22 : 14}
          rx="1"
          fill="#d8c39c"
          transform={`rotate(${deg} 300 300)`}
        />
      ))}
      <rect x="296.5" y="236" width="7" height="68" rx="3.5" fill="#e9dcc0" transform="rotate(-60 300 300)" />
      <rect x="297.5" y="216" width="5" height="88" rx="2.5" fill="#e9dcc0" transform="rotate(60 300 300)" />
      <rect x="299.2" y="206" width="1.6" height="112" fill="#c9a45c" transform="rotate(200 300 300)" />
      <circle cx="300" cy="300" r="6" fill="#c9a45c" />

      {/* Nodotempo-Kordelarmband daneben */}
      <path d={curve} stroke="#000" strokeWidth="18" opacity="0.5" fill="none" filter="url(#h-shadow)" transform="translate(0 10)" />
      {[curve, curve2].map((d) => (
        <g key={d} fill="none" strokeLinecap="round">
          <path d={d} stroke={edge} strokeWidth="15" />
          <path d={d} stroke="url(#h-cord-pat)" strokeWidth="13" />
          <path d={d} stroke="#fff" strokeOpacity="0.18" strokeWidth="3" transform="translate(0 -2)" />
        </g>
      ))}
      {[{ x: 124, y: 571.4, r: -12 }, { x: 258, y: 553.8, r: -3 }].map((k) => (
        <g key={k.x} transform={`translate(${k.x} ${k.y}) rotate(${k.r})`}>
          <ellipse rx="22" ry="18" fill="url(#h-cord-pat)" stroke={edge} strokeWidth="1.6" />
          {[-11, -4, 3, 10].map((x) => (
            <path key={x} d={`M ${x} -17 Q ${x + 5} 0 ${x} 17`} stroke={edge} strokeWidth="1.5" fill="none" opacity="0.75" />
          ))}
        </g>
      ))}
    </svg>
  );
}
