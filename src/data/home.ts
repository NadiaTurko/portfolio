import type { HomeContent, TerminalLine } from "../types";

export const homeContent: HomeContent = {
  name: "Nadia Romanchuk",
  title: "Frontend Developer",
  roles: ["Frontend Developer", "AI Automation Engineer", "React + TypeScript"],
  facts: [
    { label: "Based in", value: "Lviv, Ukraine" },
    { label: "Experience", value: "2+ years" },
    { label: "Stack", value: "React · TypeScript · n8n" },
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

/** Illustrative commands for the hero terminal; outputs restate facts from the site. */
export const homeTerminal: TerminalLine[] = [
  { command: "whoami", output: "nadia · frontend & ai automation engineer" },
  { command: "cat stack.txt", output: "react · typescript · n8n · claude code" },
  { command: "npm run build", output: "✓ compiled successfully" },
  { command: "n8n execute --workflow clinic-reports", output: "✓ reports sent to telegram" },
];
