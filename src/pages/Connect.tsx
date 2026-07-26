import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CharacterReveal from "@/components/CharacterReveal";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { personalInfo } from "@/data/personalInfo";
import { sendToTelegram, formatProjectBriefForTelegram } from "@/lib/telegram";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";
import { useSEO } from "@/hooks/useSEO";

const projectTypes = ["Web Application", "IoT / Embedded", "Mobile App", "E-commerce", "API / Backend", "Other"];
const budgets = ["< ₹25,000", "₹25k – ₹75k", "₹75k – ₹2L", "₹2L+", "Let's discuss"];
const timelines = ["ASAP (< 2 weeks)", "1 month", "2–3 months", "3+ months", "Flexible"];

const questions = [
  { id: "name", title: "WHAT IS YOUR NAME?", type: "text", placeholder: "Type your name..." },
  { id: "email", title: "WHAT IS YOUR EMAIL?", type: "email", placeholder: "you@example.com" },
  { id: "projectType", title: "WHAT KIND OF PROJECT IS IT?", type: "choice", options: projectTypes },
  { id: "budget", title: "WHAT'S THE ROUGH BUDGET?", type: "choice", options: budgets },
  { id: "timeline", title: "WHEN DO YOU NEED IT BY?", type: "choice", options: timelines },
  { id: "description", title: "TELL ME THE DETAILS.", type: "textarea", placeholder: "Describe the problem you're trying to solve..." }
];

const Connect = () => {
  useSEO({
    title: "Contact",
    description: "Book a free 30-min discovery call with Burhan Ali. WhatsApp, email, or project brief form. Replies within 24h.",
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<Record<string, string>>({
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
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Auto-focus input when step changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleNext = () => {
    const q = questions[currentStep];
    if (q.type === "text" || q.type === "email") {
      if (!formState[q.id].trim()) {
        setError("This field is required.");
        return;
      }
      if (q.type === "email" && !/^\S+@\S+\.\S+$/.test(formState.email)) {
        setError("Please enter a valid email address.");
        return;
      }
    }
    
    setError("");
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitForm();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && questions[currentStep].type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleChoice = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setError("");
    setTimeout(() => {
      handleNext();
    }, 150); // slight delay for visual feedback
  };

  const submitForm = async () => {
    if (!formState.description.trim()) {
      setError("Please provide a project description.");
      return;
    }
    setError("");
    setSubmitting(true);
    
    const message = formatProjectBriefForTelegram({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      projectType: formState.projectType,
      budget: formState.budget,
      timeline: formState.timeline,
      description: formState.description
    });
    
    const ok = await sendToTelegram(message);
    
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try WhatsApp or email instead.");
    }
  };

  const renderCurrentInput = () => {
    const q = questions[currentStep];

    if (q.type === "choice") {
      return (
        <div className="mt-8 flex flex-wrap gap-4">
          {q.options?.map((opt) => (
            <button
              key={opt}
              onClick={() => handleChoice(q.id, opt)}
              className="border-2 border-foreground bg-background px-6 py-4 text-sm md:text-base font-black uppercase tracking-wide text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] outline-none transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] focus:bg-accent focus:text-accent-foreground"
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (q.type === "textarea") {
      return (
        <div className="mt-8 w-full max-w-3xl">
          <textarea
            ref={inputRef as any}
            name={q.id}
            value={formState[q.id]}
            onChange={handleChange}
            placeholder={q.placeholder}
            rows={5}
            className="w-full resize-none border-b-4 border-foreground bg-transparent py-4 text-xl md:text-3xl font-bold tracking-tight text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent"
          />
          <div className="mt-8">
            <button
              onClick={submitForm}
              disabled={submitting}
              className="border-2 border-foreground bg-accent px-8 py-4 text-lg font-black uppercase tracking-wide text-accent-foreground shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] disabled:opacity-50"
            >
              {submitting ? "SENDING..." : "SUBMIT BRIEF →"}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-8 w-full max-w-2xl">
        <input
          ref={inputRef as any}
          type={q.type}
          name={q.id}
          value={formState[q.id]}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={q.placeholder}
          autoComplete="off"
          className="w-full border-b-4 border-foreground bg-transparent py-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-accent"
        />
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleNext}
            className="border-2 border-foreground bg-foreground px-8 py-3 text-lg font-black uppercase tracking-wide text-background shadow-[4px_4px_0px_0px_hsl(var(--accent))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
          >
            OK →
          </button>
          <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            press <strong className="text-foreground">Enter</strong>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main ref={containerRef} className="flex-1 flex flex-col relative px-6 py-24 md:py-32 overflow-hidden">
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

        {/* WhatsApp Fast Track - Top Right */}
        <div className="absolute top-24 md:top-32 right-6 md:right-12 z-10 hidden sm:block">
          <a 
            href={`https://wa.me/${personalInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border-2 border-foreground bg-background p-3 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
          >
            <div className="bg-accent text-accent-foreground p-2">
              <CharacterReveal staggerAmount={0} className="font-black text-sm">
                FAST TRACK
              </CharacterReveal>
            </div>
            <span className="font-bold uppercase tracking-wide text-sm mr-2 group-hover:text-accent transition-colors">
              WhatsApp
            </span>
          </a>
        </div>

        <div className="mx-auto w-full max-w-5xl flex-1 flex flex-col justify-center">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-4 border-foreground bg-accent p-12 text-center shadow-[12px_12px_0px_0px_hsl(var(--foreground))]"
            >
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-accent-foreground">
                BRIEF RECEIVED
              </h3>
              <p className="mt-6 text-xl font-medium text-accent-foreground/90">
                I'll review and reply to <strong className="font-black">{formState.email}</strong> within 24 hours.
              </p>
              <div className="mt-12">
                <a
                  href="/"
                  className="inline-block border-2 border-foreground bg-background px-8 py-4 text-lg font-black uppercase tracking-wide text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-all"
                >
                  RETURN HOME
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="w-full">
              {/* Progress Indicator */}
              <div className="mb-12 flex items-center gap-2">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 transition-all duration-500 ease-out ${
                      i === currentStep 
                        ? "w-16 bg-accent border-2 border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]" 
                        : i < currentStep 
                          ? "w-8 bg-foreground" 
                          : "w-8 bg-foreground/20"
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: EASING }}
                  className="w-full"
                >
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                    {questions[currentStep].title}
                  </h2>
                  
                  {renderCurrentInput()}
                  
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="mt-4 text-lg font-bold uppercase tracking-wide text-red-500 bg-red-500/10 inline-block px-4 py-2 border-l-4 border-red-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Back */}
              {currentStep > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="mt-16 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span>←</span> GO BACK
                </motion.button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Connect;
