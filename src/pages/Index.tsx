import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import { useSEO } from "@/hooks/useSEO";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import SocialProofBar from "@/components/SocialProofBar";
import ProjectCard from "@/components/ProjectCard";
import MagneticButton from "@/components/MagneticButton";
import TextRevealMask from "@/components/TextRevealMask";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { projects, Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CoreCapabilities = lazy(() => import("@/components/CoreCapabilities"));
const WorkBento = lazy(() => import("@/components/WorkBento"));
const TechStack = lazy(() => import("@/components/TechStack"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => <div className="w-full h-64 flex items-center justify-center bg-muted/20 animate-pulse" />;

const Index = () => {
  useSEO({
    title: "Burhan Ali",
    description: "Burhan Ali builds web applications, IoT systems, and APIs. 23+ projects delivered, 15+ clients. Based in Kashmir. Book a free call.",
  });
  const gridProjects = projects.slice(0, 6);
  const carouselProjects = projects.slice(6);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <StatsBar />
        <SocialProofBar />

        {/* Featured Work Section */}
        <section className="px-5 pt-12 pb-16 md:px-6 md:pt-32 md:pb-20 lg:pt-40 lg:pb-20">
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

            {/* Bento Grid — mobile 2-col with alternating full-width rows */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {gridProjects.map((project, i) => {
                const isWide = i === 0 || i === 3;
                return (
                  <div key={project.id} className={cn("h-full", isWide ? "col-span-2 lg:col-span-1" : "col-span-1")}>
                    <ProjectCard project={project} index={i} compactOnMobile={!isWide} />
                  </div>
                );
              })}
            </div>



            {/* Call to Action for Work */}
            <ScrollReveal variant="fade-up" className="mt-12 md:mt-24 border-t border-foreground md:border-t-2 pt-10 md:pt-12 text-center">
              <div className="mt-4 md:mt-6">
                <MagneticButton to="/work" className="text-lg px-12 py-6 bg-accent text-accent-foreground border-2 border-foreground shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
                  View Case Studies
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Suspense fallback={<SectionLoader />}>
          <CoreCapabilities />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <WorkBento />
        </Suspense>



        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TechStack />
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
        <ScrollReveal variant="scale" delay={0.6} className="mt-8 flex flex-wrap justify-center gap-4">
          <MagneticButton
            to="/connect"
            className="rounded-md border-2 border-background bg-accent px-12 font-black uppercase tracking-wide text-accent-foreground shadow-[6px_6px_0px_0px_hsl(var(--background))] transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_hsl(var(--background))]"
          >
            Book a Free Call →
          </MagneticButton>
        </ScrollReveal>
      </div>
    </motion.section>
  );
};

const ProjectMiniCard = ({ project }: { project: Project }) => {
  let hostname = "";
  try { hostname = new URL(project.link).hostname.replace("www.", ""); } catch { hostname = project.link; }

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden hover:border-foreground/30 transition-all duration-300 w-[220px] h-[140px]"
    >
      <div className="flex items-center gap-1 px-2 py-1.5 bg-muted/50 border-b border-border/60 flex-shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
        <span className="ml-1.5 text-[8px] font-mono text-muted-foreground truncate">{hostname}</span>
      </div>
      <div
        className="relative flex-1 overflow-hidden"
        style={{ background: project.accentColor ? `${project.accentColor}20` : "hsl(var(--muted))" }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex flex-col justify-end p-2.5">
          <p className="text-xs font-bold text-foreground line-clamp-1">{project.title}</p>
          <p className="text-[9px] text-muted-foreground line-clamp-1 mt-0.5">{project.impactLine}</p>
        </div>
      </div>
    </a>
  );
};

export default Index;
