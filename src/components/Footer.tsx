import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Github, Instagram, Heart } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
    { icon: Github, href: personalInfo.social.github, label: "GitHub" },
    { icon: Instagram, href: personalInfo.social.instagram, label: "Instagram" },
  ];

  const brandLetters = personalInfo.name.split(" ")[0].split("");

  return (
    <footer className="border-t-2 border-foreground bg-muted/20 px-6 py-12 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-5xl"
      >
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand - letter stagger */}
          <div>
            <Link
              to="/"
              className="text-xl font-black uppercase tracking-tight text-foreground transition-colors hover:text-accent"
            >
              {brandLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    delay: 0.1 + i * 0.04,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </Link>
          </div>

          {/* Social Links - cascade from right to left */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: 0.3 + (socialLinks.length - 1 - i) * 0.08,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ x: -2, y: -2, rotate: 5 }}
                className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-background text-foreground rounded-md shadow-[2px_2px_0px_0px_hsl(var(--foreground))] transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-[3px_3px_0px_0px_hsl(var(--accent))] md:h-10 md:w-10 md:shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
                aria-label={social.label}
              >
                <social.icon size={18} strokeWidth={2} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright - border draws in via scroll */}
        <div className="mt-8 pt-8 text-center relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 h-0.5 origin-left bg-foreground"
          />
          <p className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            © {currentYear} • Built with <Heart size={14} className="text-accent fill-accent" /> by {personalInfo.name}
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
