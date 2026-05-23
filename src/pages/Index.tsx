import { Link } from "react-router-dom";
import { motion, useTransform } from "framer-motion";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectCard from "@/components/ProjectCard";
import MagneticButton from "@/components/MagneticButton";
import TextRevealMask from "@/components/TextRevealMask";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { useScrollSync } from "@/hooks/useScrollSync";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Lazy load heavy below-the-fold components
const BentoSkillGrid = lazy(() => import("@/components/BentoSkillGrid"));
const ServicesCarousel = lazy(() => import("@/components/ServicesCarousel"));
const ProcessTimeline = lazy(() => import("@/components/ProcessTimeline"));
const Testimonial = lazy(() => import("@/components/Testimonial"));
const OpenSourceHighlight = lazy(() => import("@/components/OpenSourceHighlight"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => <div className="w-full h-64 flex items-center justify-center bg-muted/20 animate-pulse" />;

const Index = () => {
  const featuredProject = projects[0];
  const gridProjects = projects.slice(1, 6); // Slice 5 projects for the 2-1-2 rhythm

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <StatsBar />

        {/* Featured Work Section */}
        <section className="px-5 py-12 md:px-6 md:py-32 lg:py-40">
          <div className="mx-auto max-w-6xl">
            <header className="mb-10 md:mb-20 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <TextRevealMask className="text-3xl font-black uppercase leading-[0.85] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  {"Selected\nProjects"}
                </TextRevealMask>
                <TextReveal
                  delay={0.4}
                  className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl md:leading-relaxed"
                >
                  A curated collection of digital experiences focusing on high-end aesthetic and mission-critical performance.
                </TextReveal>
              </div>
              <div className="flex lg:col-span-4 lg:justify-end">
                <ScrollReveal variant="scale" delay={0.5}>
                  <Button variant="outline" size="lg" className="rounded-md border-2 px-8 font-black uppercase shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] transition-all" asChild>
                    <Link to="/work">
                      Full Archive
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                </ScrollReveal>
              </div>
            </header>

            {/* Structured Neo-Brutalist Layout */}
            <div className="flex flex-col gap-12 md:gap-20 lg:gap-24">
              {/* Featured Item */}
              <div className="w-full">
                <FeaturedProject project={featuredProject} />
              </div>

              {/* Project Grid - 1 Col on Mobile, 2-1-2 Rhythm on Tablet/Desktop */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
                {gridProjects.map((project, i) => (
                  <div
                    key={project.id}
                    className={cn(
                      i === 2 ? "md:col-span-2 lg:col-span-1" : "col-span-1", // Index 2 is the middle "one in a row" on tablet
                      "col-span-1"
                    )}
                  >
                    <ProjectCard project={project} index={i} />
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action for Work */}
            <ScrollReveal variant="fade-up" className="mt-12 md:mt-32 border-t border-foreground md:border-t-2 pt-10 md:pt-16 text-center">
              <div className="mt-6 md:mt-10">
                <MagneticButton to="/work" className="text-lg px-12 py-6 bg-accent text-accent-foreground border-2 border-foreground shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
                  View Case Studies
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Suspense fallback={<SectionLoader />}>
          <BentoSkillGrid />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ServicesCarousel />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProcessTimeline />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Testimonial />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <OpenSourceHighlight />
        </Suspense>

        {/* CTA Section */}
        <CTASection />
      </main>
      <Suspense fallback={<div className="h-20 bg-foreground" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-y-2 border-foreground bg-foreground px-6 py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-2xl text-center">
        <TextRevealMask
          as="h2"
          delay={0}
          stagger={0.15}
          className="text-3xl font-black uppercase tracking-tight text-background md:text-4xl lg:text-5xl"
        >
          {"Ready to build\nsomething?"}
        </TextRevealMask>
        <TextReveal
          delay={0.4}
          className="mt-4 text-background/70 justify-center"
        >
          Let's create something that actually works. No fluff, just impact.
        </TextReveal>
        <ScrollReveal variant="scale" delay={0.6} className="mt-8">
          <MagneticButton
            to="/connect"
            className="rounded-md border-2 border-background bg-accent px-12 font-black uppercase tracking-wide text-accent-foreground shadow-[6px_6px_0px_0px_hsl(var(--background))] transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_hsl(var(--background))]"
          >
            Let's Talk
          </MagneticButton>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

export default Index;
