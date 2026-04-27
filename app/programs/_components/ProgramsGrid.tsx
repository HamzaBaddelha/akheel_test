import ProgramCard from "@/app/programs/_components/ProgramCards";
import type { Program } from "@/lib/programs/types";

type Props = { programs: Program[] };

export default function ProgramsGrid({ programs }: Props) {
  return (
    <section id="programs-grid" aria-label="All programs">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </section>
  );
}
