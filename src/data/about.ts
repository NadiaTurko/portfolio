import type { AboutStat } from "../types";

export const aboutStats: AboutStat[] = [
  {
    id: "experience",
    value: "1+",
    label: "Years",
    sub: "Experience",
    icon: "bx-award",
  },
  {
    id: "work-format",
    label: "Hybrid · Remote · Office",
    sub: "Work format",
    icon: "bx-buildings",
    formats: true,
  },
  {
    id: "location",
    value: "🇺🇦",
    label: "Lviv",
    sub: "Ukraine",
    icon: "bx-map",
  },
];

export const aboutHighlights = [
  "Performance",
  "UI Components",
  "Figma → Code",
  "Responsive",
] as const;

export const aboutLearning = ["Next.js", "Stripe", "TypeScript"] as const;

export const aboutDescription =
  "Strong collaborator with designers and backend developers. I focus on performance optimization, reusable UI components, and pixel-perfect responsive layouts.";

export const aboutBadge = "Open to opportunities";
