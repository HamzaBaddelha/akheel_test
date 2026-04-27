import { PROGRAMS_SEED } from "@/lib/programs/constants";
import type { Program } from "@/lib/programs/types";

const byOrder = (a: Program, b: Program) =>
  (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);

export async function getPrograms(): Promise<Program[]> {
  return PROGRAMS_SEED.filter((program) => program.isActive !== false).sort(byOrder);
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const programs = await getPrograms();
  return programs.find((program) => program.slug === slug) ?? null;
}
