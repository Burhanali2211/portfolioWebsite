import { useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { useViewportDetection } from "@/hooks/useViewportDetection";
import { EASING, SPRING_CONFIGS } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  compactOnMobile?: boolean;
}

const ProjectCard = ({ project, index = 0, compactOnMobile = false }: ProjectCardProps) => {
  const { ref: cardRef, isVisible } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: false,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 600, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 600, damping: 30 });

  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

  const boundsRef = useRef<DOMRect | null>(null);

  let hostname = "";
  try {
    hostname = new URL(project.link).hostname.replace("www.", "");
  } catch {
    hostname = project.link;
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    boundsRef.current = e.currentTarget.getBoundingClientRect();
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!boundsRef.current) return;
    const rect = boundsRef.current;
    const mouseXPos = e.clientX - rect.left - rect.width / 2;
    const mouseYPos = e.clientY - rect.top - rect.height / 2;
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
      transition={{ delay: index * 0.05, duration: 0.5, ease: EASING }}
      className="group h-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer outline-none">
        <motion.article
          style={{ rotateX, rotateY, willChange: "transform" }}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
          className="relative flex flex-col h-full rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:border-foreground/30 group-hover:shadow-md overflow-hidden"
        >
          {/* Browser Frame */}
          <div className="border-b border-border/60 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
              <span className="h-2 w-2 rounded-full bg-green-400/60" />
              <span className="ml-2 flex-1 bg-background/60 rounded text-[9px] text-muted-foreground px-2 py-0.5 font-mono truncate border border-border/30">
                {hostname}
              </span>
            </div>
            <div
              className={cn("relative overflow-hidden", compactOnMobile ? "h-24 sm:h-36" : "h-36")}
              style={{ background: project.accentColor ? `${project.accentColor}20` : "hsl(var(--muted))" }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className={cn("flex flex-col flex-1 justify-between", compactOnMobile ? "p-3 sm:p-5 md:p-6" : "p-5 md:p-6")}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-semibold tracking-widest text-muted-foreground uppercase opacity-70 group-hover:text-accent group-hover:opacity-100 transition-colors">
                0{index + 1} // CASE
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-45">
                <ArrowUpRight size={15} strokeWidth={2} />
              </div>
            </div>

            <div className="flex-1">
              <h3 className={cn("font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200", compactOnMobile ? "text-sm sm:text-base md:text-lg" : "text-base md:text-lg")}>
                {project.title}
              </h3>
              <p className="mt-1 text-[10px] font-semibold tracking-wide uppercase text-accent/90">
                {project.impactLine}
              </p>
              <p className={cn("mt-2 text-xs text-muted-foreground leading-relaxed", compactOnMobile ? "line-clamp-1 sm:line-clamp-2" : "line-clamp-2")}>
                {project.problem}
              </p>
            </div>

            <div className={cn("pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2", compactOnMobile ? "mt-2 sm:mt-3" : "mt-3")}>
              {project.technicalDetails ? (
                <div className="flex flex-wrap gap-1">
                  {project.technicalDetails.split(",").slice(0, 2).map((tech) => (
                    <span key={tech} className="text-[10px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full border border-border/40">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="text-[10px] font-semibold tracking-wider uppercase text-foreground/80 group-hover:text-accent transition-colors ml-auto">
                View →
              </span>
            </div>
          </div>
        </motion.article>
      </a>
    </motion.div>
  );
};

export default ProjectCard;
