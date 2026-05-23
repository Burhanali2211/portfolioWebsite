import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useViewportDetection } from "@/hooks/useViewportDetection";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";

interface TextRevealMaskProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
  once?: boolean;
}

const TextRevealMask = ({
  children,
  className,
  as: Tag = "h2",
  stagger = STAGGER.default,
  delay = 0,
  once = false, // Default to false for scroll replay
}: TextRevealMaskProps) => {
  const { ref, isVisible } = useViewportDetection<HTMLHeadingElement>({
    threshold: 0.1,
    rootMargin: "-5% 0px -5% 0px",
    triggerOnce: once,
  });

  // Split by explicit line breaks or newlines
  const lines = children.split(/\n|\\n/).map((l) => l.trim()).filter(Boolean);

  return (
    <Tag ref={ref} className={cn("", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={isVisible ? { y: "0%" } : { y: "110%" }}
            transition={{
              delay: isVisible ? delay + i * stagger : 0, // Only delay when animating in
              duration: DURATIONS.default,
              ease: EASING,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default TextRevealMask;
