"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ProgramsHero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[220px] w-screen sm:h-[280px] md:h-[340px] lg:h-[390px]">
        <Image
          src="/assets/optimized-programs-hero.webp"
          alt={t("programsPage.hero.slides.parcPerdicarisAlt")}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2c2216]/55 via-[#2c2216]/20 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 rounded-[1.5rem] border border-[#2c2216]/10 bg-[#f2f0e8] p-6 shadow-[0_30px_80px_rgba(44,34,22,0.08)] sm:-mt-14 sm:rounded-[2rem] sm:p-10 lg:p-12">
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
            {t("programsPage.hero.tag")}
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-[1.12] text-[#2c2216] sm:mt-4 sm:text-5xl sm:leading-tight lg:text-6xl">
            {t("programsPage.hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2c2216]/75 sm:mt-6 sm:text-lg">
            {t("programsPage.hero.subtitle")}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#2c2216]/70 sm:text-base">
            {t("programsPage.hero.description")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#programs-grid"
              className="rounded-full bg-[#2c2216] px-5 py-2.5 text-sm font-semibold text-[#e1e0d4] transition hover:bg-[#403122] sm:px-6 sm:py-3"
            >
              {t("programsPage.hero.exploreCta")}
            </a>
            <Link
              href="/plan-your-trip"
              className="rounded-full border border-[#2c2216]/25 bg-[#e1e0d4] px-5 py-2.5 text-sm font-semibold text-[#2c2216] transition hover:border-[#2c2216]/40 hover:bg-[#d9d7c9] sm:px-6 sm:py-3"
            >
              {t("programsPage.hero.planCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
