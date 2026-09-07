import type { SkillCategory, SkillLevel } from "../types";

export const skillLevelLabels: Record<SkillLevel, string> = {
  production: "Production",
  confident: "Confident",
  good: "Good",
  daily: "Daily use",
  learning: "Currently learning",
  basic: "Basic",
  ai: "AI",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "bx-code-alt",
    skills: [
      { name: "React", level: "production" },
      { name: "Redux / Toolkit", level: "production" },
      { name: "Zustand", level: "production" },
      { name: "React Router", level: "confident" },
      { name: "TanStack Query", level: "confident" },
      { name: "SOLID", level: "confident" },
      { name: "DRY", level: "confident" },
      { name: "KISS", level: "confident" },
    ],
  },
  {
    title: "Languages & Web",
    icon: "bx-globe",
    skills: [
      { name: "JavaScript", level: "confident" },
      { name: "TypeScript", level: "confident" },
      { name: "HTML / CSS", level: "confident" },
      { name: "SCSS", level: "confident" },
      { name: "Tailwind CSS", level: "confident" },
      { name: "REST API / Axios", level: "good" },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: "bx-wrench",
    skills: [
      { name: "Git / GitHub", level: "daily" },
      { name: "Gulp", level: "confident" },
      { name: "WordPress", level: "production" },
      { name: "Chrome DevTools", level: "confident" },
      { name: "WebStorm / VS Code", level: "daily" },
      { name: "Figma → Code", level: "production" },
    ],
  },
  {
    title: "AI & Growth",
    icon: "bx-chip",
    skills: [
      { name: "Cursor", level: "ai" },
      { name: "Claude Code", level: "ai" },
      { name: "Jest / RTL", level: "learning" },
      { name: "MySQL / MongoDB", level: "basic" },
      { name: "English B1 — actively improving", level: "learning" },
    ],
  },
];
