"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { PROGRAMS_FALLBACK_IMAGE } from "@/lib/programs/constants";
import type { Program } from "@/lib/programs/types";

type Props = {
  program: Program;
  variant?: "day" | "multiDay";
};

export default function ProgramCard({ program, variant = "day" }: Props) {
  const { t } = useI18n();
  const highlights = program.highlights?.slice(0, variant === "multiDay" ? 5 : 3) ?? [];
  const places = program.places?.slice(0, variant === "multiDay" ? 5 : 4) ?? [];
  const galleryImages = useMemo(() => {
    const images = program.gallery?.filter(Boolean) ?? [];
    const baseImage = program.coverImage || PROGRAMS_FALLBACK_IMAGE;
    return images.length > 0 ? images : [baseImage];
  }, [program.coverImage, program.gallery]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#2C1622]/10 bg-[#E1E0D4] shadow-[0_12px_32px_rgba(44,22,34,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(44,22,34,0.12)]">
      <div className={`relative overflow-hidden ${variant === "multiDay" ? "h-56 sm:h-64" : "h-48 sm:h-56"}`}>
        <Image
          src={galleryImages[activeImageIndex]}
          alt={program.title || t("programsPage.common.travelProgram")}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              aria-label={`Previous image for ${program.title}`}
              onClick={goToPreviousImage}
              className="absolute left-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#2C1622]/70 text-sm font-semibold text-[#E1E0D4] transition hover:bg-[#2C1622]"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={`Next image for ${program.title}`}
              onClick={goToNextImage}
              className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#2C1622]/70 text-sm font-semibold text-[#E1E0D4] transition hover:bg-[#2C1622]"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#2C1622]/45 px-2 py-1">
              {galleryImages.map((imageSrc, imageIndex) => (
                <button
                  key={imageSrc}
                  type="button"
                  aria-label={`Go to image ${imageIndex + 1} for ${program.title}`}
                  onClick={() => setActiveImageIndex(imageIndex)}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    imageIndex === activeImageIndex ? "bg-[#E1E0D4]" : "bg-[#E1E0D4]/45"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        {program.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#2C1622]/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#E1E0D4]">
            {program.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          {program.category || t("programsPage.common.experience")}
        </p>
        <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#2C1622]">
          {program.title || t("programsPage.common.program")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#2C1622]/80">
          {program.shortDescription || t("programsPage.common.premiumFallback")}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#2C1622]/85">
          <p>
            <span className="font-semibold text-[#2C1622]">{t("programsPage.common.destinationLabel")}:</span>{" "}
            {program.destination || t("programsPage.common.custom")}
          </p>
          <p>
            <span className="font-semibold text-[#2C1622]">{t("programsPage.common.durationLabel")}:</span>{" "}
            {program.duration || t("programsPage.common.flexible")}
          </p>
        </div>

        {places.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {places.map((place) => (
              <span
                key={place}
                className="rounded-full border border-[#2C1622]/15 bg-[#F3F2E9] px-2.5 py-1 text-xs text-[#2C1622]/85"
              >
                {place}
              </span>
            ))}
          </div>
        )}

        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-[#2C1622]/80">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#999570]" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/programs/${program.slug}`}
            aria-label={`${t("programsPage.common.view")} ${program.title || t("programsPage.common.program")}`}
            className="inline-flex items-center rounded-full bg-[#2C1622] px-4 py-2 text-sm font-semibold text-[#E1E0D4] transition hover:bg-[#3B1F2E]"
          >
            {t("programsPage.common.viewProgram")}
          </Link>
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center rounded-full border border-[#2C1622]/25 bg-transparent px-4 py-2 text-sm font-semibold text-[#2C1622] transition hover:border-[#2C1622]/45 hover:bg-[#E1E0D4]"
          >
            {t("programsPage.common.planTrip")}
          </Link>
        </div>
      </div>
    </article>
  );
}
