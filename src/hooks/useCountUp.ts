import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number>();

  const startAnimation = () => {
    const startTime = performance.now();
    setIsComplete(false);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = start + (end - start) * easeOut;

      setCount(Number(currentCount.toFixed(decimals)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const formattedCount = `${prefix}${count}${suffix}`;

  return { count, formattedCount, startAnimation, isComplete };
};
