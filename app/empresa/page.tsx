import type { Metadata } from "next";
import EmpresaClient from "./EmpresaClient";

export const metadata: Metadata = {
  title: { absolute: "La empresa — D. Ferrán Diversus SL" },
  description:
    "Holding hecha para construir, no solo invertir. Sede en Castellón, constituida en 2023. Misión, valores y áreas de actividad de D. Ferrán Diversus SL.",
  openGraph: {
    title: "La empresa — D. Ferrán Diversus SL",
    description:
      "Holding hecha para construir, no solo invertir. Sede en Castellón, constituida en 2023.",
  },
};

export default function Page() {
  return <EmpresaClient />;
}
