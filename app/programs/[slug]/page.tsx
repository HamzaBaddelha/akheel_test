import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";
import {
  PROGRAMS_BG_COLOR,
  PROGRAMS_FALLBACK_IMAGE,
  PROGRAMS_PRIMARY_COLOR,
} from "@/lib/programs/constants";
import { getProgramBySlug, getPrograms } from "@/lib/programs/getPrograms";
import { programPlanHref } from "@/lib/programs/helpers";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program Not Found" };

  return {
    title: `${program.title} | Programs`,
    description:
      program.shortDescription ||
      "Discover this premium Moroccan program and tailor it to your journey.",
  };
}

export default async function ProgramDetailsPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  return (
    <>
      <Header fixedBgColor={PROGRAMS_PRIMARY_COLOR} />
      <main className="pb-20 pt-24 text-[#2c2216]" style={{ background: PROGRAMS_BG_COLOR }}>
        <Container className="space-y-10 sm:space-y-12">
          <section className="relative overflow-hidden rounded-[2rem] border border-[#2c2216]/10 shadow-[0_20px_60px_rgba(44,34,22,0.12)]">
            <div className="relative min-h-[420px] sm:min-h-[500px]">
              <Image
                src={program.coverImage || PROGRAMS_FALLBACK_IMAGE}
                alt={program.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c2216]/65 via-[#2c2216]/30 to-transparent" />
            </div>
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8">
              <div className="rounded-3xl border border-white/35 bg-[#f8f7f0]/35 p-6 text-[#2c2216] shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
                  {program.category || "Program"}
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                  {program.title}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#2c2216]/85 sm:text-base">
                  {program.shortDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#2c2216]/90">
                  <p>
                    <span className="font-semibold text-[#2c2216]">Destination:</span>{" "}
                    {program.destination || "Custom"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#2c2216]">Duration:</span>{" "}
                    {program.duration || "Flexible"}
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={programPlanHref(program)}
                    className="inline-flex rounded-full bg-[#2c2216] px-6 py-3 text-sm font-semibold text-[#e1e0d4] transition hover:bg-[#403122]"
                  >
                    Plan This Program
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex rounded-full border border-[#2c2216]/25 bg-[#e1e0d4] px-6 py-3 text-sm font-semibold text-[#2c2216] transition hover:border-[#2c2216]/40 hover:bg-[#d9d7c9]"
                  >
                    Back to Programs
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {(program.highlights?.length || program.places?.length) && (
            <section className="grid gap-6 md:grid-cols-2">
              {program.highlights?.length ? (
                <article className="rounded-3xl border border-[#2c2216]/10 bg-[#f4f2ea] p-6">
                  <h2 className="text-xl font-semibold text-[#2c2216]">Highlights</h2>
                  <ul className="mt-4 space-y-2 text-sm text-[#2c2216]/80">
                    {program.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#999570]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </article>
              ) : null}

              {program.places?.length ? (
                <article className="rounded-3xl border border-[#2c2216]/10 bg-[#f4f2ea] p-6">
                  <h2 className="text-xl font-semibold text-[#2c2216]">Places Included</h2>
                  <ul className="mt-4 space-y-2 text-sm text-[#2c2216]/80">
                    {program.places.map((place) => (
                      <li key={place} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#999570]" />
                        {place}
                      </li>
                    ))}
                  </ul>
                </article>
              ) : null}
            </section>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
