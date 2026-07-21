import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CharacterReveal from "@/components/CharacterReveal";
import SkillBar from "@/components/SkillBar";
import Timeline from "@/components/Timeline";
import GitHubStats from "@/components/GitHubStats";
import TextReveal from "@/components/TextReveal";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { Button } from "@/components/ui/button";
import { personalInfo, experience, education } from "@/data/personalInfo";
import { skills } from "@/data/skills";
import { useSEO } from "@/hooks/useSEO";

const About = () => {
  useSEO({
    title: "About",
    description: "Burhan Ali — software developer and IoT architect from Kashmir with 3+ years experience building web apps, IoT systems, and APIs. 23+ projects delivered.",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // Get top skills for display
  const topSkills = skills.filter(s => s.proficiency >= 80).slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main ref={containerRef} className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-6 py-16 md:py-24">
          {/* Background pattern */}
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
                backgroundSize: "50px 50px",
              }}
            />
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left - Photo & Quick Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Profile Photo */}
                <div className="relative mx-auto max-w-sm lg:mx-0">
                  <motion.div
                    whileHover={{ rotate: -2, scale: 1.02 }}
                    className="border-2 border-foreground bg-muted shadow-[8px_8px_0px_0px_hsl(var(--foreground))] overflow-hidden rounded-xl"
                  >
                    <img
                      src="/about.png"
                      alt={personalInfo.name}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </motion.div>

                  {/* Floating availability badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-4 -right-4 md:-right-8"
                  >
                    <AvailabilityBadge />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right - Text */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Badge */}
                <div className="mb-4 inline-block border-2 border-foreground bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest text-accent-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] rounded-md">
                  About Me
                </div>

                <h1 className="text-3xl font-black uppercase leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  <CharacterReveal staggerAmount={0.015}>
                    {personalInfo.name}
                  </CharacterReveal>
                </h1>

                <p className="mt-2 text-lg font-bold text-accent md:text-xl">
                  {personalInfo.role}
                </p>

                {/* Quick info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={18} className="text-accent" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Briefcase size={18} className="text-accent" />
                    <span>{personalInfo.company}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <GraduationCap size={18} className="text-accent" />
                    <span>{personalInfo.education}</span>
                  </div>
                </div>

                <TextReveal
                  delay={0.4}
                  animate="mount"
                  className="mt-6 text-muted-foreground leading-relaxed"
                >
                  {personalInfo.shortBio}
                </TextReveal>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link to="/connect">
                      Let's Connect
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/work">View Work</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-muted/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                My Story
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mt-2 h-1 w-16 origin-left bg-foreground"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 border-2 border-foreground bg-card p-6 shadow-[6px_6px_0px_0px_hsl(var(--foreground))] md:p-10 rounded-xl"
            >
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                {personalInfo.bio}
              </p>

              {/* Philosophy quotes */}
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {personalInfo.philosophy.map((quote, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-3 border-l-4 border-accent bg-muted/50 p-4"
                  >
                    <span className="text-xl text-accent">"</span>
                    <p className="text-sm font-medium text-foreground">{quote}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Technical Skills
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mt-2 h-1 w-16 origin-left bg-foreground"
              />
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Skill Bars */}
              <div className="space-y-6">
                {topSkills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    proficiency={skill.proficiency}
                    index={i}
                  />
                ))}
              </div>

              {/* GitHub Stats */}
              <GitHubStats />
            </div>
          </div>
        </section>

        {/* Experience & Education Timeline */}
        <section className="bg-muted/30 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Journey & Growth
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mt-2 h-1 w-16 origin-center bg-foreground"
              />
              <p className="mt-4 text-muted-foreground">
                Building expertise through real-world challenges
              </p>
            </motion.div>

            <div className="space-y-16">
              {/* Experience */}
              <Timeline items={experience} title="Professional Experience" type="experience" />

              {/* Education */}
              <Timeline items={education} title="Education & Learning" type="education" />
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Beyond Coding
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mt-2 h-1 w-16 bg-foreground"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              {personalInfo.interests.map((interest, i) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ y: -4, rotate: Math.random() > 0.5 ? 2 : -2 }}
                  className="flex items-center gap-2 border-2 border-foreground bg-card px-4 py-3 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] rounded-md"
                >
                  <Heart size={16} className="text-accent" />
                  <span className="font-bold uppercase tracking-wide text-foreground">
                    {interest}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t-2 border-foreground bg-accent/10 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                Let's Build Something Amazing Together
              </h2>
              <p className="mt-4 text-muted-foreground">
                Whether you have a project in mind or just want to chat about technology,
                I'd love to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <a
                    href={`https://wa.me/${personalInfo.whatsapp}?text=Hi%20Burhan,%20I%27d%20like%20to%20discuss%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Free Call →
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/work">View Work</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
