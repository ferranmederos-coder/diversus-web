import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: { absolute: "D. Ferrán Diversus SL — Grupo Empresarial · Castellón" },
  description:
    "Grupo empresarial con sede en Castellón dedicado a la inversión y desarrollo de proyectos propios en servicios, consumo y comercio internacional. SPAmy · D. Ferrán Import/Export · Tu Manitas Castellón.",
  openGraph: {
    title: "D. Ferrán Diversus SL — Grupo Empresarial · Castellón",
    description:
      "Grupo empresarial con sede en Castellón. SPAmy · D. Ferrán Import/Export · Tu Manitas Castellón.",
  },
};

export default function Page() {
  return <HomeClient />;
}
