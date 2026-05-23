import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CharacterReveal from "./CharacterReveal";
import TextRevealMask from "./TextRevealMask";
import { useViewportDetection } from "@/hooks/useViewportDetection";
import { SPRING_CONFIGS } from "@/lib/animations";

const Testimonial = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, SPRING_CONFIGS.gentle);
  const springY = useSpring(mouseY, SPRING_CONFIGS.gentle);

  const textX = useTransform(springX, [-200, 200], [-8, 8]);
  const textY = useTransform(springY, [-200, 200], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const { ref: quoteRef, isVisible: quoteVisible } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "-10% 0px -10% 0px",
    triggerOnce: false, // Enable scroll replay
  });

  const { ref: attributionRef, isVisible: attributionVisible } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "-10% 0px -10% 0px",
    triggerOnce: false, // Enable scroll replay
  });

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-muted/30 px-6 py-16 md:py-32 overflow-hidden cursor-default"
    >
      <div className="mx-auto max-w-4xl">
        <div ref={quoteRef} className="text-center">
          {/* Neo-brutalist quote marks with spring bounce and floating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
            animate={quoteVisible ? {
              opacity: 1,
              scale: 1,
              rotate: [0, 5, 0, -5, 0],
              y: [0, -10, 0]
            } : { opacity: 0, scale: 0.3, rotate: -15 }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6, type: "spring" },
              rotate: { repeat: Infinity, duration: 4, ease: "linear" },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            className="mb-8 inline-block border-2 border-foreground bg-accent px-4 py-2 text-4xl font-black text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
          >
            "
          </motion.div>

          {/* Character reveal quote with parallax */}
          <motion.div
            style={{ x: textX, y: textY }}
            className="text-2xl font-bold leading-relaxed tracking-tight md:text-3xl lg:text-4xl text-foreground"
          >
            <CharacterReveal staggerAmount={0.008} isVisible={quoteVisible}>
              Great software isn't about the code—it's about the problems it solves and the lives it improves.
            </CharacterReveal>
          </motion.div>

          {/* Attribution slides up from mask */}
          <div className="mt-10" ref={attributionRef}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={attributionVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: attributionVisible ? 0.5 : 0, duration: 0.3 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="inline-block border-2 border-foreground bg-background px-4 py-2 shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-all hover:shadow-[5px_5px_0px_0px_hsl(var(--accent))]"
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={attributionVisible ? { y: "0%" } : { y: "100%" }}
                  transition={{ delay: attributionVisible ? 0.6 : 0, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm font-black uppercase tracking-wide text-foreground"
                >
                  — My Philosophy
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
