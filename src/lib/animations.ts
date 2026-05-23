/**
 * Centralized animation constants and variants for Framer Motion
 * This ensures consistency across the site and makes it easier to tune performance.
 */

export const EASING = [0.22, 1, 0.36, 1] as const; // Custom cubic-bezier for smooth reveals

export const DURATIONS = {
    slow: 0.8,
    default: 0.6,
    fast: 0.4,
    veryFast: 0.2,
};

export const STAGGER = {
    default: 0.15,
    tight: 0.08,
    word: 0.05,
    character: 0.015,
};

export const SPRING_CONFIGS = {
    default: { stiffness: 300, damping: 30 },
    bouncy: { stiffness: 400, damping: 25 },
    smooth: { stiffness: 200, damping: 25 },
    gentle: { stiffness: 100, damping: 20 },
};

export const TRANSITIONS = {
    default: {
        duration: DURATIONS.default,
        ease: EASING,
    },
    slow: {
        duration: DURATIONS.slow,
        ease: EASING,
    },
    fast: {
        duration: DURATIONS.fast,
        ease: EASING,
    },
};

// Common animation variants
export const FADE_UP_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * STAGGER.default,
            ...TRANSITIONS.default,
        },
    }),
};

export const REVEAL_VARIANTS = {
    hidden: { y: "110%" },
    visible: (i: number = 0) => ({
        y: "0%",
        transition: {
            delay: i * STAGGER.default,
            ...TRANSITIONS.default,
        },
    }),
};
