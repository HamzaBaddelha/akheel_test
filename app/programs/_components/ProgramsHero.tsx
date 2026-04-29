"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import SlideAnimation from "@/components/ui/slide_animation";

const sliderImages = [
  {
    src: "/assets/Parc_Perdicaris_in_Tangier   (1).png",
    altKey: "programsPage.hero.slides.parcPerdicarisAlt",
  },
  {
    src: "/assets/Tafraoute1.jpg",
    altKey: "programsPage.hero.slides.tafraouteAlt",
  },
  {
    src: "/assets/ATLAS-PARADISE1.jpg",
    altKey: "programsPage.hero.slides.atlasParadiseAlt",
  },
];

export default function ProgramsHero() {
  const { t } = useI18n();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[220px] w-screen sm:h-[280px] md:h-[340px] lg:h-[390px]">
        {sliderImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={activeSlide !== index}
          >
            <Image
              src={image.src}
              alt={t(image.altKey)}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2c2216]/70 via-[#2c2216]/25 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 rounded-[1.5rem] border border-[#2c2216]/10 bg-[#f2f0e8] p-6 shadow-[0_30px_80px_rgba(44,34,22,0.08)] sm:-mt-14 sm:rounded-[2rem] sm:p-10 lg:p-12">
          <div className="flex items-center gap-2">
            {sliderImages.map((image, index) => (
              <span
                key={image.src}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === index
                    ? "w-8 bg-[#2c2216]"
                    : "w-3 bg-[#2c2216]/30"
                }`}
              />
            ))}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
            {t("programsPage.hero.tag")}
          </p>
          <SlideAnimation from="left">
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-[1.12] text-[#2c2216] sm:mt-4 sm:text-5xl sm:leading-tight lg:text-6xl">
              {t("programsPage.hero.title")}
            </h1>
          </SlideAnimation>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2c2216]/75 sm:mt-6 sm:text-lg">
            {t("programsPage.hero.subtitle")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#programs-grid"
              className="rounded-full bg-[#2c2216] px-5 py-2.5 text-sm font-semibold text-[#e1e0d4] transition hover:bg-[#403122] sm:px-6 sm:py-3"
            >
              {t("programsPage.hero.exploreCta")}
            </a>
            <Link
              href="/plan-your-trip"
              className="rounded-full border border-[#2c2216]/25 bg-[#e1e0d4] px-5 py-2.5 text-sm font-semibold text-[#2c2216] transition hover:border-[#2c2216]/40 hover:bg-[#d9d7c9] sm:px-6 sm:py-3"
            >
              {t("programsPage.hero.planCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
