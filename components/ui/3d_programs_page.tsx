"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface ThreeDCarouselItem {
  id: string | number;
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

interface ThreeDCarouselProps {
  items: ThreeDCarouselItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
}

const ThreeDCarousel = ({
  items,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = "30rem",
  title = "From Textile to Intelligence",
  subtitle = "Customer Cases",
  tagline,
}: ThreeDCarouselProps) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!carouselRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!items.length || !autoRotate || !isInView || isHovering) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, rotateInterval);
    return () => clearInterval(interval);
  }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

  const getCardAnimationClass = (index: number) => {
    if (!items.length) return "opacity-0";
    if (index === active) return "scale-100 opacity-100 z-20";
    if (index === (active + 1) % items.length) {
      return "translate-x-[40%] scale-95 opacity-60 z-10";
    }
    if (index === (active - 1 + items.length) % items.length) {
      return "translate-x-[-40%] scale-95 opacity-60 z-10";
    }
    return "scale-90 opacity-0";
  };

  if (!items.length) return null;

  return (
    <section
      id="ThreeDCarousel"
      className="relative isolate overflow-hidden border-y border-[#2c2216]/10"
      aria-label="Featured programs carousel"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/style_baground-prgrampage.png"
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/62 to-black/68" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(176,184,201,0.18) 0%, rgba(176,184,201,0) 70%)",
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e1e0d4]/85">
            {subtitle}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#f8f7f0] sm:text-4xl">{title}</h2>
          {tagline && (
            <p className="mx-auto mt-3 max-w-3xl text-sm text-[#f8f7f0]/85 sm:text-base">
              {tagline}
            </p>
          )}
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          ref={carouselRef}
        >
          <div className="relative h-[34rem]">
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(index)}`}
                >
                  <Card
                    className="flex h-full flex-col overflow-hidden border bg-background shadow-sm transition hover:shadow-md"
                    style={{ height: cardHeight }}
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-black">
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-black/50" />
                      <div className="relative z-10 p-6 text-center text-white">
                        <h3 className="mb-2 text-2xl font-bold">{item.brand.toUpperCase()}</h3>
                        <div className="mx-auto mb-2 h-1 w-12 bg-white" />
                        <p className="text-sm">{item.title}</p>
                      </div>
                    </div>

                    <CardContent className="flex flex-grow flex-col p-6">
                      <h3 className="mb-1 text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mb-2 text-sm font-medium text-gray-500">{item.brand}</p>
                      <p className="flex-grow text-sm text-gray-600">{item.description}</p>

                      <div className="mt-4">
                        <div className="mb-4 flex flex-wrap gap-2">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={item.link}
                          className="group relative inline-flex items-center text-gray-500 hover:underline"
                        >
                          <span className="relative z-10">Learn more</span>
                          <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-md transition-all hover:scale-110 hover:bg-white"
            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-md transition-all hover:scale-110 hover:bg-white"
            onClick={() => setActive((prev) => (prev + 1) % items.length)}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center space-x-3">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  active === idx ? "bg-gray-500 w-5" : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActive(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDCarousel;
