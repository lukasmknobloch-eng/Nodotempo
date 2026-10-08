import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container page empty empty-page">
      <p className="eyebrow">404</p>
      <h1 className="h1">Diese Seite ist aus der Zeit gefallen.</h1>
      <p className="muted">Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
      <div className="hero-actions">
        <Link href="/" className="btn btn-primary">Zur Startseite</Link>
        <Link href="/shop" className="btn btn-ghost">Zum Shop</Link>
      </div>
    </div>
  );
}
