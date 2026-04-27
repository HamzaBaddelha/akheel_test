"use client";

import { useRef } from "react";
import RailProgramCard from "@/app/programs/_components/RailProgramCard";
import type { Program } from "@/lib/programs/types";

type Props = { programs: Program[] };

export default function SelectedExperiencesRail({ programs }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (!railRef.current) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    railRef.current.scrollBy({ left: event.deltaY, behavior: "smooth" });
  };

  return (
    <section
      className="rounded-[2rem] border border-[#2c2216]/20 bg-[#11100d] px-5 py-10 text-[#e1e0d4] shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:px-8 lg:px-10"
      aria-label="Selected experiences"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b0b8c9]">
          Selected Experiences
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#f3f2ea] sm:text-4xl">
          City, Wellness & Coastal Escapes
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#e1e0d4]/75 sm:text-base">
          Handpicked programs presented in a premium rail for quick exploration.
        </p>
      </div>

      <div
        ref={railRef}
        onWheel={handleWheel}
        className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-6 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 lg:gap-6"
      >
        {programs.map((program) => (
          <RailProgramCard key={program.id} program={program} />
        ))}
      </div>
    </section>
  );
}
