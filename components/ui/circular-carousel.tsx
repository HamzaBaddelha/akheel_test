"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CircularCarouselItem = {
  id: string;
  title: string;
  image: string | StaticImageData;
  shortDescription: string;
  longDescription: string;
  category: string;
  ctaLabel?: string;
};

type CircularCarouselProps = {
  items: CircularCarouselItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ORBIT_OFFSET = -90;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function CircularCarousel({
  items,
  selectedId,
  onSelect,
  className,
}: CircularCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ active: false, startX: 0, startRotation: 0 });
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const [rotation, setRotation] = useState(0);
  const [size, setSize] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect.width);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { radius, cardSize, centerXOffset } = useMemo(() => {
    const s = size || 420;

    return {
      radius: clamp(s * 0.3, 96, 220),
      cardSize: clamp(s * 0.24, 104, 170),
      centerXOffset: clamp(s * -0.08, -64, -28),
    };
  }, [size]);

  useEffect(() => {
    if (prefersReducedMotion || !isVisible) return;

    const loop = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pointerRef.current.active) {
        setRotation((prev) => prev + delta * 0.012);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [isVisible, prefersReducedMotion]);

  const step = items.length ? 360 / items.length : 0;

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: EASE };

  const startPointer = (clientX: number) => {
    pointerRef.current = {
      active: true,
      startX: clientX,
      startRotation: rotation,
    };
  };

  const movePointer = (clientX: number) => {
    if (!pointerRef.current.active) return;
    const delta = clientX - pointerRef.current.startX;
    setRotation(pointerRef.current.startRotation + delta * 0.22);
  };

  const endPointer = () => {
    pointerRef.current.active = false;
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={rootRef}
        className="relative mx-auto aspect-square w-full max-w-[760px] touch-pan-y select-none overflow-visible"
        onPointerDown={(e) => {
          startPointer(e.clientX);
        }}
        onPointerMove={(e) => movePointer(e.clientX)}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onPointerLeave={endPointer}
      >
        <div className="pointer-events-none absolute inset-[16%] rounded-full border border-accent/35 bg-primary/36" />
        <div className="pointer-events-none absolute inset-[30%] rounded-full border border-accent/25 bg-primary/45 shadow-[0_0_50px_rgba(176,184,201,0.12)]" />

        {items.map((item, index) => {
          const angle = index * step + rotation + ORBIT_OFFSET;
          const radians = (angle * Math.PI) / 180;
          const x = Math.cos(radians) * radius + centerXOffset;
          const y = Math.sin(radians) * radius;
          const isSelected = selectedId === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => {
                const delta = Math.abs(rotation - pointerRef.current.startRotation);
                if (delta < 8) {
                  onSelect(item.id);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(item.id);
                }
              }}
              aria-label={`Open ${item.title}`}
              aria-pressed={isSelected}
              className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                width: cardSize,
                height: cardSize,
                pointerEvents: isSelected ? "none" : "auto",
                willChange: "transform",
              }}
              animate={{
                x,
                y,
                opacity: isSelected ? 0 : 1,
                scale: isSelected ? 0.92 : 1,
              }}
              transition={transition}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-accent/40 bg-card/70 shadow-xl">
                <motion.div
                  layoutId={`showcase-image-${item.id}`}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 32vw, (max-width: 1024px) 22vw, 170px"
                    className="object-cover"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-2.5">
                  <p className="line-clamp-1 text-xs font-semibold uppercase tracking-[0.14em] text-background/80">
                    {item.category}
                  </p>
                  <p className="line-clamp-1 text-sm font-semibold text-background">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
