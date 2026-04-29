"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import FeaturedProgram from "@/app/programs/_components/FeaturedProgram";
import ProgramsEmptyState from "@/app/programs/_components/ProgramsEmptyState";
import ProgramsFilters from "@/app/programs/_components/ProgramsFilters";
import ProgramsGrid from "@/app/programs/_components/ProgramsGrid";
import {
  buildProgramCategories,
  filterProgramsByCategory,
  splitProgramsForSections,
} from "@/lib/programs/helpers";
import { localizeProgram } from "@/lib/programs/localization";
import type { Program } from "@/lib/programs/types";

type Props = { programs: Program[] };

type CarouselItem = {
  id: string;
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
};

const ThreeDProgramsPage = dynamic(() => import("@/components/ui/3d_programs_page"), {
  ssr: false,
  loading: () => (
    <section
      aria-label="Featured programs carousel loading"
      className="hidden animate-pulse overflow-hidden rounded-[2rem] border border-[#2c2216]/10 bg-[#f4f2ea] lg:block"
    >
      <div className="h-[26rem] bg-gradient-to-br from-[#f4f2ea] to-[#e7e3d6]" />
    </section>
  ),
});

const carouselProgramTitles = new Set([
  "Surf Experience",
  "Quad Sand Adventure",
  "Essaouira Day Trip",
  "Jeep Safari Desert Adventure",
  "Tafraoute & Anti-Atlas Mountains",
  "Berber Village Cooking Experience",
]);

function MobileProgramsRail({
  items,
  t,
}: {
  items: CarouselItem[];
  t: (key: string) => string;
}) {
  return (
    <section aria-label={t("programsPage.carousel.mobileAria")} className="space-y-3 lg:hidden">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          {t("programsPage.carousel.subtitle")}
        </p>
        <h2 className="text-xl font-semibold text-[#2c2216] sm:text-2xl">
          {t("programsPage.carousel.title")}
        </h2>
      </div>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <article
            key={item.id}
            className="w-[79vw] max-w-[17rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#2c2216]/10 bg-[#f4f2ea] shadow-[0_10px_30px_rgba(44,34,22,0.08)]"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 79vw, 17rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c2216]/55 via-[#2c2216]/15 to-transparent" />
              <p className="absolute left-3 top-3 rounded-full bg-[#2c2216]/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e1e0d4]">
                {item.brand}
              </p>
            </div>
            <div className="space-y-2 p-4">
              <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-[#2c2216]">
                {item.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-[#2c2216]/75">
                {item.description}
              </p>
              <Link
                href={item.link}
                className="inline-flex text-sm font-semibold text-[#2c2216] underline decoration-[#2c2216]/40 underline-offset-4"
              >
                {t("programsPage.common.viewProgram")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ProgramsClient({ programs }: Props) {
  const { isRTL, t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => buildProgramCategories(programs), [programs]);
  const filtered = useMemo(
    () => filterProgramsByCategory(programs, activeCategory),
    [programs, activeCategory],
  );
  const { featured, gridPrograms } = useMemo(
    () => splitProgramsForSections(filtered),
    [filtered],
  );
  const localizedFeatured = useMemo(
    () => (featured ? localizeProgram(featured, t) : null),
    [featured, t],
  );
  const localizedGridPrograms = useMemo(
    () => gridPrograms.map((program) => localizeProgram(program, t)),
    [gridPrograms, t],
  );
  const carouselItems = useMemo(
    () =>
      filtered
        .filter((program) => carouselProgramTitles.has(program.title))
        .map((program) => {
          const localizedProgram = localizeProgram(program, t);
          return {
          id: program.id,
          title: localizedProgram.title,
          brand: localizedProgram.category || t("programsPage.common.program"),
          description:
            localizedProgram.shortDescription ||
            t("programsPage.common.premiumFallback"),
          tags: (localizedProgram.highlights ?? []).slice(0, 4),
          imageUrl: program.coverImage || "/assets/hero.webp",
          link: "/agadir",
        };
        }),
    [filtered, t],
  );

  const hasPrograms = Boolean(featured || carouselItems.length || gridPrograms.length);

  return (
    <section className="space-y-12 sm:space-y-20">
      <ProgramsFilters
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      {carouselItems.length > 0 && (
        <>
          <MobileProgramsRail items={carouselItems} t={t} />
          <div className="hidden w-full lg:block">
            <ThreeDProgramsPage
              items={carouselItems}
              title={t("programsPage.carousel.title")}
              subtitle={t("programsPage.carousel.subtitle")}
              isRTL={isRTL}
              learnMoreLabel={t("programsPage.common.learnMore")}
              previousLabel={t("programsPage.common.previous")}
              nextLabel={t("programsPage.common.next")}
              goToItemLabel={t("programsPage.common.goToItem")}
            />
          </div>
        </>
      )}

      {localizedFeatured && <FeaturedProgram program={localizedFeatured} />}
      {localizedGridPrograms.length > 0 && <ProgramsGrid programs={localizedGridPrograms} />}
      {!hasPrograms && <ProgramsEmptyState />}
    </section>
  );
}
