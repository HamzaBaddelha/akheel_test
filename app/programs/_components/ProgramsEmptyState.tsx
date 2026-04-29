"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

export default function ProgramsEmptyState() {
  const { t } = useI18n();

  return (
    <section id="programs-grid" aria-label={t("programsPage.grid.aria")}>
      <div className="rounded-3xl border border-dashed border-[#2c2216]/30 bg-[#f4f2ea] px-6 py-14 text-center">
        <h3 className="text-2xl font-semibold text-[#2c2216]">
          {t("programsPage.empty.title")}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#2c2216]/75 sm:text-base">
          {t("programsPage.empty.description")}
        </p>
      </div>
    </section>
  );
}
