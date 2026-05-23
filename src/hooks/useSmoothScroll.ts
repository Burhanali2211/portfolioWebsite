import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

// Hook for scroll-triggered animations
export const useScrollTrigger = (threshold: number = 0.1) => {
  const { scrollProgress } = useSmoothScroll();
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (scrollProgress >= threshold && !triggered) {
      setTriggered(true);
    }
  }, [scrollProgress, threshold, triggered]);

  return triggered;
};

// Hook for scroll direction detection
export const useScrollDirection = () => {
  const { direction, isScrolling } = useSmoothScroll();
  return { direction, isScrolling };
};

// Hook for scroll progress
export const useScrollProgress = () => {
  const { scrollProgress, scrollY } = useSmoothScroll();
  return { progress: scrollProgress, scrollY };
};
