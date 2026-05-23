import { motion } from "framer-motion";
import { personalInfo } from "@/data/personalInfo";

interface AvailabilityBadgeProps {
  size?: "small" | "medium" | "large";
  showMessage?: boolean;
}

const AvailabilityBadge = ({ size = "medium", showMessage = true }: AvailabilityBadgeProps) => {
  const { availability } = personalInfo;
  
  const statusColors = {
    available: {
      bg: "bg-green-500",
      ring: "ring-green-500/30",
      text: "text-green-600",
    },
    busy: {
      bg: "bg-yellow-500",
      ring: "ring-yellow-500/30",
      text: "text-yellow-600",
    },
    unavailable: {
      bg: "bg-red-500",
      ring: "ring-red-500/30",
      text: "text-red-600",
    },
  };

  const colors = statusColors[availability.status];

  const sizes = {
    small: {
      dot: "h-2 w-2",
      text: "text-xs",
      padding: "px-2 py-1",
    },
    medium: {
      dot: "h-2.5 w-2.5",
      text: "text-sm",
      padding: "px-3 py-1.5",
    },
    large: {
      dot: "h-3 w-3",
      text: "text-base",
      padding: "px-4 py-2",
    },
  };

  const sizeStyles = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 border-2 border-foreground bg-background shadow-[3px_3px_0px_0px_hsl(var(--foreground))] ${sizeStyles.padding}`}
    >
      {/* Pulsing dot */}
      <span className="relative flex items-center justify-center">
        <motion.span
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${sizeStyles.dot} rounded-full ${colors.bg}`}
        />
        <span className={`relative ${sizeStyles.dot} rounded-full ${colors.bg}`} />
      </span>

      {/* Text */}
      {showMessage && (
        <span className={`font-bold uppercase tracking-wide ${sizeStyles.text} ${colors.text}`}>
          {availability.message}
        </span>
      )}
    </motion.div>
  );
};

export default AvailabilityBadge;
