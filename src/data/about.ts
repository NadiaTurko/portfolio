import type { AboutAccordionItem, AboutStat } from "../types";

export const aboutStats: AboutStat[] = [
  {
    id: "experience",
    value: "2+",
    label: "Years",
    sub: "Experience",
  },
  {
    id: "work-format",
    label: "Hybrid · Remote · Office",
    sub: "Work format",
  },
  {
    id: "location",
    value: "🇺🇦",
    label: "Lviv, Ukraine",
    sub: "Local time",
    timeZone: "Europe/Kyiv",
  },
];

export const aboutHighlights = [
  "React + TypeScript",
  "Web Performance",
  "Figma → Production",
  "AI-assisted Development",
  "AI Automation",
] as const;

export const aboutLearning = ["Next.js", "Stripe", "Claude Code AI Agents"] as const;

export const aboutLead =
  "I turn product designs into production-ready solutions using React and TypeScript, building scalable, responsive interfaces with reusable components.";

export const aboutParagraphs = [
  "I collaborate closely with designers and backend developers to deliver high-quality products, leveraging AI-powered development tools such as Claude Code and Cursor to optimize workflows and accelerate delivery.",
  "I also build AI-powered agents and workflow automations using n8n, API integrations, and modern AI tools.",
] as const;

export const aboutAccordion: AboutAccordionItem[] = [
  {
    id: "collaboration",
    title: "Collaboration & Delivery",
    text: aboutParagraphs[0],
  },
  {
    id: "automation",
    title: "AI Agents & Automation",
    text: aboutParagraphs[1],
  },
  {
    id: "learning",
    title: "Currently Learning",
    tags: aboutLearning,
  },
];

export const aboutBadge = "Open to opportunities";
