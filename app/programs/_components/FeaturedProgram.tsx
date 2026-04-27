import Image from "next/image";
import Link from "next/link";
import SlideAnimation from "@/components/ui/slide_animation";
import { PROGRAMS_FALLBACK_IMAGE } from "@/lib/programs/constants";
import {
  getProgramMetaRows,
  programPlanHref,
} from "@/lib/programs/helpers";
import type { Program } from "@/lib/programs/types";

type Props = { program: Program };

export default function FeaturedProgram({ program }: Props) {
  const highlights = (program.highlights ?? []).slice(0, 4);

  return (
    <section aria-label="Featured program">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#2c2216]/10 shadow-[0_20px_60px_rgba(44,34,22,0.12)]">
        <div className="relative min-h-[390px] sm:min-h-[560px] lg:min-h-[620px]">
          <Image
            src={program.coverImage || PROGRAMS_FALLBACK_IMAGE}
            alt={program.title || "Featured program"}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c2216]/65 via-[#2c2216]/30 to-transparent" />
        </div>
        <div className="absolute inset-x-3 bottom-3 sm:inset-x-8 sm:bottom-8 lg:inset-x-auto lg:bottom-10 lg:right-10 lg:w-[min(54%,700px)]">
          <div className="rounded-3xl border border-white/35 bg-[#f8f7f0]/35 p-4 text-[#2c2216] shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8 lg:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
              Featured Program
            </p>
            <SlideAnimation from="right">
              <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#2c2216] sm:mt-3 sm:text-4xl">
                {program.title}
              </h2>
            </SlideAnimation>
            <p className="mt-3 text-sm leading-relaxed text-[#2c2216]/85 sm:mt-4 sm:text-base">
              {program.shortDescription ||
                "A signature itinerary for premium travel moments."}
            </p>

            {highlights.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/50 bg-white/60 px-3 py-1 text-xs text-[#2c2216]/90"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#2c2216]/90 sm:mt-6 sm:gap-4">
              {getProgramMetaRows(program).map((item) => (
                <p key={item.label}>
                  <span className="font-semibold text-[#2c2216]">{item.label}:</span>{" "}
                  {item.value}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              <Link
                href="/agadir"
                className="inline-flex rounded-full bg-[#2c2216] px-4 py-2.5 text-sm font-semibold text-[#e1e0d4] transition hover:bg-[#403122] sm:px-6 sm:py-3"
              >
                View Program
              </Link>
              <Link
                href={programPlanHref(program)}
                className="inline-flex rounded-full border border-[#2c2216]/25 bg-[#e1e0d4] px-4 py-2.5 text-sm font-semibold text-[#2c2216] transition hover:border-[#2c2216]/40 hover:bg-[#d9d7c9] sm:px-6 sm:py-3"
              >
                Plan Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
