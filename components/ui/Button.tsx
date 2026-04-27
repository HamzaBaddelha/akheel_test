"use client";

import { motion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  pill?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "border border-accent/50 bg-background text-primary font-semibold hover:bg-card shadow-md",
  secondary:
    "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md",
  outline:
    "border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary",
  ghost: "text-secondary hover:bg-secondary/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", pill = false, className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          inline-flex items-center justify-center gap-2 font-sans
          transition-colors duration-200 focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          ${pill ? "rounded-full" : "rounded-card"}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
