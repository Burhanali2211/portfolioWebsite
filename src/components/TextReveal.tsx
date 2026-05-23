import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";
import { useViewportDetection } from "@/hooks/useViewportDetection";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  animate?: "inView" | "mount";
}

const TextReveal = ({ 
  children, 
  className, 
  delay = 0, 
  stagger = STAGGER.tight,
  once = false,
  animate = "inView"
}: TextRevealProps) => {
  const { ref, isVisible } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: once,
  });

  const words = children.split(/\s+/);

  return (
    <div ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={
            animate === "mount" 
              ? { opacity: 1, y: 0 } 
              : (isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 })
          }
          transition={{
            duration: DURATIONS.fast,
            delay: delay + i * stagger,
            ease: EASING,
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default TextReveal;
