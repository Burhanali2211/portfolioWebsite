import { useEffect } from "react";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

/**
 * Hook to disable smooth scrolling when a modal is open
 * Prevents background scrolling while allowing modal content to scroll
 */
export const useModalScroll = (isOpen: boolean) => {
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      // Ensure Lenis is restarted when component unmounts
      lenis.start();
    };
  }, [isOpen, lenis]);
};

export default useModalScroll;
