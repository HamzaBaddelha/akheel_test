"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { useI18n } from "@/components/i18n/I18nProvider";
import { testimonials } from "@/lib/trips";

function Stars({ count, ariaLabel }: { count: number; ariaLabel: string }) {
  return (
    <div className="flex gap-0.5" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < count ? "text-secondary" : "text-foreground/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useI18n();

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32" aria-label={t("testimonials.aria")}>
      <Container>
        <SectionHeading
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
          className="mb-8 sm:mb-12 md:mb-16"
        />
      </Container>

      <div className="relative px-3 pb-0 sm:px-6 lg:px-8">
        <Marquee
          pauseOnHover
          className="p-1 [--duration:45s] [--gap:0.85rem] sm:p-2 sm:[--gap:1rem]"
          repeat={2}
          aria-label={t("testimonials.cardsAria")}
        >
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="w-[286px] max-w-[80vw] flex-shrink-0 rounded-container border border-accent/35 bg-card p-5 shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:w-[380px] sm:max-w-none sm:p-8 sm:hover:scale-[1.03]"
            >
              <Stars count={item.rating} ariaLabel={t("testimonials.starsAria", { count: item.rating })} />
              <blockquote className="mt-4 text-start font-serif text-base leading-8 text-foreground/85 sm:mt-5 sm:text-lg sm:leading-relaxed">
                &ldquo;{t(item.quoteKey)}&rdquo;
              </blockquote>
              <div className="mt-5 border-t border-foreground/10 pt-3.5 sm:mt-6 sm:pt-4">
                <p className="text-start text-base font-semibold text-primary">{t(item.nameKey)}</p>
                <p className="mt-0.5 text-start text-sm text-foreground/55">{t(item.locationKey)}</p>
              </div>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
