import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Download, Mail, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SkillBar from "@/components/SkillBar";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { personalInfo, experience, education, certifications } from "@/data/personalInfo";
import { skills, skillCategories } from "@/data/skills";

const Resume = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // Typewriter effect for summary
  const [displayedText, setDisplayedText] = useState("");
  const summaryText = personalInfo.shortBio;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < summaryText.length) {
        setDisplayedText(summaryText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main ref={containerRef} className="relative overflow-hidden">
        {/* Header Section */}
        <section className="relative px-6 py-16 md:py-24">
          {/* Background */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 -z-10 opacity-[0.03]"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
          </motion.div>

          <div className="mx-auto max-w-4xl">
            {/* Download button - sticky */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex justify-end"
            >
              <Button
                size="lg"
                className="shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                asChild
              >
                <a href="/resume.pdf" download="Burhan_Ali_Resume.pdf">
                  <Download size={18} />
                  Download PDF
                </a>
              </Button>
            </motion.div>

            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-foreground bg-card p-6 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                    {personalInfo.name}
                  </h1>
                  <p className="mt-1 text-lg font-bold text-accent">
                    {personalInfo.role}
                  </p>
                </div>

                {/* Contact info */}
                <div className="space-y-2 text-sm">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent"
                  >
                    <Mail size={16} />
                    {personalInfo.email}
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} />
                    {personalInfo.location}
                  </div>
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent"
                  >
                    <Github size={16} />
                    github.com/Burhanali2211
                  </a>
                </div>
              </div>

              {/* Summary with typewriter */}
              <div className="mt-6 border-t-2 border-foreground pt-6">
                <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-muted-foreground">
                  Professional Summary
                </h2>
                <p className="text-lg text-foreground">
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-accent ml-1 align-middle"
                  />
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-muted/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
                Technical Skills
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-2 h-1 w-12 origin-left bg-foreground"
              />
            </motion.div>

            {/* Skills by category */}
            <div className="grid gap-8 md:grid-cols-2">
              {Object.entries(skillsByCategory).map(([category, categorySkills], catIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]"
                >
                  <h3 className="mb-4 text-sm font-black uppercase tracking-wide text-accent">
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {categorySkills.slice(0, 4).map((skill, i) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        proficiency={skill.proficiency}
                        index={i}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
                Experience
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-2 h-1 w-12 origin-left bg-foreground"
              />
            </motion.div>

            <Timeline items={experience} />
          </div>
        </section>

        {/* Education Section */}
        <section className="bg-muted/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
                Education
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-2 h-1 w-12 origin-left bg-foreground"
              />
            </motion.div>

            <Timeline items={education} />
          </div>
        </section>

        {/* Certifications */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
                Certifications & Training
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-2 h-1 w-12 origin-left bg-foreground"
              />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="border-2 border-foreground bg-card p-4 shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-shadow hover:shadow-[5px_5px_0px_0px_hsl(var(--accent))]"
                >
                  <div className="mb-2 inline-block border border-accent bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                    {cert.year}
                  </div>
                  <h3 className="font-bold uppercase tracking-tight text-foreground">
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="border-t-2 border-foreground bg-accent/10 px-6 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-muted-foreground">
              Interested in working together?{" "}
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-bold text-accent underline hover:no-underline"
              >
                Get in touch
              </a>{" "}
              or{" "}
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent underline hover:no-underline"
              >
                check out my GitHub
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
