"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  images?: string[];
  sideMedia?: {
    src: string;
    alt?: string;
  };
  icon?: React.ReactNode;
  color?: string;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  lineColor?: string;
  activeColor?: string;
  progressIndicator?: boolean;
  cardVariant?: "default" | "elevated" | "outlined" | "filled";
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  parallaxIntensity?: number;
  progressLineWidth?: number;
  progressLineCap?: "round" | "square";
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?: "fade" | "slide" | "scale" | "flip" | "none";
  connectorStyle?: "dots" | "line" | "dashed";
}

const variantClasses = {
  default: "",
  elevated: "shadow-md",
  outlined: "ring-1 ring-primary/10",
  filled: "bg-primary/5",
};

const effectClasses = {
  none: "",
  glow: "hover:shadow-[0_0_12px_rgba(112,149,153,0.35)]",
  shadow: "hover:shadow-lg hover:-translate-y-1",
  bounce: "hover:scale-[1.02] active:scale-[0.98]",
};

const getDelay = (
  order: ScrollTimelineProps["animationOrder"],
  index: number
) => (order === "simultaneous" ? 0 : index * (order === "staggered" ? 0.15 : 0.25));

const getSlideX = (
  alignment: ScrollTimelineProps["cardAlignment"],
  index: number
) => {
  if (alignment === "left") return -60;
  if (alignment === "right") return 60;
  return index % 2 === 0 ? -60 : 60;
};

const getRevealInitial = (
  reveal: ScrollTimelineProps["revealAnimation"],
  alignment: ScrollTimelineProps["cardAlignment"],
  index: number
) => {
  switch (reveal) {
    case "slide":
      return { x: getSlideX(alignment, index), opacity: 0 };
    case "scale":
      return { scale: 0.85, opacity: 0 };
    case "flip":
      return { rotateY: 90, opacity: 0 };
    case "none":
      return { opacity: 1 };
    case "fade":
    default:
      return { opacity: 0, y: 20 };
  }
};

const getWrapperAlignment = (
  alignment: ScrollTimelineProps["cardAlignment"],
  index: number
) => {
  if (alignment === "left") return "lg:justify-start";
  if (alignment === "right") return "lg:flex-row-reverse lg:justify-start";
  return index % 2 === 0
    ? "lg:justify-start"
    : "lg:flex-row-reverse lg:justify-start";
};

const getDesktopCardAlignment = (
  alignment: ScrollTimelineProps["cardAlignment"],
  index: number
) => {
  if (alignment === "left") return "lg:mr-auto lg:ml-0";
  if (alignment === "right") return "lg:ml-auto lg:mr-0";
  return index % 2 === 0
    ? "lg:mr-[calc(50%+24px)]"
    : "lg:ml-[calc(50%+24px)]";
};

const isCardOnLeft = (
  alignment: ScrollTimelineProps["cardAlignment"],
  index: number
) => {
  if (alignment === "left") return true;
  if (alignment === "right") return false;
  return index % 2 === 0;
};

