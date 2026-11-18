import Image from "next/image";
import Link from "next/link";
import { getCatalog, findImage } from "@/lib/catalog";
import { toCards, productHref } from "@/lib/shop";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { InstagramIcon } from "@/components/Icons";

// Bilder der Startseite: einfach unter diesen Namen in public/bilder/ ablegen
// (jpg, png oder webp). Bis dahin werden Produktfotos verwendet.
//   hero.jpg          großes Bild ganz oben
//   editorial-1.jpg   zwei Bilder nebeneinander
//   editorial-2.jpg
//   modell-no-2.jpg   Bild für Nodo No. 2 (zwei Modelle nebeneinander)
//   modell-no-1.jpg   Bild für Nodo No. 1
//   feature.jpg       großes Bild links neben dem Produkt (Hochformat 4:5)
//   instagram-1.jpg … instagram-6.jpg

function Photo({ src, alt, sizes, preload }: { src?: string; alt: string; sizes: string; preload?: boolean }) {
  return src ? <Image src={src} alt={alt} fill sizes={sizes} preload={preload} quality={90} /> : null;
}

export default function HomePage() {
  const catalog = getCatalog();
  const cards = toCards(catalog);
  const no2 = cards.filter((c) => c.product.slug === "nodo-no-2");
  const no1 = cards.filter((c) => c.product.slug === "nodo-no-1");
  const angled = (id: string) => no2.find((c) => c.variant?.id === id)?.images[1] ?? no2[0]?.images[0];
  const angled1 = (id: string) => no1.find((c) => c.variant?.id === id)?.images[1] ?? no1[0]?.images[0];
  // Je vier Farben beider Modelle im Wechsel
  const mixed = Array.from({ length: 4 }, (_, i) => [no1[i], no2[i]]).flat().filter(Boolean);
  const topView = (i: number) => no2[i % Math.max(no2.length, 1)]?.images[0];

  const hero = findImage("bilder/hero");
  const editorial = [findImage("bilder/editorial-1") ?? angled("beere-rosa"), findImage("bilder/editorial-2") ?? angled("hellgruen")];
  const models = ["nodo-no-1", "nodo-no-2"].flatMap((slug) => {
    const product = catalog.find((p) => p.slug === slug);
    if (!product) return [];
    // Gezeigte Farbe je Modell
    const color = slug === "nodo-no-2" ? "braun-beige" : "ciliegia";
    const fallback = slug === "nodo-no-2" ? angled(color) : angled1(color);
    return [{ product, color, image: findImage(`bilder/modell-${slug.replace("nodo-", "")}`) ?? fallback }];
  });
  const featurePhoto = findImage("bilder/feature");
  const feature = featurePhoto ?? angled("bordeaux-grau");
  const featureCard = no2.find((c) => c.variant?.id === "bordeaux-grau") ?? no2[0];
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
          <p>The Nato-Series · Handgeknüpft aus Fallschirmseil</p>
          <Link href="/shop" className={`btn ${hero ? "btn-outline-light" : "btn-outline"}`}>
            Armbänder ansehen
          </Link>
        </div>
      </section>

      <section className="models">
        {models.map(({ product, color, image }) => (
          <Link key={product.slug} href={productHref(product.slug, color)} className="model-tile">
            <div className="model-media">
              <Photo src={image} alt={product.name} sizes="(max-width: 700px) 100vw, 50vw" />
            </div>
            <div className="model-copy">
              <p className="eyebrow">The Nato-Series</p>
              <h2>{product.name}</h2>
              <p className="muted">
                {product.variants.length} Farben · {formatPrice(product.price)}
              </p>
              <span className="text-link">{product.name} ansehen</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="section-grid">
        <div className="grid-products">
          {mixed.map((c, i) => (
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

      <section className="feature">
        <div className={`feature-media ${featurePhoto ? "feature-photo" : ""}`}>
          <Photo src={feature} alt="Nodotempo Armband" sizes="(max-width: 900px) 100vw, 50vw" />
          <p className="feature-caption">Neben der Uhr. Oder ganz für sich.</p>
        </div>
        <div className="feature-product">{featureCard && <ProductCard card={featureCard} />}</div>
      </section>

      <section className="statement">
        <Image src="/bilder/logo-zeichen.png" alt="Nodotempo" width={600} height={600} className="statement-mark" />
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
