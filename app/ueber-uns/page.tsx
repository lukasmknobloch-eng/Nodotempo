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
              <ProductImage product={catalog.find((p) => p.slug === "ora-onyx") ?? catalog[0]} />
            )}
          </div>
          <div className="story-copy">
            <p className="eyebrow">Unsere Idee</p>
            <h2 className="h2">Was neben der Uhr Platz hat.</h2>
            <p>
              Eine Uhr ist oft das persönlichste Accessoire, das wir tragen. Doch das Handgelenk bietet mehr Raum. Wir
              haben uns gefragt, wie ein Armband aussehen muss, das eine Uhr ergänzt: in der Höhe flach genug, um nicht
              am Gehäuse zu reiben, in den Farben abgestimmt auf Stahl, Gold und Leder, in der Proportion
              zurückhaltend.
            </p>
            <p>
              Gleichzeitig wollten wir nichts entwerfen, das ohne Uhr unvollständig wirkt. Jedes Nodotempo-Armband
              steht für sich – für jeden, der Wert auf ehrliche Materialien und klare Formen legt.
            </p>
          </div>
        </div>
      </section>

      <section className="section container" id="pflege">
        <div className="section-head">
          <div>
            <p className="eyebrow">Material & Pflege</p>
            <h2 className="h2">Ehrliche Materialien</h2>
          </div>
        </div>
        <div className="values values-3">
          <div className="value">
            <h3>Naturstein</h3>
            <p>
              Onyx, Tigerauge, Lapislazuli und Lavastein – jeder Stein ist ein Unikat. Bitte vor Wasser, Parfum und
              Sport ablegen und mit einem trockenen Tuch reinigen.
            </p>
          </div>
          <div className="value">
            <h3>Edelstahl 316L</h3>
            <p>
              Der Stahl, aus dem auch hochwertige Uhrengehäuse gefertigt werden: hypoallergen, nickelfrei und
              wasserfest. Mit lauwarmem Wasser und einer weichen Bürste reinigen.
            </p>
          </div>
          <div className="value">
            <h3>Leder & Seide</h3>
            <p>
              Pflanzlich gegerbtes Vollnarbenleder entwickelt eine eigene Patina. Leder und Seidenkordel vor Nässe
              schützen und gelegentlich mit farbloser Pflege behandeln.
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
