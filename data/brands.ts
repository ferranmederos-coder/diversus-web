export type BrandStatus = "activo" | "desarrollo";

export interface Brand {
  id: string;
  nombre: string;
  categoria: { es: string; en: string };
  descripcion: { es: string; en: string };
  descripcionLarga: {
    es: string[];
    en: string[];
  };
  servicios?: { es: string[]; en: string[] };
  stats?: { es: string[]; en: string[] };
  zona: { es: string; en: string };
  desde: string;
  url: string | null;
  urlLabel: { es: string; en: string };
  logo: string;
  estado: BrandStatus;
  badge?: { es: string; en: string };
}

export const brands: Brand[] = [
  /* 01 — SPAmy */
  {
    id: "spamy",
    nombre: "SPAmy",
    categoria: { es: "SERVICIOS · ESTÉTICA Y BIENESTAR", en: "SERVICES · BEAUTY & WELLNESS" },
    descripcion: {
      es: "Centro de estética y bienestar en Castellón. Masajes, manicura, podología y tratamientos faciales.",
      en: "Beauty and wellness centre in Castellón. Massages, manicure, podiatry and facial treatments.",
    },
    descripcionLarga: {
      es: [
        "SPAmy es el centro de referencia en estética integral y bienestar de Castellón de la Plana. Nuestro equipo de profesionales ofrece un entorno cuidado donde el cliente encuentra desde tratamientos faciales avanzados hasta masajes terapéuticos y servicios de podología clínica.",
        "La propuesta de valor de SPAmy combina la calidad de producto con una atención personalizada que fideliza. Es el primer proyecto operativo del grupo y el que mejor refleja nuestra filosofía: detectar una demanda local real y cubrirla con excelencia.",
      ],
      en: [
        "SPAmy is the reference beauty and wellness centre in Castellón de la Plana. Our team of professionals offers a carefully curated environment where clients find everything from advanced facial treatments to therapeutic massages and clinical podiatry services.",
        "SPAmy's value proposition combines product quality with personalised attention that builds loyalty. It is the group's first operational project and the one that best reflects our philosophy: detect a real local demand and meet it with excellence.",
      ],
    },
    servicios: {
      es: ["Masajes terapéuticos", "Manicura y pedicura", "Podología clínica", "Tratamientos faciales", "Depilación", "Tratamientos corporales"],
      en: ["Therapeutic massages", "Manicure and pedicure", "Clinical podiatry", "Facial treatments", "Hair removal", "Body treatments"],
    },
    zona: { es: "Castellón de la Plana", en: "Castellón de la Plana, Spain" },
    desde: "2023",
    url: "https://spamycastellon.es",
    urlLabel: { es: "Visitar spamycastellon.es", en: "Visit spamycastellon.es" },
    logo: "/images/brands/spamy.jpg",
    estado: "activo",
  },

  /* 02 — D. Ferrán Import / Export */
  {
    id: "importexport",
    nombre: "D. Ferrán Import / Export",
    categoria: { es: "COMERCIO INTERNACIONAL · IMPORT / EXPORT", en: "INTERNATIONAL TRADE · IMPORT / EXPORT" },
    descripcion: {
      es: "División B2B de comercio internacional al por mayor. Azúcar, frijoles, cereales y más.",
      en: "B2B international wholesale trade division. Sugar, beans, cereals and more.",
    },
    descripcionLarga: {
      es: [
        "Empresa funcional desde 2023 dedicada al comercio internacional de materias primas alimentarias (azúcar ICUMSA 45, frijoles y otros productos) con Brasil como origen principal.",
        "D. Ferrán Import / Export es la división del grupo dedicada al comercio internacional B2B de productos al por mayor. Con capacidad para incorporar otras categorías bajo demanda, conecta productores con mercados internacionales bajo estándares de calidad y trazabilidad auditados.",
      ],
      en: [
        "Operational company since 2023 dedicated to the international trade of food raw materials (ICUMSA 45 sugar, beans and other products) with Brazil as the primary origin.",
        "D. Ferrán Import / Export is the group's division dedicated to B2B international wholesale trade. With capacity to incorporate other categories on demand, it connects producers with international markets under audited quality and traceability standards.",
      ],
    },
    zona: { es: "Mercado internacional", en: "International market" },
    desde: "2023",
    url: "https://comercio.dferrandiversus.es",
    urlLabel: { es: "Visitar comercio.dferrandiversus.es", en: "Visit comercio.dferrandiversus.es" },
    logo: "/images/brands/importexport.png",
    estado: "activo",
  },

  /* 03 — Tu Manitas Castellón */
  {
    id: "tumanitas",
    nombre: "Tu Manitas Castellón",
    categoria: { es: "SERVICIOS · PLATAFORMA DIGITAL", en: "SERVICES · DIGITAL PLATFORM" },
    descripcion: {
      es: "Plataforma local de servicios del hogar. Electricistas, fontaneros, pintores y reformas verificados en Castellón provincia.",
      en: "Local home services platform. Verified electricians, plumbers, painters and renovations across Castellón province.",
    },
    descripcionLarga: {
      es: [
        "Tu Manitas Castellón es una plataforma de intermediación que conecta a particulares y empresas con profesionales del hogar verificados en Castellón y su provincia. Cada profesional pasa por un proceso de verificación de identidad, seguros y valoraciones reales de clientes anteriores.",
        "El modelo resuelve un problema real: encontrar un profesional de confianza para el hogar en el momento adecuado. Con cobertura en 15 municipios y 6 verticales de servicio, Tu Manitas crece como la referencia local del sector en la provincia.",
      ],
      en: [
        "Tu Manitas Castellón is an intermediation platform connecting individuals and businesses with verified home service professionals across Castellón and its province. Each professional undergoes identity verification, insurance checks, and real customer review processes.",
        "The model solves a real problem: finding a trustworthy home professional at the right moment. With coverage across 15 municipalities and 6 service verticals, Tu Manitas is growing as the local sector reference in the province.",
      ],
    },
    stats: {
      es: ["+500 clientes objetivo año 1", "Atención 24 h", "15 municipios", "6 verticales"],
      en: ["+500 clients target year 1", "24 h support", "15 municipalities", "6 verticals"],
    },
    zona: { es: "Castellón provincia (15 municipios)", en: "Castellón province (15 municipalities)" },
    desde: "2025",
    url: "https://tumanitascastellon.es",
    urlLabel: { es: "Visitar tumanitascastellon.es", en: "Visit tumanitascastellon.es" },
    logo: "/images/brands/tumanitas.png",
    estado: "activo",
  },
];
