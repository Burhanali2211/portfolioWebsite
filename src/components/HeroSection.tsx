import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import TextRevealMask from "./TextRevealMask";
import TextReveal from "./TextReveal";
import { EASING, DURATIONS } from "@/lib/animations";
import { useRef } from "react";
import { useSpring, useTransform, useMotionValue } from "framer-motion";
import { personalInfo } from "@/data/personalInfo";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const rotateX = useTransform(springY, [-250, 250], [5, -5]);
  const rotateY = useTransform(springX, [-250, 250], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const trustItems = [
    "23+ projects delivered",
    "15+ clients served",
    "Responds within 24h",
  ];

  return (
    <section className="relative min-h-[100dvh] px-5 py-12 md:px-6 md:py-24 lg:py-32">
      {/* Background grid */}
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
          {/* Left Side */}
          <div className="order-2 lg:order-1 mt-4 sm:mt-0">
            {/* Availability pulse badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATIONS.fast, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 border border-foreground md:border-2 bg-background px-3 py-1.5 shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-foreground">
                Available for New Projects
              </span>
            </motion.div>

            {/* Static H1 */}
            <TextRevealMask
              as="h1"
              delay={0}
              stagger={0.15}
              once={true}
              className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {"I Build\nSoftware\nThat Works."}
            </TextRevealMask>

            {/* Accent underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATIONS.default, delay: 0.8, ease: "easeOut" }}
              className="-mt-2 h-4 w-32 origin-left bg-accent md:h-6 md:w-64"
            />

            {/* Subtitle */}
            <TextReveal
              delay={0.6}
              animate="mount"
              className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg"
            >
              I turn business problems into fast, reliable software. Web apps, IoT systems, and everything in between — built clean, delivered on time.
            </TextReveal>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: DURATIONS.fast }}
              className="mt-5 flex flex-wrap gap-x-4 gap-y-2"
            >
              {trustItems.map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: DURATIONS.fast }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle size={13} className="text-accent flex-shrink-0" strokeWidth={2.5} />
                  {item}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { label: "Book a Free Call →", to: "/connect", primary: true },
                { label: "View Work", to: "/work", primary: false },
              ].map((cta, i) => (
                <motion.div
                  key={cta.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.9 + i * 0.12,
                    duration: DURATIONS.default,
                    ease: EASING,
                  }}
                  className="w-full sm:w-auto"
                >
                  {cta.primary ? (
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link to={cta.to}>{cta.label}</Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                      <Link to={cta.to}>
                        {cta.label}
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: DURATIONS.fast }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-4 border-t-2 border-foreground pt-6"
            >
              {[
                { value: "23+", label: "Projects" },
                { value: "4+", label: "Years Exp." },
                { value: "15+", label: "Clients" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15 + i * 0.1, duration: DURATIONS.fast, ease: EASING }}
                >
                  <div className="text-2xl font-black text-foreground md:text-3xl">{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
              scale: { type: "spring", stiffness: 100, damping: 15, delay: 0.4 }
            }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <motion.div
                ref={containerRef}
                className="group relative"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 1000 }}
              >
                {/* Accent glow on hover */}
                <motion.div className="absolute -inset-10 bg-accent blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

                <motion.div
                  style={{ rotateX, rotateY, willChange: "transform" }}
                  whileHover={{ x: -4, y: -4, boxShadow: "12px 12px 0px 0px hsl(var(--accent))" }}
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
                      alt={personalInfo.name}
                      whileHover={{ scale: 1.05 }}
                      className="h-full w-full object-cover transition-transform duration-700"
                      loading="eager"
                      decoding="async"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              </motion.div>

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: DURATIONS.fast }}
                className="absolute -bottom-4 -right-4 border border-foreground md:border-2 bg-accent px-4 py-2 rounded-md shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:-right-8"
              >
                <div className="flex items-center gap-2 text-sm font-black uppercase text-accent-foreground">
                  <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                  Open to Work
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
