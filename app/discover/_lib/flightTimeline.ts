import gsap from "gsap";
import * as THREE from "three";

export function buildDesktopFlightTimeline(
  timeline: gsap.core.Timeline,
  plane: THREE.Group,
  light: THREE.PointLight,
  tau: number
) {
  const sectionDuration = 1;
  let delay = 0;

  timeline.to(plane.position, { x: -10, ease: "power1.in" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.25, y: 0, z: -tau * 0.05, ease: "power1.inOut" }, delay);
  timeline.to(plane.position, { x: -40, y: 0, z: -60, ease: "power1.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.25, y: 0, z: tau * 0.05, ease: "power3.inOut" }, delay);
  timeline.to(plane.position, { x: 40, y: 0, z: -60, ease: "power2.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.2, y: 0, z: -tau * 0.1, ease: "power3.inOut" }, delay);
  timeline.to(plane.position, { x: -40, y: 0, z: -30, ease: "power2.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: 0, z: 0, y: tau * 0.25 }, delay);
  timeline.to(plane.position, { x: 0, y: -10, z: 50 }, delay);

  delay += sectionDuration * 2;
  timeline.to(plane.rotation, { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" }, delay);
  timeline.to(plane.position, { z: 30, ease: "power4.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" }, delay);
  timeline.to(plane.position, { z: 60, x: 30, ease: "power4.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.35, y: tau * 0.75, z: tau * 0.6, ease: "power4.inOut" }, delay);
  timeline.to(plane.position, { z: 100, x: 20, y: 0, ease: "power4.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.15, y: tau * 0.85, z: 0, ease: "power1.in" }, delay);
  timeline.to(plane.position, { z: -150, x: 0, y: 0, ease: "power1.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(
    plane.rotation,
    { duration: sectionDuration, x: -tau * 0.05, y: tau, z: -tau * 0.1, ease: "none" },
    delay
  );
  timeline.to(
    plane.position,
    { duration: sectionDuration, x: 0, y: 30, z: 320, ease: "power1.in" },
    delay
  );
  timeline.to(
    light.position,
    { duration: sectionDuration, x: 0, y: 0, z: 0, ease: "power1.inOut" },
    delay
  );
}

export function buildMobileFlightTimeline(
  timeline: gsap.core.Timeline,
  plane: THREE.Group,
  tau: number
) {
  const sectionDuration = 1;
  let delay = 0;

  timeline.to(plane.position, { x: -12, y: -6, z: -95, ease: "power1.out" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.2, y: tau * 0.08, z: -tau * 0.04, ease: "power2.inOut" }, delay);
  timeline.to(plane.position, { x: 14, y: -2, z: -55, ease: "power2.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.18, y: tau * 0.35, z: tau * 0.08, ease: "power2.inOut" }, delay);
  timeline.to(plane.position, { x: -8, y: 5, z: -5, ease: "power2.inOut" }, delay);

  delay += sectionDuration;
  timeline.to(plane.rotation, { x: tau * 0.05, y: tau * 0.85, z: 0, ease: "power1.in" }, delay);
  timeline.to(plane.position, { x: 0, y: -80, z: 0, ease: "power1.in" }, delay);
}
