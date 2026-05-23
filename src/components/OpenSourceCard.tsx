import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ExternalLink, Download, Star, Clock, Tag } from "lucide-react";
import type { OpenSourceTool } from "@/data/openSourceTools";

interface OpenSourceCardProps {
  tool: OpenSourceTool;
  index: number;
}

const OpenSourceCard = ({ tool, index }: OpenSourceCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -6,
        x: -3,
        boxShadow: "8px 8px 0px 0px hsl(var(--accent))",
        transition: { type: "spring", stiffness: 600, damping: 25 }
      }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative flex flex-col border-2 border-foreground bg-background rounded-xl"
    >
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex gap-2">
        {tool.featured && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 border-2 border-foreground bg-accent px-2 py-1 text-xs font-bold uppercase text-accent-foreground rounded-sm shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
          >
            <Star size={10} fill="currentColor" />
            Popular
          </motion.span>
        )}
        {tool.isNew && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="border-2 border-foreground bg-green-500 px-2 py-1 text-xs font-bold uppercase text-white rounded-sm shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
          >
            New
          </motion.span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[2/1] overflow-hidden border-b-2 border-foreground rounded-t-xl">
        <img
          src={tool.image}
          alt={tool.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Version */}
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Tag size={12} />
            {tool.category}
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            v{tool.version}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="mb-1 text-lg font-black uppercase tracking-tight text-foreground">
          {tool.name}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {tool.tagline}
        </p>

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-1">
          {tool.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="border border-foreground/30 bg-muted/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {tool.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              +{tool.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Stats Row */}
        <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Download size={12} />
            <span className="font-bold text-foreground">{tool.downloadCount}</span> downloads
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {tool.lastUpdated}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-[1fr_auto_auto] gap-2">
          <Link
            to={`/tools/${tool.id}`}
            className="flex items-center justify-center gap-2 border-2 border-foreground bg-foreground px-3 py-2 text-xs font-bold uppercase tracking-wide text-background transition-all rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Review & Install
          </Link>

          <a
            href={tool.links.github}
            target="_blank"
            rel="noopener noreferrer"
            title="View Source"
            className="flex items-center justify-center border-2 border-foreground bg-background px-3 py-2 text-foreground transition-all hover:bg-muted"
          >
            <Github size={16} />
          </a>

          {tool.links.demo && (
            <a
              href={tool.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              title="View Demo"
              className="flex items-center justify-center border-2 border-foreground bg-background px-3 py-2 text-foreground transition-all hover:bg-muted"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Corner accent */}
      <motion.div
        className="absolute -bottom-1 -right-1 h-4 w-4 border-2 border-foreground bg-accent rounded-full"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1.2, rotate: 45 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.article>
  );
};

export default OpenSourceCard;
