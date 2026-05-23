import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useMotionValue, MotionValue } from "framer-motion";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  isScrolling: MotionValue<boolean>;
  direction: MotionValue<"up" | "down" | null>;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollY: null as unknown as MotionValue<number>,
  scrollYProgress: null as unknown as MotionValue<number>,
  isScrolling: null as unknown as MotionValue<boolean>,
  direction: null as unknown as MotionValue<"up" | "down" | null>,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const isScrolling = useMotionValue(false);
  const direction = useMotionValue<"up" | "down" | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    });

    lenisRef.current = lenis;

    // Force a resize event after Lenis initializes to trigger viewport recalculation
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);

    lenis.on("scroll", (e: any) => {
      const progress = e.limit > 0 ? e.scroll / e.limit : 0;

      // Sync with Framer Motion MotionValues (No re-renders triggered)
      scrollY.set(e.scroll);
      scrollYProgress.set(progress);
      isScrolling.set(e.velocity !== 0);
      direction.set(e.direction > 0 ? "down" : e.direction < 0 ? "up" : null);
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollY, scrollYProgress, isScrolling, direction]);

  // Reset scroll on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      scrollY.set(0);
      scrollYProgress.set(0);
      isScrolling.set(false);
      direction.set(null);
    }
  }, [location.pathname, scrollY, scrollYProgress, isScrolling, direction]);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        scrollY,
        scrollYProgress,
        isScrolling,
        direction,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
