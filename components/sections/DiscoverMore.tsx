"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { useI18n } from "@/components/i18n/I18nProvider";
import BlurText from "@/components/ui/BlurText";
import moroccoImage from "@/public/assets/morroco.jpg";
import moroccoBlueImage from "@/public/assets/moroccoblue.jpg";
import mosaicWideImage from "@/public/assets/multiyimages1.jpg";
import mosaicTallImage from "@/public/assets/multyimages2.jpg";
import mosaicMediumTopImage from "@/public/assets/multyimages3.jpg";
import mosaicMediumBottomImage from "@/public/assets/mosque.jpg";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MOSAIC_TILES = [
  { id: "tile-a", src: mosaicWideImage,         alt: "Sunset coast",          className: "col-span-2", yRange: [16, -14] as [number, number] },
  { id: "tile-b", src: mosaicTallImage,          alt: "Coastal retreat",       className: "row-span-2", yRange: [20, -18] as [number, number] },
  { id: "tile-c", src: mosaicMediumTopImage,     alt: "Blue city skyline",     className: "",           yRange: [14, -12] as [number, number] },
  { id: "tile-d", src: mosaicMediumBottomImage,  alt: "Historic architecture", className: "",           yRange: [14, -12] as [number, number] },
];

const FadeInMotion = ({ children, delay = 0, y = 30, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y, scale: y > 20 ? 0.97 : 1 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ duration: 0.65, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function DiscoverMore() {
  const { isRTL, t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallax = (from: number, to: number) => useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [from, to]);

  const yMain = parallax(24, -20);
  const yCard = parallax(12, -12);

  return (
    <section ref={sectionRef} id="discover-more" className="relative overflow-hidden py-24 lg:py-32" aria-label={t("discoverMore.aria")}>
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${moroccoImage.src})` }} />
      <div aria-hidden="true" className="absolute inset-0 bg-primary/45 backdrop-blur-[2px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/85 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/85 to-transparent" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl rounded-container border border-accent/35 bg-background/15 px-6 py-12 backdrop-blur-md sm:px-8 sm:py-14">
          <BlurText text={t("discoverMore.tag")} delay={90} animateBy="words" direction="top" className="mb-3 justify-center text-xs uppercase tracking-[0.24em] text-secondary" />
          <h2 className="sr-only">{t("discoverMore.title")}</h2>
          <BlurText text={t("discoverMore.title")} delay={90} animateBy="words" direction="bottom" className="mb-4 justify-center text-center font-serif text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl" />
          <BlurText text={t("discoverMore.subtitle")} delay={70} animateBy="words" direction="bottom" className="mx-auto mb-8 max-w-2xl justify-center text-center text-base leading-relaxed text-primary-foreground/85 sm:text-lg" />
          <div className="mb-8 flex justify-center">
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-accent/45 bg-background/90 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-card sm:text-base"
            >
              {t("discoverMore.cta")}
            </Link>
          </div>

          <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-[1.05fr_1fr]">
            {/* Main image */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.28 }}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
              style={{ y: yMain }}
              className="overflow-hidden rounded-[20px] border border-accent/40 bg-background/15 shadow-xl"
            >
              <Image src={moroccoBlueImage} alt={t("discoverMore.blueImageAlt")} className="h-full w-full object-cover" sizes="(max-width: 1024px) 100vw, 52vw" />
            </motion.div>

            <div className="grid gap-4 md:gap-5">
              {/* Text card */}
              <FadeInMotion
                delay={0.16}
                y={24}
                className={`inline-flex w-full max-w-full items-center self-start rounded-[20px] border border-accent/40 bg-background/20 p-5 backdrop-blur-xl sm:w-fit sm:p-6 lg:p-8 ${
                  isRTL ? "sm:self-end" : ""
                }`}
              >
                <motion.div style={{ y: yCard }}>
                  <BlurText
                    text={t("discoverMore.blueCardText")}
                    delay={60}
                    animateBy="words"
                    direction="bottom"
                    className={`${isRTL ? "text-right" : "text-left"} text-base leading-relaxed text-primary-foreground sm:text-lg`}
                  />
                </motion.div>
              </FadeInMotion>

              {/* Mosaic grid */}
              <div className="grid grid-cols-2 grid-rows-[120px_110px_110px] gap-3 md:grid-rows-[140px_130px_130px] md:gap-3.5 lg:grid-rows-[170px_150px_150px]">
                {MOSAIC_TILES.map((tile, i) => (
                  <motion.div
                    key={tile.id}
                    initial={reduced ? false : { opacity: 0, y: 30, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.62, delay: 0.22 + i * 0.08, ease: EASE }}
                    style={{ y: parallax(...tile.yRange) }}
                    className={`relative overflow-hidden rounded-[16px] border border-accent/40 bg-background/20 shadow-[0_8px_24px_rgba(44,22,34,0.12)] ${tile.className}`}
                  >
                    <Image src={tile.src} alt={tile.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 32vw, 22vw" className="object-cover" />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
