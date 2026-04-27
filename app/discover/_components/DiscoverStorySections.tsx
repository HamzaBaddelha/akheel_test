"use client";

import styles from "@/app/discover/discover.module.css";
import {
  heroSection,
  heroSectionAr,
  heroSectionFr,
  introSection,
  introSectionAr,
  introSectionFr,
  storySections,
  storySectionsAr,
  storySectionsFr,
} from "@/app/discover/_data/discoverSections";
import { useI18n } from "@/components/i18n/I18nProvider";

type DiscoverStorySectionsProps = {
  scrollCtaRef: React.RefObject<HTMLDivElement | null>;
  groundContainerRef: React.RefObject<HTMLDivElement | null>;
  groundRef: React.RefObject<HTMLDivElement | null>;
  cloudsRef: React.RefObject<HTMLDivElement | null>;
};

export default function DiscoverStorySections({
  scrollCtaRef,
  groundContainerRef,
  groundRef,
  cloudsRef,
}: DiscoverStorySectionsProps) {
  const { language } = useI18n();
  const localizedHero =
    language === "ar" ? heroSectionAr : language === "fr" ? heroSectionFr : heroSection;
  const localizedIntro =
    language === "ar" ? introSectionAr : language === "fr" ? introSectionFr : introSection;
  const localizedStories =
    language === "ar" ? storySectionsAr : language === "fr" ? storySectionsFr : storySections;
  const scrollLabel = language === "ar" ? "مرّر" : language === "fr" ? "Défiler" : "Scroll";

  return (
    <>
      <section className={styles.section}>
        <h1>{localizedHero.title}</h1>
        <h3>{localizedHero.subtitle}</h3>
        <p>{localizedHero.body}</p>
        <div className={styles.scrollCta} ref={scrollCtaRef as React.RefObject<HTMLDivElement>}>
          {scrollLabel}
        </div>
      </section>

      <section className={`${styles.section} ${styles.right}`}>
        <h2>{localizedIntro.title}</h2>
      </section>

      <div className={styles.groundContainer} ref={groundContainerRef as React.RefObject<HTMLDivElement>}>
        <div className={`${styles.parallax} ${styles.ground}`} ref={groundRef as React.RefObject<HTMLDivElement>} />

        {localizedStories.map((section) => (
          <section
            key={section.title}
            className={`${styles.section} ${section.align === "right" ? styles.right : ""}`.trim()}
          >
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <div className={`${styles.parallax} ${styles.clouds}`} ref={cloudsRef as React.RefObject<HTMLDivElement>} />
      </div>
    </>
  );
}
