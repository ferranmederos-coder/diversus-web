import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: { absolute: "Contacto — D. Ferrán Diversus SL" },
  description:
    "Contacta con D. Ferrán Diversus SL. Castellón. info@dferrandiversus.es · 682 308 777. Para colaboraciones, propuestas de inversión o consultas generales.",
  openGraph: {
    title: "Contacto — D. Ferrán Diversus SL",
    description:
      "Contacta con D. Ferrán Diversus SL. info@dferrandiversus.es · 682 308 777.",
  },
};

export default function Page() {
  return <ContactoClient />;
}
