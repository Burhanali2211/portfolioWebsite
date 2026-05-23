import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";
import { useViewportDetection } from "@/hooks/useViewportDetection";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const variants: Record<AnimationVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

const ScrollReveal = ({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = DURATIONS.default,
  once = false,
  threshold = 0.1,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useViewportDetection<HTMLDivElement>({
    threshold,
    triggerOnce: once,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: EASING,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

// Stagger container for multiple children
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = STAGGER.default,
  once = false,
  threshold = 0.1,
}: StaggerContainerProps) => {
  const { ref, isVisible } = useViewportDetection<HTMLDivElement>({
    threshold,
    triggerOnce: once,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

// Stagger item to use inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
}

export const StaggerItem = ({
  children,
  className,
  variant = "fade-up",
}: StaggerItemProps) => {
  return (
    <motion.div
      variants={variants[variant]}
      transition={{
        duration: DURATIONS.default,
        ease: EASING,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
