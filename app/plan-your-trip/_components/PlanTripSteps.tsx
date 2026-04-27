"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import { processSteps } from "../_data/marketingContent";

export default function PlanTripSteps() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-accent/45 bg-background/35 p-6 shadow-sm backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,184,201,0.32),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(225,224,212,0.16),rgba(44,22,34,0.06))]" />
      <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t("planTrip.steps.title")}</h2>
      <ol className="relative mt-6 grid gap-4 sm:grid-cols-3">
        {processSteps.map((step, index) => (
          <li
            key={step.titleKey}
            className="group overflow-hidden rounded-2xl border border-background/35 bg-background/25 shadow-[0_12px_40px_rgba(44,22,34,0.12)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative h-40 overflow-hidden sm:h-44">
              <Image
                src={step.image}
                alt={t(step.titleKey)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent" />
              <div className="absolute right-4 top-4 rounded-full border border-background/45 bg-background/20 px-3 py-1 text-xs font-semibold text-background backdrop-blur-xl">
                {t("planTrip.steps.stepBadge", { number: index + 1 })}
              </div>
            </div>
            <div className="bg-background/20 p-5 backdrop-blur-lg">
              <h3 className="text-lg font-semibold text-primary">{t(step.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{t(step.descriptionKey)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
