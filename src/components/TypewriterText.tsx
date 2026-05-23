import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursorClassName?: string;
}

const TypewriterText = ({
  text,
  className,
  speed = 50,
  delay = 0,
  cursorClassName,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{displayedText}</span>
      <AnimatePresence>
        {started && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              times: [0, 0.5, 1],
            }}
            className={cn(
              "ml-0.5 inline-block h-[1.1em] w-[0.6em] border-2 border-foreground bg-accent-foreground",
              done && "opacity-0",
              cursorClassName
            )}
          />
        )}
      </AnimatePresence>
    </span>
  );
};

export default TypewriterText;
