"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

const links = {
  es: [
    { href: "/empresa",  label: "Empresa" },
    { href: "/marcas",   label: "Marcas" },
    { href: "/contacto", label: "Contacto" },
  ],
  en: [
    { href: "/empresa",  label: "Company" },
    { href: "/marcas",   label: "Brands" },
    { href: "/contacto", label: "Contact" },
  ],
};

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const nav = links[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const switchLang = (target: Lang) => { if (lang !== target) setLang(target); };

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(248,245,238,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div className="wrap flex items-center justify-between h-[72px]">

          {/* Logo — swap claro/oscuro según scroll */}
          <Link href="/" aria-label="D. Ferrán Diversus — Inicio">
            <Image
              src={scrolled ? "/images/logo-black.png" : "/images/logo-white.png"}
              alt="D. Ferrán Diversus SL"
              width={160}
              height={60}
              className="h-11 md:h-16 w-auto object-contain transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  pathname === href
                    ? "text-orange"
                    : scrolled
                    ? "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-orange transition-all duration-300 ${
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            {/* ES · EN toggle */}
            <div className="flex items-center gap-1 font-mono text-[0.7rem] tracking-widest ml-2">
              <button
                onClick={() => switchLang("es")}
                className={`transition-colors duration-200 ${
                  lang === "es"
                    ? "text-orange font-bold"
                    : scrolled
                    ? "text-[#1A1A1A]/45 hover:text-[#1A1A1A]"
                    : "text-muted/60 hover:text-muted"
                }`}
                aria-label="Español"
              >
                ES
              </button>
              <span
                className="select-none px-0.5 transition-colors duration-200"
                style={{ color: scrolled ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.15)" }}
              >
                ·
              </span>
              <button
                onClick={() => switchLang("en")}
                className={`transition-colors duration-200 ${
                  lang === "en"
                    ? "text-orange font-bold"
                    : scrolled
                    ? "text-[#1A1A1A]/45 hover:text-[#1A1A1A]"
                    : "text-muted/60 hover:text-muted"
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden p-2 transition-colors duration-200"
            style={{ color: scrolled ? "#1A1A1A" : "white" }}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay — siempre fondo navy oscuro */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 md:hidden"
          style={{ background: "var(--navy)" }}
        >
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-serif text-2xl font-semibold transition-colors ${
                pathname === href ? "text-orange" : "text-white hover:text-orange"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Mobile lang toggle */}
          <div className="flex items-center gap-3 mt-4 font-mono text-sm tracking-widest">
            <button
              onClick={() => switchLang("es")}
              className={lang === "es" ? "text-orange font-bold" : "text-muted/60"}
            >
              ES
            </button>
            <span className="text-white/15">·</span>
            <button
              onClick={() => switchLang("en")}
              className={lang === "en" ? "text-orange font-bold" : "text-muted/60"}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </>
  );
}
