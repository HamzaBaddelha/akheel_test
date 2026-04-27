"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useI18n } from "@/components/i18n/I18nProvider";
import { ScrollTimeline } from "@/components/ui/scrolltime";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import { getAgadirTours } from "@/lib/trips/agadir";

export default function AgadirPage() {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const agadirTours = useMemo(() => getAgadirTours(t), [t]);

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        {/* Hero */}
        <section className="relative flex min-h-[62vh] items-center overflow-hidden" aria-label={t("agadir.heroAria")}>
          <Image
            src="https://images.unsplash.com/photo-1553603227-2358aabe821e?w=1920&q=80"
            alt={t("agadir.heroImageAlt")}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/55" />
          <Container className="relative z-10 py-24 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-secondary sm:mb-4 sm:text-sm"
              >
                {t("agadir.heroBadge")}
              </motion.p>
              <motion.h1
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-serif text-4xl font-bold leading-tight text-[#e1e0d4] sm:text-6xl lg:text-7xl"
              >
                {t("agadir.heroTitle")}
              </motion.h1>
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.55 }}
                className="mx-auto mt-4 max-w-xl text-base text-[#e1e0d4] sm:mt-5 sm:text-lg"
              >
                {t("agadir.heroSubtitle")}
              </motion.p>
            </div>
          </Container>
        </section>

        {/* Explore Agadir — Scroll Timeline */}
        <section aria-label={t("agadir.timelineAria")}>
          <ScrollTimeline
            events={agadirTours}
            title="Morocco Tours Agadir"
            subtitle="Where the Sahara meets the Atlantic — golden beaches, vibrant souks, and the gateway to southern Morocco's hidden treasures."
            titleClassName="text-[#e1e0d4]"
            subtitleClassName="text-[#e1e0d4]"
            cardAlignment="alternating"
            cardVariant="elevated"
            cardEffect="shadow"
            animationOrder="staggered"
            lineColor="bg-secondary/30"
            activeColor="bg-secondary"
            dateFormat="badge"
            parallaxIntensity={prefersReducedMotion ? 0 : 0.06}
            progressLineWidth={3}
            revealAnimation={prefersReducedMotion ? "fade" : "slide"}
          />
        </section>

        {/* CTA banner */}
        <section className="bg-secondary py-16" aria-label={t("agadir.ctaAria")}>
          <Container>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                  {t("agadir.ctaTitle")}
                </h2>
                <p className="mt-2 text-primary/70">
                  {t("agadir.ctaSubtitle")}
                </p>
              </div>
              <Button variant="secondary" pill size="lg">
                {t("agadir.ctaButton")}
              </Button>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
