import Footer from "./Footer";

export default function SiteLayout({
  children,
  heroTop = false,
}: {
  children: React.ReactNode;
  heroTop?: boolean;
}) {
  return (
    <>
      <main className={heroTop ? undefined : "pt-[72px]"}>
        {children}
      </main>
      <Footer />
    </>
  );
}
