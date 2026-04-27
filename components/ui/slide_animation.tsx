"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type SlideFrom = "left" | "right";

interface SlideAnimationProps {
  children: ReactNode;
  from?: SlideFrom;
  className?: string;
}

export default function SlideAnimation({
  children,
  from = "left",
  className = "",
}: SlideAnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, margin: "0px 0px -10% 0px" });
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrollDirection(currentY > lastY ? "down" : "up");
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enterFrom = scrollDirection === "down" ? from : from === "left" ? "right" : "left";
  const hiddenX = enterFrom === "left" ? -70 : 70;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: hiddenX }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: hiddenX }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
