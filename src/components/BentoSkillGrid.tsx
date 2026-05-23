import { cn } from "@/lib/utils";
import { skillCategories } from "@/data/skills";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const skills = skillCategories;

const BentoSkillGrid = () => {
  return (
    <section className="bg-muted/30 px-5 py-16 md:px-6 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal variant="fade-up" once={false} className="mb-12 text-center">
          <div>
            <h2 className="text-[clamp(1.25rem,5vw,2.25rem)] font-black uppercase tracking-tight text-foreground">
              What I Build
            </h2>
          </div>
          <div className="mx-auto mt-2 h-1 w-16 bg-foreground" />
        </ScrollReveal>

        <StaggerContainer once={false} threshold={0.01} className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 lg:gap-5">
          {skills.map((skill, i) => (
            <StaggerItem
              key={i}
              variant="scale"
              className={cn(
                skill.size === "large" ? "col-span-2" : "col-span-1",
                "h-full"
              )}
            >
              <SkillCard skill={skill} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: (typeof skills)[0];
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="group relative h-full overflow-hidden rounded-xl border border-foreground md:border-2 bg-background p-3 md:p-6 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_var(--accent-color,hsl(var(--accent)))]"
      style={{
        // @ts-ignore
        "--accent-color": "hsl(var(--accent))"
      }}
    >
      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
        className="mb-3 flex h-9 w-9 items-center justify-center border border-foreground md:border-2 bg-accent md:h-12 md:w-12 rounded-lg shadow-[2px_2px_0px_0px_hsl(var(--foreground))] group-hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all"
      >
        <skill.icon
          size={20}
          className="text-accent-foreground"
          strokeWidth={2}
        />
      </motion.div>

      <h3 className="text-[clamp(0.8rem,3vw,1rem)] font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-accent">
        <span>
          {skill.title}
        </span>
      </h3>

      {/* Description hidden on mobile to prioritize design rhythm */}
      <p className="mt-2 hidden text-xs leading-tight text-muted-foreground md:block md:text-sm">
        {skill.description}
      </p>

      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        whileHover={{ scale: 1.2, rotate: 0 }}
        className="absolute -bottom-1.5 -right-1.5 h-6 w-6 bg-accent opacity-0 group-hover:opacity-100 transition-all md:-bottom-2 md:-right-2 md:h-8 md:w-8"
      />
    </motion.div>
  );
};

export default BentoSkillGrid;
