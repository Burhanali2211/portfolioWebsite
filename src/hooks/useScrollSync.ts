import { useRef, useEffect, useState } from "react";
import { useTransform, MotionValue } from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

/**
 * Hook to get element-relative scroll progress synced with Lenis
 * This replaces Framer Motion's useScroll when used with Lenis smooth scrolling
 */
export const useScrollSync = (
  options?: {
    offset?: [string, string];
  }
) => {
  const { scrollY } = useSmoothScroll();
  const ref = useRef<HTMLElement>(null);
  const [bounds, setBounds] = useState({ top: 0, height: 0 });
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateBounds = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setBounds({
          top: rect.top + scrollTop,
          height: rect.height,
        });
        setWindowHeight(window.innerHeight);
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    
    // Update bounds after a short delay to account for layout shifts
    const timeoutId = setTimeout(updateBounds, 100);

    return () => {
      window.removeEventListener("resize", updateBounds);
      clearTimeout(timeoutId);
    };
  }, []);

  // Parse offset strings like "start end" to calculate trigger points
  const parseOffset = (offset: string, elementTop: number, elementHeight: number, winHeight: number) => {
    // "start end" means: start of element meets end of viewport
    // "end start" means: end of element meets start of viewport
    const [elementPos, viewportPos] = offset.split(" ");
    
    let elementOffset = 0;
    if (elementPos === "start") elementOffset = 0;
    else if (elementPos === "end") elementOffset = elementHeight;
    else if (elementPos === "center") elementOffset = elementHeight / 2;
    
    let viewportOffset = 0;
    if (viewportPos === "start") viewportOffset = 0;
    else if (viewportPos === "end") viewportOffset = winHeight;
    else if (viewportPos === "center") viewportOffset = winHeight / 2;
    
    return elementTop + elementOffset - viewportOffset;
  };

  const startOffset = options?.offset?.[0] || "start end";
  const endOffset = options?.offset?.[1] || "end start";

  const scrollStart = parseOffset(startOffset, bounds.top, bounds.height, windowHeight);
  const scrollEnd = parseOffset(endOffset, bounds.top, bounds.height, windowHeight);
  const scrollRange = scrollEnd - scrollStart;

  // Create a derived MotionValue for element-relative progress
  const scrollYProgress = useTransform(
    scrollY,
    [scrollStart, scrollEnd],
    [0, 1]
  );

  return {
    ref,
    scrollY,
    scrollYProgress,
  };
};

/**
 * Simple hook that returns raw Lenis-synced scroll values
 */
export const useLenisScroll = () => {
  const { scrollY, scrollYProgress, isScrolling, direction } = useSmoothScroll();
  return { scrollY, scrollYProgress, isScrolling, direction };
};
