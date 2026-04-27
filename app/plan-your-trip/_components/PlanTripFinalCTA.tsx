"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

export default function PlanTripFinalCTA() {
  const { t } = useI18n();

  return (
    <section className="rounded-3xl border border-secondary/35 bg-primary px-6 py-10 text-center sm:px-8">
      <p className="mx-auto max-w-3xl text-balance text-xl font-semibold text-white sm:text-2xl">
        {t("planTrip.finalCta.line")}
      </p>
    </section>
  );
}
