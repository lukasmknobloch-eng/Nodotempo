import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { ShopProvider } from "@/components/ShopProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { CookieNotice } from "@/components/CookieNotice";
import { getCatalog } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.claim}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, locale: "de_DE", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const catalog = getCatalog();
  return (
    <html lang="de">
      <body>
        <ShopProvider catalog={catalog}>
          <a href="#main" className="skip-link">
            Zum Inhalt springen
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <CookieNotice />
        </ShopProvider>
      </body>
    </html>
  );
}
