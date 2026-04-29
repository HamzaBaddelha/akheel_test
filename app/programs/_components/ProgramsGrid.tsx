"use client";

import ProgramCard from "@/app/programs/_components/ProgramCards";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Program } from "@/lib/programs/types";

type Props = { programs: Program[] };

export default function ProgramsGrid({ programs }: Props) {
  const { t } = useI18n();

  return (
    <section id="programs-grid" aria-label={t("programsPage.grid.aria")}>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </section>
  );
}
