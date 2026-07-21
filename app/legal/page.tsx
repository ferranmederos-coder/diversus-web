"use client";

import { useEffect, useRef } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import { useLang, t } from "@/lib/i18n";
import { site } from "@/data/site";

const copy = {
  hero: {
    eyebrow: { es: "Información legal", en: "Legal information" },
    title:   { es: "Aviso legal, privacidad y cookies", en: "Legal notice, privacy & cookies" },
  },
  nav: [
    { id: "aviso-legal",  es: "Aviso legal",           en: "Legal notice" },
    { id: "privacidad",   es: "Política de privacidad", en: "Privacy policy" },
    { id: "cookies",      es: "Política de cookies",    en: "Cookie policy" },
  ],
};

export default function LegalPage() {
  const { lang } = useLang();
  const dominio  = site.dominio;
  const email    = site.email;
  const nombre   = site.razonSocialCompleta;
  const cif      = site.cif;
  const dir      = site.direccion;
  const rm       = site.registroMercantil;
  const fConst   = site.fechaConstitucion;
  const escritura = site.escritura;

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = () => {
      const nav = navRef.current;
      if (!nav) return;
      const scrollY = window.scrollY + 120;
      const sections = document.querySelectorAll("section[id]");
      sections.forEach(sec => {
        const top    = (sec as HTMLElement).offsetTop;
        const bottom = top + (sec as HTMLElement).offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          nav.querySelectorAll("a").forEach(a => {
            a.classList.toggle("text-orange", a.getAttribute("href") === `#${sec.id}`);
            a.classList.toggle("text-ink-soft", a.getAttribute("href") !== `#${sec.id}`);
          });
        }
      });
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <SiteLayout>
      {/* ── HERO ── */}
      <section className="section-sm" style={{ background: "var(--navy)" }}>
        <div className="wrap">
          <p className="eyebrow mb-4">{t(copy.hero.eyebrow, lang)}</p>
          <h1 className="h1 text-white">{t(copy.hero.title, lang)}</h1>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="section bg-white">
        <div className="wrap flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Sticky sidebar */}
          <aside
            ref={navRef}
            className="lg:sticky lg:top-24 lg:w-52 shrink-0 flex flex-row lg:flex-col gap-2 flex-wrap"
            aria-label={lang === "es" ? "Índice legal" : "Legal index"}
          >
            {copy.nav.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-ink-soft text-sm font-medium hover:text-orange transition-colors duration-200 py-1"
              >
                {lang === "es" ? item.es : item.en}
              </a>
            ))}
          </aside>

          {/* Content */}
          <article className="flex-1 space-y-16 max-w-3xl prose-custom">

            {/* ── AVISO LEGAL ── */}
            <section id="aviso-legal" className="scroll-mt-24">
              <h2 className="h2 text-ink mb-6">
                {lang === "es" ? "Aviso legal" : "Legal notice"}
              </h2>
              <div className="space-y-4 text-ink-soft text-sm leading-relaxed">
                <p>
                  {lang === "es"
                    ? `En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos del titular del sitio web ${dominio}:`
                    : `In compliance with Article 10 of Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSICE), users of the website ${dominio} are hereby informed of the following ownership details:`}
                </p>
                <ul className="list-none space-y-1 pl-0">
                  <li><strong>{lang === "es" ? "Razón social:" : "Company name:"}</strong> {nombre}</li>
                  <li><strong>CIF:</strong> {cif}</li>
                  <li><strong>{lang === "es" ? "Domicilio social:" : "Registered address:"}</strong> {dir}</li>
                  <li><strong>{lang === "es" ? "Registro Mercantil:" : "Companies Register:"}</strong> {rm}</li>
                  <li><strong>{lang === "es" ? "Fecha de constitución:" : "Date of incorporation:"}</strong> {fConst}</li>
                  <li><strong>{lang === "es" ? "Escritura notarial:" : "Notarial deed:"}</strong> {escritura}</li>
                  <li><strong>{lang === "es" ? "Correo electrónico:" : "Email:"}</strong>{" "}
                    <a href={`mailto:${email}`} className="text-orange hover:underline">{email}</a>
                  </li>
                  <li><strong>{lang === "es" ? "Teléfono:" : "Phone:"}</strong> {site.telefono}</li>
                </ul>
                <p>
                  {lang === "es"
                    ? "El acceso y uso de este sitio web implica la aceptación de los presentes términos y condiciones. El titular se reserva el derecho a modificar el contenido del sitio sin previo aviso."
                    : "Access to and use of this website implies acceptance of these terms and conditions. The owner reserves the right to modify the content of the site without prior notice."}
                </p>
                <p>
                  {lang === "es"
                    ? "Los contenidos de este sitio web son propiedad intelectual del titular y están protegidos por la normativa española e internacional vigente en materia de propiedad intelectual e industrial. Queda prohibida su reproducción total o parcial sin autorización expresa."
                    : "The contents of this website are the intellectual property of the owner and are protected by applicable Spanish and international intellectual and industrial property regulations. Reproduction in whole or in part without express authorisation is prohibited."}
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* ── PRIVACIDAD ── */}
            <section id="privacidad" className="scroll-mt-24">
              <h2 className="h2 text-ink mb-6">
                {lang === "es" ? "Política de privacidad" : "Privacy policy"}
              </h2>
              <div className="space-y-4 text-ink-soft text-sm leading-relaxed">
                <p>
                  {lang === "es"
                    ? `En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), ${nombre} informa sobre el tratamiento de los datos personales recogidos a través del formulario de contacto de ${dominio}.`
                    : `In compliance with Regulation (EU) 2016/679 (GDPR) and Organic Law 3/2018 (LOPDGDD), ${nombre} informs users about the processing of personal data collected through the contact form at ${dominio}.`}
                </p>

                <h3 className="h3 text-ink mt-6 mb-2">{lang === "es" ? "Responsable del tratamiento" : "Data controller"}</h3>
                <ul className="list-none space-y-1 pl-0">
                  <li><strong>{lang === "es" ? "Identidad:" : "Identity:"}</strong> {nombre}</li>
                  <li><strong>CIF:</strong> {cif}</li>
                  <li><strong>{lang === "es" ? "Dirección:" : "Address:"}</strong> {dir}</li>
                  <li><strong>{lang === "es" ? "Contacto:" : "Contact:"}</strong>{" "}
                    <a href={`mailto:${email}`} className="text-orange hover:underline">{email}</a>
                  </li>
                </ul>

                <h3 className="h3 text-ink mt-6 mb-2">{lang === "es" ? "Finalidad" : "Purpose"}</h3>
                <p>
                  {lang === "es"
                    ? "Los datos recogidos a través del formulario de contacto se utilizan exclusivamente para gestionar la consulta o solicitud del usuario y responder a la misma."
                    : "Data collected through the contact form is used exclusively to manage and respond to the user's enquiry or request."}
                </p>

                <h3 className="h3 text-ink mt-6 mb-2">{lang === "es" ? "Legitimación" : "Legal basis"}</h3>
                <p>
                  {lang === "es"
                    ? "La base jurídica del tratamiento es el consentimiento del usuario al enviar el formulario de contacto (art. 6.1.a RGPD)."
                    : "The legal basis for processing is the user's consent when submitting the contact form (Art. 6.1.a GDPR)."}
                </p>

                <h3 className="h3 text-ink mt-6 mb-2">{lang === "es" ? "Conservación" : "Retention"}</h3>
                <p>
                  {lang === "es"
                    ? "Los datos se conservarán durante el tiempo necesario para atender la consulta y, como máximo, durante el período legalmente exigido."
                    : "Data will be retained for as long as necessary to handle the enquiry and, at most, for the legally required period."}
                </p>

                <h3 className="h3 text-ink mt-6 mb-2">{lang === "es" ? "Destinatarios" : "Recipients"}</h3>
                <p>
                  {lang === "es"
                    ? "Los datos no se cederán a terceros salvo obligación legal. El envío del formulario se gestiona a través de Formspree Inc. (EE. UU.), que actúa como encargado del tratamiento bajo las garantías del Marco de Privacidad de Datos UE-EE. UU."
                    : "Data will not be transferred to third parties unless legally required. Form submission is processed via Formspree Inc. (USA), acting as data processor under the EU-US Data Privacy Framework guarantees."}
                </p>

                <h3 className="h3 text-ink mt-6 mb-2">{lang === "es" ? "Derechos del usuario" : "User rights"}</h3>
                <p>
                  {lang === "es"
                    ? `El usuario puede ejercer sus derechos de acceso, rectificación, supresión, portabilidad, limitación u oposición al tratamiento escribiendo a ${email}. Tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`
                    : `The user may exercise their rights of access, rectification, erasure, portability, restriction or objection by writing to ${email}. You have the right to lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).`}
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* ── COOKIES ── */}
            <section id="cookies" className="scroll-mt-24">
              <h2 className="h2 text-ink mb-6">
                {lang === "es" ? "Política de cookies" : "Cookie policy"}
              </h2>
              <div className="space-y-4 text-ink-soft text-sm leading-relaxed">
                <p>
                  {lang === "es"
                    ? `Este sitio web (${dominio}) utiliza únicamente cookies técnicas estrictamente necesarias para el funcionamiento del sitio. No se utilizan cookies de seguimiento, publicidad ni analítica de terceros.`
                    : `This website (${dominio}) uses only strictly necessary technical cookies required for the site to function. No tracking, advertising, or third-party analytics cookies are used.`}
                </p>

                <h3 className="h3 text-ink mt-6 mb-2">{lang === "es" ? "Tipos de cookies" : "Cookie types"}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 font-semibold text-ink">{lang === "es" ? "Cookie" : "Cookie"}</th>
                        <th className="text-left py-2 pr-4 font-semibold text-ink">{lang === "es" ? "Tipo" : "Type"}</th>
                        <th className="text-left py-2 font-semibold text-ink">{lang === "es" ? "Finalidad" : "Purpose"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-2 pr-4 font-mono">__lang</td>
                        <td className="py-2 pr-4">{lang === "es" ? "Técnica (sesión)" : "Technical (session)"}</td>
                        <td className="py-2">{lang === "es" ? "Preferencia de idioma seleccionada por el usuario" : "User-selected language preference"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  {lang === "es"
                    ? "Dado que únicamente se utilizan cookies técnicas necesarias, no es preciso obtener el consentimiento del usuario conforme al artículo 22.2 de la LSSI-CE y la Guía de la AEPD sobre el uso de cookies (2023)."
                    : "Since only strictly necessary technical cookies are used, user consent is not required under Article 22.2 of the LSSICE and the AEPD's Cookie Usage Guide (2023)."}
                </p>
                <p>
                  {lang === "es"
                    ? "En cualquier caso, el usuario puede configurar su navegador para rechazar o eliminar cookies. Consulta la ayuda de tu navegador para obtener instrucciones."
                    : "In any case, users may configure their browser to reject or delete cookies. Consult your browser's help section for instructions."}
                </p>
                <p>
                  {lang === "es"
                    ? `Para cualquier duda sobre el uso de cookies, puede contactar con nosotros en ${email}.`
                    : `For any questions about cookie usage, please contact us at ${email}.`}
                </p>
              </div>
            </section>

          </article>
        </div>
      </section>
    </SiteLayout>
  );
}
