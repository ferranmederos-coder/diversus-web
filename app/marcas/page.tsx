import type { Metadata } from "next";
import MarcasClient from "./MarcasClient";

export const metadata: Metadata = {
  title: { absolute: "Nuestras marcas — D. Ferrán Diversus SL" },
  description:
    "Ecosistema de marcas propias del grupo: SPAmy · D. Ferrán Import/Export · Tu Manitas Castellón. Proyectos reales con impacto local.",
  openGraph: {
    title: "Nuestras marcas — D. Ferrán Diversus SL",
    description:
      "SPAmy · D. Ferrán Import/Export · Tu Manitas Castellón. Proyectos reales con impacto local.",
  },
};

export default function Page() {
  return <MarcasClient />;
}
