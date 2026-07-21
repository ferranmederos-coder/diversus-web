"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import { useLang, t } from "@/lib/i18n";
import { site } from "@/data/site";

const copy = {
  hero: {
    eyebrow:  { es: "LA EMPRESA", en: "THE COMPANY" },
    title:    { es: "Una holding hecha para construir, no solo invertir.", en: "A holding built to build, not just to invest." },
    sub:      { es: "D. Ferrán Diversus SL es una sociedad mercantil con sede en Castellón de la Plana, fundada en septiembre de 2023 como vehículo para desarrollar proyectos empresariales propios en diferentes verticales de servicios, consumo y comercio internacional.", en: "D. Ferrán Diversus SL is a company based in Castellón de la Plana, incorporated in September 2023 as a vehicle to develop in-house business projects across different verticals: services, consumer goods and international trade." },
  },
  mision: {
    eyebrow: { es: "Misión y visión", en: "Mission & vision" },
    title:   { es: "Por qué existimos", en: "Why we exist" },
    items: [
      {
        label: { es: "Misión", en: "Mission" },
        body:  { es: "Detectar oportunidades de negocio con demanda real, desarrollar proyectos propios de alta calidad y gestionarlos con rigor para generar valor económico y social sostenible en los mercados donde operamos.", en: "Detect business opportunities with real demand, develop high-quality in-house projects and manage them rigorously to generate sustainable economic and social value in the markets where we operate." },
      },
      {
        label: { es: "Visión", en: "Vision" },
        body:  { es: "Convertirnos en el grupo empresarial de referencia en Castellón, reconocido por la solidez de nuestros proyectos, la ética en nuestra gestión y la capacidad de crear marcas que perduren.", en: "To become the reference business group in Castellón, recognised for the robustness of our projects, ethical management, and the ability to build lasting brands." },
      },
    ],
  },
  valores: {
    eyebrow: { es: "Lo que nos guía", en: "What guides us" },
    title:   { es: "Valores del grupo", en: "Group values" },
    items: [
      { n: "01", title: { es: "Rigor", en: "Rigour" }, body: { es: "Cada decisión se toma con datos, análisis y responsabilidad. No improvisamos.", en: "Every decision is made with data, analysis and accountability. We do not improvise." } },
      { n: "02", title: { es: "Proximidad", en: "Proximity" }, body: { es: "Apostamos por el mercado local. Conocer el territorio es una ventaja competitiva.", en: "We back the local market. Knowing the territory is a competitive advantage." } },
      { n: "03", title: { es: "Excelencia", en: "Excellence" }, body: { es: "No buscamos ser los más grandes, buscamos ser los mejores en lo que hacemos.", en: "We do not aim to be the biggest — we aim to be the best at what we do." } },
      { n: "04", title: { es: "Integridad", en: "Integrity" }, body: { es: "Cumplimos lo que prometemos. La confianza es la base de todas nuestras relaciones.", en: "We keep our promises. Trust is the foundation of all our relationships." } },
    ],
  },
  areas: {
    eyebrow: { es: "Actividad registrada", en: "Registered activity" },
    title:   { es: "Áreas de actividad", en: "Activity areas" },
    items: [
      {
        cnae: "9602",
        label:  { es: "Peluquería y otros tratamientos de belleza", en: "Hairdressing and other beauty treatment" },
        marca:  "SPAmy",
        note:   null,
      },
      {
        cnae: "8121 / 4329",
        label:  { es: "Servicios técnicos del hogar y reparaciones", en: "Home technical services and repairs" },
        marca:  "Tu Manitas Castellón",
        note:   null,
      },
      {
        cnae: "4690",
        label:  { es: "Comercio al por mayor de todo tipo de bienes", en: "Non-specialised wholesale trade" },
        marca:  "D. Ferrán Import / Export",
        note:   null,
      },
    ],
  },
  legal: {
    eyebrow: { es: "Información legal", en: "Legal information" },
    title:   { es: "Datos de la sociedad", en: "Company data" },
    fields: [
      { label: { es: "Razón social", en: "Legal name" },             value: site.razonSocialCompleta },
      { label: { es: "CIF / NIF", en: "Tax ID" },                    value: site.cif },
      { label: { es: "Domicilio social", en: "Registered address" }, value: site.direccion },
      { label: { es: "Provincia", en: "Province" },                  value: "Castellón, España" },
      { label: { es: "Correo electrónico", en: "Email" },            value: site.email },
      { label: { es: "Teléfono", en: "Phone" },                      value: site.telefono },
      { label: { es: "Fecha de constitución", en: "Incorporated" },  value: site.fechaConstitucion },
      { label: { es: "Forma jurídica", en: "Legal form" },           value: "Sociedad de Responsabilidad Limitada (SL)" },
    ],
  },
  cta: {
    title: { es: "¿Colaboramos?", en: "Shall we collaborate?" },
    sub:   { es: "Estamos abiertos a propuestas y colaboraciones que encajen con nuestra visión.", en: "We are open to proposals and collaborations that align with our vision." },
    btn:   { es: "Contactar", en: "Contact" },
  },
};

