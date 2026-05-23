import { createElement } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASING, DURATIONS, STAGGER } from "@/lib/animations";
import { useViewportDetection } from "@/hooks/useViewportDetection";

interface CharacterRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  staggerAmount?: number;
  isVisible?: boolean;
}

const CharacterReveal = ({
  children,
  className,
  as = "span",
  staggerAmount = STAGGER.character,
  isVisible: externalIsVisible,
}: CharacterRevealProps) => {
  const { ref: internalRef, isVisible: inView } = useViewportDetection<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "-5% 0px -5% 0px"
  });

  const isVisible = externalIsVisible !== undefined ? externalIsVisible : inView;
  const characters = children.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerAmount,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: DURATIONS.fast,
        ease: EASING,
      }
    },
  };

  const content = characters.map((char, i) => {
    if (char === " ") {
      return <span key={i}>&nbsp;</span>;
    }

    return (
      <motion.span
        key={i}
        variants={childVariants}
        className="inline-block"
      >
        {char}
      </motion.span>
    );
  });

  return (
    <motion.div
      ref={internalRef}
      className={cn("inline", className)}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {createElement(as, { className: "inline" }, content)}
    </motion.div>
  );
};


export default CharacterReveal;
