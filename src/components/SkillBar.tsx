import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillBarProps {
  name: string;
  proficiency: number;
  index?: number;
}

const SkillBar = ({ name, proficiency, index = 0 }: SkillBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-wide text-foreground">
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
          className="text-sm font-black text-accent"
        >
          {proficiency}%
        </motion.span>
      </div>

      <div className="relative h-4 border border-foreground md:border-2 bg-muted shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[3px_3px_0px_0px_hsl(var(--foreground))]">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${proficiency}%` } : { width: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-y-0 left-0 bg-accent"
        />

        {/* Animated stripes overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 4px,
              hsl(var(--foreground)) 4px,
              hsl(var(--foreground)) 6px
            )`,
            clipPath: `inset(0 ${100 - proficiency}% 0 0)`,
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
