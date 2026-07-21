import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="min-h-[80vh] flex items-center" style={{ background: "var(--navy)" }}>
        <div className="wrap text-center">
          <p className="text-orange font-serif text-[8rem] leading-none font-bold opacity-10 select-none mb-4">
            404
          </p>
          <h1 className="h2 text-white mb-4 -mt-10">
            Página no encontrada
          </h1>
          <p className="text-muted mb-10 max-w-sm mx-auto">
            La página que buscas no existe o ha sido movida.
          </p>
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
