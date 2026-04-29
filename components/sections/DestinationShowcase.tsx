"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/components/i18n/I18nProvider";
import { destinations } from "@/lib/trips";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

function CardContent({
  dest,
  isRTL,
  t,
}: {
  dest: (typeof destinations)[number];
  isRTL: boolean;
  t: (key: string) => string;
}) {
  const isLightTextCard =
    dest.id === "tunis" || dest.id === "morocco-tours" || dest.id === "saudi-arabia";

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-accent/35 bg-background/15 backdrop-blur-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dest.image}
          alt={t(dest.nameKey)}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/35 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,224,212,0.25),transparent_55%)]" />
        <h3
          className={`absolute bottom-4 font-serif text-2xl font-bold uppercase tracking-wide ${
            isRTL ? "right-5 text-right" : "left-5 text-left"
          } ${
            isLightTextCard ? "text-white" : "text-primary-foreground"
          }`}
        >
          {t(dest.nameKey)}
        </h3>
      </div>
      <div
        className={`relative border-t border-accent/40 p-5 ${
          isLightTextCard ? "bg-primary/65" : "bg-background/70"
        }`}
      >
        <div
          className={`pointer-events-none absolute -top-14 left-1/2 h-20 w-[70%] -translate-x-1/2 rounded-full blur-2xl ${
            isLightTextCard ? "bg-black/35" : "bg-background/35"
          }`}
        />
        <p
          className={`relative text-sm leading-relaxed ${isRTL ? "text-right" : "text-left"} ${
            isLightTextCard ? "text-white/95" : "text-foreground/80"
          }`}
        >
          {t(dest.descriptionKey)}
        </p>
        <span
          className={`relative mt-4 inline-flex items-center gap-1 text-sm font-semibold ${
            isRTL ? "flex-row-reverse" : ""
          } ${
            isLightTextCard ? "text-white" : "text-primary"
          }`}
        >
          {t("destinations.explore")}
          <svg
            className={`h-4 w-4 transition-transform ${
              isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function DestinationShowcase() {
  const { isRTL, t } = useI18n();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: "prev" | "next") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstCard = scroller.querySelector<HTMLElement>("[data-destination-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : scroller.clientWidth * 0.85;
    const amount = direction === "next" ? step : -step;

    scroller.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="destinations" className="py-24 lg:py-32" aria-label={t("destinations.aria")}>
      <Container>
        <SectionHeading
          title={t("destinations.title")}
          subtitle={t("destinations.subtitle")}
        />

        <div className={`mb-6 flex gap-2 ${isRTL ? "justify-start" : "justify-end"}`}>
          <button
            type="button"
            aria-label={t("destinations.prevAria")}
            onClick={() => scrollCards(isRTL ? "next" : "prev")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 bg-background/75 text-primary shadow-sm backdrop-blur-md transition hover:bg-background"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={t("destinations.nextAria")}
            onClick={() => scrollCards(isRTL ? "prev" : "next")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 bg-background/75 text-primary shadow-sm backdrop-blur-md transition hover:bg-background"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <motion.div
          ref={scrollerRef}
          dir={isRTL ? "rtl" : "ltr"}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={
            isRTL
              ? "grid grid-cols-1 gap-5 pb-1 sm:flex sm:snap-x sm:snap-mandatory sm:gap-6 sm:overflow-x-auto sm:pb-4 sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden"
              : "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          {destinations.map((dest) => (
            <motion.article
              key={dest.id}
              data-destination-card
              variants={fadeInUp}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
              className={`group relative cursor-pointer ${
                isRTL
                  ? "w-full snap-none sm:shrink-0 sm:basis-[62%] sm:snap-start lg:basis-[42%] xl:basis-[34%]"
                  : "shrink-0 basis-[86%] snap-start sm:basis-[62%] lg:basis-[42%] xl:basis-[34%]"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] bg-gradient-to-br from-secondary/35 to-primary/30 blur-xl" />
              {dest.href ? (
                <Link href={dest.href} className="block">
                  <CardContent dest={dest} isRTL={isRTL} t={t} />
                </Link>
              ) : (
                <CardContent dest={dest} isRTL={isRTL} t={t} />
              )}
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
