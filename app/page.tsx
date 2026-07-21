"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowRight, ExternalLink, Search, BarChart2, TrendingUp, Lock } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import { useLang, t } from "@/lib/i18n";
import { brands } from "@/data/brands";

// ─── Count-up with optional start value ──────────────────
function CountUp({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(from, to, {
      duration: to - from > 100 ? 1.6 : 1.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, to, from]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Brand CTA with per-brand hover color ─────────────────
function BrandCTA({ href, accentColor, children }: { href: string; accentColor: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-200 self-start"
      style={{ color: hovered ? accentColor : "var(--orange)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

// ─── Methodology connector line ───────────────────────────
function MethodConnector() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="hidden md:block absolute top-5 inset-x-0 h-px overflow-hidden pointer-events-none">
      <motion.div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(183,155,106,0.35) 15%, rgba(183,155,106,0.35) 85%, transparent 100%)",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
      />
    </div>
  );
}

// ─── Globe SVG for Foods ───────────────────────────────────
function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-14 h-14 mb-6"
      fill="none"
      stroke="rgba(183,155,106,0.28)"
      strokeWidth="1"
    >
      <circle cx="40" cy="40" r="28" />
      <ellipse cx="40" cy="40" rx="13" ry="28" />
      <line x1="12" y1="40" x2="68" y2="40" />
      <path d="M18 26 Q40 20 62 26" />
      <path d="M18 54 Q40 60 62 54" />
    </svg>
  );
}

// ─── Brand ecosystem panel (hero right) ──────────────────
function BrandEcosystem({ lang }: { lang: "es" | "en" }) {
  const items = [
    { n: "01", name: "SPAmy",                     tag: { es: "Servicios · Estética · Activo",          en: "Services · Beauty · Active" } },
    { n: "02", name: "D. Ferrán Import / Export", tag: { es: "Comercio Internacional · Activo",         en: "International Trade · Active" } },
    { n: "03", name: "Tu Manitas Castellón",       tag: { es: "Servicios · Plataforma · Activo",        en: "Services · Platform · Active" } },
  ];
  return (
    <div className="space-y-7">
      {items.map(({ n, name, tag }, i) => (
        <motion.div
          key={n}
          className="flex items-center gap-5"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55 + i * 0.14, duration: 0.6, ease: "easeOut" }}
        >
          <div className="shrink-0 w-px h-10 bg-orange/35" />
          <div>
            <span className="font-mono text-orange/50 text-[0.6rem] tracking-widest uppercase">{n}</span>
            <p className="text-white font-serif text-xl font-semibold leading-tight">{name}</p>
            <p className="text-muted font-mono text-[0.6rem] tracking-wide mt-0.5">{t(tag, lang)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Unsplash images per section ─────────────────────────
// Reemplaza estas URLs si prefieres otras imágenes
const UNSPLASH = {
  castellon: "https://images.unsplash.com/photo-1552824472-bc38819665be?auto=format&fit=crop&w=1920&q=85",
  spamy:     "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
  tumanitas: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
  foods:     "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
};

// Color real de cada marca — aparece al hover en el CTA "Visitar"
const BRAND_ACCENT_HOVER: Record<string, string> = {
  spamy:        "#B79B6A",
  tumanitas:    "#FF6B35",
  importexport: "#C8973E",
};

// Tinte de color sutil por marca (sobre la imagen grayscale)
const BRAND_TINTS: Record<string, string> = {
  spamy:        "rgba(183, 155, 106, 0.10)",
  tumanitas:    "rgba(183, 155, 106, 0.14)",
  importexport: "rgba(26, 26, 26, 0.20)",
};

// ─── Copy ─────────────────────────────────────────────────
const copy = {
  hero: {
    eyebrow: { es: "Grupo empresarial · Castellón", en: "Business group · Castellón" },
    lines: {
      es: ["Inversión,", "creación y", "desarrollo"],
      en: ["Investment,", "creation &", "development"],
    },
    sub:  { es: "Detectamos oportunidades reales en mercados locales e internacionales y las convertimos en proyectos operativos con impacto.", en: "We identify real opportunities in local and international markets and turn them into operational projects with impact." },
    cta1: { es: "Nuestras marcas", en: "Our brands" },
    cta2: { es: "Contactar",       en: "Contact" },
  },
  stats: [
    { from: 2000, value: 2023, suffix: "",  label: { es: "Año de fundación",        en: "Founded" } },
    { from: 0,    value: 3,    suffix: "",  label: { es: "Marcas operativas",       en: "Active brands" } },
    { from: 0,    value: 15,   suffix: "+", label: { es: "Municipios de cobertura", en: "Municipalities" } },
    { from: 0,    value: 3,    suffix: "",  label: { es: "Verticales de negocio",   en: "Business verticals" } },
  ],
  brands: {
    eyebrow: { es: "Nuestras marcas", en: "Our brands" },
    title:   { es: "Un ecosistema de marcas propias", en: "An ecosystem of in-house brands" },
    sub:     { es: "Cada proyecto nace de una necesidad real, se opera con rigor y se escala cuando los números acompañan.", en: "Each project is born from a real need, operated with rigour and scaled when the numbers support it." },
  },
  brandDetail: {
    services: { es: "Servicios",     en: "Services" },
    zone:     { es: "Zona",          en: "Area" },
    since:    { es: "Desde",         en: "Since" },
  },
  methodology: {
    eyebrow: { es: "Cómo trabajamos", en: "How we work" },
    title:   { es: "Metodología de inversión", en: "Investment methodology" },
    items: [
      {
        n: "01", Icon: Search,
        title: { es: "Detectar", en: "Detect" },
        body:  { es: "Identificamos demanda local no cubierta o ineficiencias de mercado con potencial de rentabilidad sostenible.", en: "We identify unmet local demand or market inefficiencies with sustainable profitability potential." },
      },
      {
        n: "02", Icon: BarChart2,
        title: { es: "Validar", en: "Validate" },
        body:  { es: "Probamos cada modelo con estructura ligera y métricas claras antes de comprometer capital significativo.", en: "We test each model with a lean structure and clear metrics before committing significant capital." },
      },
      {
        n: "03", Icon: TrendingUp,
        title: { es: "Escalar", en: "Scale" },
        body:  { es: "Cuando los números acompañan, escalamos sin perder la ejecución cercana que nos diferencia.", en: "When the numbers support it, we scale without losing the close execution that sets us apart." },
      },
    ],
  },
  castellon: {
    eyebrow: { es: "Origen y base",             en: "Origin & base" },
    title:   { es: "Desde Castellón al mundo",  en: "From Castellón to the world" },
    body:    { es: "Operamos con vocación local y mirada internacional. Castellón es nuestra sede, nuestro mercado de prueba y nuestra base operativa para expandir al resto del Levante y el comercio internacional.", en: "We operate with local vocation and international vision. Castellón is our headquarters, our test market, and our operational base for expansion across the Levante region and international trade." },
  },
  cta: {
    title: { es: "¿Hablamos?",       en: "Shall we talk?" },
    sub:   { es: "Si tienes una propuesta, buscas colaboración o simplemente quieres conocernos, escríbenos.", en: "If you have a proposal, are looking for collaboration, or simply want to meet us — write to us." },
    btn:   { es: "Ir a contacto",    en: "Go to contact" },
  },
};

const brandStats: Record<string, { es: string; en: string }> = {
  spamy:        { es: "+5 años · Castellón · 4 verticales",              en: "5+ years · Castellón · 4 verticals" },
  tumanitas:    { es: "Lanzamiento 2026 · 15 municipios · 6 verticales", en: "2026 launch · 15 municipalities · 6 verticals" },
  importexport: { es: "Activo desde 2023 · Mercado internacional · CNAE 4690", en: "Active since 2023 · International market · CNAE 4690" },
};

const brandImages: Record<string, string> = {
  spamy:        "/images/brands/spamy.jpg",
  tumanitas:    "/images/brands/tumanitas.png",
  importexport: "/images/brands/importexport.png",
};

// ─── Main page ────────────────────────────────────────────
export default function HomePage() {
  const { lang } = useLang();

  // Subtle hero parallax
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 600], [0, 70]);

  // Castellón section parallax
  const castellonRef = useRef<HTMLElement>(null);
  const { scrollYProgress: castellonProg } = useScroll({
    target: castellonRef,
    offset: ["start end", "end start"],
  });
  const castellonImgY = useTransform(castellonProg, [0, 1], ["-12%", "12%"]);

  const heroLines  = copy.hero.lines[lang];
  const activeBrands = brands.filter(b => b.estado === "activo");
  const devBrands    = brands.filter(b => b.estado === "desarrollo");

  // Motion-enabled Link for CTA micro-bounce
  const MotionLink = motion(Link);

  return (
    <SiteLayout heroTop>

      {/* ════════════ HERO ════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "var(--navy)" }}
      >
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-grid pointer-events-none" />

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(26,26,26,0.65) 100%)",
          }}
        />

        {/* Very faint orange accent — bottom-right corner only */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: 550, height: 550,
            background: "radial-gradient(circle, rgba(183,155,106,0.055) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />

        {/* Content grid */}
        <div className="relative wrap py-36 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left: hero text */}
          <div>
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              {t(copy.hero.eyebrow, lang)}
            </motion.p>

            <h1 className="h1 text-white mb-7">
              {heroLines.map((line, i) => (
                <motion.span
                  key={`${lang}-${i}`}
                  className="block"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-muted text-lg max-w-lg leading-relaxed mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t(copy.hero.sub, lang)}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              <Link href="/marcas" className="btn-primary">
                {t(copy.hero.cta1, lang)} <ArrowRight size={15} />
              </Link>
              <Link href="/contacto" className="btn-outline-light">
                {t(copy.hero.cta2, lang)}
              </Link>
            </motion.div>
          </div>

          {/* Right: brand ecosystem (desktop only) */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="pl-12 border-l border-white/6"
            >
              <p className="font-mono text-muted/50 text-[0.6rem] tracking-widest uppercase mb-8">
                {lang === "es" ? "Marcas del grupo" : "Group brands"}
              </p>
              <BrandEcosystem lang={lang} />
            </motion.div>
          </div>
        </div>

        {/* Bottom fade to credibility strip */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--navy-deep))" }}
        />
      </section>

      {/* ════════════ CREDIBILITY STRIP ════════════ */}
      <section style={{ background: "var(--navy-deep)" }} className="py-16 md:py-20">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-8">
          {copy.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div
                className="font-serif font-bold text-orange leading-none mb-2"
                style={{ fontSize: "clamp(2.8rem, 5vw, 3.75rem)" }}
              >
                <CountUp from={stat.from} to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted font-mono text-[0.62rem] uppercase tracking-widest leading-snug">
                {t(stat.label, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════ BRANDS — editorial alternating bands ════════════ */}
      <section className="section bg-white">
        <div className="wrap">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">{t(copy.brands.eyebrow, lang)}</p>
            <h2 className="h2 text-ink max-w-lg">{t(copy.brands.title, lang)}</h2>
            <p className="text-ink-soft mt-4 max-w-xl">{t(copy.brands.sub, lang)}</p>
          </motion.div>
        </div>

        {/* Active brands — alternating rows */}
        {activeBrands.map((brand, idx) => {
          const odd = idx % 2 === 1;
          return (
            <motion.div
              key={brand.id}
              className="border-t border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[440px]">

                {/* ── Image panel ── */}
                <div
                  className={`relative overflow-hidden group flex flex-col justify-end min-h-[280px] lg:min-h-0 ${odd ? "lg:order-2" : "lg:order-1"}`}
                >
                  {/* Unsplash image — grayscale + darkened */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brandImages[brand.id]}
                    alt={brand.nombre}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ filter: "grayscale(1) brightness(0.62)" }}
                    loading="lazy"
                  />

                  {/* Subtle brand-color tint */}
                  <div
                    className="absolute inset-0"
                    style={{ background: BRAND_TINTS[brand.id] }}
                  />

                  {/* Text readability gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,15,15,0.92) 0%, rgba(15,15,15,0.25) 65%, transparent 100%)",
                    }}
                  />

                  {/* Panel label */}
                  <div className="relative z-10 p-10 md:p-14">
                    <span className="font-mono text-[0.6rem] text-orange/50 tracking-widest uppercase block mb-2">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-white font-serif font-bold leading-none mb-3"
                      style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)" }}
                    >
                      {brand.nombre}
                    </h3>
                    <div className="w-8 h-px bg-orange/50" />
                    <p className="font-mono text-muted/50 text-[0.6rem] tracking-widest uppercase mt-3">
                      {t(brand.categoria, lang)}
                    </p>
                  </div>
                </div>

                {/* ── Text content ── */}
                <div
                  className={`flex flex-col justify-center px-10 md:px-14 py-12 bg-white ${odd ? "lg:order-1" : "lg:order-2"}`}
                >
                  {/* Status badge */}
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {lang === "es" ? "Activo" : "Active"}
                    </span>
                  </div>

                  {/* Stats inline */}
                  <p className="font-mono text-ink-soft/55 text-[0.62rem] tracking-wide mb-5">
                    {t(brandStats[brand.id], lang)}
                  </p>

                  {/* Description */}
                  <div className="space-y-3 mb-7">
                    {brand.descripcionLarga[lang].map((p, i) => (
                      <p key={i} className="text-ink-soft leading-relaxed text-sm">{p}</p>
                    ))}
                  </div>

                  {/* Services */}
                  {brand.servicios && (
                    <div className="mb-7">
                      <p className="eyebrow mb-3 text-ink">{t(copy.brandDetail.services, lang)}</p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {brand.servicios[lang].map(s => (
                          <li key={s} className="text-ink-soft text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-orange shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Zone + Since */}
                  <div className="grid grid-cols-2 gap-4 mb-7 pt-5 border-t border-border">
                    <div>
                      <p className="eyebrow mb-1 text-ink">{t(copy.brandDetail.zone, lang)}</p>
                      <p className="text-ink text-sm">{t(brand.zona, lang)}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-1 text-ink">{t(copy.brandDetail.since, lang)}</p>
                      <p className="text-ink text-sm">{brand.desde}</p>
                    </div>
                  </div>

                  {brand.url && (
                    <BrandCTA
                      href={brand.url}
                      accentColor={BRAND_ACCENT_HOVER[brand.id]}
                    >
                      <ExternalLink size={13} />
                      {t(brand.urlLabel, lang)}
                    </BrandCTA>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* ── Foods — full-width development band ── */}
        {devBrands.map(brand => (
          <motion.div
            key={brand.id}
            className="border-t border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative overflow-hidden group"
              style={{ background: "var(--navy)" }}
            >
              {/* Background image for Foods too */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={UNSPLASH.foods}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ filter: "grayscale(1) brightness(0.2)", mixBlendMode: "luminosity" }}
                loading="lazy"
                aria-hidden
              />
              <div className="absolute inset-0" style={{ background: "rgba(26,26,26,0.84)" }} />
              <div className="absolute inset-0 blueprint-grid opacity-20" />

              <div className="relative py-20 md:py-28 px-8">
                <div className="wrap max-w-3xl">

                  {/* Globe icon */}
                  <GlobeIcon />

                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[0.6rem] text-orange/50 tracking-widest uppercase">03</span>
                    <div className="w-4 h-px bg-orange/30" />
                    <span className="font-mono text-[0.6rem] text-orange uppercase tracking-widest">
                      {brand.badge ? t(brand.badge, lang) : "Q4 2026"}
                    </span>
                  </div>

                  <h3
                    className="text-white font-serif font-bold leading-none mb-4"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    {brand.nombre}
                  </h3>
                  <div className="w-8 h-px bg-orange/50 mb-6" />

                  <p className="text-muted font-mono text-[0.65rem] tracking-widest uppercase mb-6">
                    {t(brand.categoria, lang)}
                  </p>

                  {brand.descripcionLarga[lang].map((p, i) => (
                    <p key={i} className="text-muted leading-relaxed mb-3 max-w-xl">{p}</p>
                  ))}

                  <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/8 max-w-sm">
                    <div>
                      <p className="eyebrow mb-1">{t(copy.brandDetail.zone, lang)}</p>
                      <p className="text-white text-sm">{t(brand.zona, lang)}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-1">{t(copy.brandDetail.since, lang)}</p>
                      <p className="text-white text-sm">{brand.desde}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ════════════ METHODOLOGY ════════════ */}
      <section className="section bg-softbg">
        <div className="wrap">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">{t(copy.methodology.eyebrow, lang)}</p>
            <h2 className="h2 text-ink">{t(copy.methodology.title, lang)}</h2>
          </motion.div>

          <div className="relative">
            <MethodConnector />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {copy.methodology.items.map(({ n, Icon, title, body }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.14, duration: 0.6 }}
                >
                  <div className="w-11 h-11 rounded-xl border border-orange/20 bg-orange/5 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-orange" />
                  </div>
                  <span className="font-mono text-orange/30 text-3xl font-bold leading-none mb-3 block">
                    {n}
                  </span>
                  <h3 className="h3 text-ink mb-2">{t(title, lang)}</h3>
                  <div className="w-8 h-px bg-orange my-4" />
                  <p className="text-ink-soft text-sm leading-relaxed">{t(body, lang)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ DESDE CASTELLÓN — foto real ════════════ */}
      <section
        ref={castellonRef}
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "54vh" }}
      >
        {/* Parallax image — Unsplash · Mediterranean/Spanish coast */}
        <motion.div className="absolute inset-0 scale-125" style={{ y: castellonImgY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={UNSPLASH.castellon}
            alt="Castellón de la Plana"
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(1) brightness(0.72)" }}
            loading="lazy"
          />
        </motion.div>

        {/* Gradient overlay — strong on text side, lighter on the other */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(15,15,15,0.80) 0%, rgba(15,15,15,0.58) 45%, rgba(15,15,15,0.42) 100%)",
          }}
        />

        {/* Blueprint grid overlay — very subtle */}
        <div className="absolute inset-0 blueprint-grid opacity-20" />

        {/* Content */}
        <div className="relative wrap py-24 md:py-32">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
          >
            <p className="eyebrow mb-4">{t(copy.castellon.eyebrow, lang)}</p>
            <h2 className="h2 text-white mb-5">{t(copy.castellon.title, lang)}</h2>
            <div className="w-8 h-px bg-orange mb-6" />
            <p className="text-muted text-lg leading-relaxed">{t(copy.castellon.body, lang)}</p>
          </motion.div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="section-sm relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(183,155,106,0.05) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="relative wrap text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="h2 text-ink mb-4">{t(copy.cta.title, lang)}</h2>
          <p className="text-ink-soft max-w-md mx-auto mb-9">{t(copy.cta.sub, lang)}</p>

          {/* Micro-bounce on hover */}
          <MotionLink
            href="/contacto"
            className="btn-primary inline-flex"
            whileHover={{ y: -3, boxShadow: "0 14px 36px rgba(183,155,106,0.45)" }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {t(copy.cta.btn, lang)} <ArrowRight size={15} />
          </MotionLink>
        </motion.div>
      </section>

    </SiteLayout>
  );
}
