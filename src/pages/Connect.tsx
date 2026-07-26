import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CharacterReveal from "@/components/CharacterReveal";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { personalInfo } from "@/data/personalInfo";
import { sendToTelegram, formatProjectBriefForTelegram } from "@/lib/telegram";
import { useSEO } from "@/hooks/useSEO";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const projectTypes = ["Web Application", "IoT / Embedded", "Mobile App", "E-commerce", "ERP / Backend System", "Other"];
const budgets = ["< ₹25,000", "₹25k – ₹75k", "₹75k – ₹2L", "₹2L+", "Let's discuss"];
const timelines = ["ASAP (< 2 weeks)", "1 month", "2–3 months", "3+ months", "Flexible"];

const Connect = () => {
  useSEO({
    title: "Contact",
    description: "Start a project with Burhan Ali. Enterprise web apps, IoT systems, and high-performance APIs.",
  });
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.projectType || !formState.description) {
      setError("Please fill in all required fields marked with an asterisk (*).");
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

  const inputClass = "w-full appearance-none border-2 border-foreground bg-background px-4 py-4 text-sm font-medium text-foreground outline-none transition-all focus:shadow-[4px_4px_0px_0px_hsl(var(--accent))] focus:-translate-y-[2px] focus:-translate-x-[2px] placeholder:text-muted-foreground/50";
  const labelClass = "mb-2 block text-[11px] font-black uppercase tracking-widest text-foreground";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 relative pb-20 pt-24 md:pt-32">
        {/* Background Grid */}
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

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
            
            {/* Left Column - Sticky Info */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <AvailabilityBadge />
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black uppercase leading-[0.85] tracking-tighter text-foreground">
                  <CharacterReveal staggerAmount={0.01}>
                    START A PROJECT.
                  </CharacterReveal>
                </h1>
                
                <p className="mt-8 text-lg font-medium text-muted-foreground leading-relaxed max-w-md">
                  Looking to build an enterprise ERP, a high-performance web application, or an IoT system? Let's discuss your requirements.
                </p>

                <div className="mt-12 flex flex-col gap-4">
                  <a 
                    href={`https://wa.me/${personalInfo.whatsapp}?text=Hi%20Burhan,%20I'd%20like%20to%20discuss%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-2 border-foreground bg-accent px-6 py-5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
                  >
                    <div>
                      <span className="block text-xs font-black uppercase tracking-widest text-accent-foreground/70 mb-1">Fastest Response</span>
                      <span className="block text-xl font-black uppercase tracking-tight text-accent-foreground">WhatsApp Me</span>
                    </div>
                    <ArrowUpRight size={28} className="text-accent-foreground transition-transform group-hover:rotate-45" strokeWidth={2.5} />
                  </a>

                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="group flex items-center justify-between border-2 border-foreground bg-background px-6 py-5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
                  >
                    <div>
                      <span className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Direct Email</span>
                      <span className="block text-xl font-black uppercase tracking-tight text-foreground">{personalInfo.email}</span>
                    </div>
                    <ArrowUpRight size={28} className="text-foreground transition-transform group-hover:rotate-45" strokeWidth={2.5} />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column - The Dense Grid Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-8 border-b-2 border-foreground pb-4">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Project Brief</h2>
                </div>

                {submitted ? (
                  <div className="border-2 border-foreground bg-accent p-10 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] text-center">
                    <CheckCircle2 size={64} className="mx-auto mb-6 text-accent-foreground" strokeWidth={1.5} />
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-accent-foreground">Brief Received</h3>
                    <p className="mt-4 text-lg font-medium text-accent-foreground/90">
                      I will review your requirements and respond to <strong className="font-black underline">{formState.email}</strong> within 24 hours.
                    </p>
                    <button 
                      onClick={() => { setSubmitted(false); setFormState({name: "", email: "", phone: "", projectType: "", budget: "", timeline: "", description: ""}); }}
                      className="mt-10 border-2 border-foreground bg-background px-8 py-3 text-sm font-black uppercase tracking-widest text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-all"
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {/* Name */}
                    <div>
                      <label className={labelClass}>Name <span className="text-accent">*</span></label>
                      <input 
                        name="name" 
                        value={formState.name} 
                        onChange={handleChange} 
                        placeholder="John Doe" 
                        className={inputClass} 
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label className={labelClass}>Email <span className="text-accent">*</span></label>
                      <input 
                        name="email" 
                        type="email" 
                        value={formState.email} 
                        onChange={handleChange} 
                        placeholder="john@company.com" 
                        className={inputClass} 
                      />
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-2">
                      <label className={labelClass}>Phone <span className="text-muted-foreground/60">(Optional)</span></label>
                      <input 
                        name="phone" 
                        value={formState.phone} 
                        onChange={handleChange} 
                        placeholder="+91 98765 43210" 
                        className={inputClass} 
                      />
                    </div>

                    {/* Project Type */}
                    <div className="md:col-span-2 relative">
                      <label className={labelClass}>Project Type <span className="text-accent">*</span></label>
                      <select 
                        name="projectType" 
                        value={formState.projectType} 
                        onChange={handleChange} 
                        className={inputClass}
                      >
                        <option value="" disabled>Select project type...</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow to replace native one that's hidden by appearance-none */}
                      <div className="pointer-events-none absolute bottom-5 right-5 border-l-2 border-b-2 border-foreground w-3 h-3 -rotate-45" />
                    </div>

                    {/* Budget */}
                    <div className="relative">
                      <label className={labelClass}>Estimated Budget</label>
                      <select 
                        name="budget" 
                        value={formState.budget} 
                        onChange={handleChange} 
                        className={inputClass}
                      >
                        <option value="" disabled>Select range...</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute bottom-5 right-5 border-l-2 border-b-2 border-foreground w-3 h-3 -rotate-45" />
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                      <label className={labelClass}>Expected Timeline</label>
                      <select 
                        name="timeline" 
                        value={formState.timeline} 
                        onChange={handleChange} 
                        className={inputClass}
                      >
                        <option value="" disabled>Select timeline...</option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute bottom-5 right-5 border-l-2 border-b-2 border-foreground w-3 h-3 -rotate-45" />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className={labelClass}>Project Details <span className="text-accent">*</span></label>
                      <textarea 
                        name="description" 
                        value={formState.description} 
                        onChange={handleChange} 
                        rows={6} 
                        placeholder="Describe your requirements, goals, and target audience..." 
                        className={`${inputClass} resize-none`} 
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="md:col-span-2">
                        <p className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-500/10 p-3 border-l-4 border-red-500 inline-block">
                          {error}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-4">
                      <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full border-2 border-foreground bg-foreground px-8 py-5 text-xl font-black uppercase tracking-tight text-background shadow-[6px_6px_0px_0px_hsl(var(--accent))] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_hsl(var(--accent))] disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
                      >
                        {submitting ? "SENDING BRIEF..." : "SUBMIT PROJECT BRIEF"}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Connect;
