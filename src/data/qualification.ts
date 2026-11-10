import type { QualificationTab, TimelineEntry } from "../types";

export const qualificationTabs: QualificationTab[] = [
  { id: "education", label: "Education", icon: "uil uil-graduation-cap" },
  { id: "experience", label: "Experience", icon: "uil uil-briefcase" },
];

export const educationTimeline: TimelineEntry[] = [
  {
    id: "claude-code-courses",
    title: "Claude Code Courses",
    subtitle: "Online",
    period: "Completed",
  },
  {
    id: "react-course",
    title: "React",
    subtitle: "Hillel IT School, online",
    period: "2024",
  },
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    subtitle: "SoftServe Academy",
    period: "2023",
  },
  {
    id: "codewars",
    title: "Active Member",
    subtitle: "Codewars",
    period: "Ongoing",
  },
  {
    id: "university",
    title: "Teacher of Mathematics, Economics & Computer Science",
    subtitle: "National Pedagogical Dragomanov University, Kyiv",
    period: "2010 – 2015",
  },
];

export const experienceTimeline: TimelineEntry[] = [
  {
    id: "ai-automation",
    title: "AI Automation Engineer",
    subtitle: "Independent projects",
    period: "Aug 2026 – Present",
    description:
      "Building AI agents and workflow automations with n8n, Claude Code, and MCP connectors. Experience with API integrations and webhooks. Experience automating Google Workspace (Calendar, Gmail, Drive, Sheets).",
    tags: ["n8n", "Claude Code", "MCP", "Webhooks", "Google Workspace"],
  },
  {
    id: "valko",
    title: "Frontend Developer",
    subtitle: "VALKO.PRO · Hybrid, Ukraine",
    period: "Jun 2025 – Present",
    description:
      "Delivered commercial websites end-to-end — from Figma designs to production deployment using React, JavaScript, SCSS, and WordPress. Optimized performance (image formats, lazy loading, Gulp bundling). Created reusable UI components (sliders, modals, animated sections).",
    tags: ["React", "JavaScript", "SCSS", "WordPress", "Gulp"],
  },
  {
    id: "nda",
    title: "Frontend Developer",
    subtitle: "NDA · IT Product Company · Office",
    period: "Jul 2024 – Feb 2025",
    description:
      "Built reusable UI components used across multiple product pages. Debugged UI/performance issues with Chrome DevTools. Collaborated with designers and backend devs on UX details and API contracts. Refactored legacy jQuery into modular ES6+ JavaScript.",
    tags: ["JavaScript ES6+", "UI Components", "Chrome DevTools"],
  },
];
