import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight, LayoutGrid, Users, Folder, BarChart3, Search, Bell, TrendingUp } from "lucide-react";
import { sendToTelegram, formatProjectBriefForTelegram } from "@/lib/telegram";
import { useSEO } from "@/hooks/useSEO";

const projectTypes = ["Web Application", "IoT System", "Mobile App", "Enterprise ERP"];
const budgets = ["< ₹25k", "₹25k - ₹1L", "₹1L+"];

const Connect = () => {
  useSEO({
    title: "Start a Project",
    description: "Stop losing hours to scattered tools. Build your enterprise system with Burhan Ali.",
  });
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "Enterprise ERP",
    budget: "₹1L+",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSelect = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
    setSubmitting(true);
    
    const message = formatProjectBriefForTelegram({
      ...formState,
      description: "Fast-track brief submitted from SaaS onboarding flow.",
      timeline: "Discuss on call",
      phone: ""
    });
    const ok = await sendToTelegram(message);
    
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all";
  const labelClass = "mb-2 block text-xs font-bold text-slate-900";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navigation />
      
      <main className="flex-1 relative pb-20 pt-28 md:pt-36 z-10 overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            
            {/* Left Column - The Form */}
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  Stop losing 15+ hours/week to scattered tools
                </h1>
                <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed">
                  Without a unified system, your team leaks billable hours, misses deadlines, and loses clients silently. Let's fix that.
                </p>

                <div className="mt-10 mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Setup Progress</span>
                  <span className="text-blue-600">35%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-blue-600"
                  />
                </div>

                {/* Form Card */}
                <div className="mt-6 rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-slate-100">
                  <div className="mb-8 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-1.5 text-[10px] font-semibold text-slate-600">
                      <CheckCircle2 size={12} className="text-emerald-500" /> NO CREDIT CARD REQUIRED
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-1.5 text-[10px] font-semibold text-slate-600">
                      <CheckCircle2 size={12} className="text-emerald-500" /> SETUP IN 3 MINS
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-1.5 text-[10px] font-semibold text-slate-600">
                      <CheckCircle2 size={12} className="text-emerald-500" /> USED BY 500+ AGENCIES
                    </span>
                  </div>

                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-5">
                        <CheckCircle2 size={32} className="text-emerald-600" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight text-slate-900">Brief Received</h3>
                      <p className="mt-2 text-slate-500">
                        We'll be in touch with <strong className="text-slate-900 font-semibold">{formState.email}</strong> shortly.
                      </p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="mt-8 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        ← Start another project
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className={labelClass}>Agency / Company Name</label>
                        <input 
                          name="name" 
                          value={formState.name} 
                          onChange={handleChange} 
                          placeholder="e.g. OruLabs" 
                          className={inputClass} 
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Work Email</label>
                        <input 
                          name="email" 
                          type="email" 
                          value={formState.email} 
                          onChange={handleChange} 
                          placeholder="you@company.com" 
                          className={inputClass} 
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Industry / Project Type</label>
                        <div className="relative">
                          <select 
                            name="projectType" 
                            value={formState.projectType} 
                            onChange={handleChange} 
                            className={`${inputClass} appearance-none cursor-pointer`}
                          >
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Estimated Budget</label>
                        <div className="flex items-center gap-2 md:gap-3">
                          {budgets.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => handleSelect("budget", b)}
                              className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                                formState.budget === b
                                  ? "bg-blue-50 border border-blue-200 text-blue-600 shadow-[0_2px_10px_rgba(59,130,246,0.1)]"
                                  : "bg-slate-50 border border-transparent text-slate-500 hover:bg-slate-100"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      {error && (
                        <p className="text-sm font-semibold text-red-500">{error}</p>
                      )}

                      <div className="pt-2">
                        <button 
                          type="submit" 
                          disabled={submitting}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-70"
                        >
                          {submitting ? "Processing..." : "Continue"}
                          {!submitting && <ArrowRight size={16} />}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Live Preview */}
            <div className="hidden lg:block relative w-full h-full min-h-[600px]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-10 left-0"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> LIVE PREVIEW
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white mix-blend-difference opacity-80 mb-8">
                  This is your new command center
                </h2>

                {/* Dashboard Mockup */}
                <div className="w-[110%] rounded-2xl bg-white p-2 shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-slate-100 flex overflow-hidden">
                  
                  {/* Sidebar */}
                  <div className="w-16 flex-shrink-0 border-r border-slate-100 flex flex-col items-center py-6 gap-6 text-slate-400">
                    <div className="flex gap-1 mb-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600"><LayoutGrid size={18} /></div>
                    <div className="p-2 hover:bg-slate-50 hover:text-slate-600 rounded-lg"><Users size={18} /></div>
                    <div className="p-2 hover:bg-slate-50 hover:text-slate-600 rounded-lg"><Folder size={18} /></div>
                    <div className="p-2 hover:bg-slate-50 hover:text-slate-600 rounded-lg"><BarChart3 size={18} /></div>
                  </div>

                  {/* Main Area */}
                  <div className="flex-1 bg-white">
                    {/* Topbar */}
                    <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6">
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-50 px-3 py-1.5 rounded-md text-xs w-64 border border-slate-100">
                        <Search size={14} /> oru.app/macon-townsend
                      </div>
                      <div className="flex items-center gap-4 text-slate-400">
                        <Bell size={16} />
                        <div className="h-6 w-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">M</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{formState.name || "Macon Townsend"}</h3>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold tracking-wider border border-emerald-100">ERP</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-8">Good morning. Here's your daily digest.</p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="rounded-xl border border-slate-100 p-4 bg-white shadow-sm">
                          <div className="flex justify-between items-start mb-6">
                            <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-600"><TrendingUp size={14} /></div>
                            <span className="text-[10px] font-bold text-emerald-500">+12%</span>
                          </div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">PIPELINE</p>
                          <p className="text-xl font-bold text-slate-900">₹1.2M</p>
                        </div>
                        <div className="rounded-xl border border-slate-100 p-4 bg-white shadow-sm">
                          <div className="flex justify-between items-start mb-6">
                            <div className="p-1.5 rounded-md bg-blue-50 text-blue-600"><Users size={14} /></div>
                            <span className="text-[10px] font-bold text-blue-500">+3</span>
                          </div>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">ACTIVE CLIENTS</p>
                          <p className="text-xl font-bold text-slate-900">42</p>
                        </div>
                      </div>

                      {/* Bar chart mock */}
                      <div className="h-32 w-full rounded-xl border border-slate-100 bg-slate-50/50 p-4 flex items-end justify-between gap-2">
                        {[40, 55, 30, 60, 45, 70, 85, 60, 95, 100].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                            className="w-full bg-blue-100 rounded-t-sm"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Connect;
