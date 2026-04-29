"use client";

import styles from "@/app/discover/discover.module.css";
import {
  blueprintSections,
  blueprintSectionsAr,
  blueprintSectionsFr,
} from "@/app/discover/_data/discoverSections";
import { useI18n } from "@/components/i18n/I18nProvider";

type BlueprintSectionProps = {
  blueprintRef: React.RefObject<HTMLDivElement | null>;
  blueprintSvgRef: React.RefObject<SVGSVGElement | null>;
  lineLengthRef: React.RefObject<SVGLineElement | null>;
  lineWingspanRef: React.RefObject<SVGPathElement | null>;
  circlePhalangeRef: React.RefObject<SVGCircleElement | null>;
  lengthSectionRef: React.RefObject<HTMLDivElement | null>;
  wingspanSectionRef: React.RefObject<HTMLDivElement | null>;
  phalangeSectionRef: React.RefObject<HTMLDivElement | null>;
};

export default function BlueprintSection({
  blueprintRef,
  blueprintSvgRef,
  lineLengthRef,
  lineWingspanRef,
  circlePhalangeRef,
  lengthSectionRef,
  wingspanSectionRef,
  phalangeSectionRef,
}: BlueprintSectionProps) {
  const { language } = useI18n();
  const localizedBlueprint =
    language === "ar" ? blueprintSectionsAr : language === "fr" ? blueprintSectionsFr : blueprintSections;

  return (
    <div
      className={styles.blueprint}
      ref={blueprintRef as React.RefObject<HTMLDivElement>}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <svg className={styles.blueprintSvg} ref={blueprintSvgRef as React.RefObject<SVGSVGElement>} viewBox="0 0 100 100">
        <line
          className={styles.line}
          ref={lineLengthRef as React.RefObject<SVGLineElement>}
          x1="10"
          y1="80"
          x2="90"
          y2="80"
          strokeWidth="0.5"
        />
        <path
          className={styles.line}
          ref={lineWingspanRef as React.RefObject<SVGPathElement>}
          d="M10 50, L40 35, M60 35 L90 50"
          strokeWidth="0.5"
        />
        <circle
          className={styles.line}
          ref={circlePhalangeRef as React.RefObject<SVGCircleElement>}
          cx="60"
          cy="60"
          r="15"
          strokeWidth="0.5"
        />
      </svg>

      {localizedBlueprint.map((section) => {
        let ref: React.RefObject<HTMLDivElement | null> | undefined;
        if (section.refKey === "length") ref = lengthSectionRef;
        if (section.refKey === "wingspan") ref = wingspanSectionRef;
        if (section.refKey === "phalange") ref = phalangeSectionRef;

        return (
          <section key={section.title} className={`${styles.section} ${styles.dark}`} ref={ref as React.RefObject<HTMLElement>}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        );
      })}
    </div>
  );
}
