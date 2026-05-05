"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import ProgramsEmptyState from "@/app/programs/_components/ProgramsEmptyState";
import ProgramsFilters from "@/app/programs/_components/ProgramsFilters";
import ProgramsGrid from "@/app/programs/_components/ProgramsGrid";
import {
  buildProgramCategories,
  filterProgramsByCategory,
} from "@/lib/programs/helpers";
import { localizeProgram } from "@/lib/programs/localization";
import type { Program } from "@/lib/programs/types";

type Props = { programs: Program[] };

export default function ProgramsClient({ programs }: Props) {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => buildProgramCategories(programs), [programs]);
  const filteredPrograms = useMemo(
    () => filterProgramsByCategory(programs, activeCategory),
    [programs, activeCategory],
  );
  const localizedPrograms = useMemo(
    () => filteredPrograms.map((program) => localizeProgram(program, t)),
    [filteredPrograms, t],
  );
  const dayPrograms = localizedPrograms.filter((program) => !program.isMultiDay);
  const multiDayPrograms = localizedPrograms.filter((program) => program.isMultiDay);
  const hasPrograms = localizedPrograms.length > 0;

  return (
    <section className="space-y-12 sm:space-y-20">
      <ProgramsFilters
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      {dayPrograms.length > 0 && (
        <ProgramsGrid
          id="programs-grid"
          title={t("programsPage.sections.dayExperiences")}
          programs={dayPrograms}
          variant="day"
        />
      )}
      {multiDayPrograms.length > 0 && (
        <ProgramsGrid
          id="programs-journeys"
          title={t("programsPage.sections.multiDayJourneys")}
          programs={multiDayPrograms}
          variant="multiDay"
        />
      )}
      {!hasPrograms && <ProgramsEmptyState />}
    </section>
  );
}
