"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import Container from "@/components/ui/Container";

export default function PlanTripHero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/hero.jpg"
          alt={t("planTrip.hero.imageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,224,212,0.2),transparent_48%)]" />
      </div>

      <Container className="relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary sm:text-sm">{t("planTrip.hero.tag")}</p>
          <h1 className="mt-4 text-balance font-serif text-4xl font-bold leading-tight text-background sm:text-5xl lg:text-6xl">
            {t("planTrip.hero.title")}
          </h1>
          <p className="mt-5 text-lg font-medium text-background/90 sm:text-xl">
            {t("planTrip.hero.subtitle")}
          </p>
          <p className="mt-3 text-base text-background/80 sm:text-lg">{t("planTrip.hero.arabicLine")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#trip-form"
              className="inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:bg-card sm:text-base"
            >
              {t("planTrip.hero.ctaPrimary")}
            </a>
            <a
              href="#trip-form"
              className="inline-flex items-center justify-center rounded-full border border-background/60 px-6 py-3 text-sm font-semibold text-background transition hover:bg-background/10 sm:text-base"
            >
              {t("planTrip.hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
