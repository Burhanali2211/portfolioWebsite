import { useRef, MouseEvent, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

interface MagneticButtonProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

const MagneticButton = ({ children, to, className }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const boundsRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    boundsRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!boundsRef.current || isPressed) return;

    const rect = boundsRef.current;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    boundsRef.current = null;
    x.set(0);
    y.set(0);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    x.set(0);
    y.set(0);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="inline-block"
    >
      <Link
        to={to}
        className={`inline-flex h-12 items-center justify-center gap-2 border-2 px-8 text-sm font-bold uppercase tracking-wide transition-all duration-150 ${isPressed
          ? "translate-x-[3px] translate-y-[3px] shadow-[0px_0px_0px_0px_hsl(var(--background))]"
          : "shadow-[6px_6px_0px_0px_hsl(var(--background))] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_hsl(var(--background))]"
          } ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default MagneticButton;
