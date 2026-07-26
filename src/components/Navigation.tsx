import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, Mail, Github, Instagram, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { personalInfo } from "@/data/personalInfo";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down past 50px, otherwise show
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/work", label: "Work" },
    { to: "/services", label: "Services" },
    { to: "/connect", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/work") {
      return (
        location.pathname === "/work" || location.pathname.startsWith("/work/")
      );
    }
    return location.pathname === path;
  };

  return (
    <motion.header 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-[100] w-full border-b-2 border-foreground bg-background"
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:h-16 md:px-8">
        {/* Animated Brand Logo */}
        <Link to="/">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative flex items-center gap-1"
          >
            {/* Logo Icon */}
            <motion.div
              className="mr-1 flex h-8 w-8 items-center justify-center border border-foreground md:border-2 bg-accent rounded-md shadow-[1px_1px_0px_0px_hsl(var(--foreground))] md:shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
              whileHover={{ rotate: 5, x: -1, y: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-sm font-black text-accent-foreground">BA</span>
            </motion.div>

            {/* Text */}
            <span className="text-lg font-black uppercase tracking-tight text-foreground">
              Burhan Ali
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-150",
                isActive(link.to)
                  ? "border-2 border-foreground bg-foreground text-background rounded-md shadow-[3px_3px_0px_0px_hsl(var(--accent))]"
                  : "border-2 border-transparent text-muted-foreground rounded-md hover:border-foreground hover:text-foreground active:bg-foreground active:text-background"
              )}
            >
              {link.label}
            </Link>
          ))}
          <motion.a
            href={`https://wa.me/${personalInfo.whatsapp}?text=Hi%20Burhan,%20I'd%20like%20to%20discuss%20a%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: -2, y: -2 }}
            whileTap={{ x: 0, y: 0 }}
            className="ml-2 flex items-center gap-2 border-2 border-foreground bg-accent px-4 py-2 text-sm font-black uppercase tracking-wide text-accent-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-all hover:shadow-[5px_5px_0px_0px_hsl(var(--foreground))]"
          >
            Book a Call →
          </motion.a>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center border border-foreground md:border-2 bg-background text-foreground rounded-md shadow-[2px_2px_0px_0px_hsl(var(--foreground))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_hsl(var(--accent))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_hsl(var(--accent))] md:h-10 md:w-10 md:shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2.5} />
            </motion.button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[280px] flex-col border-l-2 border-foreground"
          >
            {/* Centered Navigation Links */}
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full"
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block border-2 px-4 py-3 text-center text-lg font-bold uppercase tracking-wide transition-all duration-150",
                      isActive(link.to)
                        ? "border-foreground bg-foreground text-background rounded-md shadow-[4px_4px_0px_0px_hsl(var(--accent))]"
                        : "border-foreground bg-background text-foreground rounded-md hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_hsl(var(--accent))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_hsl(var(--accent))]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Social Links at Bottom */}
            <div className="border-t-2 border-foreground pt-6 pb-4">
              <div className="flex items-center justify-center gap-3">
                {[
                  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
                  { icon: Phone, href: `https://wa.me/${personalInfo.whatsapp}`, label: "WhatsApp" },
                  { icon: Github, href: personalInfo.social.github, label: "GitHub" },
                  { icon: Instagram, href: personalInfo.social.instagram, label: "Instagram" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: -2, y: -2, rotate: 5 }}
                    className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-background text-foreground rounded-md shadow-[2px_2px_0px_0px_hsl(var(--foreground))] transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-[3px_3px_0px_0px_hsl(var(--accent))] md:h-10 md:w-10 md:shadow-[3px_3px_0px_0px_hsl(var(--foreground))]"
                    aria-label={social.label}
                    onClick={() => setIsOpen(false)}
                  >
                    <social.icon size={18} strokeWidth={2} />
                  </motion.a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
};

export default Navigation;
