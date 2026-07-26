import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CharacterReveal from "@/components/CharacterReveal";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { Mail, MessageCircle, Calendar, ArrowRight, Send, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
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
  
  const [step, setStep] = useState(1);
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

  const nextStep = () => {
    if (step === 1) {
      if (!formState.name || !formState.email) {
        setError("Name and Email are required.");
        return;
      }
    } else if (step === 2) {
      if (!formState.projectType) {
        setError("Please select a project type.");
        return;
      }
    }
    setError("");
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.description) {
      setError("Please provide a project description.");
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

  // Input Soft Style
  const inputStyle = "w-full rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-sm outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/50 transition-all";

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

          {/* Project Brief Form - Softened & Multi-step */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: DURATIONS.default, ease: EASING }}
            className="max-w-3xl"
          >
            <div className="mb-10">
              <div className="mb-3 inline-block border-2 border-foreground bg-foreground px-3 py-1 text-xs font-black uppercase tracking-widest text-background">
                Or Send a Brief
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Tell Me About Your Project
              </h2>
              <p className="mt-2 text-muted-foreground">
                Step-by-step to understand your exact needs.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-border bg-accent/10 p-10 text-center shadow-lg backdrop-blur-sm"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground mb-6">
                  <CheckCircle size={40} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">Brief Received!</h3>
                <p className="mt-3 text-muted-foreground">
                  I'll review and reply to <strong className="text-foreground">{formState.email}</strong> within 24 hours.
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  For faster response, message on{" "}
                  <a
                    href={`https://wa.me/${personalInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline text-foreground hover:text-accent transition-colors"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-10 shadow-sm backdrop-blur-md">
                
                {/* Goal Gradient Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <span>Step {step} of 3</span>
                    <span>{Math.round((step / 3) * 100)}% Completed</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full bg-foreground"
                      initial={{ width: "33%" }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="relative min-h-[320px]">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: IDENTITY */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-bold tracking-tight mb-6">Let's start with the basics.</h3>
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-foreground/80">
                                Your Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="Jane Doe"
                                className={inputStyle}
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-foreground/80">
                                Email <span className="text-red-500">*</span>
                              </label>
                              <input
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="jane@example.com"
                                className={inputStyle}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-foreground/80">
                            WhatsApp / Phone <span className="text-muted-foreground font-normal normal-case">(optional)</span>
                          </label>
                          <input
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={inputStyle}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: SCOPE */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-lg font-bold tracking-tight mb-2">What kind of project is this?</h3>
                          <label className="mb-4 block text-xs font-semibold uppercase tracking-wide text-foreground/80">
                            Select one <span className="text-red-500">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {projectTypes.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => handleSelect("projectType", type)}
                                className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                                  formState.projectType === type
                                    ? "border-foreground bg-foreground text-background shadow-md"
                                    : "border-border/60 bg-muted/30 text-foreground hover:bg-muted shadow-sm hover:shadow-md"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                          <div>
                            <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-foreground/80">
                              Estimated Budget
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {budgets.map((b) => (
                                <button
                                  key={b}
                                  type="button"
                                  onClick={() => handleSelect("budget", b)}
                                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                                    formState.budget === b
                                      ? "border-foreground bg-foreground text-background shadow-sm"
                                      : "border-border/60 bg-muted/30 text-foreground hover:bg-muted"
                                  }`}
                                >
                                  {b}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-foreground/80">
                              Expected Timeline
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {timelines.map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => handleSelect("timeline", t)}
                                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                                    formState.timeline === t
                                      ? "border-foreground bg-foreground text-background shadow-sm"
                                      : "border-border/60 bg-muted/30 text-foreground hover:bg-muted"
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: DETAILS */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-bold tracking-tight mb-2">Final step. Tell me the details.</h3>
                          <label className="mb-4 block text-xs font-semibold uppercase tracking-wide text-foreground/80">
                            Project Description <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="description"
                            value={formState.description}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Describe what you're building, what problem it solves, and who it's for..."
                            className={`${inputStyle} resize-none`}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm font-bold text-destructive">
                      {error}
                    </motion.p>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-10 flex items-center justify-between pt-6 border-t border-border/50">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={prevStep}
                        className="rounded-full px-5 text-muted-foreground hover:text-foreground"
                      >
                        <ChevronLeft size={16} className="mr-1.5" />
                        Back
                      </Button>
                    ) : (
                      <div /> // Spacer
                    )}

                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="rounded-full px-8 shadow-md"
                      >
                        Next Step
                        <ChevronRight size={16} className="ml-1.5" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="rounded-full px-8 shadow-md bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        {submitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send size={16} className="mr-2" />
                            Submit Brief
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Connect;
