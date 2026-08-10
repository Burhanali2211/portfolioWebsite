import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import TextRevealMask from "@/components/TextRevealMask";
import MagneticButton from "@/components/MagneticButton";
import { ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import Navigation from "@/components/Navigation";

const OutRedirect = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [countdown, setCountdown] = useState(5);

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
      // Basic URL validation
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
        
        {/* Background Decorative Elements */}
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
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[10%] right-[-5%] w-[40%] aspect-square rounded-full bg-accent blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] aspect-square rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full flex flex-col items-center"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-accent rounded-full border-4 border-foreground flex items-center justify-center mb-10 shadow-[6px_6px_0px_0px_hsl(var(--foreground))] relative overflow-hidden">
             <motion.div 
               className="absolute inset-0 bg-background/20"
               initial={{ top: "100%" }}
               animate={{ top: "0%" }}
               transition={{ duration: 5, ease: "linear" }}
             />
             <span className="text-3xl md:text-4xl font-black z-10">{countdown}</span>
          </div>

          <TextRevealMask as="h1" className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-center tracking-tight mb-2">
            Taking you to
          </TextRevealMask>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-center tracking-tight mb-8 text-accent underline decoration-4 underline-offset-4 break-all sm:break-normal px-4"
          >
            {hostname}
          </motion.div>


          <div className="border-t-2 border-foreground w-full pt-8 flex flex-col items-center px-4">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Or if you're in a hurry...</p>
            <a
              href={url}
              className="group flex items-center justify-center gap-2 text-foreground font-black uppercase hover:text-accent transition-colors text-center"
            >
              Continue to link now
              <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default OutRedirect;
