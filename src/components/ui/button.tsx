import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold uppercase tracking-wide ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default:
          "border border-foreground md:border-2 bg-foreground text-background shadow-[2px_2px_0px_0px_hsl(var(--accent))] md:shadow-[4px_4px_0px_0px_hsl(var(--accent))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_hsl(var(--accent))]",
        destructive:
          "border border-destructive md:border-2 bg-destructive text-destructive-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_hsl(var(--foreground))]",
        outline:
          "border border-foreground md:border-2 bg-background text-foreground shadow-[2px_2px_0px_0px_hsl(var(--muted))] md:shadow-[4px_4px_0px_0px_hsl(var(--muted))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_hsl(var(--accent))]",
        secondary:
          "border border-foreground md:border-2 bg-secondary text-secondary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] md:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_hsl(var(--accent))]",
        ghost:
          "border-2 border-transparent text-foreground hover:border-foreground hover:bg-accent hover:text-accent-foreground active:bg-foreground active:text-background",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 md:h-10 px-4 md:px-5 py-2",
        sm: "h-8 md:h-9 px-3 md:px-4",
        lg: "h-11 md:h-12 px-6 md:px-8",
        icon: "h-9 w-9 md:h-10 md:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
