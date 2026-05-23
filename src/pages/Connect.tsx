import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CharacterReveal from "@/components/CharacterReveal";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ContactFormModal from "@/components/ContactFormModal";
import { Mail, Github, MessageCircle, ArrowUpRight, Calendar } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";

const Connect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const contactLinks = [
    {
      icon: Mail,
      title: "Email",
      subtitle: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Github,
      title: "GitHub",
      subtitle: "@Burhanali2211",
      href: personalInfo.social.github,
      external: true,
    },
    {
      icon: MessageCircle,
      title: "Contact",
      subtitle: "Send me a message",
      isContactForm: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main ref={containerRef} className="relative px-6 py-16 md:py-24 overflow-hidden">
        {/* Background pattern with parallax */}
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
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Side - Text with character reveal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-6"
              >
                <AvailabilityBadge />
              </motion.div>

              <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <CharacterReveal staggerAmount={0.012}>
                  Let's Build Something Great
                </CharacterReveal>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-6 text-lg text-muted-foreground"
              >
                Have a project in mind? I'm always interested in hearing about
                new challenges—whether you need a full application, want to
                improve an existing system, or just want to explore ideas.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="mt-4 text-muted-foreground"
              >
                I typically respond within {personalInfo.availability.responseTime}.
              </motion.p>
            </motion.div>

            {/* Right Side - Contact Card with slide-in */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center"
            >
              <div className="w-full border-2 border-foreground bg-card p-6 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] md:p-8">
                <h2 className="mb-6 text-lg font-black uppercase tracking-tight text-foreground">
                  Contact
                </h2>

                <div className="space-y-4">
                  {contactLinks.map((link, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {link.isContactForm ? (
                        <motion.button
                          onClick={() => setIsContactFormOpen(true)}
                          whileHover={{ x: -3, y: -3 }}
                          className="group flex w-full items-center justify-between border-2 border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
                        >
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ rotate: 10, scale: 1.05 }}
                              className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-accent"
                            >
                              <link.icon
                                size={20}
                                className="text-accent-foreground"
                                strokeWidth={2}
                              />
                            </motion.div>
                            <div className="text-left">
                              <p className="font-bold uppercase tracking-wide text-foreground">
                                {link.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {link.subtitle}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight
                            size={20}
                            className="text-muted-foreground transition-all group-hover:text-accent"
                            strokeWidth={2}
                          />
                        </motion.button>
                      ) : (
                        <motion.a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          whileHover={{ x: -3, y: -3 }}
                          className="group flex items-center justify-between border-2 border-foreground bg-background p-4 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
                        >
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ rotate: 10, scale: 1.05 }}
                              className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-accent"
                            >
                              <link.icon
                                size={20}
                                className="text-accent-foreground"
                                strokeWidth={2}
                              />
                            </motion.div>
                            <div>
                              <p className="font-bold uppercase tracking-wide text-foreground">
                                {link.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {link.subtitle}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight
                            size={20}
                            className="text-muted-foreground transition-all group-hover:text-accent"
                            strokeWidth={2}
                          />
                        </motion.a>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Book a call hint */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 flex items-center gap-3 border-2 border-accent bg-accent/10 p-4"
                >
                  <Calendar
                    size={20}
                    className="text-accent"
                    strokeWidth={2}
                  />
                  <p className="text-sm text-muted-foreground">
                    Prefer a call? Mention it in your message and I'll send a
                    calendar link.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  );
};

export default Connect;
