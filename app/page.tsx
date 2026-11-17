import Image from "next/image";
import Link from "next/link";
import { getCatalog, findImage } from "@/lib/catalog";
import { toCards } from "@/lib/shop";
import { site } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";
import { LogoScript } from "@/components/LogoScript";
import { InstagramIcon } from "@/components/Icons";

// Bilder der Startseite: einfach unter diesen Namen in public/bilder/ ablegen
// (jpg, png oder webp). Bis dahin werden Produktfotos verwendet.
//   hero.jpg          großes Bild ganz oben
//   editorial-1.jpg   zwei Bilder nebeneinander
//   editorial-2.jpg
//   banner.jpg        breites Bild für Nodo No. 1
//   feature.jpg       großes Bild links neben dem Produkt
//   instagram-1.jpg … instagram-6.jpg

function Photo({ src, alt, sizes, preload }: { src?: string; alt: string; sizes: string; preload?: boolean }) {
  return src ? <Image src={src} alt={alt} fill sizes={sizes} preload={preload} quality={90} /> : null;
}

export default function HomePage() {
  const catalog = getCatalog();
  const cards = toCards(catalog);
  const no2 = cards.filter((c) => c.product.slug === "nodo-no-2");
  const angled = (id: string) => no2.find((c) => c.variant?.id === id)?.images[1] ?? no2[0]?.images[0];
  const topView = (i: number) => no2[i % Math.max(no2.length, 1)]?.images[0];

  const hero = findImage("bilder/hero");
  const editorial = [findImage("bilder/editorial-1") ?? angled("beere-rosa"), findImage("bilder/editorial-2") ?? angled("hellgruen")];
  const banner = findImage("bilder/banner");
  const feature = findImage("bilder/feature") ?? angled("blau-sand");
  const featureCard = no2.find((c) => c.variant?.id === "blau-sand") ?? no2[0];
  const instagram = Array.from({ length: 6 }, (_, i) => findImage(`bilder/instagram-${i + 1}`) ?? topView(i + 2));

  return (
    <>
      <section className={`hero ${hero ? "hero-photo" : "hero-split"}`}>
        {hero ? (
          <div className="hero-media">
            <Photo src={hero} alt="Nodotempo" sizes="100vw" preload />
          </div>
        ) : (
          <div className="hero-media hero-media-split">
            <div>
              <Photo src={angled("blau-weiss")} alt="Nodo No. 2 in Blau / Weiß" sizes="50vw" preload />
            </div>
            <div>
              <Photo src={angled("gelb")} alt="Nodo No. 2 in Gelb" sizes="50vw" preload />
            </div>
          </div>
        )}
        <div className="hero-copy">
          <h1>Getragen neben der Zeit</h1>
          <p>Handgeknüpfte Paracord-Armbänder</p>
          <Link href="/shop" className={`btn ${hero ? "btn-outline-light" : "btn-outline"}`}>
            Armbänder ansehen
          </Link>
        </div>
      </section>

      <section className="section-grid">
        <div className="grid-products">
          {no2.map((c, i) => (
            <ProductCard key={c.key} card={c} preload={i < 4} />
          ))}
        </div>
        <div className="center-row">
          <Link href="/shop" className="btn btn-outline">
            Alle ansehen
          </Link>
        </div>
      </section>

      <section className="split">
        {editorial.map((src, i) => (
          <div key={i} className="split-media">
            <Photo src={src} alt="Nodotempo" sizes="(max-width: 700px) 100vw, 50vw" />
          </div>
        ))}
      </section>

      <section className={`banner ${banner ? "banner-photo" : ""}`}>
        {banner && (
          <div className="banner-media">
            <Photo src={banner} alt="Nodo No. 1" sizes="100vw" />
          </div>
        )}
        <div className="banner-copy">
          <p className="eyebrow">Die feine Version</p>
          <h2>Nodo No. 1</h2>
          <p>Schmaleres Paracord, derselbe Knoten. Bald verfügbar.</p>
          <Link href="/produkt/nodo-no-1" className="btn btn-outline-light">
            Mehr erfahren
          </Link>
        </div>
      </section>

      <section className="feature">
        <div className="feature-media">
          <Photo src={feature} alt="Nodotempo Armband" sizes="(max-width: 900px) 100vw, 50vw" />
          <p className="feature-caption">Neben der Uhr. Oder ganz für sich.</p>
        </div>
        <div className="feature-product">{featureCard && <ProductCard card={featureCard} />}</div>
      </section>

      <section className="statement">
        <LogoScript className="statement-logo" />
        <p>
          <em>Nodo</em>, der Knoten. <em>Tempo</em>, die Zeit. Jedes Armband wird von Hand geknüpft und lässt sich über
          zwei Schiebeknoten stufenlos anpassen, für jedes Handgelenk und jede Uhr.
        </p>
        <Link href="/ueber-uns" className="text-link">
          Die Marke
        </Link>
      </section>

      <section className="insta">
        <div className="insta-grid">
          {instagram.map((src, i) => (
            <a key={i} href={site.instagram} target="_blank" rel="noreferrer" className="insta-item" aria-label="Instagram">
              <Photo src={src} alt="Nodotempo auf Instagram" sizes="(max-width: 700px) 50vw, 33vw" />
            </a>
          ))}
        </div>
        <div className="center-row">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn-primary">
            <InstagramIcon size={16} /> Folge uns auf Instagram
          </a>
        </div>
      </section>
    </>
  );
}
