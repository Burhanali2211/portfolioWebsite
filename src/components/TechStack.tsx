import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Code2, Database, Layout, Server, Cpu, Cloud } from "lucide-react";

const techCategories = [
  {
    category: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend & DB",
    icon: Server,
    skills: ["Node.js", "Python", "Supabase", "PostgreSQL", "REST APIs"],
  },
  {
    category: "Hardware & IoT",
    icon: Cpu,
    skills: ["Raspberry Pi", "Arduino", "MQTT", "Embedded Linux", "Sensors"],
  },
  {
    category: "Tools & Cloud",
    icon: Cloud,
    skills: ["Git", "Docker", "Vercel", "Linux", "Figma"],
  },
];

const TechStack = () => {
  return (
    <section className="bg-background px-6 py-16 md:py-24 border-t-2 border-foreground">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal variant="fade-up" once className="mb-12 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            Tech Stack
          </h2>
          <p className="mt-4 text-muted-foreground">
            The tools and technologies I use to build robust, scalable solutions.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
          {[
            { name: "React", icon: Layout },
            { name: "Next.js", icon: Layout },
            { name: "TypeScript", icon: Code2 },
            { name: "Tailwind CSS", icon: Layout },
            { name: "Node.js", icon: Server },
            { name: "Python", icon: Code2 },
            { name: "Supabase", icon: Database },
            { name: "PostgreSQL", icon: Database },
            { name: "Raspberry Pi", icon: Cpu },
            { name: "Arduino", icon: Cpu },
            { name: "Embedded Linux", icon: Server },
            { name: "IoT / MQTT", icon: Cloud },
            { name: "Git", icon: Code2 },
            { name: "Docker", icon: Cloud },
          ].map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 text-foreground/80 hover:text-accent transition-colors"
            >
              <tech.icon size={20} strokeWidth={2} />
              <span className="text-sm md:text-base font-bold uppercase tracking-widest">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
