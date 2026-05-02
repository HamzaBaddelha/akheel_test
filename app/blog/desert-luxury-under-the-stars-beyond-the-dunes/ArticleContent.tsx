"use client";

import Container from "@/components/ui/Container";
import { useI18n } from "@/components/i18n/I18nProvider";
import Image from "next/image";
import Link from "next/link";

const sectionIds = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;

export default function ArticleContent() {
  const { t } = useI18n();
  const sections = sectionIds.map((id) => ({
    title: t(`blogArticleDesertLuxury.sections.${id}.title`),
    body: t(`blogArticleDesertLuxury.sections.${id}.body`),
  }));

  return (
    <main className="pb-16 pt-20 sm:pt-24">
      <Container className="space-y-10 sm:space-y-14">
        <section className="overflow-hidden rounded-container border border-accent/35 bg-card shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_1fr]">
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {t("blogArticleDesertLuxury.meta.category")}
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl">
                {t("blogArticleDesertLuxury.meta.title")}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
                {t("blogArticleDesertLuxury.meta.subtitle")}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.13em] text-foreground/65 sm:text-sm">
                {t("blogArticleDesertLuxury.meta.author")} ·{" "}
                {t("blogArticleDesertLuxury.meta.date")} ·{" "}
                {t("blogArticleDesertLuxury.meta.readTime")}
              </p>
            </div>
            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
              <Image
                src="/assets/desert.webp"
                alt={t("blogArticleDesertLuxury.meta.imageAlt")}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>
        </section>

        <article className="space-y-8 rounded-container border border-accent/30 bg-card/80 p-6 sm:space-y-10 sm:p-8 lg:p-10">
          <section className="rounded-card border border-secondary/20 bg-background/70 p-5 sm:p-6">
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              {t("blogArticleDesertLuxury.intro")}
            </p>
          </section>

          {sections.slice(0, 3).map((section, index) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold leading-tight text-primary sm:text-3xl">
                {index + 1}. {section.title}
              </h2>
              <p className="text-base leading-relaxed text-foreground/80">
                {section.body}
              </p>
            </section>
          ))}

          <blockquote className="rounded-card border border-secondary/30 bg-primary/5 p-6 text-xl leading-relaxed text-primary sm:p-7">
            &quot;{t("blogArticleDesertLuxury.quote")}&quot;
          </blockquote>

          {sections.slice(3).map((section, index) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold leading-tight text-primary sm:text-3xl">
                {index + 4}. {section.title}
              </h2>
              <p className="text-base leading-relaxed text-foreground/80">
                {section.body}
              </p>
            </section>
          ))}
        </article>

        <section className="rounded-container border border-primary/25 bg-primary p-7 text-background shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/75">
            {t("blogArticleDesertLuxury.cta.tag")}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            {t("blogArticleDesertLuxury.cta.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/85 sm:text-base">
            {t("blogArticleDesertLuxury.cta.subtitle")}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-background/40 bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
            >
              {t("blogArticleDesertLuxury.cta.primary")}
            </Link>
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-background/40 px-6 py-3 text-sm font-semibold text-background transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
            >
              {t("blogArticleDesertLuxury.cta.secondary")}
            </Link>
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-background/40 bg-background/10 px-6 py-3 text-sm font-semibold text-background transition hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70"
            >
              {t("blogArticleDesertLuxury.cta.tertiary")}
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
