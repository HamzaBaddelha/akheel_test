"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { processSteps } from "../_data/marketingContent";

export default function PlanTripSteps() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-accent/45 bg-background/35 p-6 shadow-sm backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,184,201,0.32),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(225,224,212,0.16),rgba(44,22,34,0.06))]" />
      <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t("planTrip.steps.title")}</h2>
      <ol className="relative mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {processSteps.map((step, index) => (
          <li
            key={step.titleKey}
            className="group relative flex h-full min-h-[250px] flex-col justify-end rounded-2xl border border-background/45 bg-background/30 p-5 text-center shadow-[0_10px_32px_rgba(44,22,34,0.1)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:min-h-[280px]"
          >
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center text-[7rem] font-black leading-none tracking-tight sm:text-[8rem] md:text-[9rem]"
              style={{ color: "#A6A1A1", textShadow: "0 1px 0 rgba(255,255,255,0.4), 0 14px 30px rgba(44,22,34,0.25)" }}
              aria-label={t("planTrip.steps.stepBadge", { number: index + 1 })}
            >
              {index + 1}
            </div>
            <h3 className="relative z-10 text-lg font-semibold leading-snug text-primary">{t(step.titleKey)}</h3>
            <p className="relative z-10 mt-2 text-sm leading-relaxed text-foreground/80">{t(step.descriptionKey)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
