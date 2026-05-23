import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "slideRight" | "slideUp" | "fade" | "reveal" | "zoom" | "flip";
}

const variants = {
  slideRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  slideUp: {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  reveal: {
    initial: { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
    animate: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
    exit: { opacity: 0, y: -30, clipPath: "inset(0 0 100% 0)" },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  },
  flip: {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90 },
  },
};

const PageTransition = ({ children, variant = "slideRight" }: PageTransitionProps) => {
  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedVariant}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ 
        willChange: "transform, opacity",
        perspective: variant === "flip" ? 1200 : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
