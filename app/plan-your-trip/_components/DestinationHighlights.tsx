"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import { destinationHighlights } from "../_data/marketingContent";

export default function DestinationHighlights() {
  const { t } = useI18n();

  return (
    <section className="rounded-3xl border border-accent/40 bg-card/80 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t("planTrip.destinations.title")}</h2>
      <p className="mt-2 text-sm text-foreground/80 sm:text-base">
        {t("planTrip.destinations.subtitle")}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {destinationHighlights.map((destination) => (
          <article
            key={destination.nameKey}
            className="overflow-hidden rounded-2xl border border-accent/35 bg-background/65"
          >
            <div className="relative h-48">
              <Image
                src={destination.image}
                alt={t(destination.nameKey)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-primary">{t(destination.nameKey)}</h3>
              <p className="mt-1 text-sm text-foreground/80">{t(destination.noteKey)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
