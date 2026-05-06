"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useI18n } from "@/components/i18n/I18nProvider";
import Link from "next/link";

export default function FaqPage() {
  const { t } = useI18n();
  const sectionKeys = [
    "planning",
    "destinations",
    "morocco",
    "services",
    "budget",
    "travelStyle",
    "support",
  ] as const;
  const itemKeys = ["q1", "q2", "q3", "q4"] as const;

  return (
    <>
      <Header fixedBgColor="#2c2216" />
      <main className="pt-24 pb-16">
        <Container>
          <section className="rounded-container border border-accent/35 bg-card p-8 sm:p-10 lg:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              {t("faq.hero.tag")}
            </p>
            <h1 className="font-serif text-4xl font-bold text-primary sm:text-5xl">
              {t("faq.hero.title")}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-foreground/75 sm:text-lg">
              {t("faq.hero.subtitle")}
            </p>
          </section>

          <section className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
            {sectionKeys.map((sectionKey) => (
              <section key={sectionKey} className="space-y-4 sm:space-y-5">
                <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
                  {t(`faq.sections.${sectionKey}.title`)}
                </h2>

                <div className="grid gap-4 sm:gap-5">
                  {itemKeys.map((itemKey) => (
                    <article
                      key={`${sectionKey}-${itemKey}`}
                      className="rounded-card border border-accent/30 bg-card p-6 sm:p-7"
                    >
                      <h3 className="text-lg font-semibold text-primary sm:text-xl">
                        {t(`faq.sections.${sectionKey}.items.${itemKey}.question`)}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                        {t(`faq.sections.${sectionKey}.items.${itemKey}.answer`)}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </section>

          <section className="mt-10 rounded-container border border-accent/35 bg-primary px-6 py-10 text-background sm:mt-12 sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/80">
              {t("faq.cta.tag")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              {t("faq.cta.title")}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-background/85 sm:text-base">
              {t("faq.cta.subtitle")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/plan-your-trip"
                className="inline-flex items-center rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-background/90"
              >
                {t("faq.cta.primaryButton")}
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center rounded-full border border-background/45 bg-transparent px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-background/10"
              >
                {t("faq.cta.secondaryButton")}
              </Link>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-background/45 bg-transparent px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-background/10"
              >
                {t("faq.cta.whatsAppButton")}
              </a>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
