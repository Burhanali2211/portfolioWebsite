import { useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";
import { useViewportDetection } from "@/hooks/useViewportDetection";
import { EASING, SPRING_CONFIGS } from "@/lib/animations";

interface FeaturedProjectProps {
  project: Project;
}

const FeaturedProject = ({ project }: FeaturedProjectProps) => {
  const { ref: sectionRef, isVisible } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: false,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ultra-snappy mouse tracking for high-end feel
  const mouseXSpring = useSpring(x, { stiffness: 600, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 600, damping: 30 });

  // Micro-interaction: Mouse-tracked spotlight
  const spotlightX = useTransform(mouseXSpring, (val) => `${50 + (val / 10)}%`);
  const spotlightY = useTransform(mouseYSpring, (val) => `${50 + (val / 10)}%`);
  const spotlight = useMotionTemplate`radial-gradient(800px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.08), transparent 80%)`;

  // Micro-interaction: Subtle content parallax
  const contentX = useTransform(mouseXSpring, [-300, 300], [5, -5]);
  const contentY = useTransform(mouseYSpring, [-300, 300], [5, -5]);
  const imageScale = useTransform(mouseXSpring, [-300, 300], [1.02, 1.08]);

  const boundsRef = useRef<DOMRect | null>(null);

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    boundsRef.current = e.currentTarget.getBoundingClientRect();
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!boundsRef.current) return;
    const rect = boundsRef.current;
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left - width / 2;
    const mouseYPos = e.clientY - rect.top - height / 2;
    x.set(mouseXPos);
    y.set(mouseYPos);
  }

  function handleMouseLeave() {
    boundsRef.current = null;
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: EASING }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1500 }}
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer outline-none">
        <motion.div
          style={{
            // @ts-ignore
            "--accent-color": project.accentColor || "hsl(var(--accent))",
            willChange: "transform",
          }}
          whileHover={{
            x: -4,
            y: -4,
            boxShadow: "12px 12px 0px 0px var(--accent-color)",
            transition: { type: "spring", stiffness: 600, damping: 30 }
          }}
          className="relative overflow-hidden border border-foreground md:border-2 bg-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] rounded-2xl"
        >
          {/* Interactive Spotlight Micro-interaction */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: spotlight }}
          />

          {/* Subtle Accent Glow */}
          <div className="absolute -inset-20 bg-[var(--accent-color)] opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[400px] overflow-hidden">
            {/* Image Section */}
            <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-7 overflow-hidden bg-muted border-b border-foreground md:border-b-2 lg:border-b-0 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
              <motion.img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                style={{ scale: imageScale }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/5 transition-opacity group-hover:opacity-0" />

              <div className="absolute left-4 top-4 z-10 md:left-6 md:top-6">
                <div className="border border-foreground md:border-2 bg-accent px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-accent-foreground rounded-md shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))] md:shadow-[3px_3px_0px_0px_hsl(var(--foreground))] md:text-[10px] md:px-4 md:py-1.5">
                  Featured Case Study
                </div>
              </div>
            </div>

            {/* Content Section - Simplified for Mobile */}
            <motion.div
              style={{ x: contentX, y: contentY }}
              className="relative flex flex-col justify-center bg-card p-4 sm:p-6 lg:p-8 xl:p-10 lg:col-span-5 lg:border-l-2 border-foreground"
            >
              <div className="flex flex-col gap-3 lg:gap-6">
                <div>
                  <h3 className="text-[clamp(1.5rem,6vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-[clamp(0.875rem,3vw,1.25rem)] font-bold italic text-accent leading-tight sm:mt-3">
                    {project.impactLine}
                  </p>
                </div>

                {/* Hide text-heavy description on mobile */}
                <p className="hidden md:block mt-2 line-clamp-3 text-base leading-relaxed text-muted-foreground sm:mt-4 md:max-w-sm">
                  {project.problem}
                </p>

                {/* Hide technical pills on mobile */}
                {project.technicalDetails && (
                  <div className="hidden md:flex flex-wrap gap-2 pt-2">
                    {project.technicalDetails.split(',').slice(0, 3).map((tech) => (
                      <span key={tech} className="border border-foreground/20 bg-muted/50 px-2 py-0.5 text-[10px] uppercase font-bold text-muted-foreground rounded-sm">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between group/link md:mt-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center border border-foreground md:border-2 bg-foreground text-background transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground rounded-full shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] group-hover:shadow-[0px_0px_0px_0px_hsl(var(--foreground))] md:h-14 md:w-14">
                    <ArrowRight size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-1 md:size-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground md:text-xs">
                    View Project
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};

export default FeaturedProject;
