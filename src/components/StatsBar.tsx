import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useViewportDetection } from "@/hooks/useViewportDetection";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";

const stats = [
  { value: 6, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "%", label: "Avg. Performance Gain" },
  { value: 5, suffix: "", label: "Industries Served" },
];

const StatsBar = () => {
  const { ref, isVisible } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
  });

  // Different Y offsets for staggered reveal
  const yOffsets = [60, 40, 20];

  return (
    <section
      ref={ref}
      className="border-y-2 border-foreground bg-accent px-6 py-8 md:py-12"
    >
      <div className="mx-auto max-w-5xl">
        {/* Animated connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.2, duration: DURATIONS.default, ease: EASING }}
          className="mx-auto mb-6 h-0.5 max-w-md origin-left bg-accent-foreground/20 hidden md:block"
        />

        <div className="grid grid-cols-3 gap-2 text-center md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: yOffsets[i] }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffsets[i] }}
              transition={{ delay: i * STAGGER.default, duration: DURATIONS.default, ease: EASING }}
              className={cn(
                "relative",
                i !== stats.length - 1 &&
                "md:border-r-2 md:border-foreground"
              )}
            >
              <CountUpNumber
                end={stat.value}
                suffix={stat.suffix}
                isVisible={isVisible}
                delay={i * 150}
              />
              {/* Label with clip-mask slide up */}
              <div className="mt-1 overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={isVisible ? { y: "0%" } : { y: "100%" }}
                  transition={{ delay: 0.4 + i * STAGGER.tight, duration: DURATIONS.fast, ease: EASING }}
                  className="text-[10px] font-bold uppercase tracking-wider text-accent-foreground/70 sm:text-xs sm:tracking-widest"
                >
                  {stat.label}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface CountUpNumberProps {
  end: number;
  suffix: string;
  isVisible: boolean;
  delay: number;
}

const CountUpNumber = ({ end, suffix, isVisible, delay }: CountUpNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    const timeout = setTimeout(() => {
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(end * easeOut));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, end, delay]);

  return (
    <div className="text-xl font-black text-accent-foreground sm:text-3xl md:text-4xl">
      {count}{suffix}
    </div>
  );
};

export default StatsBar;
