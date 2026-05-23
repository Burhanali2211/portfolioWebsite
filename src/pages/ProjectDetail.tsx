import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero image parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Project not found.</p>
            <Button
              asChild
              variant="ghost"
              className="mt-4 rounded-md border-2 border-foreground font-bold uppercase shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
            >
              <Link to="/work">
                <ArrowLeft size={16} className="mr-2" />
                Back to Work
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Image - Neo Brutalist with parallax */}
        <section ref={heroRef} className="px-6 pt-8 md:px-12 md:pt-12 lg:px-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-5xl"
          >
            <motion.div
              style={{ y: imageY, rotate: imageRotate }}
              className="border-2 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] overflow-hidden rounded-xl"
            >
              <motion.img
                src={project.image}
                alt={project.title}
                style={{ scale: imageScale }}
                className="aspect-[16/9] w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Content */}
        <section className="px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <ScrollReveal variant="fade-up" delay={0.1}>
              <div className="mb-12 text-center">
                <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  {project.title}
                </h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mx-auto mt-4 inline-block border-2 border-foreground bg-accent px-4 py-2 rounded-md shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
                >
                  <p className="text-lg font-bold text-accent-foreground md:text-xl">
                    {project.impactLine}
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Content Sections with stagger */}
            <div className="space-y-6">
              <ScrollReveal variant="fade-up" delay={0.2}>
                <div className="border-2 border-foreground bg-muted/20 p-6 rounded-xl shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:p-8">
                  <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    The Problem
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-foreground">
                    {project.problem}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.3}>
                <div className="border-2 border-foreground bg-muted/20 p-6 rounded-xl shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:p-8">
                  <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    What Was Done
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-foreground">
                    {project.whatWasDone}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="scale" delay={0.4}>
                <div className="border-2 border-accent bg-accent/10 p-6 rounded-xl shadow-[4px_4px_0px_0px_hsl(var(--accent))] md:p-8">
                  <h2 className="text-xs font-black uppercase tracking-widest text-accent">
                    The Outcome
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-foreground">
                    {project.outcome}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Technical Details */}
            {project.technicalDetails && (
              <ScrollReveal variant="fade-up" delay={0.2}>
                <div className="mt-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value="tech"
                      className="border-2 border-foreground px-6 rounded-xl shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
                    >
                      <AccordionTrigger className="py-4 text-sm font-bold uppercase tracking-wide text-muted-foreground hover:no-underline">
                        Technical Details
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
                          {project.technicalDetails}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ScrollReveal>
            )}

            {/* Navigation */}
            <ScrollReveal variant="fade-up" delay={0.2}>
              <div className="mt-16 flex items-center justify-between border-t-2 border-foreground pt-8">
                {prevProject ? (
                  <Button
                    asChild
                    variant="ghost"
                    className="rounded-md border-2 border-foreground font-bold uppercase shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_hsl(var(--accent))]"
                  >
                    <Link to={`/work/${prevProject.id}`}>
                      <ArrowLeft size={16} />
                      <span className="hidden sm:inline">{prevProject.title}</span>
                      <span className="sm:hidden">Prev</span>
                    </Link>
                  </Button>
                ) : (
                  <div />
                )}

                {nextProject ? (
                  <Button
                    asChild
                    variant="ghost"
                    className="rounded-md border-2 border-foreground font-bold uppercase shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_hsl(var(--accent))]"
                  >
                    <Link to={`/work/${nextProject.id}`}>
                      <span className="hidden sm:inline">{nextProject.title}</span>
                      <span className="sm:hidden">Next</span>
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                ) : (
                  <div />
                )}
              </div>
            </ScrollReveal>

            {/* Back to Work */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Button
                asChild
                className="rounded-md border-2 border-foreground bg-foreground font-bold uppercase shadow-[4px_4px_0px_0px_hsl(var(--accent))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
              >
                <Link to="/work">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to all projects
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
