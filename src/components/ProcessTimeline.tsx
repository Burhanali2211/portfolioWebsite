import { motion, useTransform } from "framer-motion";
import { Search, Hammer, Rocket } from "lucide-react";
import { useScrollSync } from "@/hooks/useScrollSync";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Understand",
    description: "Deep dive into the problem. No assumptions.",
  },
  {
    icon: Hammer,
    number: "02",
    title: "Build",
    description: "Iterative development with constant feedback.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Deliver",
    description: "Launch, measure, and refine for real impact.",
  },
];

const ProcessTimeline = () => {
  const { ref, scrollYProgress } = useScrollSync({
    offset: ["start end", "end start"],
  });

  // Map scroll progress to line width (0% to 100%) - kept for desktop visual
  const lineScaleX = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section ref={ref} className="px-6 py-16 md:py-28">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal variant="fade-up" className="mb-16 text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            How I Work
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 bg-foreground" />
        </ScrollReveal>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
          {/* Scroll-linked connecting line - Desktop */}
          <motion.div
            style={{ scaleX: lineScaleX }}
            className="absolute left-0 right-0 top-[60px] hidden h-0.5 origin-left bg-accent md:block"
          />
          <div className="absolute left-0 right-0 top-[60px] hidden h-0.5 bg-border md:block" style={{ zIndex: -1 }} />

          {steps.map((step, i) => (
            <ScrollReveal
              key={i}
              variant="scale"
              delay={i * 0.15}
              className="z-10"
            >
              <TimelineStep step={step} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

interface TimelineStepProps {
  step: (typeof steps)[0];
}

const TimelineStep = ({ step }: TimelineStepProps) => {
  return (
    <div className="group relative flex flex-col items-center text-center">
      {/* Icon Circle */}
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: [0, 5, -5, 0],
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        className="relative z-10 mb-6 flex h-[120px] w-[120px] items-center justify-center border-2 border-foreground bg-background shadow-[6px_6px_0px_0px_hsl(var(--accent))] transition-all group-hover:shadow-[10px_10px_0px_0px_hsl(var(--accent))] group-hover:bg-accent/5"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="flex h-16 w-16 items-center justify-center border-2 border-foreground bg-accent transition-transform group-hover:scale-110"
        >
          <step.icon
            size={28}
            className="text-accent-foreground"
            strokeWidth={2}
          />
        </motion.div>
      </motion.div>

      {/* Step Number - rotates in */}
      <motion.div
        whileHover={{ y: -2, x: 2 }}
        className="mb-2 border-2 border-foreground bg-foreground px-3 py-1 text-xs font-black tracking-widest text-background transition-all group-hover:bg-accent group-hover:text-accent-foreground shadow-[2px_2px_0px_0px_transparent] group-hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
      >
        {step.number}
      </motion.div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-foreground md:text-2xl transition-colors group-hover:text-accent">
        {step.title}
      </h3>

      {/* Description */}
      <p className="max-w-[200px] text-sm text-muted-foreground transition-all group-hover:text-foreground">
        {step.description}
      </p>

      {/* Extra decorative line on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="mt-4 h-0.5 w-12 bg-accent"
      />
    </div>
  );
};

export default ProcessTimeline;
