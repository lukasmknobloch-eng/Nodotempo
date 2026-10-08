import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { findImage, getCatalog } from "@/lib/catalog";
import { ProductImage } from "@/components/ProductImage";
import { ArrowIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Die Marke",
  description: "Nodo – der Knoten. Tempo – die Zeit. Die Geschichte hinter Nodotempo.",
};

export default function AboutPage() {
  const catalog = getCatalog();
  const image = findImage("bilder/marke");
  return (
    <>
      <section className="container page about-hero">
        <p className="eyebrow">Die Marke</p>
        <h1 className="display display-dark">
          <span className="italic">Nodo</span> – der Knoten.
          <br />
          <span className="italic">Tempo</span> – die Zeit.
        </h1>
        <p className="page-lead">
          Nodotempo verbindet zwei Dinge, die am Handgelenk zusammenfinden: das Armband und die Uhr. Und es zeigt, dass
          das eine ohne das andere bestehen kann.
        </p>
      </section>

      <section className="story story-plain">
        <div className="container story-inner">
          <div className="story-media">
            {image ? (
              <Image src={image} alt="Nodotempo" fill sizes="(max-width: 900px) 100vw, 50vw" />
            ) : (
              <ProductImage product={catalog.find((p) => p.slug === "nodo-oliva") ?? catalog[0]} />
            )}
          </div>
          <div className="story-copy">
            <p className="eyebrow">Unsere Idee</p>
            <h2 className="h2">Was neben der Uhr Platz hat.</h2>
            <p>
              Eine Uhr ist oft das persönlichste Accessoire, das wir tragen. Doch das Handgelenk bietet mehr Raum. Wir
              haben uns gefragt, wie ein Armband aussehen muss, das eine Uhr ergänzt: leicht genug, um nicht zu stören,
              weich genug, um nicht am Gehäuse zu kratzen, und in Farben, die Zifferblatt und Uhrenband aufgreifen.
              Die Antwort war eine geflochtene Kordel – und ein Knoten.
            </p>
            <p>
              Gleichzeitig wollten wir nichts entwerfen, das ohne Uhr unvollständig wirkt. Jedes Nodotempo-Armband
              steht für sich – für jeden, der Wert auf Details und gute Farben legt.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Das Armband</p>
            <h2 className="h2">Einfach. Mit Absicht.</h2>
          </div>
        </div>
        <div className="values values-3">
          <div className="value">
            <h3>Die Kordel</h3>
            <p>
              Eine fest geflochtene Stoffkordel mit feinem Rautenmuster – leicht, robust und angenehm auf der Haut.
            </p>
          </div>
          <div className="value">
            <h3>Der Knoten</h3>
            <p>
              Zwei von Hand gelegte Schiebeknoten machen jedes Armband stufenlos verstellbar. Kein Verschluss, kein
              Metall – nur der Knoten, der uns den Namen gab.
            </p>
          </div>
          <div className="value">
            <h3>Die Farben</h3>
            <p>
              Fünfzehn Farben, von Nachtblau bis Sonnengelb – ausgewählt, um zu Zifferblättern und Uhrenbändern zu
              passen und sich miteinander kombinieren zu lassen.
            </p>
          </div>
        </div>
        <div className="center-row">
          <Link href="/shop" className="link-arrow">
            Zur Kollektion <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
