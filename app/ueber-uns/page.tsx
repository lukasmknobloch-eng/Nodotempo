import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { findImage, getCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Die Marke",
  description: "Nodo, der Knoten. Tempo, die Zeit. Die Geschichte hinter Nodotempo.",
};

export default function AboutPage() {
  const no2 = getCatalog().find((p) => p.slug === "nodo-no-2");
  const fallback = no2?.variants.find((v) => v.id === "sand")?.images[1] ?? no2?.variants[0]?.images[0];
  const image = findImage("bilder/marke") ?? fallback;

  return (
    <>
      <section className="about-intro">
        <Image src="/bilder/logo-zeichen.png" alt="Nodotempo" width={600} height={777} className="statement-mark" />
        <h1>
          <em>Nodo</em>, der Knoten. <em>Tempo</em>, die Zeit.
        </h1>
        <p>
          Nodotempo verbindet zwei Dinge, die am Handgelenk zusammenfinden: das Armband und die Uhr. Und zeigt, dass das
          eine ohne das andere bestehen kann.
        </p>
      </section>

      <section className="feature">
        <div className="feature-media">{image && <Image src={image} alt="Nodotempo" fill sizes="(max-width: 900px) 100vw, 50vw" />}</div>
        <div className="about-text">
          <h2>Was neben der Uhr Platz hat</h2>
          <p>
            Eine Uhr ist oft das persönlichste Accessoire, das wir tragen. Doch das Handgelenk bietet mehr Raum. Wir
            wollten ein Armband, das eine Uhr ergänzt: leicht genug, um nicht zu stören, weich genug, um nicht am Gehäuse
            zu kratzen, und in Farben, die Zifferblatt und Uhrenband aufgreifen. Die Antwort war eine geflochtene Kordel
            und ein Knoten.
          </p>
          <p>
            Gleichzeitig wollten wir nichts entwerfen, das ohne Uhr unvollständig wirkt. Jedes Nodotempo-Armband steht für
            sich, für jeden, der Wert auf Details und gute Farben legt.
          </p>
          <h2>Das Armband</h2>
          <p>
            Fest geflochtenes Paracord aus Nylon oder Polyester, von Hand geknüpft. Zwei Schiebeknoten machen es
            stufenlos verstellbar. Kein Verschluss, kein Metall, nur der Knoten, der uns den Namen gab.
          </p>
          <Link href="/shop" className="btn btn-outline">
            Armbänder ansehen
          </Link>
        </div>
      </section>
    </>
  );
}
