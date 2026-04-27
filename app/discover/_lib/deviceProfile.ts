export type DeviceProfile = {
  isMobile: boolean;
  lowPower: boolean;
  prefersReducedMotion: boolean;
  simplifiedMotion: boolean;
  useFallback: boolean;
};

export function getDeviceProfile(): DeviceProfile {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = window.navigator as Navigator & { deviceMemory?: number };
  const lowPower =
    (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) ||
    (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4);

  return {
    isMobile,
    lowPower,
    prefersReducedMotion,
    simplifiedMotion: isMobile || lowPower,
    useFallback: prefersReducedMotion,
  };
}
