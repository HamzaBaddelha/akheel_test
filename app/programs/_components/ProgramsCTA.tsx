"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import SlideAnimation from "@/components/ui/slide_animation";

export default function ProgramsCTA() {
  const { t } = useI18n();

  return (
    <section className="rounded-[1.5rem] border border-[#2c2216]/15 bg-[#2c2216] px-5 py-10 text-[#e1e0d4] shadow-[0_20px_60px_rgba(44,34,22,0.2)] sm:rounded-[2rem] sm:px-10 sm:py-12">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b0b8c9]">
          {t("programsPage.cta.tag")}
        </p>
        <SlideAnimation from="left">
          <h2 className="mt-3 text-2xl font-semibold sm:mt-4 sm:text-4xl">
            {t("programsPage.cta.title")}
          </h2>
        </SlideAnimation>
        <p className="mt-4 text-sm leading-relaxed text-[#e1e0d4]/80 sm:text-base">
          {t("programsPage.cta.description")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 sm:mt-7 sm:gap-4">
          <Link
            href="/discover"
            className="rounded-full bg-[#e1e0d4] px-5 py-2.5 text-sm font-semibold text-[#2c2216] transition hover:bg-[#f3f1e7] sm:px-6 sm:py-3"
          >
            {t("programsPage.cta.primaryButton")}
          </Link>
          <Link
            href="/plan-your-trip"
            className="rounded-full border border-[#e1e0d4]/40 px-5 py-2.5 text-sm font-semibold text-[#e1e0d4] transition hover:border-[#b0b8c9] hover:text-[#b0b8c9] sm:px-6 sm:py-3"
          >
            {t("programsPage.cta.secondaryButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
