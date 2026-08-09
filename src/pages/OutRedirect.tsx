import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import TextRevealMask from "@/components/TextRevealMask";
import MagneticButton from "@/components/MagneticButton";
import { ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navigation from "@/components/Navigation";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { projects, Project } from "@/data/projects";

const ProjectMiniCard = ({ project }: { project: Project }) => {
  let hostname = "";
  try { hostname = new URL(project.link).hostname.replace("www.", ""); } catch { hostname = project.link; }

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden hover:border-foreground/30 transition-all duration-300 w-[260px] h-[160px] shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px]"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50 border-b border-border/60 flex-shrink-0">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
        <span className="h-2 w-2 rounded-full bg-green-400/80" />
        <span className="ml-2 text-[10px] font-mono text-muted-foreground truncate">{hostname}</span>
      </div>
      <div
        className="relative flex-1 overflow-hidden"
        style={{ background: project.accentColor ? `${project.accentColor}20` : "hsl(var(--muted))" }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex flex-col justify-end p-3">
          <p className="text-sm font-black text-foreground line-clamp-1">{project.title}</p>
          <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{project.impactLine}</p>
        </div>
      </div>
    </a>
  );
};

const OutRedirect = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [countdown, setCountdown] = useState(5);
  
  // Pick a random project on mount
  const randomProject = useMemo(() => {
    return projects[Math.floor(Math.random() * projects.length)];
  }, []);

  useSEO({
    title: "Redirecting... | Burhan Ali",
    description: "Taking you to your destination.",
  });

  useEffect(() => {
    if (!url) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = url;
    }
  }, [countdown, url]);

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const targetUrl = formData.get("targetUrl") as string;
    
    if (targetUrl) {
      let validUrl = targetUrl;
      if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
        validUrl = "https://" + validUrl;
      }
      
      const newLink = `${window.location.origin}/out?url=${encodeURIComponent(validUrl)}`;
      setGeneratedLink(newLink);
      setCopied(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!url) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
        <Navigation />
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] aspect-square rounded-full bg-accent blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full z-10 flex flex-col items-center pt-20"
        >
          <TextRevealMask as="h1" className="text-3xl md:text-5xl font-black uppercase text-center mb-6 tracking-tight">
            Link Generator
          </TextRevealMask>
          <p className="text-muted-foreground mb-10 text-center text-lg">
            Create tracking links for your social media effortlessly. Paste any URL below.
          </p>
          
          <form onSubmit={handleGenerate} className="w-full mb-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input 
                type="url" 
                name="targetUrl"
                placeholder="https://example.com" 
                required
                className="flex-1 px-6 py-4 rounded-md border-2 border-foreground bg-background text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] focus:outline-none focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[6px_6px_0px_0px_hsl(var(--accent))] transition-all font-mono"
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-md border-2 border-foreground bg-accent text-accent-foreground font-black uppercase shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-all whitespace-nowrap"
              >
                Generate
              </button>
            </div>
          </form>

          {generatedLink && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full p-6 border-2 border-foreground rounded-md bg-card shadow-[6px_6px_0px_0px_hsl(var(--foreground))] flex flex-col items-center"
            >
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Your ready-to-use link:</p>
              <div className="w-full p-4 bg-muted/50 border border-border rounded font-mono text-sm break-all text-center mb-6 text-foreground">
                {generatedLink}
              </div>
              <button 
                onClick={copyToClipboard}
                className={`px-8 py-4 rounded-md border-2 border-foreground font-black uppercase transition-all shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                  copied 
                    ? "bg-green-500 text-white hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]" 
                    : "bg-background text-foreground hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]"
                }`}
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </motion.div>
          )}

          <div className="mt-12">
             <MagneticButton
              to="/"
              className="rounded-md border-2 border-transparent hover:border-foreground bg-transparent px-6 py-2 font-bold uppercase transition-all text-muted-foreground hover:text-foreground"
            >
              Return Home
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    );
  }

  let hostname = "";
  try {
    hostname = new URL(url).hostname.replace("www.", "");
  } catch (e) {
    hostname = "external site";
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden relative flex flex-col">
      <Navigation />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[10%] right-[-5%] w-[40%] aspect-square rounded-full bg-accent blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] aspect-square rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full flex flex-col items-start"
        >
          <div className="mb-6">
            <AvailabilityBadge />
          </div>

          <TextRevealMask
            as="h1"
            delay={0}
            stagger={0.15}
            className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {"I Build\nSoftware\nThat Works."}
          </TextRevealMask>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            className="-mt-1 h-4 w-40 origin-left bg-accent md:-mt-2 md:h-6 md:w-64 mb-8"
          />

          <p className="max-w-2xl text-base text-muted-foreground md:text-lg lg:text-xl mb-16">
            I turn business problems into fast, reliable software. Web apps, IoT systems, and everything in between — built clean, delivered on time.
          </p>

          <div className="w-full bg-card/60 border border-foreground md:border-2 rounded-xl p-6 md:p-8 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8 shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_hsl(var(--foreground))] relative overflow-hidden flex-shrink-0">
                 <motion.div 
                   className="absolute inset-0 bg-background/20"
                   initial={{ top: "100%" }}
                   animate={{ top: "0%" }}
                   transition={{ duration: 5, ease: "linear" }}
                 />
                 <span className="text-2xl md:text-3xl font-black z-10">{countdown}</span>
              </div>
              
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="font-bold uppercase tracking-widest text-muted-foreground text-xs md:text-sm mb-1">Taking you to</span>
                <span className="text-xl md:text-2xl font-black uppercase text-foreground truncate w-full" title={hostname}>
                  {hostname}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <MagneticButton
                to="/"
                className="w-full sm:w-auto rounded-md border-2 border-foreground bg-accent text-accent-foreground px-6 py-3 font-black uppercase shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-all text-sm text-center"
              >
                View Portfolio
              </MagneticButton>
              <a
                href={url}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-md border-2 border-foreground bg-background text-foreground px-6 py-3 font-black uppercase shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-all text-sm text-center"
              >
                Skip Wait
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default OutRedirect;
