"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import { useLang, t } from "@/lib/i18n";
import { brands } from "@/data/brands";

const copy = {
  hero: {
    eyebrow: { es: "Nuestras marcas", en: "Our brands" },
    title:   { es: "Proyectos reales,\nimpacto local", en: "Real projects,\nlocal impact" },
    sub:     { es: "Cada marca del grupo nace de una necesidad detectada en el mercado. Construimos proyectos propios con visión a largo plazo.", en: "Each group brand is born from a detected market need. We build in-house projects with a long-term vision." },
  },
  active:  { es: "Activo", en: "Active" },
  dev:     { es: "En desarrollo", en: "In development" },
  visit:   { es: "Visitar sitio web", en: "Visit website" },
  services: { es: "Servicios", en: "Services" },
  stats:    { es: "Datos clave", en: "Key figures" },
  zone:     { es: "Zona de actuación", en: "Service area" },
  since:    { es: "Desde", en: "Since" },
  comingSoon: {
    title: { es: "Próximamente", en: "Coming soon" },
    body:  { es: "Nuevos proyectos en desarrollo.", en: "New projects in development." },
  },
};

function useFadeUp(ref: React.RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("visible");
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".fade-up").forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, [ref]);
}

export default function MarcasPage() {
  const { lang } = useLang();
  const bodyRef = useRef<HTMLDivElement>(null);

  useFadeUp(bodyRef as React.RefObject<Element>);

  const activebrands = brands.filter(b => b.estado === "activo");
  const devBrands    = brands.filter(b => b.estado === "desarrollo");

  return (
    <SiteLayout>
      {/* ── HERO ── */}
      <section className="section" style={{ background: "var(--navy)" }}>
        <div className="wrap">
          <p className="eyebrow mb-5">{t(copy.hero.eyebrow, lang)}</p>
          <h1 className="h1 text-white max-w-3xl whitespace-pre-line mb-6">
            {t(copy.hero.title, lang)}
          </h1>
          <p className="text-muted text-lg max-w-xl leading-relaxed">{t(copy.hero.sub, lang)}</p>
        </div>
      </section>

      {/* ── ACTIVE BRANDS ── */}
      <div ref={bodyRef}>
        {activebrands.map((brand, idx) => {
          const odd = idx % 2 === 1;
          return (
            <section
              key={brand.id}
              className="section"
              style={{ background: odd ? "var(--soft-bg)" : "white" }}
            >
              <div className="wrap">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                  {/* Text */}
                  <div className={odd ? "lg:order-2" : ""}>
                    <div className="fade-up">
                      <span className="eyebrow block mb-2">{t(brand.categoria, lang)}</span>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {t(copy.active, lang)}
                      </div>
                      <h2 className="h2 text-ink mb-4">{brand.nombre}</h2>
                      <div className="divider" />
                      {brand.descripcionLarga[lang].map((p, i) => (
                        <p key={i} className="text-ink-soft leading-relaxed mb-4">{p}</p>
                      ))}
                    </div>

                    <div className="fade-up mt-6 flex flex-wrap gap-4">
                      {brand.url && (
                        <a
                          href={brand.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          <ExternalLink size={15} />
                          {t(brand.urlLabel, lang)}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Details card */}
                  <div className={`fade-up ${odd ? "lg:order-1" : ""}`}>
                    <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-6">
                      {/* Services */}
                      {brand.servicios && (
                        <div>
                          <p className="eyebrow mb-3">{t(copy.services, lang)}</p>
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {brand.servicios[lang].map(s => (
                              <li key={s} className="text-ink-soft text-sm flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-orange shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Stats */}
                      {brand.stats && (
                        <div>
                          <p className="eyebrow mb-3">{t(copy.stats, lang)}</p>
                          <div className="grid grid-cols-2 gap-3">
                            {brand.stats[lang].map(s => (
                              <div key={s} className="bg-softbg rounded-xl p-3 text-center">
                                <span className="text-ink text-xs font-semibold">{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                        <div>
                          <p className="eyebrow mb-1">{t(copy.zone, lang)}</p>
                          <p className="text-ink text-sm">{t(brand.zona, lang)}</p>
                        </div>
                        <div>
                          <p className="eyebrow mb-1">{t(copy.since, lang)}</p>
                          <p className="text-ink text-sm">{brand.desde}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── FOODS — COMING SOON ── */}
        {devBrands.map(brand => (
          <section key={brand.id} className="section" style={{ background: "var(--navy)" }}>
            <div className="wrap">
              <div className="fade-up max-w-3xl">
                <span className="eyebrow block mb-2">{t(brand.categoria, lang)}</span>
                {brand.badge && (
                  <span className="inline-flex items-center text-xs font-semibold text-orange bg-orange/10 border border-orange/30 rounded-full px-3 py-1 mb-5">
                    {t(brand.badge, lang)}
                  </span>
                )}
                <h2 className="h2 text-white mb-4">{brand.nombre}</h2>
                <div className="divider" />
                {brand.descripcionLarga[lang].map((p, i) => (
                  <p key={i} className="text-muted leading-relaxed mb-4">{p}</p>
                ))}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border-t border-white/10 pt-4">
                    <p className="eyebrow mb-1">{t(copy.zone, lang)}</p>
                    <p className="text-white text-sm">{t(brand.zona, lang)}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="eyebrow mb-1">{t(copy.since, lang)}</p>
                    <p className="text-white text-sm">{brand.desde}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ── CTA ── */}
        <section className="section-sm bg-softbg">
          <div className="wrap text-center fade-up">
            <h2 className="h2 text-ink mb-4">
              {lang === "es" ? "¿Quieres saber más?" : "Want to know more?"}
            </h2>
            <p className="text-ink-soft max-w-sm mx-auto mb-8">
              {lang === "es"
                ? "Para colaboraciones con nuestras marcas o consultas generales sobre el grupo."
                : "For collaborations with our brands or general group enquiries."}
            </p>
            <Link href="/contacto" className="btn-primary">
              {lang === "es" ? "Contactar" : "Contact"} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
