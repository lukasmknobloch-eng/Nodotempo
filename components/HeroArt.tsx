// Illustration für die Startseite: Uhr und Armband an einem Handgelenk, von
// oben gesehen. Wird ersetzt, sobald public/bilder/hero.jpg existiert.

export function HeroArt({ className }: { className?: string }) {
  const beads = Array.from({ length: 15 }, (_, i) => {
    const u = (i - 7) / 7; // -1 … 1
    return { i, x: 300 + u * 230, y: 560 + u * u * -34 };
  });
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
        <radialGradient id="h-bead" cx="34%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#6a6764" />
          <stop offset="35%" stopColor="#232220" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
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

      {/* Nodotempo-Armband daneben */}
      <path d="M 70 585 Q 300 520 530 585" stroke="#000" strokeWidth="26" opacity="0.45" fill="none" filter="url(#h-shadow)" />
      {beads.map(({ i, x, y }) =>
        i === 7 ? (
          <rect key={i} x={x - 10} y={y - 19} width="20" height="38" rx="5" fill="url(#h-case)" />
        ) : (
          <circle key={i} cx={x} cy={y} r="17" fill="url(#h-bead)" />
        ),
      )}
    </svg>
  );
}
