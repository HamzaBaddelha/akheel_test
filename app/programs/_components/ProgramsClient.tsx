"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import FeaturedProgram from "@/app/programs/_components/FeaturedProgram";
import ProgramsEmptyState from "@/app/programs/_components/ProgramsEmptyState";
import ProgramsFilters from "@/app/programs/_components/ProgramsFilters";
import ProgramsGrid from "@/app/programs/_components/ProgramsGrid";
import {
  buildProgramCategories,
  filterProgramsByCategory,
  splitProgramsForSections,
} from "@/lib/programs/helpers";
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

function MobileProgramsRail({ items }: { items: CarouselItem[] }) {
  return (
    <section aria-label="Featured programs rail" className="space-y-3 lg:hidden">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          Immersive Discovery
        </p>
        <h2 className="text-xl font-semibold text-[#2c2216] sm:text-2xl">
          Morocco Signature Journey
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
                View Program
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ProgramsClient({ programs }: Props) {
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
  const carouselItems = useMemo(
    () =>
      filtered
        .filter((program) => carouselProgramTitles.has(program.title))
        .map((program) => ({
          id: program.id,
          title: program.title,
          brand: program.category || "Program",
          description:
            program.shortDescription ||
            "A premium travel program designed for memorable moments.",
          tags: (program.highlights ?? []).slice(0, 4),
          imageUrl: program.coverImage || "/assets/hero.webp",
          link: "/agadir",
        })),
    [filtered],
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
          <MobileProgramsRail items={carouselItems} />
          <div className="relative left-1/2 hidden w-screen -translate-x-1/2 lg:block">
            <ThreeDProgramsPage
              items={carouselItems}
              title="Morocco Signature Journey"
              subtitle="Immersive Discovery"
            />
          </div>
        </>
      )}

      {featured && <FeaturedProgram program={featured} />}
      {gridPrograms.length > 0 && <ProgramsGrid programs={gridPrograms} />}
      {!hasPrograms && <ProgramsEmptyState />}
    </section>
  );
}
