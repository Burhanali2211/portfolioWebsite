import { motion } from "framer-motion";
import { useViewportDetection } from "@/hooks/useViewportDetection";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";
import { CheckCircle, Clock, Code2, ExternalLink, MessageSquare } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";

const workPrinciples = [
  {
    icon: Clock,
    title: "On Time, Every Time",
    body: "Realistic deadlines set upfront. Weekly WhatsApp updates. No radio silence, no last-minute surprises.",
  },
  {
    icon: Code2,
    title: "You Own the Code",
    body: "Full source code delivered on completion. No vendor lock-in, no recurring fees to access your own product.",
  },
  {
    icon: CheckCircle,
    title: "Built to Last",
    body: "Clean architecture, documented handoffs, and a codebase your next developer can actually work with.",
  },
];

const deliveredProjects = [
  {
    client: "TechNurture Labs",
    type: "LMS Platform",
    outcome: "Gamified K-12 learning platform serving schools across India. Real-time analytics, student management, and course delivery.",
    url: "https://technurturelms.in/",
    tech: "React · Django · PostgreSQL",
  },
  {
    client: "OruErp",
    type: "Agency ERP System",
    outcome: "Unified ERP for agency workflows — project tracking, CRM, and financial reporting. 30%+ reduction in admin overhead.",
    url: "http://dezignbuild.site/",
    tech: "React · TypeScript · Supabase",
  },
  {
    client: "Serique Avenue",
    type: "Premium E-Commerce",
    outcome: "High-end e-commerce storefront with full payment integration and luxury brand experience. Live and processing orders.",
    url: "https://www.seriqueavenue.com/",
    tech: "Next.js · Payment Gateway · SEO",
  },
];

const Testimonial = () => {
  const { ref: sectionRef, isVisible } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={sectionRef} className="bg-muted/30 px-6 py-16 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-5xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATIONS.default, ease: EASING }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="mb-4 inline-block border-2 border-foreground bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest text-accent-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))]">
            Track Record
          </div>
          <h2 className="text-3xl font-black uppercase leading-tight tracking-tighter text-foreground md:text-4xl lg:text-5xl">
            Real Projects. Real Results.
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-muted-foreground">
            23+ projects shipped across India. Every one of these is live — click to verify.
          </p>
        </motion.div>

        {/* Delivered projects — verifiable outcomes */}
        <div className="grid gap-5 md:grid-cols-3 mb-16">
          {deliveredProjects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * STAGGER.default, duration: DURATIONS.default, ease: EASING }}
              whileHover={{ x: -3, y: -3 }}
              className="group block border-2 border-foreground bg-background p-6 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-accent">{project.type}</p>
                  <h3 className="mt-0.5 text-base font-black uppercase tracking-tight text-foreground">
                    {project.client}
                  </h3>
                </div>
                <ExternalLink size={14} className="mt-1 flex-shrink-0 text-muted-foreground group-hover:text-accent transition-colors" strokeWidth={2.5} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.outcome}</p>
              <p className="mt-4 text-xs font-bold text-muted-foreground/60 tracking-wide">{project.tech}</p>
            </motion.a>
          ))}
        </div>

        {/* Work principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: DURATIONS.default, ease: EASING }}
          className="mb-4 text-center"
        >
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">How I work on every project</p>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {workPrinciples.map((principle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * STAGGER.default, duration: DURATIONS.default, ease: EASING }}
              className="border-2 border-foreground bg-background p-5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center border-2 border-foreground bg-accent shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                <principle.icon size={18} className="text-accent-foreground" strokeWidth={2.5} />
              </div>
              <h3 className="mb-1.5 text-sm font-black uppercase tracking-tight text-foreground">
                {principle.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{principle.body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA to leave a review */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: DURATIONS.fast }}
          className="mt-12 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Worked with me? A short note goes a long way.
          </p>
          <a
            href={`mailto:${personalInfo.email}?subject=Testimonial — Working with Burhan Ali&body=Hi Burhan, I'd like to share my experience working with you on [project name]...`}
            className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-5 py-2 text-sm font-black uppercase tracking-wide shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_hsl(var(--accent))]"
          >
            <MessageSquare size={14} strokeWidth={2.5} />
            Share Your Experience →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
