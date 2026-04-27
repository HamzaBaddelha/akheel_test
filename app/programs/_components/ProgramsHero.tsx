"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import SlideAnimation from "@/components/ui/slide_animation";

export default function ProgramsHero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-[1.5rem] border border-[#2c2216]/10 bg-[#f2f0e8] px-5 py-10 shadow-[0_30px_80px_rgba(44,34,22,0.08)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-[#b0b8c9]/35 blur-3xl sm:-right-20 sm:h-52 sm:w-52" />
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#999570]/20 blur-3xl" />
      </div>
      <div className="relative max-w-3xl min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          Programs
        </p>
        <SlideAnimation from="left">
          <h1 className="mt-3 text-3xl font-semibold leading-[1.12] text-[#2c2216] sm:mt-4 sm:text-5xl sm:leading-tight lg:text-6xl">
            {t("programs.heroTitle")}
          </h1>
        </SlideAnimation>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2c2216]/75 sm:mt-6 sm:text-lg">
          Discover elegant, handcrafted programs across coast, city, desert, and
          mountains. Every itinerary blends comfort, authenticity, and refined
          detail.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
          <a
            href="#programs-grid"
            className="rounded-full bg-[#2c2216] px-5 py-2.5 text-sm font-semibold text-[#e1e0d4] transition hover:bg-[#403122] sm:px-6 sm:py-3"
          >
            Explore Programs
          </a>
          <Link
            href="/plan-your-trip"
            className="rounded-full border border-[#2c2216]/25 bg-[#e1e0d4] px-5 py-2.5 text-sm font-semibold text-[#2c2216] transition hover:border-[#2c2216]/40 hover:bg-[#d9d7c9] sm:px-6 sm:py-3"
          >
            Plan Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
