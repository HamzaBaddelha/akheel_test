"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

type PlanTripSuccessProps = {
  onReset: () => void;
};

export default function PlanTripSuccess({ onReset }: PlanTripSuccessProps) {
  const { t } = useI18n();

  return (
    <div className="rounded-2xl border border-secondary/45 bg-background/70 p-8 text-center">
      <p className="text-2xl font-bold text-primary">{t("planTrip.form.success.title")} ✅</p>
      <p className="mt-3 text-base text-foreground/80">{t("planTrip.form.success.subtitle")}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
      >
        {t("planTrip.form.success.reset")}
      </button>
    </div>
  );
}
