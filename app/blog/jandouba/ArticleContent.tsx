"use client";

import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";

const highlights = [
  "Soft winter snowfall over cedar forests",
  "Refreshing mountain weather year-round",
  "Scenic green valleys and peaceful village rhythm",
  "A calm, uncrowded retreat for slow luxury travel",
];

export default function ArticleContent() {
  return (
    <main className="pb-16 pt-20 sm:pt-24">
      <Container className="space-y-10 sm:space-y-14">
        <section className="overflow-hidden rounded-container border border-accent/35 bg-card shadow-sm">
          <div className="relative min-h-[380px] sm:min-h-[460px]">
            <Image
              src="/assets/Imlil_Valley.jpg"
              alt="Ayn Darahim mountain scenery with cool weather and flowing water"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/35 to-transparent" />
            <div className="relative z-10 flex min-h-[380px] flex-col justify-end p-6 sm:min-h-[460px] sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/80">
                Destination Spotlight
              </p>
              <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold leading-tight text-background sm:text-5xl lg:text-6xl">
                Tunis Jandouba
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/90 sm:text-base">
                A refined mountain escape where Ayn Darahim blends cool air, pine-scented forests,
                and winter snow into a serene Tunisian retreat.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#brief"
                  className="inline-flex items-center rounded-full border border-background/40 bg-background px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
                >
                  Explore Jandouba
                </Link>
                <Link
                  href="/plan-your-trip"
                  className="inline-flex items-center rounded-full border border-background/40 px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
                >
                  Plan Your Trip
                </Link>
                <Link
                  href="#gallery"
                  className="inline-flex items-center rounded-full border border-background/40 bg-background/10 px-5 py-2.5 text-sm font-semibold text-background backdrop-blur-sm transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
                >
                  Discover Ayn Darahim
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="brief"
          className="rounded-container border border-accent/30 bg-card/80 p-6 sm:p-8 lg:p-10"
        >
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">
            Why Ayn Darahim Feels Different
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-foreground/80">
            Nestled in the mountains of Jandouba, Ayn Darahim offers a rarer side of Tunisia:
            misty mornings, deep green hills, and a calm pace that invites you to slow down.
            In winter, snow dusts the highlands and transforms the landscape into a quiet alpine
            mood, while the rest of the year stays fresh, cool, and naturally restorative.
          </p>
        </section>

        <section className="rounded-container border border-accent/30 bg-card p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">Signature Highlights</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <article
                key={item}
                className="rounded-card border border-accent/30 bg-background/75 p-5 text-sm leading-relaxed text-foreground/80"
              >
                {item}
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="space-y-5">
          <h2 className="text-3xl font-semibold text-primary sm:text-4xl">Ayn Darahim Atmosphere</h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="relative min-h-[260px] overflow-hidden rounded-card border border-accent/30 sm:min-h-[340px]">
              <Image
                src="/assets/Ayn_Darahim_snow.jpg"
                alt="Ayn Darahim village covered in winter snow"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-card border border-accent/30 sm:min-h-[340px]">
              <Image
                src="/assets/Douz.jpg"
                alt="Tunisian heritage architecture under a bright sky"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section className="rounded-container border border-primary/25 bg-primary p-7 text-background shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/75">
            Plan Your Escape
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            Ready for a Tailored Mountain Journey in Jandouba?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/85 sm:text-base">
            Let us design a personalized route through Ayn Darahim, with the right season,
            pace, and stays curated for a calm, premium nature retreat.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-background/40 bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
            >
              Request a Custom Journey
            </Link>
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-background/40 px-6 py-3 text-sm font-semibold text-background transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
            >
              Start Your Trip
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
