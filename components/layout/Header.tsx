"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";
import Container from "@/components/ui/Container";

const LANGS = ["en", "ar", "fr"] as const;

type HeaderProps = {
  fixedBgColor?: string;
};

export default function Header({ fixedBgColor }: HeaderProps = {}) {
  const { language, isRTL, setLanguage, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: t("header.nav.blog"), href: "/blog" },
    { label: t("header.nav.programs"), href: "/programs" },
    { label: t("header.nav.planTrip"), href: "/plan-your-trip" },
    { label: t("header.nav.reservation"), href: "/discover" },
    { label: t("header.nav.faq"), href: "/faq" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => void (document.body.style.overflow = "");
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [language]);

  useEffect(() => {
    if (fixedBgColor) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fixedBgColor]);

  const langBtn = (lang: (typeof LANGS)[number], mobile = false) =>
    `rounded-full ${
      mobile ? "px-3 py-1" : "px-2.5 py-1"
    } text-xs font-semibold uppercase transition-colors ${
      language === lang
        ? "bg-background text-primary"
        : mobile
        ? "bg-background/10 text-primary-foreground/80"
        : "text-primary-foreground/80 hover:text-secondary"
    }`;

  const headerStyle = {
    backgroundColor: fixedBgColor ?? (scrolled ? "rgba(44,34,22,0.95)" : "rgba(44,34,22,0)"),
    transition: "background-color 240ms ease",
  };

  return (
    <header
      style={headerStyle}
      className="fixed inset-x-0 top-0 z-50"
    >
      <Container>
        <nav
          className="flex h-16 items-center justify-between sm:h-20"
          aria-label={t("header.aria.mainNavigation")}
        >
          <Link href="/" aria-label={t("header.aria.homeLink")} className="shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Akheel Travel"
              width={240}
              height={80}
              className="h-12 w-auto sm:h-20"
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm font-medium tracking-wide text-background transition-colors hover:text-secondary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-accent/35 bg-background/10 p-1 backdrop-blur-sm">
              {LANGS.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={langBtn(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>

            <Link
              href="/discover"
              className="rounded-full border border-accent/50 bg-background px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-card"
            >
              {t("header.bookNow")}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex shrink-0 flex-col gap-1.5 rounded-md p-1.5 md:hidden"
            aria-label={t("header.aria.toggleMenu")}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </Container>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full border-t border-white/10 bg-primary/95 backdrop-blur-sm md:hidden">
          <ul className="flex max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto p-5 sm:max-h-[calc(100vh-5rem)]">
            <li className="mb-2 flex items-center justify-center gap-2">
              {LANGS.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setLanguage(lang);
                    setMobileOpen(false);
                  }}
                  className={langBtn(lang, true)}
                >
                  {lang}
                </button>
              ))}
            </li>

            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-card px-4 py-3 text-lg text-background transition-colors hover:bg-background/10 hover:text-secondary ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li className="mt-2">
              <Link
                href="/discover"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full border border-accent/50 bg-background py-3 text-center font-semibold text-primary"
              >
                {t("header.bookNow")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
