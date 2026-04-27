"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";
import BlurText from "@/components/ui/BlurText";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`mb-12 text-center md:mb-16 ${className}`}
    >
      <div className="gold-underline pb-2">
        <BlurText
          text={title}
          delay={100}
          animateBy="words"
          direction="bottom"
          className="justify-center font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl"
        />
      </div>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
