import type { Metadata } from "next";
import { SizeFinder } from "./SizeFinder";

export const metadata: Metadata = {
  title: "Größenberater",
  description: "Finde die passende Armbandgröße – und wie du dein Armband neben der Uhr trägst.",
};

export default function SizeGuidePage() {
  return (
    <div className="container page narrow prose">
      <header className="page-head">
        <p className="eyebrow">Service</p>
        <h1 className="h1">Größenberater</h1>
        <p className="page-lead">In drei Schritten zur richtigen Größe.</p>
      </header>

      <SizeFinder />

      <h2>So misst du dein Handgelenk</h2>
      <ol>
        <li>Lege ein flexibles Maßband – oder einen Papierstreifen – direkt unterhalb des Handgelenkknochens an.</li>
        <li>Lege es eng, aber nicht straff an und lies den Umfang ab (beim Papierstreifen mit einem Lineal).</li>
        <li>Gib den Wert oben ein. Wir rechnen automatisch die passende Zugabe für ein angenehmes Tragegefühl hinzu.</li>
      </ol>

      <h2>Größentabelle</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Handgelenk</th>
            <th>Naturstein</th>
            <th>Leder & Edelstahl</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>bis 15 cm</td><td>S · 16 cm</td><td>S · 17 cm</td></tr>
          <tr><td>15–17 cm</td><td>M · 18 cm</td><td>M · 19 cm</td></tr>
          <tr><td>ab 17 cm</td><td>L · 20 cm</td><td>L · 21 cm</td></tr>
        </tbody>
      </table>

      <h2>Neben der Uhr tragen</h2>
      <p>
        Trage das Armband mit etwa einem Finger Abstand zur Uhr – entweder zum Ellenbogen hin oder auf der Seite der
        Hand. So schützt du das Uhrengehäuse vor Kratzern. Wähle eine etwas lockerere Größe, wenn du das Armband hinter
        der Uhr trägst.
      </p>
      <p>
        <strong>Farbe:</strong> Greife das Metall der Uhr auf – Edelstahl zu Stahl, vergoldete Akzente zu Gold oder
        Bicolor. <strong>Material:</strong> Zu Lederbändern passen Naturstein und Leder, zu Metallbändern Edelstahl und
        dunkle Steine.
      </p>
    </div>
  );
}
