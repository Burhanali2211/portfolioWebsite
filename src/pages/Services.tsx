import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CharacterReveal from "@/components/CharacterReveal";
import ServiceCard from "@/components/ServiceCard";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services, processSteps, faqs } from "@/data/services";
import { personalInfo } from "@/data/personalInfo";

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main ref={containerRef} className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 py-16 md:py-24">
          {/* Background pattern */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 -z-10 opacity-[0.03]"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6 inline-block"
              >
                <AvailabilityBadge />
              </motion.div>

              <h1 className="text-3xl font-black uppercase leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <CharacterReveal staggerAmount={0.012}>
                  Services That Deliver Results
                </CharacterReveal>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
              >
                From web applications to IoT solutions, I build technology that solves real problems.
                Every project is approached with precision, creativity, and a focus on measurable outcomes.
              </motion.p>

              {/* Stats - Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mx-auto mt-10 flex max-w-xl justify-center gap-8 border-t-2 border-b-2 border-foreground py-6"
              >
                {[
                  { value: personalInfo.stats.projectsCompleted, label: "Projects Completed" },
                  { value: personalInfo.stats.clientsSatisfied, label: "Happy Clients" },
                  { value: personalInfo.stats.experience + " yrs", label: "Experience" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-black text-foreground md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-muted/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                What I Offer
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mt-2 h-1 w-16 origin-left bg-foreground"
              />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  size={i === 0 || i === services.length - 1 ? "large" : "medium"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                How I Work
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mt-2 h-1 w-16 origin-left bg-foreground"
              />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: -4, y: -4 }}
                  className="group border-2 border-foreground bg-card p-6 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-shadow hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] rounded-xl"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-accent text-xl font-black text-accent-foreground rounded-md">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Common Questions
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mt-2 h-1 w-16 origin-left bg-foreground"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-2 border-foreground bg-card shadow-[6px_6px_0px_0px_hsl(var(--foreground))] rounded-xl overflow-hidden"
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b-2 border-foreground last:border-b-0"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left font-bold uppercase tracking-wide text-foreground hover:no-underline hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t-2 border-foreground px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Urgency indicator */}
              <div className="mb-6 inline-flex items-center gap-2 border-2 border-accent bg-accent/10 px-4 py-2 rounded-md">
                <Clock size={18} className="text-accent" />
                <span className="text-sm font-bold uppercase tracking-wide text-accent">
                  Response within {personalInfo.availability.responseTime}
                </span>
              </div>

              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tell me about your idea and let's explore how we can bring it to life.
                No commitment required—just a conversation.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/connect">
                    Let's Talk
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/work">See My Work</Link>
                </Button>
              </div>

              {/* Trust signals */}
              <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>NDA Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>Flexible Engagement</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
