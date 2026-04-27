import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.03 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export const viewportOnce = {
  once: true,
  margin: "-100px" as const,
};

export const pulseGlow: Variants = {
  initial: { boxShadow: "0 0 0 0 rgba(112,149,153,0.4)" },
  pulse: {
    boxShadow: [
      "0 0 0 0 rgba(112,149,153,0.4)",
      "0 0 0 12px rgba(112,149,153,0)",
    ],
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
  },
};
