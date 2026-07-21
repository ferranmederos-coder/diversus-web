import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { site } from "@/data/site";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(site.dominio),
  title: {
    default: "D. Ferrán Diversus SL — Grupo Empresarial · Castellón",
    template: "%s · D. Ferrán Diversus SL",
  },
  description:
    "Grupo empresarial con sede en Castellón dedicado a la inversión y desarrollo de proyectos propios en servicios, consumo y comercio internacional.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "D. Ferrán Diversus SL",
    images: [{ url: "/images/banner-navy.png", width: 1128, height: 191 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const ldJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "D. Ferrán Diversus SL",
  legalName: "D. Ferrán Diversus SL",
  url: site.dominio,
  logo: `${site.dominio}/images/logo-color.png`,
  foundingDate: site.fundacion,
  taxID: site.cif,
  address: {
    "@type": "PostalAddress",
    streetAddress: "C/ Navarra 97",
    addressLocality: "Castellón de la Plana",
    postalCode: "12005",
    addressCountry: "ES",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+34${site.telefono.replace(/\s/g, "")}`,
    email: site.email,
    contactType: "general",
  },
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </head>
      <body>
        <LangProvider>
          <Navbar />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