function useFadeUp(ref: React.RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll(".fade-up").forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, [ref]);
}

export default function EmpresaPage() {
  const { lang } = useLang();
  const misionRef  = useRef<HTMLElement>(null);
  const valoresRef = useRef<HTMLElement>(null);
  const areasRef   = useRef<HTMLElement>(null);
  const legalRef   = useRef<HTMLElement>(null);
  const ctaRef     = useRef<HTMLElement>(null);

  useFadeUp(misionRef as React.RefObject<Element>);
  useFadeUp(valoresRef as React.RefObject<Element>);
  useFadeUp(areasRef as React.RefObject<Element>);
  useFadeUp(legalRef as React.RefObject<Element>);
  useFadeUp(ctaRef as React.RefObject<Element>);

  return (
    <SiteLayout>
      {/* ── HERO ── */}
      <section className="section" style={{ background: "var(--navy)" }}>
        <div className="wrap">
          <p className="eyebrow mb-5">{t(copy.hero.eyebrow, lang)}</p>
          <h1 className="h1 text-white max-w-3xl mb-6">{t(copy.hero.title, lang)}</h1>
          <p className="text-muted text-lg max-w-2xl leading-relaxed">{t(copy.hero.sub, lang)}</p>
        </div>
      </section>

      {/* ── MISIÓN / VISIÓN ── */}
      <section ref={misionRef} className="section bg-white">
        <div className="wrap">
          <div className="mb-12 fade-up">
            <p className="eyebrow mb-3">{t(copy.mision.eyebrow, lang)}</p>
            <h2 className="h2 text-ink">{t(copy.mision.title, lang)}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {copy.mision.items.map((item, i) => (
              <div key={i} className="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="divider" />
                <h3 className="h3 text-ink mb-4">{t(item.label, lang)}</h3>
                <p className="text-ink-soft leading-relaxed">{t(item.body, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section ref={valoresRef} className="section bg-softbg">
        <div className="wrap">
          <div className="mb-12 fade-up">
            <p className="eyebrow mb-3">{t(copy.valores.eyebrow, lang)}</p>
            <h2 className="h2 text-ink">{t(copy.valores.title, lang)}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {copy.valores.items.map((item, i) => (
              <div
                key={item.n}
                className="fade-up bg-white rounded-2xl border border-border p-8 hover:shadow-md transition-shadow duration-300"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="text-orange font-serif text-3xl font-bold block mb-3">{item.n}</span>
                <h3 className="h3 text-ink mb-2">{t(item.title, lang)}</h3>
                <div className="divider" />
                <p className="text-ink-soft text-sm leading-relaxed">{t(item.body, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÁREAS DE ACTIVIDAD ── */}
      <section ref={areasRef} className="section bg-white">
        <div className="wrap">
          <div className="mb-12 fade-up">
            <p className="eyebrow mb-3">{t(copy.areas.eyebrow, lang)}</p>
            <h2 className="h2 text-ink">{t(copy.areas.title, lang)}</h2>
          </div>
          <div className="divide-y divide-border">
            {copy.areas.items.map((item, i) => (
              <div
                key={i}
                className="fade-up py-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="shrink-0 w-20">
                  <span className="font-mono text-[0.65rem] text-muted/50 uppercase tracking-widest block">CNAE</span>
                  <span className="font-mono text-orange text-base font-medium">{item.cnae}</span>
                </div>
                <div className="flex-1">
                  <p className="text-ink font-medium">{t(item.label, lang)}</p>
                  {item.note && (
                    <p className="font-mono text-[0.62rem] text-ink-soft/50 uppercase tracking-widest mt-1">
                      {t(item.note, lang)}
                    </p>
                  )}
                </div>
                <span className="text-ink-soft text-sm font-medium shrink-0">{item.marca}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATOS LEGALES ── */}
      <section ref={legalRef} className="section" style={{ background: "var(--navy)" }}>
        <div className="wrap">
          <div className="mb-12 fade-up">
            <p className="eyebrow mb-3">{t(copy.legal.eyebrow, lang)}</p>
            <h2 className="h2 text-white">{t(copy.legal.title, lang)}</h2>
          </div>
          <dl className="fade-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.legal.fields.map(({ label, value }) => (
              <div key={value} className="border-t border-white/10 pt-4">
                <dt className="text-muted text-xs font-semibold tracking-widest uppercase mb-1.5">
                  {t(label, lang)}
                </dt>
                <dd className="text-white text-sm leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="section-sm bg-softbg">
        <div className="wrap text-center fade-up">
          <h2 className="h2 text-ink mb-4">{t(copy.cta.title, lang)}</h2>
          <p className="text-ink-soft max-w-md mx-auto mb-8">{t(copy.cta.sub, lang)}</p>
          <Link href="/contacto" className="btn-primary">
            {t(copy.cta.btn, lang)} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
