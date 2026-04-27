"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type VideoTextProps = {
  src: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
  letterSpacing?: string | number;
};

export function VideoText({
  src,
  as: Component = "div",
  children,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 160,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  letterSpacing = 2,
}: VideoTextProps) {
  const id = React.useId().replace(/:/g, "");

  return (
    <Component className={cn("relative block h-full w-full", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 260"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <mask id={id}>
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              fill="white"
              textAnchor={textAnchor as "inherit" | "end" | "start" | "middle" | undefined}
              dominantBaseline={dominantBaseline as "middle" | "auto" | "text-before-edge" | "central" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" | "use-script" | "no-change" | "reset-size" | undefined}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={fontFamily}
              letterSpacing={letterSpacing}
            >
              {children}
            </text>
          </mask>
        </defs>
        <foreignObject x="0" y="0" width="100%" height="100%" mask={`url(#${id})`}>
          <video
            src={src}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            preload={preload}
            className="h-full w-full object-cover"
          />
        </foreignObject>
      </svg>
    </Component>
  );
}
