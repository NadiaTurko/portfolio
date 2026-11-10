import type { HomeContent } from "../types";

export const homeContent: HomeContent = {
  name: "Nadia Romanchuk",
  title: "Frontend Developer",
  roles: ["Frontend Developer", "AI Automation Engineer", "React + TypeScript"],
  chips: [
    { label: "React", icon: "bx bxl-react" },
    { label: "TypeScript", icon: "bx bxl-typescript" },
    { label: "Claude Code", icon: "bx bx-terminal" },
    { label: "n8n agents", icon: "bx bx-git-merge" },
  ],
  lead:
    "Frontend Developer with 2+ years of commercial experience building and delivering production-ready websites and web applications using JavaScript, TypeScript, React, and WordPress.",
  paragraphs: [
    "Skilled in translating Figma designs into pixel-perfect, responsive interfaces with a focus on performance, usability, and clean code. Experienced in using AI-powered development tools such as Claude Code and Cursor to streamline workflows and accelerate development.",
    "Currently expanding my expertise in Next.js, Stripe, and AI automation to build modern, scalable web applications and SaaS solutions.",
  ],
  primaryCta: { label: "Say Hello", href: "#contact" },
  secondaryCta: { label: "View Projects", href: "#portfolio" },
};
