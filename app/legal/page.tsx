import type { Metadata } from "next";
import LegalClient from "./LegalClient";

export const metadata: Metadata = {
  title: { absolute: "Aviso legal, privacidad y cookies — D. Ferrán Diversus SL" },
  description:
    "Información legal, política de privacidad y política de cookies de D. Ferrán Diversus SL. CIF B56432917 · Castellón de la Plana.",
  openGraph: {
    title: "Aviso legal, privacidad y cookies — D. Ferrán Diversus SL",
    description:
      "Información legal, política de privacidad y política de cookies de D. Ferrán Diversus SL.",
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LegalClient />;
}
