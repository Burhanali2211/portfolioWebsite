import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import CharacterReveal from "@/components/CharacterReveal";

const Work = () => {
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
                  Selected Work
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
                Projects that delivered real results—from healthcare to finance,
                education to retail.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid - 2 columns bento style with stagger */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Work;
