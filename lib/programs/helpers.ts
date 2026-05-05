import { DEFAULT_CATEGORIES, SELECTED_RAIL_SLUGS } from "@/lib/programs/constants";
import type { Program } from "@/lib/programs/types";

export const programDetailsHref = (program: Pick<Program, "slug">) => {
  return `/programs/${program.slug}`;
};

export const programPlanHref = (program: Pick<Program, "id" | "slug">) => {
  return `/plan-your-trip?program=${encodeURIComponent(program.slug || program.id)}`;
};

export function buildProgramCategories(programs: Program[]): string[] {
  const dynamic = programs
    .map((program) => program.category)
    .filter((category): category is string => Boolean(category));
  const combined = [...DEFAULT_CATEGORIES, ...dynamic];
  const unique = Array.from(new Set(combined));
  return ["All", ...unique];
}

export function filterProgramsByCategory(programs: Program[], category: string) {
  if (category === "All") return programs;
  return programs.filter((program) => program.category === category);
}

export function getFeaturedProgram(programs: Program[]) {
  return programs.find((program) => program.featured) ?? null;
}

export function splitProgramsForSections(programs: Program[]) {
  const featured = getFeaturedProgram(programs);
  const railPrograms = programs.filter(
    (program) =>
      SELECTED_RAIL_SLUGS.has(program.slug) &&
      (!featured || program.id !== featured.id),
  );
  const gridPrograms = programs.filter(
    (program) =>
      (!featured || program.id !== featured.id) &&
      !SELECTED_RAIL_SLUGS.has(program.slug),
  );

  return { featured, railPrograms, gridPrograms };
}
