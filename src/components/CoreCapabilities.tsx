import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Cpu, Code2, GraduationCap } from "lucide-react";

const capabilities = [
  {
    title: "Hardware & IoT Engineering",
    description: "Designing and deploying physical systems. From Raspberry Pi and microcontrollers to sensor networks and real-time data pipelines.",
    icon: Cpu,
  },
  {
    title: "Full-Stack Software",
    description: "Building fast, scalable web applications and APIs that interface flawlessly with hardware and provide beautiful user experiences.",
    icon: Code2,
  },
  {
    title: "Technical Education",
    description: "Translating complex engineering concepts into hands-on workshops. Empowering the next generation of builders and problem solvers.",
    icon: GraduationCap,
  },
];

const CoreCapabilities = () => {
  return (
    <section className="border-y-2 border-foreground bg-background px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal variant="fade-up" once className="mb-12 md:mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
            Core Arsenal
          </h2>
          <div className="mt-4 h-1 w-16 bg-accent" />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3 md:gap-12 lg:gap-16">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
                <cap.icon size={24} strokeWidth={2} />
              </div>
              <h3 className="mb-3 text-lg font-black uppercase tracking-tight text-foreground md:text-xl">
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
