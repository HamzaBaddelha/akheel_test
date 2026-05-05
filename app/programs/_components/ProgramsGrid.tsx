"use client";

import ProgramCard from "@/app/programs/_components/ProgramCards";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Program } from "@/lib/programs/types";

type Props = {
  id: string;
  title: string;
  programs: Program[];
  variant?: "day" | "multiDay";
};

export default function ProgramsGrid({ id, title, programs, variant = "day" }: Props) {
  const { t } = useI18n();
  const gridClass =
    variant === "multiDay"
      ? "grid grid-cols-1 gap-6 md:grid-cols-2"
      : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id={id} aria-label={t("programsPage.grid.aria")} className="space-y-6">
      <h2 className="font-serif text-2xl font-semibold text-[#2C1622] sm:text-3xl">{title}</h2>
      <div className={gridClass}>
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} variant={variant} />
        ))}
      </div>
    </section>
  );
}
