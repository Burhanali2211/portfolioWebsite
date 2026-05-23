import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, GitBranch, Star, Code2 } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";
import { topLanguages } from "@/data/skills";

const GitHubStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { icon: GitBranch, value: personalInfo.stats.repositories, label: "Repositories" },
    { icon: Star, value: personalInfo.stats.projectsCompleted, label: "Projects" },
    { icon: Code2, value: personalInfo.stats.experience, label: "Years Coding" },
  ];

  return (
    <div ref={ref} className="border-2 border-foreground bg-card p-6 shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-foreground"
        >
          <Github size={20} className="text-background" />
        </motion.div>
        <div>
          <h3 className="font-black uppercase tracking-tight text-foreground">
            GitHub Activity
          </h3>
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-accent"
          >
            @Burhanali2211
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="text-center"
          >
            <stat.icon size={20} className="mx-auto mb-1 text-accent" />
            <CountUp
              target={parseInt(stat.value)}
              isInView={isInView}
              suffix={stat.value.includes("+") ? "+" : ""}
            />
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Languages Bar */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Top Languages
        </p>
        
        {/* Stacked bar */}
        <div className="mb-3 flex h-6 overflow-hidden border-2 border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
          {topLanguages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${lang.percentage}%` } : { width: 0 }}
              transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
              style={{ backgroundColor: lang.color }}
              className="relative"
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {topLanguages.slice(0, 4).map((lang) => (
            <div key={lang.name} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 border border-foreground"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-xs text-muted-foreground">
                {lang.name} ({lang.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animated count-up component
interface CountUpProps {
  target: number;
  isInView: boolean;
  suffix?: string;
}

const CountUp = ({ target, isInView, suffix = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, isInView]);

  return (
    <p className="text-2xl font-black text-foreground">
      {count}
      {suffix}
    </p>
  );
};

export default GitHubStats;
