"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import CircularCarousel, {
  type CircularCarouselItem,
} from "@/components/ui/circular-carousel";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import multiyimages1 from "@/public/assets/multiyimages1.jpg";
import multyimages2 from "@/public/assets/multyimages2.jpg";
import multyimages3 from "@/public/assets/multyimages3.jpg";
import moroccoBlueImage from "@/public/assets/moroccoblue.jpg";
import mosqueImage from "@/public/assets/mosque.jpg";
import carouselBackgroundImage from "@/public/assets/baground.jpg";

const ITEMS: CircularCarouselItem[] = [
  {
    id: "travel",
    title: "Luxury Coastal Escapes",
    image: multiyimages1,
    shortDescription: "Curated journeys across cinematic shores.",
    longDescription:
      "Explore premium beachside itineraries designed for comfort, privacy, and deeply memorable moments with elevated hospitality at every stop.",
    category: "Travel",
    ctaLabel: "Plan This Journey",
  },
  {
    id: "innovation",
    title: "Smart Destination Planning",
    image: multyimages3,
    shortDescription: "Modern tools with refined travel design.",
    longDescription:
      "Blend intelligent planning with local expertise to craft smoother, more meaningful experiences while preserving a calm and luxurious pace.",
    category: "Innovation",
    ctaLabel: "See Opportunities",
  },
  {
    id: "development",
    title: "Regional Growth Stories",
    image: mosqueImage,
    shortDescription: "Culture, heritage, and future development.",
    longDescription:
      "Discover how historic identity and forward-looking development create unique opportunities for travelers, partners, and local ecosystems.",
    category: "Development",
    ctaLabel: "Explore Stories",
  },
  {
    id: "education",
    title: "Educational Discovery Routes",
    image: multyimages2,
    shortDescription: "Learning experiences beyond the classroom.",
    longDescription:
      "From architectural heritage to natural landscapes, each route is curated to inspire curiosity with immersive and thoughtfully guided moments.",
    category: "Education",
    ctaLabel: "View Programs",
  },
  {
    id: "finance",
    title: "Investment & Hospitality",
    image: moroccoBlueImage,
    shortDescription: "Premium tourism with sustainable value.",
    longDescription:
      "Understand how high-end tourism projects can balance profitability, sustainability, and destination quality through strategic partnerships.",
    category: "Finance",
    ctaLabel: "Learn More",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function InteractiveCarouselShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = ITEMS.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    if (!selectedId) return;

    const closeWhenSectionOut = () => {
      const node = sectionRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibleRatio = visibleHeight / Math.max(1, rect.height);

      // Collapse only when the section is mostly out of viewport.
      if (visibleRatio < 0.15) {
        setSelectedId(null);
      }
    };

    window.addEventListener("scroll", closeWhenSectionOut, { passive: true });
    window.addEventListener("resize", closeWhenSectionOut);

    return () => {
      window.removeEventListener("scroll", closeWhenSectionOut);
      window.removeEventListener("resize", closeWhenSectionOut);
    };
  }, [selectedId]);

  return (
    <section
      ref={sectionRef}
      id="interactive-showcase"
      aria-label="Interactive showcase"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <Container>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto max-w-6xl rounded-container border border-accent/35 bg-primary px-5 py-10 shadow-[0_18px_48px_rgba(44,22,34,0.28)] sm:px-8 sm:py-12 lg:px-12 lg:py-14"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-background/75">
              Discover More
            </p>
            <h2 className="font-serif text-3xl font-bold text-background sm:text-4xl lg:text-5xl">
              Explore Stories, Innovation, and Opportunities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-background/75 sm:text-lg">
              A premium interactive showcase designed to highlight curated themes
              shaping modern journeys.
            </p>
          </div>

          <LayoutGroup id="interactive-carousel-showcase">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="relative mt-10 overflow-hidden rounded-[26px] border border-accent/30 bg-background/5 p-2.5 sm:p-3.5 lg:p-4"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <Image
                  src={carouselBackgroundImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/45 via-primary/68 to-primary/80" />
              </div>

              <CircularCarousel
                items={ITEMS}
                selectedId={selectedId}
                onSelect={(id) =>
                  setSelectedId((current) => (current === id ? null : id))
                }
                className="relative z-10 mx-auto max-w-[960px]"
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedItem && (
                <motion.div
                  key={selectedItem.id}
                  initial={
                    reducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 18, scale: 0.985 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 14, scale: 0.99 }
                  }
                  transition={{ duration: 0.45, ease: EASE }}
                  className="mt-8 rounded-[24px] border border-accent/35 bg-primary/88 p-4 shadow-xl sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-7">
                    <motion.div
                      layoutId={`showcase-image-${selectedItem.id}`}
                      className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-accent/35"
                    >
                      <Image
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 52vw"
                        className="object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"
                      />
                    </motion.div>

                    <div className="flex h-full flex-col">
                      <p className="mb-2 inline-flex w-fit rounded-full border border-accent/45 bg-background/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#999570]">
                        {selectedItem.category}
                      </p>

                      <h3 className="font-serif text-2xl font-bold text-background sm:text-3xl">
                        {selectedItem.title}
                      </h3>

                      <p className="mt-3 text-base text-[#e1e0d4] sm:text-lg">
                        {selectedItem.longDescription}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Button variant="primary" pill size="sm" type="button">
                          {selectedItem.ctaLabel ?? "Discover"}
                        </Button>

                        <button
                          type="button"
                          onClick={() => setSelectedId(null)}
                          aria-label={`Close details for ${selectedItem.title}`}
                          className="inline-flex items-center justify-center rounded-full border border-[#b0b8c9] bg-[#b0b8c9] px-4 py-2 text-sm font-medium text-primary transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </motion.div>
      </Container>
    </section>
  );
}
