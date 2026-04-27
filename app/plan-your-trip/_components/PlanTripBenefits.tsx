"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { premiumBenefits } from "../_data/marketingContent";

export default function PlanTripBenefits() {
  const { t } = useI18n();

  return (
    <section className="rounded-3xl border border-accent/40 bg-card/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
      <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t("planTrip.benefits.title")}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {premiumBenefits.map((benefit) => (
          <article key={benefit} className="rounded-2xl border border-accent/35 bg-background/65 p-5">
            <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">{t(benefit)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
