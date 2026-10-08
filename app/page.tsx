import Image from "next/image";
import Link from "next/link";
import { getCatalog, findImage } from "@/lib/catalog";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { HeroArt } from "@/components/HeroArt";
import { CordSwatch } from "@/components/BraceletArt";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ArrowIcon, GiftIcon, HandIcon, ReturnIcon, TruckIcon } from "@/components/Icons";

export default function HomePage() {
  const catalog = getCatalog();
  const featured = catalog.filter((p) => p.featured).sort((a, b) => a.rank - b.rank).slice(0, 4);
  const heroImage = findImage("bilder/hero");
  const storyImage = findImage("bilder/story");
  const giftImage = findImage("bilder/geschenk");

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy reveal">
            <p className="eyebrow eyebrow-light">Kollektion {new Date().getFullYear()}</p>
            <h1 className="display">
              Die Zeit trägst du am Handgelenk.
              <em> Den Stil gleich daneben.</em>
            </h1>
            <p className="hero-lead">
              Handgeknüpfte Stoffarmbänder in {catalog.length} Farben – entworfen, um neben einer Uhr getragen zu
              werden. Und stark genug, um ganz für sich zu stehen.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-light">
                Kollektion entdecken
              </Link>
              <Link href="/ueber-uns" className="btn btn-outline-light">
                Die Geschichte
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            {heroImage ? (
              <Image src={heroImage} alt="Nodotempo Armband neben einer Uhr" fill sizes="(max-width: 900px) 100vw, 50vw" preload />
            ) : (
              <HeroArt />
            )}
          </div>
        </div>
      </section>

      <section className="usp-strip" aria-label="Unsere Versprechen">
        <div className="container usp-strip-inner">
          <span>Von Hand gefertigt</span>
          <span>Stufenlos verstellbar</span>
          <span>Versandkostenfrei ab {formatPrice(site.shipping.freeFrom)}</span>
          <span>{site.returnDays} Tage Rückgabe</span>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Ausgewählt</p>
            <h2 className="h2">Die Essentials</h2>
          </div>
          <Link href="/shop" className="link-arrow">
            Alle Armbänder <ArrowIcon />
          </Link>
        </div>
        <div className="grid-products">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} preload={i < 2} />
          ))}
        </div>
      </section>

      <section className="story">
        <div className="container story-inner">
          <div className="story-media">
            {storyImage ? (
              <Image src={storyImage} alt="Nodotempo Atelier" fill sizes="(max-width: 900px) 100vw, 50vw" />
            ) : (
              <ProductImage product={catalog.find((p) => p.slug === "nodo-notte") ?? catalog[0]} />
            )}
          </div>
          <div className="story-copy">
            <p className="eyebrow">Der Name</p>
            <h2 className="h2">
              <span className="italic">Nodo</span> – der Knoten.
              <br />
              <span className="italic">Tempo</span> – die Zeit.
            </h2>
            <p>
              Am Handgelenk vieler Menschen sitzt eine Uhr. Nodotempo entstand aus der Frage, was daneben Platz hat:
              ein Armband, das die Uhr ergänzt, statt mit ihr zu konkurrieren – in Proportion, Material und Farbe
              abgestimmt.
            </p>
            <p>
              Doch ein gutes Armband braucht keine Begleitung. Deshalb entwerfen wir jedes Stück so, dass es auch
              allein überzeugt: für jeden, der Wert auf Details legt.
            </p>
            <Link href="/ueber-uns" className="link-arrow">
              Mehr über Nodotempo <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section container" id="farben">
        <div className="section-head">
          <div>
            <p className="eyebrow">{catalog.length} Farben</p>
            <h2 className="h2">Finde deine Farbe</h2>
          </div>
          <p className="section-note">
            Passend zum Zifferblatt, zum Uhrenband – oder einfach zu dir. Kombiniere mehrere Farben übereinander.
          </p>
        </div>
        <ul className="palette">
          {catalog.map((p) => (
            <li key={p.slug}>
              <Link href={`/produkt/${p.slug}`} className="palette-item">
                <CordSwatch art={p.art} size={88} />
                <span className="palette-name">{p.name.replace("Nodo ", "")}</span>
                <span className="palette-color">{p.color}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pairing">
        <div className="container pairing-inner">
          <div className="pairing-col">
            <p className="eyebrow eyebrow-light">Für Uhrenträger</p>
            <h3 className="h3">Neben der Uhr</h3>
            <p>
              Trage dein Armband neben der Uhr – mit etwas Abstand, damit das Gehäuse frei bleibt. Greife eine Farbe
              aus Zifferblatt oder Uhrenband auf: Petrol zur Taucheruhr, Khaki zur Felduhr, Rot als Akzent.
            </p>
            <Link href="/tragen" className="link-arrow link-light">
              Tipps zur Kombination <ArrowIcon />
            </Link>
          </div>
          <div className="pairing-divider" aria-hidden="true" />
          <div className="pairing-col">
            <p className="eyebrow eyebrow-light">Für alle</p>
            <h3 className="h3">Ganz für sich</h3>
            <p>
              Allein getragen oder in mehreren Farben kombiniert: Unsere Armbänder ergeben auch ohne Uhr ein
              vollständiges Bild – vom Büro bis zum Wochenende.
            </p>
            <Link href="/shop" className="link-arrow link-light">
              Jetzt kombinieren <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="values">
          <div className="value">
            <HandIcon />
            <h3>Von Hand gefertigt</h3>
            <p>Jedes Armband wird einzeln von Hand geknüpft und vor dem Versand geprüft.</p>
          </div>
          <div className="value">
            <TruckIcon />
            <h3>Schneller Versand</h3>
            <p>Versand in 1–2 Werktagen, kostenlos ab {formatPrice(site.shipping.freeFrom)} innerhalb Deutschlands.</p>
          </div>
          <div className="value">
            <ReturnIcon />
            <h3>{site.returnDays} Tage Rückgabe</h3>
            <p>Gefällt dir die Farbe nicht? Du kannst jedes Armband innerhalb von {site.returnDays} Tagen zurückgeben.</p>
          </div>
          <div className="value">
            <GiftIcon />
            <h3>Geschenkfertig</h3>
            <p>Jede Bestellung kommt liebevoll verpackt – bereit zum Verschenken.</p>
          </div>
        </div>
      </section>

      <section className="gift container">
        <div className="gift-media">
          {giftImage ? (
            <Image src={giftImage} alt="Nodotempo Geschenkverpackung" fill sizes="(max-width: 900px) 100vw, 50vw" />
          ) : (
            <ProductImage product={catalog.find((p) => p.slug === "nodo-rosso") ?? catalog[0]} />
          )}
        </div>
        <div className="gift-copy">
          <p className="eyebrow">Geschenkidee</p>
          <h2 className="h2">Ein Geschenk, das bleibt.</h2>
          <p>
            Für jemanden, der schon eine Uhr besitzt – oder für jemanden, der keine braucht. Dank der Schiebeknoten
            passt jedes Armband ohne Größenraten. Du musst nur die Farbe wählen.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="btn btn-primary">
              Geschenk finden
            </Link>
            <Link href="/#farben" className="btn btn-ghost">
              Farben ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container newsletter-inner">
          <p className="eyebrow">Der Nodotempo Brief</p>
          <h2 className="h2">Zuerst erfahren, was als Nächstes kommt.</h2>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
