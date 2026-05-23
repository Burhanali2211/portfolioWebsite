import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

interface TimelineItem {
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
  highlights?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  type?: "experience" | "education";
}

const Timeline = ({ items, title, type = "experience" }: TimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  const Icon = type === "experience" ? Briefcase : GraduationCap;

  return (
    <div ref={containerRef} className="relative w-full">
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-accent shadow-[3px_3px_0px_0px_hsl(var(--foreground))]">
            <Icon size={20} className="text-accent-foreground" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
            {title}
          </h3>
        </motion.div>
      )}

      <div className="relative">
        {/* Animated progress line - psychological progress indicator */}
        <div className="absolute left-5 top-0 h-full w-1 bg-muted md:left-6">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-accent via-accent to-accent/50"
          />
          {/* Glowing tip effect */}
          <motion.div
            style={{ top: lineHeight }}
            className="absolute -left-0.5 h-3 w-2 rounded-full bg-accent shadow-[0_0_12px_3px_hsl(var(--accent)/0.6)]"
          />
        </div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <TimelineNode 
              key={index} 
              item={item} 
              index={index} 
              type={type}
              isLast={index === items.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TimelineNodeProps {
  item: TimelineItem;
  index: number;
  type: "experience" | "education";
  isLast: boolean;
}

const TimelineNode = ({ item, index, type, isLast }: TimelineNodeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="relative pl-14 md:pl-16"
    >
      {/* Node indicator with pulse effect */}
      <div className="absolute left-3 top-4 md:left-4">
        <div className="relative">
          {/* Pulse ring - creates urgency/attention */}
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className="absolute inset-0 h-5 w-5 rounded-sm border-2 border-accent"
          />
          <div className="relative h-5 w-5 border-2 border-foreground bg-accent shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
            <div className="absolute inset-0.5 bg-accent-foreground/10" />
          </div>
        </div>
      </div>

      {/* Content card - wider, better proportions */}
      <motion.div
        whileHover={{ x: 6, y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="group relative border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-300 hover:shadow-[8px_8px_0px_0px_hsl(var(--accent))] md:p-6"
      >
        {/* Achievement corner badge - authority signal */}
        {index === 0 && (
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center border-2 border-foreground bg-accent shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
            <Award size={14} className="text-accent-foreground" />
          </div>
        )}

        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          {/* Period badge - prominent for timeline scanning */}
          <div className="inline-flex items-center gap-2 border-2 border-foreground bg-accent px-3 py-1 text-xs font-black uppercase tracking-wide text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
            <TrendingUp size={12} />
            {item.period}
          </div>
        </div>

        {/* Title - large and commanding */}
        <h4 className="mt-3 text-lg font-black uppercase leading-tight tracking-tight text-foreground md:text-xl">
          {item.title}
        </h4>

        {/* Company/Institution with icon */}
        <div className="mt-2 flex items-center gap-2">
          {type === "experience" ? (
            <Briefcase size={14} className="text-accent" />
          ) : (
            <GraduationCap size={14} className="text-accent" />
          )}
          <p className="text-sm font-bold text-muted-foreground">
            {item.company || item.institution}
          </p>
        </div>

        {/* Description - scannable */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Highlights as achievement badges - social proof */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.highlights.map((highlight, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="inline-flex items-center gap-1 border border-foreground bg-muted px-2 py-1 text-xs font-semibold text-foreground transition-colors group-hover:border-accent group-hover:bg-accent/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {highlight}
              </motion.span>
            ))}
          </div>
        )}

        {/* Progress indicator line at bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-accent to-accent/30"
        />
      </motion.div>
    </motion.div>
  );
};

export default Timeline;
