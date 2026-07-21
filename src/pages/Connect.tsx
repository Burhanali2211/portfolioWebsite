import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CharacterReveal from "@/components/CharacterReveal";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { Mail, MessageCircle, Calendar, ArrowRight, Send, CheckCircle } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";
import { sendToTelegram, formatProjectBriefForTelegram } from "@/lib/telegram";
import { Button } from "@/components/ui/button";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";
import { useSEO } from "@/hooks/useSEO";

const projectTypes = ["Web Application", "IoT / Embedded", "Mobile App", "E-commerce", "API / Backend", "Other"];
const budgets = ["< ₹25,000", "₹25k – ₹75k", "₹75k – ₹2L", "₹2L+", "Let's discuss"];
const timelines = ["ASAP (< 2 weeks)", "1 month", "2–3 months", "3+ months", "Flexible"];

const contactPaths = [
  {
    icon: Calendar,
    title: "Book a Free Call",
    subtitle: "30-min discovery call — no commitment",
    cta: "Schedule Now →",
    href: `https://wa.me/${personalInfo.whatsapp}?text=Hi%20Burhan,%20I'd%20like%20to%20book%20a%20discovery%20call.`,
    accent: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Fastest response — usually within an hour",
    cta: "Open WhatsApp →",
    href: `https://wa.me/${personalInfo.whatsapp}?text=Hi%20Burhan,%20I%20found%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.`,
    accent: false,
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: personalInfo.email,
    cta: "Send Email →",
    href: `mailto:${personalInfo.email}`,
    accent: false,
  },
];

const Connect = () => {
  useSEO({
    title: "Contact",
    description: "Book a free 30-min discovery call with Burhan Ali. WhatsApp, email, or project brief form. Replies within 24h.",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.projectType || !formState.description) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    const message = formatProjectBriefForTelegram(formState);
    const ok = await sendToTelegram(message);
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try WhatsApp or email instead.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main ref={containerRef} className="relative px-6 py-16 md:py-24 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none">
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
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
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
                Let's Build Something
              </CharacterReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-5 max-w-xl text-lg text-muted-foreground"
            >
              Choose how you'd like to connect. For fast responses, WhatsApp is best — for detailed briefs, use the form below.
            </motion.p>
          </motion.div>

          {/* 3-path contact cards */}
          <div className="mb-16 grid gap-4 sm:grid-cols-3">
            {contactPaths.map((path, i) => (
              <motion.a
                key={i}
                href={path.href}
                target={path.href.startsWith("http") ? "_blank" : undefined}
                rel={path.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * STAGGER.default, duration: DURATIONS.default, ease: EASING }}
                whileHover={{ x: -3, y: -3 }}
                className={`group flex flex-col gap-4 border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] ${
                  path.accent ? "bg-accent text-accent-foreground" : "bg-background"
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center border-2 ${
                  path.accent ? "border-accent-foreground/40 bg-accent-foreground/10" : "border-foreground bg-accent"
                }`}>
                  <path.icon size={20} className={path.accent ? "text-accent-foreground" : "text-accent-foreground"} strokeWidth={2} />
                </div>
                <div>
                  <p className={`font-black uppercase tracking-tight ${path.accent ? "text-accent-foreground" : "text-foreground"}`}>
                    {path.title}
                  </p>
                  <p className={`mt-1 text-sm ${path.accent ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                    {path.subtitle}
                  </p>
                </div>
                <div className={`mt-auto flex items-center gap-1 text-sm font-black uppercase tracking-wide ${
                  path.accent ? "text-accent-foreground" : "text-foreground"
                }`}>
                  {path.cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="mb-16 h-0.5 origin-left bg-foreground/20"
          />

          {/* Project Brief Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: DURATIONS.default, ease: EASING }}
          >
            <div className="mb-8">
              <div className="mb-3 inline-block border-2 border-foreground bg-foreground px-3 py-1 text-xs font-black uppercase tracking-widest text-background">
                Or Send a Brief
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Tell Me About Your Project
              </h2>
              <p className="mt-2 text-muted-foreground">
                The more detail you share, the better I can respond with a real estimate.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-2 border-foreground bg-accent p-10 text-center shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
              >
                <CheckCircle size={40} className="mx-auto mb-4 text-accent-foreground" strokeWidth={2} />
                <h3 className="text-xl font-black uppercase text-accent-foreground">Brief Received!</h3>
                <p className="mt-2 text-accent-foreground/80">
                  I'll review and reply to <strong>{formState.email}</strong> within 24 hours.
                </p>
                <p className="mt-4 text-sm text-accent-foreground/60">
                  For faster response, message on{" "}
                  <a
                    href={`https://wa.me/${personalInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-foreground">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Acme Corp / Your Name"
                      className="w-full border-2 border-foreground bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] outline-none focus:shadow-[3px_3px_0px_0px_hsl(var(--accent))] transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-foreground">
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full border-2 border-foreground bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] outline-none focus:shadow-[3px_3px_0px_0px_hsl(var(--accent))] transition-shadow"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-foreground">
                    WhatsApp / Phone <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full border-2 border-foreground bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] outline-none focus:shadow-[3px_3px_0px_0px_hsl(var(--accent))] transition-shadow"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wide text-foreground">
                    Project Type <span className="text-accent">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleSelect("projectType", type)}
                        className={`border-2 px-4 py-2 text-xs font-black uppercase tracking-wide transition-all ${
                          formState.projectType === type
                            ? "border-foreground bg-accent text-accent-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
                            : "border-foreground bg-background text-foreground hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget + Timeline */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-wide text-foreground">
                      Budget Range
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => handleSelect("budget", b)}
                          className={`border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all ${
                            formState.budget === b
                              ? "border-foreground bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
                              : "border-foreground bg-background text-foreground hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-wide text-foreground">
                      Timeline
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timelines.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleSelect("timeline", t)}
                          className={`border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all ${
                            formState.timeline === t
                              ? "border-foreground bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
                              : "border-foreground bg-background text-foreground hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-foreground">
                    Project Description <span className="text-accent">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe what you're building, what problem it solves, and who it's for..."
                    className="w-full resize-none border-2 border-foreground bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] outline-none focus:shadow-[3px_3px_0px_0px_hsl(var(--accent))] transition-shadow"
                  />
                </div>

                {error && (
                  <p className="text-sm font-bold text-red-500">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Project Brief
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  I'll respond to qualified briefs within 24 hours with a rough estimate and next steps.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Connect;
