// Vorläufiges Logo: zwei ineinandergreifende Ringe – der Knoten (nodo) und
// das Zifferblatt (tempo). Kann später durch ein finales Logo ersetzt werden.

export function LogoMark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="12.5" cy="16" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="19.5" cy="16" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <line x1="19.5" y1="16" x2="19.5" y2="10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`logo ${className ?? ""}`}>
      <LogoMark />
      <span className="logo-word">Nodotempo</span>
    </span>
  );
}
