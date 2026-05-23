import { useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { useViewportDetection } from "@/hooks/useViewportDetection";
import { EASING, SPRING_CONFIGS } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const { ref: cardRef, isVisible } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: false,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Faster, snappier spring for mouse following
  // Ultra-snappier spring for instant mouse tracking
  const mouseX = useSpring(x, { stiffness: 600, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 600, damping: 30 });

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

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
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: EASING
      }}
      className="group h-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer outline-none">
        <motion.article
          style={{
            rotateX,
            rotateY,
            // @ts-ignore
            "--accent-color": project.accentColor || "hsl(var(--accent))",
            willChange: "transform",
          }}
          whileHover={{
            x: -2,
            y: -2,
            boxShadow: "6px 6px 0px 0px var(--accent-color)",
            transition: { type: "spring", stiffness: 600, damping: 25 }
          }}
          className="relative flex flex-col h-full overflow-hidden border border-foreground md:border-2 bg-card rounded-xl shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
        >
          {/* Shorter Image Aspect Ratio */}
          <div className="relative aspect-[2/1] w-full overflow-hidden border-b border-foreground md:border-b-2 bg-muted rounded-t-xl">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full w-full object-cover"
            />

            {/* Action Badge - Visible on all screens */}
            <div className="absolute right-0 top-0 overflow-hidden">
              <div className="flex h-9 w-9 items-center justify-center border-b border-foreground md:border-b-2 border-l border-foreground md:border-l-2 bg-background text-foreground transition-all duration-200 group-hover:bg-accent group-hover:text-accent-foreground md:h-12 md:w-12">
                <ArrowUpRight size={16} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-[22px]" />
              </div>
            </div>
          </div>

          {/* Content Section - Simplified for Design Focus */}
          <div className="flex flex-1 flex-col p-2.5 md:p-5 lg:p-6">
            <h3 className="text-[clamp(0.8rem,4vw,1.3rem)] font-black uppercase leading-none tracking-tighter text-foreground group-hover:text-accent transition-colors">
              {project.title}
            </h3>

            {/* Show description on mobile now that cards are larger */}
            <p className="mt-3 flex-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-4 md:mt-6">
              <div className="flex items-center gap-2 text-xs md:text-[clamp(0.6rem,2vw,0.75rem)] font-black uppercase tracking-widest text-foreground bg-accent/10 px-3 py-1.5 rounded-sm md:bg-transparent md:px-0 md:py-0">
                <span>View Case Study</span>
                <div className="hidden md:block h-[1.5px] w-4 bg-foreground transition-all duration-300 group-hover:w-8 group-hover:bg-accent" />
              </div>

              <div className="hidden sm:block">
                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                  0{index + 1}
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </a>
    </motion.div>
  );
};

export default ProjectCard;
