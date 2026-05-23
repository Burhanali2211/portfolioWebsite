import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Monitor } from "lucide-react";
import { openSourceTools } from "@/data/openSourceTools";

const OpenSourceHighlight = () => {
  const segitelep = openSourceTools.find((t) => t.id === "segitelep");
  
  if (!segitelep) return null;

  return (
    <section className="bg-background px-6 py-12 md:py-20 border-t-2 border-foreground">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to={`/tools/${segitelep.id}`}
            className="group flex flex-col md:flex-row items-center justify-between w-full border-2 border-foreground bg-background p-4 md:px-10 md:py-6 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[8px_8px_0px_0px_hsl(var(--accent))] hover:-translate-y-1 hover:-translate-x-1 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-center md:text-left">
              <span className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground border-b-2 md:border-b-0 md:border-r-2 border-foreground/20 pb-2 md:pb-0 md:pr-8">
                <Monitor size={16} />
                Open Source
              </span>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {segitelep.name}
                </h3>
                <p className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">
                  — {segitelep.tagline}
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex items-center justify-center h-12 w-12 border-2 border-foreground bg-accent text-accent-foreground group-hover:bg-foreground group-hover:text-background transition-colors rounded-none">
              <ArrowRight size={24} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSourceHighlight;
