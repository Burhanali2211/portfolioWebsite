import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
  size?: "small" | "medium" | "large";
}

const ServiceCard = ({ service, index, size = "medium" }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] ${
        size === "large" ? "md:col-span-2" : "col-span-1"
      }`}
    >
      <div className="p-5 md:p-6">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 10, scale: 1.05 }}
          className="mb-4 flex h-12 w-12 items-center justify-center border-2 border-foreground bg-accent md:h-14 md:w-14"
        >
          <Icon size={24} className="text-accent-foreground" strokeWidth={2} />
        </motion.div>

        {/* Title */}
        <h3 className="text-base font-black uppercase tracking-tight text-foreground md:text-lg">
          {service.title}
        </h3>

        {/* Short description */}
        <p className="mt-2 text-sm text-muted-foreground">
          {service.shortDescription}
        </p>

        {/* Benefits preview */}
        <div className="mt-4 space-y-2">
          {service.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground leading-snug">
              <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-accent" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Hover CTA */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent"
        >
          <span>Learn More</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </motion.div>
      </div>

      {/* Corner accent */}
      <div className="absolute -bottom-4 -right-4 h-12 w-12 bg-accent opacity-0 transition-all duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

export default ServiceCard;
