import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CharacterReveal from "@/components/CharacterReveal";
import CategoryFilter from "@/components/CategoryFilter";
import OpenSourceCard from "@/components/OpenSourceCard";
import TextReveal from "@/components/TextReveal";
import { useCountUp } from "@/hooks/useCountUp";
import {
  openSourceTools,
  categories,
  totalDownloads,
  type ToolCategory,
} from "@/data/openSourceTools";
import { Download, Users, GitFork, Heart } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const Footer = lazy(() => import("@/components/Footer"));

const OpenSource = () => {
  useSEO({
    title: "Work",
    description: "23+ projects by Burhan Ali — web applications, IoT systems, open source tools, and automation. Browse the full portfolio.",
  });
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");

  const { count: downloadCount, startAnimation } = useCountUp({
    end: Math.round(totalDownloads / 1000),
    duration: 2000,
  });

  // Start animation on mount
  useEffect(() => {
    startAnimation();
  }, []);

  const filteredTools = useMemo(() => {
    if (activeCategory === "all") return openSourceTools;
    return openSourceTools.filter((tool) => tool.category === activeCategory);
  }, [activeCategory]);

  const featuredTool = openSourceTools.find((tool) => tool.featured);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Page Header */}
        <section className="border-b-2 border-foreground px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <CharacterReveal staggerAmount={0.015}>
                  Work & Tools
                </CharacterReveal>
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mx-auto mt-4 h-1 w-24 origin-center bg-foreground"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
              >
                Open source tools and client projects — all built to solve real problems. 40k+ total downloads. Everything MIT-licensed unless noted.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 flex justify-center"
            >
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </motion.div>

            {/* Tools Grid - 2 columns bento style like Work page */}
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {filteredTools.map((tool, i) => (
                <OpenSourceCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <p className="text-lg text-muted-foreground">
                  No tools found in this category yet.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Community CTA */}
        <section className="border-t-2 border-foreground bg-muted/30 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Want to Contribute?
              </h2>
              <p className="mb-8 text-muted-foreground">
                All projects are open source. Star them on GitHub, report issues,
                or submit pull requests. Let's build together.
              </p>
              <a
                href="https://github.com/Burhanali2211"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-8 py-4 font-bold uppercase text-background shadow-[4px_4px_0px_0px_hsl(var(--accent))] transition-all rounded-md hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
              >
                Follow on GitHub
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OpenSource;
