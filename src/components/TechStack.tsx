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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {techCategories.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-4 flex items-center gap-3">
                <category.icon size={20} className="text-accent" />
                <h3 className="font-bold uppercase tracking-wide text-foreground">
                  {category.category}
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <span className="h-1 w-1 bg-foreground/30 rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
