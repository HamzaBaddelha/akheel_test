"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function Hero() {
  const { isRTL, t } = useI18n();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label={t("hero.aria")}
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/hero.webp"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1920px"
          quality={74}
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-primary/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-background/70 to-background" />

      <Container className="relative z-10">
        <div className={`mx-auto max-w-3xl ${isRTL ? "text-center sm:text-right" : "text-center"}`}>
          <div className="mb-6 flex justify-center">
            <Image
              src="/assets/logo-white-no-background.png"
              alt={t("hero.logoAlt")}
              width={560}
              height={240}
              className="h-28 w-auto sm:h-36 lg:h-44"
            />
          </div>

          <p className={`mb-8 font-serif text-base italic text-white sm:text-lg ${isRTL ? "sm:text-right" : ""}`}>
            {t("hero.quote")}
          </p>

          <h1 className={`mb-4 font-serif font-bold leading-tight tracking-tight text-white ${
            isRTL ? "text-[2.05rem] sm:text-5xl lg:text-7xl sm:leading-[1.25]" : "text-4xl sm:text-5xl lg:text-7xl"
          }`}>
            {t("hero.title")}
          </h1>

          <p className={`mb-10 text-white/90 ${isRTL ? "text-base leading-8 sm:text-xl" : "text-lg sm:text-xl"}`}>
            {t("hero.subtitle")}
          </p>

          <form
            dir={isRTL ? "rtl" : "ltr"}
            className="mx-auto flex w-full max-w-lg flex-col gap-2 rounded-[2rem] border border-accent/35 bg-background/15 p-2 sm:flex-row sm:items-center"
          >
            <div className={`flex flex-1 items-center gap-2 ${isRTL ? "pr-4" : "pl-4"}`}>
              <svg
                className="h-5 w-5 shrink-0 text-primary-foreground/55"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                aria-label={t("hero.searchAria")}
                className={`w-full bg-transparent py-2 text-sm text-primary-foreground placeholder-primary-foreground/55 outline-none ${
                  isRTL ? "text-right" : "text-left"
                }`}
              />
            </div>
            <Button variant="primary" pill size="md" className="w-full sm:w-auto">
              {t("hero.exploreButton")}
            </Button>
          </form>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-primary-foreground/60">{t("hero.scroll")}</span>
          <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
