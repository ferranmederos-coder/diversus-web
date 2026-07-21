"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type Lang = "es" | "en";

const LangCtx = createContext<{
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
}>({ lang: "es", toggle: () => {}, setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/en")) {
      return "en";
    }
    return "es";
  });
  const toggle  = useCallback(() => setLangState((l) => (l === "es" ? "en" : "es")), []);
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  return <LangCtx.Provider value={{ lang, toggle, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}

/** Helper: devuelve el string correcto según idioma */
export function t(obj: { es: string; en: string }, lang: Lang): string {
  return obj[lang];
}
