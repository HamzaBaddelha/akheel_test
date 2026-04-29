"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import { PROGRAMS_FALLBACK_IMAGE } from "@/lib/programs/constants";
import type { Program } from "@/lib/programs/types";

type Props = { program: Program };

export default function ProgramCard({ program }: Props) {
  const { t } = useI18n();
  const highlights = program.highlights?.slice(0, 3) ?? [];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#2c2216]/10 bg-[#f4f2ea] shadow-[0_12px_32px_rgba(44,34,22,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(44,34,22,0.12)]">
      <div className="relative h-48 overflow-hidden sm:h-56">
        <Image
          src={program.coverImage || PROGRAMS_FALLBACK_IMAGE}
          alt={program.title || t("programsPage.common.travelProgram")}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {program.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#2c2216]/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#e1e0d4]">
            {program.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          {program.category || t("programsPage.common.experience")}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-[#2c2216] sm:text-2xl">
          {program.title || t("programsPage.common.program")}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#2c2216]/75">
          {program.shortDescription ||
            t("programsPage.common.premiumFallback")}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[#2c2216]/80">
          <p>
            <span className="font-semibold text-[#2c2216]">{t("programsPage.common.destinationLabel")}:</span>{" "}
            {program.destination || t("programsPage.common.custom")}
          </p>
          <p>
            <span className="font-semibold text-[#2c2216]">{t("programsPage.common.durationLabel")}:</span>{" "}
            {program.duration || t("programsPage.common.flexible")}
          </p>
          <p className="col-span-2">
            <span className="font-semibold text-[#2c2216]">{t("programsPage.common.priceLabel")}:</span>{" "}
            {program.priceFrom
              ? t("programsPage.common.fromPrice", { price: program.priceFrom })
              : t("programsPage.common.tailoredPricing")}
          </p>
        </div>

        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-[#2c2216]/80">
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
            href="/agadir"
            aria-label={`${t("programsPage.common.view")} ${program.title || t("programsPage.common.program")}`}
            className="inline-flex items-center rounded-full bg-[#2c2216] px-4 py-2 text-sm font-semibold text-[#e1e0d4] transition hover:bg-[#403122]"
          >
            {t("programsPage.common.viewProgram")}
          </Link>
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center rounded-full border border-[#2c2216]/20 bg-[#e1e0d4] px-4 py-2 text-sm font-semibold text-[#2c2216] transition hover:border-[#2c2216]/40 hover:bg-[#d8d6c7]"
          >
            {t("programsPage.common.planTrip")}
          </Link>
        </div>
      </div>
    </article>
  );
}
