"use client";

import Container from "@/components/ui/Container";
import { useI18n } from "@/components/i18n/I18nProvider";
import Image from "next/image";
import Link from "next/link";

const sectionIds = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;
const itemIds = ["1", "2", "3", "4"] as const;

export default function ArticleContent() {
  const { t } = useI18n();

  const sections = sectionIds.map((id) => ({
    title: t(`blogArticlePersonal.sections.${id}.title`),
    body: t(`blogArticlePersonal.sections.${id}.body`),
  }));

  const keyTakeaways = itemIds.map((id) =>
    t(`blogArticlePersonal.keyTakeaways.${id}`),
  );
  const quickNotes = itemIds.map((id) => t(`blogArticlePersonal.quickNotes.${id}`));
  const relatedDestinations = itemIds.map((id) =>
    t(`blogArticlePersonal.relatedDestinations.${id}`),
  );

  return (
    <main className="pb-16 pt-20 sm:pt-24">
      <Container className="space-y-10 sm:space-y-14">
        <section className="rounded-container border border-accent/35 bg-card p-6 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            {t("blogArticlePersonal.meta.category")}
          </p>
          <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
            {t("blogArticlePersonal.meta.title")}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/75 sm:text-lg">
            {t("blogArticlePersonal.meta.subtitle")}
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.12em] text-foreground/65 sm:text-sm">
            {t("blogArticlePersonal.meta.date")} ·{" "}
            {t("blogArticlePersonal.meta.readTime")}
          </p>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card border border-accent/35">
            <Image
              src="/assets/baloon1.jpg"
              alt={t("blogArticlePersonal.meta.imageAlt")}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-10">
          <article className="space-y-8 rounded-container border border-accent/30 bg-card/75 p-6 sm:p-8 lg:p-10">
            {sections.slice(0, 3).map((section, index) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  {section.body}
                </p>
              </section>
            ))}

            <blockquote className="rounded-card border border-secondary/30 bg-background/70 p-5 text-lg leading-relaxed text-primary sm:p-6">
              &quot;{t("blogArticlePersonal.quote")}&quot;
            </blockquote>

            {sections.slice(3).map((section, index) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
                  {index + 4}. {section.title}
                </h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  {section.body}
                </p>
              </section>
            ))}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-card border border-accent/35 bg-card p-5">
              <h3 className="text-lg font-semibold text-primary">
                {t("blogArticlePersonal.sidebars.keyTakeawaysTitle")}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
                {keyTakeaways.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-card border border-accent/35 bg-card p-5">
              <h3 className="text-lg font-semibold text-primary">
                {t("blogArticlePersonal.sidebars.quickNotesTitle")}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
                {quickNotes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-card border border-accent/35 bg-card p-5">
              <h3 className="text-lg font-semibold text-primary">
                {t("blogArticlePersonal.sidebars.relatedDestinationsTitle")}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedDestinations.map((destination) => (
                  <span
                    key={destination}
                    className="rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs text-primary"
                  >
                    {destination}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-card border border-primary/30 bg-primary p-6 text-background">
              <p className="text-xs uppercase tracking-[0.16em] text-background/75">
                {t("blogArticlePersonal.sidebars.planCardTag")}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">
                {t("blogArticlePersonal.sidebars.planCardTitle")}
              </h3>
              <Link
                href="/plan-your-trip"
                className="mt-4 inline-flex rounded-full border border-background/40 px-4 py-2 text-sm font-medium transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60"
              >
                {t("blogArticlePersonal.sidebars.planCardCta")}
              </Link>
            </section>
          </aside>
        </section>

        <section className="rounded-container border border-accent/35 bg-card p-6 text-center shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            {t("blogArticlePersonal.bottomCta.tag")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-primary sm:text-4xl">
            {t("blogArticlePersonal.bottomCta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/75 sm:text-base">
            {t("blogArticlePersonal.bottomCta.subtitle")}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary px-6 py-3 text-sm font-medium text-background transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {t("blogArticlePersonal.bottomCta.primaryCta")}
            </Link>
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {t("blogArticlePersonal.bottomCta.secondaryCta")}
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
