import type { Metadata } from "next";
import Link from "next/link";
import { productInfo } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tragen & Größe",
  description: "So verstellst du dein Nodotempo-Armband – und so trägst du es neben der Uhr.",
};

export default function WearPage() {
  return (
    <div className="container page narrow prose">
      <header className="page-head">
        <p className="eyebrow">Service</p>
        <h1 className="h1">Tragen & Größe</h1>
        <p className="page-lead">
          Jedes Nodotempo-Armband ist über zwei Schiebeknoten stufenlos verstellbar. Du musst keine Größe wählen – es
          passt sich deinem Handgelenk an.
        </p>
      </header>

      <h2>So verstellst du dein Armband</h2>
      <ol>
        <li>
          <strong>Weiten:</strong> Halte die beiden Knoten fest und schiebe sie voneinander weg. Die Schlaufe wird
          größer, sodass du bequem mit der Hand hineinschlüpfen kannst.
        </li>
        <li>
          <strong>Enger stellen:</strong> Ziehe gleichzeitig an beiden Kordelenden, bis das Armband angenehm sitzt.
        </li>
        <li>
          <strong>Richtig sitzen:</strong> Zwischen Armband und Handgelenk sollte etwa ein Finger Platz haben.
        </li>
      </ol>

      <h2>Neben der Uhr tragen</h2>
      <p>
        Trage das Armband mit etwas Abstand zur Uhr – entweder zum Ellenbogen hin oder auf der Seite der Hand. Die
        weiche Kordel kratzt nicht am Gehäuse, trotzdem sitzen beide mit etwas Luft am schönsten.
      </p>
      <p>
        <strong>Farbe:</strong> Greife eine Farbe aus Zifferblatt, Lünette oder Uhrenband auf – oder setze bewusst
        einen Kontrast. <strong>Kombinieren:</strong> Zwei oder drei Armbänder übereinander wirken besonders gut, wenn
        eine Farbe ruhig und eine kräftig ist.
      </p>

      <h2 id="pflege">Pflege</h2>
      <p>{productInfo.care}</p>

      <p>
        <Link href="/shop">Zu allen Farben</Link>
      </p>
    </div>
  );
}
