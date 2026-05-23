import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Globe } from "lucide-react";
import { projects } from "@/data/projects";
import TypewriterText from "./TypewriterText";
import TextRevealMask from "./TextRevealMask";
import TextReveal from "./TextReveal";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";
import { useRef, useState, useEffect } from "react";
import { useSpring, useTransform, useMotionValue } from "framer-motion";

const HeroSection = () => {
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  // Snappy magnetic tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const rotateX = useTransform(springY, [-250, 250], [5, -5]);
  const rotateY = useTransform(springX, [-250, 250], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  return (
    <section className="relative min-h-[100dvh] px-5 py-12 md:px-6 md:py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-accent/15 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1 mt-4 sm:mt-0">
            {/* Neo-brutalist badge - Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATIONS.fast, delay: 0.1 }}
              className="mb-6 inline-block border border-foreground md:border-2 bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
            >
              <TypewriterText
                text="Software Architect × IoT Innovator"
                speed={40}
                delay={400}
              />
            </motion.div>

            {/* H1 - Text Reveal Mask */}
            <TextRevealMask
              as="h1"
              delay={0.2}
              stagger={STAGGER.default}
              once={false} // Allow replay on scroll
              className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {"Building the\nFuture, One\nLine at a Time."}
            </TextRevealMask>

            {/* Accent underline on last line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATIONS.default, delay: 0.8, ease: "easeOut" }}
              className="-mt-2 h-4 w-32 origin-left bg-accent md:h-6 md:w-64"
            />

            {/* Subtitle - Clean Staggered Words */}
            <TextReveal
              delay={0.6}
              animate="mount"
              className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg"
            >
              Crafting IoT solutions and web applications that solve real problems. From embedded systems to full-stack development—no fluff, just impact.
            </TextReveal>

            {/* CTA Buttons - Word Stagger */}
            <div className="mt-8 flex flex-wrap gap-4">
              {["View Work", "Connect"].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.12,
                    duration: DURATIONS.default,
                    ease: EASING,
                  }}
                  className="w-full sm:w-auto"
                >
                  {i === 0 ? (
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link to="/work">
                        {label}
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                      <Link to="/connect">{label}</Link>
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Quick Stats - Letter Stagger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: DURATIONS.fast }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-4 border-t-2 border-foreground pt-6"
            >
              {[
                { value: "50+", label: "Repositories" },
                { value: "3+", label: "Years Exp." },
                { value: "20+", label: "Projects" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-black text-foreground md:text-3xl">
                    {stat.value.split("").map((char, ci) => (
                      <motion.span
                        key={ci}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 1.1 + i * 0.15 + ci * STAGGER.word,
                          duration: DURATIONS.fast,
                          ease: EASING,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {stat.label.split(" ").map((word, wi) => (
                      <motion.span
                        key={wi}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 1.2 + i * 0.15 + wi * STAGGER.tight,
                          duration: DURATIONS.fast,
                        }}
                        className="mr-1 inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Featured Project Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1], // Premium cubic-bezier
              scale: { type: "spring", stiffness: 100, damping: 15, delay: 0.4 }
            }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{
                  opacity: showMessage ? 1 : 0,
                  scale: showMessage ? 1 : 0.8,
                  y: showMessage ? 0 : 10,
                  rotate: showMessage ? [0, -2, 2, 0] : 0
                }}
                transition={{
                  duration: 0.4,
                  rotate: { duration: 0.5, delay: 0.2 }
                }}
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-accent/95 backdrop-blur-md text-accent-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border border-foreground md:border-2 shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] text-[10px] sm:text-sm font-bold z-[60] w-[260px] sm:w-fit whitespace-normal sm:whitespace-nowrap pointer-events-none"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-lg">🏆</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] opacity-70 leading-none mb-1">Secret Unlocked</span>
                    <span className="leading-tight">
                      {"Curiosity Badge: +10% Creativity! ✨".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: showMessage ? 1 : 0, y: showMessage ? 0 : 5 }}
                          transition={{
                            delay: showMessage ? 0.3 + i * 0.015 : 0,
                            duration: 0.2,
                            ease: "easeOut"
                          }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                ref={containerRef}
                className="group relative"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2, // Start after the main entrance animation
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setShowMessage(!showMessage)}
                style={{ perspective: 1000 }}
              >
                {/* Accent Glow Halo */}
                <motion.div
                  className={`absolute -inset-10 bg-accent blur-[80px] transition-opacity duration-500 pointer-events-none ${
                    showMessage ? "opacity-40" : "opacity-0 group-hover:opacity-20"
                  }`}
                />

                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    willChange: "transform"
                  }}
                  whileHover={{
                    x: -4,
                    y: -4,
                    boxShadow: "12px 12px 0px 0px hsl(var(--accent))",
                  }}
                  transition={{ type: "spring", stiffness: 600, damping: 30 }}
                  className="relative aspect-square border border-foreground md:border-2 bg-muted shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] rounded-2xl overflow-hidden"
                >
                  <motion.div
                    initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="h-full w-full"
                  >
                    <motion.img
                      src="/hero.jpg"
                      alt="Burhan Ali"
                      whileHover={{ scale: 1.1 }}
                      className={`h-full w-full object-cover transition-all duration-700 ${
                        showMessage ? "grayscale-0 scale-105" : "grayscale group-hover:grayscale-0"
                      }`}
                      loading="eager"
                      decoding="async"
                    />
                  </motion.div>

                  {/* Glass overlay on hover */}
                  <div className={`absolute inset-0 bg-accent/5 transition-opacity pointer-events-none ${showMessage ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                </motion.div>
              </motion.div>

              {/* Decorative Elements replacing project badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: DURATIONS.fast }}
                className="absolute -bottom-4 -right-4 border border-foreground md:border-2 bg-accent px-4 py-2 rounded-md shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:-right-8"
              >
                <div className="text-sm font-black uppercase text-accent-foreground">
                  Available for Hire
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
