import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";

const navLinks = [
  { href: "/empresa",  label: "Empresa" },
  { href: "/marcas",   label: "Marcas" },
  { href: "/contacto", label: "Contacto" },
  { href: "/legal",    label: "Legal" },
];

const brandLinks = [
  { label: "SPAmy",                 href: "https://spamycastellon.es",      active: true  },
  { label: "Tu Manitas Castellón",  href: "https://tumanitascastellon.es",  active: true  },
  { label: "D. Ferrán Import / Export", href: "https://comercio.dferrandiversus.es", active: true  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy-deep)" }}>

      {/* Main grid */}
      <div className="wrap py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Col 1 — Identidad */}
        <div>
          <Image
            src="/images/logo-white.png"
            alt="D. Ferrán Diversus SL"
            width={160}
            height={60}
            className="h-16 w-auto object-contain mb-6"
          />
          <p className="text-muted text-sm leading-relaxed">
            {site.nombre}<br />
            <span className="font-mono text-[0.7rem] text-muted/60">CIF: {site.cif}</span>
          </p>
          <p className="text-muted/60 text-xs mt-3 leading-relaxed">
            {site.direccion}
          </p>
        </div>

        {/* Col 2 — Navegación */}
        <div>
          <p className="font-mono text-[0.65rem] text-muted/50 tracking-widest uppercase mb-5">
            Navegación
          </p>
          <ul className="space-y-2.5">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-muted text-sm hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contacto */}
        <div>
          <p className="font-mono text-[0.65rem] text-muted/50 tracking-widest uppercase mb-5">
            Contacto
          </p>
          <address className="not-italic space-y-3">
            <a
              href={`mailto:${site.email}`}
              className="text-muted text-sm hover:text-orange transition-colors duration-200 flex items-center gap-2"
            >
              <Mail size={13} className="shrink-0 text-orange/50" />
              {site.email}
            </a>
            <a
              href={`tel:+34${site.telefono.replace(/\s/g, "")}`}
              className="text-muted text-sm hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Phone size={13} className="shrink-0 text-orange/50" />
              {site.telefono}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted text-sm hover:text-orange transition-colors duration-200 flex items-center gap-2"
            >
              <Linkedin size={13} className="shrink-0 text-orange/50" />
              LinkedIn
            </a>
          </address>
        </div>

        {/* Col 4 — Marcas */}
        <div>
          <p className="font-mono text-[0.65rem] text-muted/50 tracking-widest uppercase mb-5">
            Marcas
          </p>
          <ul className="space-y-2.5">
            {brandLinks.map(({ label, href, active }) => (
              <li key={label}>
                {active && href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted text-sm hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                    {label}
                  </a>
                ) : (
                  <span className="text-muted/40 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-orange/40 shrink-0" />
                    {label}
                    <span className="font-mono text-[0.55rem] text-orange/50 uppercase tracking-widest">
                      Q4 2026
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted/50 text-xs font-mono">
            © {new Date().getFullYear()} D. Ferrán Diversus SL — Todos los derechos reservados
          </p>
          <Link
            href="/legal"
            className="text-muted/50 text-xs font-mono hover:text-muted transition-colors duration-200"
          >
            Aviso legal · Privacidad · Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
