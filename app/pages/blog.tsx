import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export default function BlogPage() {
  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <main className="pt-24 pb-16">
        <Container>
          <section className="rounded-container border border-accent/35 bg-card p-8 sm:p-10 lg:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Blog
            </p>
            <h1 className="font-serif text-4xl font-bold text-primary sm:text-5xl">
              Blog
            </h1>
            <p className="mt-4 max-w-3xl text-base text-foreground/75 sm:text-lg">
              Stories, guides, and insights curated for premium journeys across Morocco and Saudi Arabia.
            </p>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
