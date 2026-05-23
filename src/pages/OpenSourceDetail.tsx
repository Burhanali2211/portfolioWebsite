import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { openSourceTools } from "@/data/openSourceTools";
import { ArrowLeft, Download, Terminal, Github, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const OpenSourceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const tool = openSourceTools.find((t) => t.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!tool) {
            navigate("/work"); // Redirect if not found
        }
    }, [id, tool, navigate]);

    if (!tool) return null;

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-16">
                {/* Header */}
                <section className="px-6 mb-12">
                    <div className="mx-auto max-w-5xl">
                        <Link
                            to="/work"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8 transition-colors"
                        >
                            <ArrowLeft size={16} /> Back to Tools
                        </Link>

                        <div className="grid gap-12 lg:grid-cols-3">
                            {/* Left Column: Info */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="bg-accent/10 text-accent border border-accent/20 px-3 py-1 text-xs font-black uppercase tracking-wider">
                                            {tool.category}
                                        </span>
                                        <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                            v{tool.version}
                                        </span>
                                    </div>

                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-6">
                                        {tool.name}
                                    </h1>

                                    <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8 leading-relaxed">
                                        {tool.tagline}
                                    </p>

                                    <div className="prose prose-invert max-w-none mb-10">
                                        <p className="text-lg text-foreground/80 leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-4 mb-12">
                                        {tool.links.download && (
                                            <Button size="lg" className="rounded-md border-2 border-foreground bg-foreground text-background font-black uppercase text-sm h-14 px-8 shadow-[4px_4px_0px_0px_hsl(var(--accent))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] transition-all" asChild>
                                                <a href={tool.links.download} target="_blank" rel="noopener noreferrer">
                                                    <Download className="mr-2 h-5 w-5" />
                                                    Download v{tool.version}
                                                </a>
                                            </Button>
                                        )}

                                        <Button variant="outline" size="lg" className="rounded-md border-2 border-foreground h-14 px-8 font-black uppercase text-sm hover:bg-muted" asChild>
                                            <a href={tool.links.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="mr-2 h-5 w-5" />
                                                View Source
                                            </a>
                                        </Button>

                                        {tool.links.demo && (
                                            <Button variant="outline" size="lg" className="rounded-md border-2 border-foreground h-14 px-8 font-black uppercase text-sm hover:bg-muted" asChild>
                                                <a href={tool.links.demo} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="mr-2 h-5 w-5" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="mb-12">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Built With</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {tool.techStack.map((tech) => (
                                                <span key={tech} className="border border-foreground/20 bg-muted/30 px-3 py-1 text-sm font-bold text-foreground">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Column: Key Stats / Requirements */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="bg-muted/20 border-2 border-foreground p-6 sticky top-24 rounded-xl"
                                >
                                    <div className="mb-6">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
                                            <AlertCircle size={16} /> Requirements
                                        </h3>
                                        <ul className="space-y-2">
                                            {tool.requirements?.map((req) => (
                                                <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-6 border-t border-foreground/10">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-4">
                                            Quick Stats
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase">Downloads</p>
                                                <p className="text-xl font-black text-foreground">{tool.downloadCount}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase">License</p>
                                                <p className="text-xl font-black text-foreground">{tool.license}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase">Version</p>
                                                <p className="text-xl font-black text-foreground">{tool.version}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase">Updated</p>
                                                <p className="text-xl font-black text-foreground">{tool.lastUpdated}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Installation Guide */}
                <section className="px-6 py-12 bg-muted/30 border-y-2 border-foreground">
                    <div className="mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-12 w-12 bg-foreground text-background flex items-center justify-center rounded-md">
                                    <Terminal size={24} />
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tight text-foreground">
                                    Installation Guide
                                </h2>
                            </div>

                            {tool.installation.youtubeId && (
                                <div className="mb-16">
                                    <div className="relative aspect-video w-full overflow-hidden border-2 border-foreground bg-zinc-950 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] rounded-xl">
                                        <iframe
                                            className="absolute inset-0 h-full w-full"
                                            src={`https://www.youtube.com/embed/${tool.installation.youtubeId}?autoplay=0&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1`}
                                            title="Installation Video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <p className="mt-6 text-sm text-muted-foreground font-medium italic">
                                        Tip: Click the video to play or pause.
                                    </p>
                                </div>
                            )}

                            <div className="space-y-12">
                                {tool.installation.steps.map((step, index) => (
                                    <div key={index} className="relative pl-8 md:pl-0">
                                        <div className="md:grid md:grid-cols-[60px_1fr] gap-8">
                                            {/* Step Number */}
                                            <div className="hidden md:flex flex-col items-center">
                                                <div className="h-10 w-10 rounded-full border-2 border-foreground bg-background flex items-center justify-center text-lg font-black z-10">
                                                    {index + 1}
                                                </div>
                                                {index !== tool.installation.steps.length - 1 && (
                                                    <div className="w-0.5 bg-foreground/20 flex-1 my-2" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="bg-background border-2 border-foreground p-6 md:p-8 rounded-xl shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                                                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                                                    <span className="md:hidden inline-flex h-8 w-8 rounded-full border-2 border-foreground items-center justify-center text-sm font-black mr-2">
                                                        {index + 1}
                                                    </span>
                                                    {step.title}
                                                </h3>

                                                {step.description && (
                                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                )}

                                                {step.code && (
                                                    <div className="bg-zinc-950 rounded-md p-4 overflow-x-auto border border-zinc-800 my-4 group relative">
                                                        <code className="text-sm font-mono text-zinc-100 whitespace-pre">
                                                            {step.code}
                                                        </code>
                                                    </div>
                                                )}

                                                {/* Improved Image Display - Removed Borders */}
                                                <div className="mt-8 -mx-6 bg-zinc-900 md:mx-0 overflow-hidden">
                                                    {step.image ? (
                                                        <img
                                                            src={step.image}
                                                            alt={`Screenshot for ${step.title}`}
                                                            className="w-full aspect-video object-contain"
                                                        />
                                                    ) : (
                                                        <div className="aspect-video flex items-center justify-center relative overflow-hidden group">
                                                            {/* Use the main image as a placeholder background with blur */}
                                                            <img
                                                                src={tool.image}
                                                                alt="Step preview"
                                                                className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm grayscale"
                                                            />
                                                            <div className="relative z-10 text-center p-6">
                                                                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-2">
                                                                    Visual Guide Pending
                                                                </p>
                                                                <p className="text-[10px] font-bold text-zinc-600 uppercase">
                                                                    Step: {step.title}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Quick Start Command */}
                {tool.installation.command && (
                    <section className="px-6 py-16">
                        <div className="mx-auto max-w-4xl">
                            <div className="bg-zinc-950 border-2 border-foreground p-8 relative overflow-hidden rounded-xl">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Terminal size={120} />
                                </div>
                                <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-4 relative z-10">
                                    Quick Start (One Liner)
                                </h3>
                                <div className="font-mono text-xl md:text-2xl text-green-400 break-all relative z-10">
                                    &gt; {tool.installation.command}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            </main>
            <Footer />
        </div>
    );
};

export default OpenSourceDetail;
