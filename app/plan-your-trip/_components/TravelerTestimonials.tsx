"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import { testimonials } from "../_data/marketingContent";

function StarRow() {
  return (
    <div className="flex gap-1 text-secondary" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TravelerTestimonials() {
  const { t } = useI18n();

  return (
    <section className="rounded-3xl border border-accent/40 bg-card p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t("planTrip.testimonials.title")}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.nameKey} className="rounded-2xl border border-accent/35 bg-background/60 p-5">
            <StarRow />
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">{t(item.quoteKey)}</p>
            <p className="mt-4 font-semibold text-primary">{t(item.nameKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