function TimelineCardSlider({
  images,
  priority,
}: {
  images: string[];
  priority: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const goToNext = () => {
    setIsInteractive(true);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setIsInteractive(true);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(deltaX) <= 50) return;
    if (deltaX < 0) {
      goToNext();
      return;
    }
    goToPrev();
  };

  return (
    <div
      className="relative h-[200px] w-full touch-pan-y md:h-[240px]"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        pointerStartX.current = null;
      }}
    >
      <Image
        src={images[activeIndex]}
        alt={`Timeline image ${activeIndex + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 46vw"
        priority={priority && activeIndex === 0}
        loading={priority && activeIndex === 0 ? "eager" : "lazy"}
      />

      <div className="absolute right-3 top-3 z-20 rounded-full border border-white/30 bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
        {activeIndex + 1} / {images.length}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/55 to-transparent">
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {images.map((image, index) => (
            <motion.button
              key={`${image}-${index}`}
              type="button"
              layout
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "w-5 bg-white" : "w-2 bg-white/50"
              )}
              onClick={() => {
                setIsInteractive(true);
                setActiveIndex(index);
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white md:flex"
            style={{ backdropFilter: "blur(8px)" }}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white md:flex"
            style={{ backdropFilter: "blur(8px)" }}
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      {!isInteractive && images.length > 1 && (
        <div className="absolute bottom-3 left-3 z-20 rounded-full border border-white/25 bg-black/25 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
          Swipe for more
        </div>
      )}
    </div>
  );
}

function TimelineCard({
  event,
  index,
  activeIndex,
  smoothProgress,
  parallaxIntensity,
  cardAlignment,
  dateFormat,
  cardVariant,
  cardEffect,
  animationOrder,
  revealAnimation,
}: {
  event: TimelineEvent;
  index: number;
  activeIndex: number;
  smoothProgress: MotionValue<number>;
  parallaxIntensity: number;
  cardAlignment: NonNullable<ScrollTimelineProps["cardAlignment"]>;
  dateFormat: NonNullable<ScrollTimelineProps["dateFormat"]>;
  cardVariant: NonNullable<ScrollTimelineProps["cardVariant"]>;
  cardEffect: NonNullable<ScrollTimelineProps["cardEffect"]>;
  animationOrder: NonNullable<ScrollTimelineProps["animationOrder"]>;
  revealAnimation: NonNullable<ScrollTimelineProps["revealAnimation"]>;
}) {
  const reduceMotion = useReducedMotion();
  const cardOnLeft = isCardOnLeft(cardAlignment, index);
  const sideImageFromRight = cardOnLeft;
  const hasSideMedia = Boolean(event.sideMedia?.src);
  const y = useTransform(
    smoothProgress,
    [0, 1],
    [parallaxIntensity * 100, -parallaxIntensity * 100]
  );
  const hasImages = Boolean(event.images && event.images.length > 0);

  return (
    <div
      className={cn(
        "relative mb-16 flex items-center py-2 pl-12 lg:mb-20 lg:flex-row lg:pl-0",
        hasSideMedia && "lg:min-h-[300px]",
        getWrapperAlignment(cardAlignment, index)
      )}
    >
      <div className="absolute left-0 top-6 z-30 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <motion.div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border-4 lg:h-6 lg:w-6",
            index <= activeIndex
              ? "border-secondary bg-background"
              : "border-accent/50 bg-background"
          )}
          animate={
            index <= activeIndex
              ? {
                  scale: [1, 1.25, 1],
                  boxShadow: [
                    "0 0 0px rgba(112,149,153,0)",
                    "0 0 10px rgba(112,149,153,0.5)",
                    "0 0 0px rgba(112,149,153,0)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 0.7,
            repeat: reduceMotion ? 0 : 1,
            ease: "easeInOut",
          }}
        />
      </div>

      {event.sideMedia?.src && (
        <motion.div
          className={cn(
            "absolute bottom-2 top-2 hidden lg:block",
            sideImageFromRight
              ? "lg:left-[calc(50%+24px)] lg:w-[calc(50vw-2rem)]"
              : "lg:right-[calc(50%+24px)] lg:w-[calc(50vw-2rem)]"
          )}
          initial={reduceMotion ? false : { opacity: 0, x: sideImageFromRight ? 32 : -32 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={cn(
              "relative h-full min-h-[280px] overflow-hidden border border-white/20 bg-black/15 shadow-[0_16px_36px_rgba(0,0,0,0.16)]",
              sideImageFromRight ? "rounded-l-2xl rounded-r-none" : "rounded-r-2xl rounded-l-none"
            )}
          >
            <Image
              src={event.sideMedia.src}
              alt={event.sideMedia.alt || event.title}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 0px, 34vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-black/8 to-transparent" />
          </div>
        </motion.div>
      )}

      <motion.div
        className={cn(
          "relative z-30 mx-4 w-full rounded-card transition-all duration-300 lg:mx-0 lg:w-[calc(50%-40px)]",
          !hasImages && variantClasses[cardVariant],
          !hasImages && effectClasses[cardEffect],
          getDesktopCardAlignment(cardAlignment, index)
        )}
        variants={{
          initial: getRevealInitial(revealAnimation, cardAlignment, index),
          whileInView: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            transition: {
              duration: 0.6,
              delay: getDelay(animationOrder, index),
              ease: [0.25, 0.1, 0.25, 1],
            },
          },
        }}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-48px" }}
        style={parallaxIntensity > 0 ? { y } : undefined}
      >
        <Card
          className={cn(
            "overflow-hidden rounded-2xl",
            hasImages
              ? "border border-white/40 bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl"
              : "border border-accent/45 bg-card shadow-sm"
          )}
        >
          {hasImages && (
            <TimelineCardSlider images={event.images ?? []} priority={index === 0} />
          )}
          <CardContent className="p-5 lg:p-6">
            {dateFormat === "badge" ? (
              <span className="mb-2 inline-block text-xl">{event.year}</span>
            ) : (
              <p className="mb-2 text-lg font-bold text-secondary">{event.year}</p>
            )}

            <h3 className="mb-1 font-serif text-lg font-bold text-primary lg:text-xl">
              {event.title}
            </h3>

            {event.subtitle && (
              <p className="mb-2 text-sm font-medium text-foreground/50">
                {event.subtitle}
              </p>
            )}

            <p className="text-sm leading-relaxed text-foreground/70">
              {event.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export function ScrollTimeline({
  events,
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  titleClassName,
  subtitleClassName,
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-secondary/30",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "none",
  parallaxIntensity = 0.1,
  progressLineWidth = 3,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
}: ScrollTimelineProps) {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const effectiveParallax = reduceMotion ? 0 : parallaxIntensity;

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      const index = Math.min(events.length - 1, Math.floor(value * events.length));
      setActiveIndex(index >= 0 ? index : -1);
    });
  }, [scrollYProgress, events.length]);

  return (
    <div ref={scrollRef} className={cn("relative w-full", className)}>
      <div className="px-4 py-16 text-center">
        <h2
          className={cn(
            "mb-4 font-serif text-3xl font-bold text-primary md:text-5xl",
            titleClassName
          )}
        >
          {title}
        </h2>
        <p className={cn("mx-auto max-w-2xl text-lg text-foreground/60", subtitleClassName)}>
          {subtitle}
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-24 lg:px-4">
        <div className="relative">
          <div
            className={cn(
              "absolute top-0 left-0 h-full lg:left-1/2 lg:-translate-x-1/2",
              lineColor
            )}
            style={{ width: progressLineWidth }}
          />

          {progressIndicator && (
            <>
              <motion.div
                className="absolute top-0 left-0 lg:left-1/2 lg:-translate-x-1/2"
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  borderRadius: progressLineCap === "round" ? "9999px" : "0",
                  background: "linear-gradient(to bottom, #B0B8C9, #709599, #2C1622)",
                  boxShadow: "0 0 8px rgba(176,184,201,0.4)",
                }}
              />

              <motion.div
                className="absolute left-0 z-20 lg:left-1/2"
                style={{ top: progressHeight, translateX: "-50%", translateY: "-50%" }}
              >
                <motion.div
                  className="h-4 w-4 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(176,184,201,0.9) 0%, rgba(176,184,201,0.4) 50%, transparent 70%)",
                    boxShadow:
                      "0 0 10px 3px rgba(176,184,201,0.5), 0 0 20px 6px rgba(176,184,201,0.2)",
                  }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{
                    duration: 2,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          <div className="relative z-20">
            {events.map((event, index) => (
              <TimelineCard
                key={event.id || index}
                event={event}
                index={index}
                activeIndex={activeIndex}
                smoothProgress={smoothProgress}
                parallaxIntensity={effectiveParallax}
                cardAlignment={cardAlignment}
                dateFormat={dateFormat}
                cardVariant={cardVariant}
                cardEffect={cardEffect}
                animationOrder={animationOrder}
                revealAnimation={revealAnimation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
