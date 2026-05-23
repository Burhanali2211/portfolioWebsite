import { useRef, useEffect, useState, RefObject } from "react";

/**
 * Custom hook for viewport detection that works with Lenis smooth scrolling
 * Optimized for mobile devices and high-precision scroll tracking
 */
export const useViewportDetection = <T extends HTMLElement = HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}): { ref: RefObject<T>; isVisible: boolean; hasBeenVisible: boolean } => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const {
    threshold = 0.05, // Lowered default for better mobile triggering
    rootMargin = "0px 0px -50px 0px", // Trigger slightly before it hits the bottom
    triggerOnce = false
  } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;

        if (isElementVisible) {
          setIsVisible(true);
          setHasBeenVisible(true);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Initial check and observer start
    const observerTimeout = setTimeout(() => {
      if (element) {
        observer.observe(element);

        // Manual check for viewport
        const rect = element.getBoundingClientRect();
        const isInViewport = (
          rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom > 0
        );

        if (isInViewport) {
          setIsVisible(true);
          setHasBeenVisible(true);
        }
      }
    }, 100);

    return () => {
      clearTimeout(observerTimeout);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    ref,
    isVisible,
    hasBeenVisible,
  };
};
