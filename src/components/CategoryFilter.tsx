import { motion } from "framer-motion";
import { Layout, Cpu, Terminal, Component, Wrench, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolCategory } from "@/data/openSourceTools";

interface CategoryFilterProps {
  categories: { id: ToolCategory; label: string; icon: string }[];
  activeCategory: ToolCategory | "all";
  onCategoryChange: (category: ToolCategory | "all") => void;
}

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Cpu,
  Terminal,
  Component,
  Wrench,
};

const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  const allCategories = [
    { id: "all" as const, label: "All Tools", icon: "Layout" },
    ...categories,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-2"
    >
      {allCategories.map((category, index) => {
        const Icon = iconMap[category.icon] || Layout;
        const isActive = activeCategory === category.id;

        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative flex items-center gap-2 border-2 border-foreground px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-150 rounded-md",
              isActive
                ? "bg-foreground text-background shadow-[4px_4px_0px_0px_hsl(var(--accent))]"
                : "bg-background text-foreground shadow-[2px_2px_0px_0px_hsl(var(--muted))] hover:shadow-[4px_4px_0px_0px_hsl(var(--accent))]"
            )}
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{category.label}</span>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 -z-10 bg-accent"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default CategoryFilter;
