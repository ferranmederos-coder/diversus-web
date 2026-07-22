"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Mail, Phone, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import { useLang, t } from "@/lib/i18n";
import { site } from "@/data/site";

// VERIFICAR: reemplazar con el ID real de tu formulario en formspree.io
const FORMSPREE_ID = "xxxxxxxp";

const copy = {
  hero: {
    eyebrow: { es: "Contacto corporativo", en: "Corporate contact" },
    title:   { es: "Hablemos", en: "Let's talk" },
    sub:     { es: "Para colaboraciones, propuestas de inversión o consultas generales sobre D. Ferrán Diversus SL y sus marcas.", en: "For collaborations, investment proposals or general enquiries about D. Ferrán Diversus SL and its brands." },
  },
  info: {
    address: { es: "Dirección", en: "Address" },
    email:   { es: "Email",     en: "Email" },
    phone:   { es: "Teléfono",  en: "Phone" },
    social:  { es: "LinkedIn",  en: "LinkedIn" },
    legal:   { es: "Datos fiscales", en: "Fiscal data" },
  },
  form: {
    name:        { es: "Nombre y apellidos", en: "Full name" },
    email:       { es: "Correo electrónico", en: "Email address" },
    company:     { es: "Empresa (opcional)", en: "Company (optional)" },
    subject:     { es: "Asunto", en: "Subject" },
    message:     { es: "Mensaje", en: "Message" },
    send:        { es: "Enviar mensaje", en: "Send message" },
    sending:     { es: "Enviando...", en: "Sending..." },
    successTitle:{ es: "Mensaje enviado", en: "Message sent" },
    successBody: { es: "Gracias por contactar. Te responderemos en menos de 48 h.", en: "Thank you for reaching out. We will reply within 48 hours." },
    errorTitle:  { es: "Error al enviar", en: "Send error" },
    errorBody:   { es: "Inténtalo de nuevo o escríbenos directamente a ", en: "Please try again or email us directly at " },
    required:    { es: "Campos obligatorios", en: "Required fields" },
  },
};

type Status = "idle" | "sending" | "success" | "error";

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
      { threshold: 0.1 }
    );
    el.querySelectorAll(".fade-up").forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, [ref]);
}

export default function ContactoPage() {
  const { lang } = useLang();
  const bodyRef = useRef<HTMLElement>(null);
  useFadeUp(bodyRef as React.RefObject<Element>);

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: form.subject || "Contacto web — D. Ferrán Diversus" }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition-colors duration-200";

  return (
    <SiteLayout>
      {/* ── HERO ── */}
      <section className="section" style={{ background: "var(--navy)" }}>
        <div className="wrap">
          <p className="eyebrow mb-5">{t(copy.hero.eyebrow, lang)}</p>
          <h1 className="h1 text-white mb-6">{t(copy.hero.title, lang)}</h1>
          <p className="text-muted text-lg max-w-xl leading-relaxed">{t(copy.hero.sub, lang)}</p>
        </div>
      </section>

      {/* ── BODY ── */}
      <section ref={bodyRef} className="section bg-softbg">
        <div className="wrap grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Info ── */}
          <div className="lg:col-span-2 space-y-8 fade-up">
            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-orange" />
                </div>
                <div>
                  <p className="eyebrow mb-1">{t(copy.info.address, lang)}</p>
                  <p className="text-ink text-sm leading-relaxed">
                    C/ Navarra 97<br />
                    Castellón de la Plana, Castellón, España
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-orange" />
                </div>
                <div>
                  <p className="eyebrow mb-1">{t(copy.info.email, lang)}</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink text-sm hover:text-orange transition-colors duration-200"
                  >
                    {site.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-orange" />
                </div>
                <div>
                  <p className="eyebrow mb-1">{t(copy.info.phone, lang)}</p>
                  <a
                    href={`tel:+34${site.telefono.replace(/\s/g, "")}`}
                    className="text-ink text-sm hover:text-orange transition-colors duration-200"
                  >
                    {site.telefono}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                  <Linkedin size={16} className="text-orange" />
                </div>
                <div>
                  <p className="eyebrow mb-1">{t(copy.info.social, lang)}</p>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink text-sm hover:text-orange transition-colors duration-200"
                  >
                    D. Ferrán Diversus SL
                  </a>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div className="pt-6 border-t border-border">
              <p className="eyebrow mb-3">{t(copy.info.legal, lang)}</p>
              <p className="text-ink-soft text-xs leading-relaxed">
                {site.nombre}<br />
                CIF: {site.cif} {/* VERIFICAR CIF */}<br />
                {site.direccion}
              </p>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="lg:col-span-3 fade-up" style={{ transitionDelay: "80ms" }}>
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-10">
                  <CheckCircle size={48} className="text-emerald-500 mb-4" />
                  <h2 className="h3 text-ink mb-2">{t(copy.form.successTitle, lang)}</h2>
                  <p className="text-ink-soft">{t(copy.form.successBody, lang)}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="eyebrow block mb-1.5 text-ink">{t(copy.form.name, lang)} *</label>
                      <input
                        type="text" name="name" required
                        value={form.name} onChange={handleChange}
                        className={inputClass}
                        placeholder={lang === "es" ? "David Ferrán" : "John Smith"}
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1.5 text-ink">{t(copy.form.email, lang)} *</label>
                      <input
                        type="email" name="email" required
                        value={form.email} onChange={handleChange}
                        className={inputClass}
                        placeholder="correo@empresa.es"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="eyebrow block mb-1.5 text-ink">{t(copy.form.company, lang)}</label>
                      <input
                        type="text" name="company"
                        value={form.company} onChange={handleChange}
                        className={inputClass}
                        placeholder={lang === "es" ? "Empresa SL" : "Company Ltd"}
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1.5 text-ink">{t(copy.form.subject, lang)} *</label>
                      <input
                        type="text" name="subject" required
                        value={form.subject} onChange={handleChange}
                        className={inputClass}
                        placeholder={lang === "es" ? "Colaboración / Consulta" : "Collaboration / Enquiry"}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="eyebrow block mb-1.5 text-ink">{t(copy.form.message, lang)} *</label>
                    <textarea
                      name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder={lang === "es" ? "Cuéntanos tu propuesta..." : "Tell us about your proposal..."}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                      <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">
                        {t(copy.form.errorBody, lang)}
                        <a href={`mailto:${site.email}`} className="underline font-semibold">{site.email}</a>
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full justify-center"
                  >
                    {status === "sending" ? t(copy.form.sending, lang) : t(copy.form.send, lang)}
                  </button>
                  <p className="text-ink-soft/60 text-xs text-center">* {t(copy.form.required, lang)}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
