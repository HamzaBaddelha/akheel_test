import Image from "next/image";
import Link from "next/link";
import { PROGRAMS_FALLBACK_IMAGE } from "@/lib/programs/constants";
import { programDetailsHref } from "@/lib/programs/helpers";
import type { Program } from "@/lib/programs/types";

type Props = { program: Program };

export default function RailProgramCard({ program }: Props) {
  return (
    <article className="group relative h-[360px] w-[84vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-white/15 bg-black shadow-[0_14px_40px_rgba(0,0,0,0.4)] sm:h-[420px] sm:w-[340px] sm:max-w-none lg:h-[500px] lg:w-[420px] lg:rounded-[2rem]">
      <Image
        src={program.coverImage || PROGRAMS_FALLBACK_IMAGE}
        alt={program.title || "Travel program"}
        fill
        sizes="(max-width: 640px) 84vw, (max-width: 1024px) 340px, 420px"
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-3.5 text-white shadow-[0_10px_34px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            {program.destination || program.category || "Experience"}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">
            {program.title || "Program"}
          </h3>
          {program.shortDescription && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">
              {program.shortDescription}
            </p>
          )}
          <Link
            href={programDetailsHref(program)}
            className="mt-4 inline-flex text-sm font-semibold text-[#e1e0d4] underline decoration-white/50 underline-offset-4 transition hover:text-white"
            aria-label={`View ${program.title || "program"}`}
          >
            View Program
          </Link>
        </div>
      </div>
    </article>
  );
}
