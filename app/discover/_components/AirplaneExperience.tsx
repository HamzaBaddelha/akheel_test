"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
// @ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import styles from "@/app/discover/discover.module.css";
import LoadingScreen from "@/app/discover/_components/LoadingScreen";
import DiscoverStorySections from "@/app/discover/_components/DiscoverStorySections";
import BlueprintSection from "@/app/discover/_components/BlueprintSection";
import SunsetSection from "@/app/discover/_components/SunsetSection";
import { AirplaneScene } from "@/app/discover/_lib/airplaneScene";
import { getDeviceProfile } from "@/app/discover/_lib/deviceProfile";
import { buildDesktopFlightTimeline, buildMobileFlightTimeline } from "@/app/discover/_lib/flightTimeline";
import { initStrokeDraw } from "@/app/discover/_lib/svgDraw";

const PLANE_MODEL_URL = "https://assets.codepen.io/557388/1405+Plane_1.obj";

export default function AirplaneExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const scrollCtaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const groundContainerRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const blueprintSvgRef = useRef<SVGSVGElement>(null);
  const lineLengthRef = useRef<SVGLineElement>(null);
  const lineWingspanRef = useRef<SVGPathElement>(null);
  const circlePhalangeRef = useRef<SVGCircleElement>(null);
  const lengthSectionRef = useRef<HTMLDivElement>(null);
  const wingspanSectionRef = useRef<HTMLDivElement>(null);
  const phalangeSectionRef = useRef<HTMLDivElement>(null);
  const [mobileFallback, setMobileFallback] = useState(false);

  useEffect(() => {
    if (!rootRef.current || !contentRef.current || !loadingRef.current) return;

    let ctx: gsap.Context | null = null;
    let scene: AirplaneScene | null = null;
    let isDisposed = false;
    let intersectionObserver: IntersectionObserver | null = null;
    let removeVisibilityListener: (() => void) | null = null;

    const profile = getDeviceProfile();
    setMobileFallback(profile.useFallback);

    const setup = async () => {
      gsap.registerPlugin(ScrollTrigger);

      if (profile.useFallback) {
        ctx = gsap.context(() => {
          gsap.to(loadingRef.current, { autoAlpha: 0, duration: 0.3 });
        }, rootRef);
        return;
      }

      const loader = new OBJLoader();
      let model: THREE.Group;
      try {
        model = await loader.loadAsync(PLANE_MODEL_URL);
      } catch {
        if (!isDisposed) {
          gsap.to(loadingRef.current, { autoAlpha: 0, duration: 0.35 });
        }
        return;
      }

      if (isDisposed || !canvasHostRef.current) return;

      model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshLambertMaterial({
            color: 0x171511,
            flatShading: true,
          });
        }
      });

      ctx = gsap.context(() => {
        if (!canvasHostRef.current) return;

        scene = new AirplaneScene(canvasHostRef.current, model, {
          maxPixelRatio: profile.simplifiedMotion ? 1.1 : 1.5,
          antialias: !profile.simplifiedMotion,
          dualView: !profile.simplifiedMotion,
        });

        const plane = scene.modelGroup;
        const tau = Math.PI * 2;
        const scrubValue: boolean | number = profile.simplifiedMotion ? 0.35 : true;

        const handleVisibilityChange = () => {
          scene?.setActive(document.visibilityState === "visible");
        };
        document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
        removeVisibilityListener = () =>
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        handleVisibilityChange();

        if ("IntersectionObserver" in window && rootRef.current) {
          intersectionObserver = new IntersectionObserver(
            (entries) => {
              const isVisible = entries[0]?.isIntersecting ?? true;
              scene?.setVisible(isVisible);
            },
            { threshold: 0.01 }
          );
          intersectionObserver.observe(rootRef.current);
        }

        gsap.fromTo(
          scene.renderer.domElement,
          { xPercent: 35, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.8 }
        );

        gsap.to(loadingRef.current, { autoAlpha: 0, duration: 0.35 });
        gsap.to(scrollCtaRef.current, { opacity: 1, duration: 0.35, delay: 0.15 });
        gsap.set(blueprintSvgRef.current, { autoAlpha: 1 });

        const lineLength = lineLengthRef.current ? initStrokeDraw(lineLengthRef.current) : 0;
        const lineWingspan = lineWingspanRef.current ? initStrokeDraw(lineWingspanRef.current) : 0;
        const circlePhalange = circlePhalangeRef.current ? initStrokeDraw(circlePhalangeRef.current) : 0;

        gsap.set(plane.rotation, { y: tau * -0.25 });
        gsap.set(plane.scale, {
          x: profile.simplifiedMotion ? 0.62 : 1,
          y: profile.simplifiedMotion ? 0.62 : 1,
          z: profile.simplifiedMotion ? 0.62 : 1,
        });
        gsap.set(plane.position, {
          x: profile.simplifiedMotion ? 24 : 80,
          y: profile.simplifiedMotion ? -12 : -32,
          z: profile.simplifiedMotion ? -120 : -60,
        });
        scene.requestRender();

        if (scene.views.length > 1) {
          gsap.fromTo(
            scene.views[1],
            { height: 1, bottom: 0 },
            {
              height: 0,
              bottom: 1,
              ease: "none",
              onUpdate: scene.requestRender,
              scrollTrigger: {
                trigger: blueprintRef.current,
                scrub: scrubValue,
                start: "bottom bottom",
                end: "bottom top",
              },
            }
          );

          gsap.fromTo(
            scene.views[1],
            { height: 0, bottom: 0 },
            {
              height: 1,
              bottom: 0,
              ease: "none",
              onUpdate: scene.requestRender,
              scrollTrigger: {
                trigger: blueprintRef.current,
                scrub: scrubValue,
                start: "top bottom",
                end: "top top",
              },
            }
          );
        }

        gsap.to(groundRef.current, {
          y: profile.simplifiedMotion ? "16%" : "30%",
          scrollTrigger: {
            trigger: groundContainerRef.current,
            scrub: scrubValue,
            start: "top bottom",
            end: "bottom top",
          },
        });

        gsap.from(cloudsRef.current, {
          y: profile.simplifiedMotion ? "10%" : "25%",
          scrollTrigger: {
            trigger: groundContainerRef.current,
            scrub: scrubValue,
            start: "top bottom",
            end: "bottom top",
          },
        });

        if (profile.simplifiedMotion) {
          gsap.to([lineLengthRef.current, lineWingspanRef.current, circlePhalangeRef.current], {
            strokeDashoffset: 0,
            duration: 0.65,
            ease: "power1.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: blueprintRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
        } else {
          gsap.to(lineLengthRef.current, {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: lengthSectionRef.current,
              scrub: true,
              start: "top bottom",
              end: "top top",
            },
          });

          gsap.to(lineWingspanRef.current, {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: wingspanSectionRef.current,
              scrub: true,
              start: "top 25%",
              end: "bottom 50%",
            },
          });

          gsap.to(circlePhalangeRef.current, {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: phalangeSectionRef.current,
              scrub: true,
              start: "top 50%",
              end: "bottom 100%",
            },
          });

          gsap.to(lineLengthRef.current, {
            opacity: 0,
            strokeDashoffset: lineLength,
            scrollTrigger: {
              trigger: lengthSectionRef.current,
              scrub: true,
              start: "top top",
              end: "bottom top",
            },
          });

          gsap.to(lineWingspanRef.current, {
            opacity: 0,
            strokeDashoffset: lineWingspan,
            scrollTrigger: {
              trigger: wingspanSectionRef.current,
              scrub: true,
              start: "top top",
              end: "bottom top",
            },
          });

          gsap.to(circlePhalangeRef.current, {
            opacity: 0,
            strokeDashoffset: circlePhalange,
            scrollTrigger: {
              trigger: phalangeSectionRef.current,
              scrub: true,
              start: "top top",
              end: "bottom top",
            },
          });
        }

        const timeline = gsap.timeline({
          onUpdate: () => scene?.requestRender(),
          defaults: { duration: 1, ease: "power2.inOut" },
          scrollTrigger: {
            trigger: contentRef.current,
            scrub: scrubValue,
            start: "top top",
            end: "bottom bottom",
          },
        });

        timeline.to(scrollCtaRef.current, { duration: 0.25, opacity: 0 }, 0);
        if (profile.simplifiedMotion) {
          buildMobileFlightTimeline(timeline, plane, tau);
        } else {
          buildDesktopFlightTimeline(timeline, plane, scene.light, tau);
        }

        ScrollTrigger.refresh();
        // Fix iOS Safari viewport height miscalculation
        setTimeout(() => ScrollTrigger.refresh(), 300);
      }, rootRef);
    };

    void setup();

    return () => {
      isDisposed = true;
      intersectionObserver?.disconnect();
      removeVisibilityListener?.();
      ctx?.revert();
      scene?.dispose();
    };
  }, []);

  return (
    <div className={styles.experience} ref={rootRef}>
      <LoadingScreen loadingRef={loadingRef} />
      {!mobileFallback && (
        <div
          className={styles.canvasHost}
          ref={canvasHostRef}
          style={{ overflow: "hidden", contain: "strict" }}
        />
      )}

      <div className={styles.content} ref={contentRef}>
        <div className={styles.trigger} />

        <DiscoverStorySections
          scrollCtaRef={scrollCtaRef}
          groundContainerRef={groundContainerRef}
          groundRef={groundRef}
          cloudsRef={cloudsRef}
        />

        <BlueprintSection
          blueprintRef={blueprintRef}
          blueprintSvgRef={blueprintSvgRef}
          lineLengthRef={lineLengthRef}
          lineWingspanRef={lineWingspanRef}
          circlePhalangeRef={circlePhalangeRef}
          lengthSectionRef={lengthSectionRef}
          wingspanSectionRef={wingspanSectionRef}
          phalangeSectionRef={phalangeSectionRef}
        />

        <SunsetSection />
      </div>
    </div>
  );
}
