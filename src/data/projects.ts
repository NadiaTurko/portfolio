import {
  projectBooktrackImg,
  projectDentalImg,
  projectTvojeOslavaImg,
  projectMagicOneImg,
  projectClinicAgentImg,
} from "../assets";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "clinic-ai-agent",
    title: "Clinic AI Agent",
    type: "AI Automation",
    period: "",
    description:
      "AI agent for a dental clinic that analyzes patient records, flags unfinished treatment plans, and sends reports and doctor reminders to Telegram. Built with Claude Code and n8n.",
    results: {
      caption: "Expected results · first 3 months",
      metrics: [
        { value: "25–40 h", label: "admin time saved" },
        { value: "78", label: "automated record checks" },
        { value: "17", label: "reports with no manual prep" },
        { value: "~3,100", label: "visits checked" },
        { value: "150–300", label: "reminders to doctors" },
        { value: "14–27", label: "patients potentially returned" },
      ],
    },
    stack: ["Claude Code", "n8n", "Telegram", "AI Agents"],
    image: projectClinicAgentImg,
    alt: "Diagram of an AI agent workflow sending clinic reports from n8n to Telegram",
  },
  {
    id: "tvoje-oslava",
    title: "Tvoje Oslava",
    type: "Commercial Project",
    period: "",
    description:
      "Website for a party studio and gift shop in Hořice, Czech Republic. Online shop with cart and ordering, party programs, and creative workshops, with an animated hero slider and responsive layouts.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    image: projectTvojeOslavaImg,
    alt: "Tvoje Oslava party studio website preview",
    demo: "https://www.tvoje-oslava.cz/",
  },
  {
    id: "dental-clinic",
    title: "Dental Clinic Website",
    type: "Commercial Project",
    period: "Apr 2025 – Jul 2025",
    description:
      "Conversion-oriented marketing site built from Figma to production. Interactive UI with sliders, modals, and scroll animations. Optimized assets and Core Web Vitals via Gulp pipeline.",
    stack: ["HTML", "SCSS", "JavaScript", "Gulp", "WordPress", "Git"],
    image: projectDentalImg,
    alt: "Dental Clinic website preview",
    demo: "https://ronevich.com.ua/",
  },
  {
    id: "booktrack",
    title: "BookTrack",
    type: "Personal Project",
    period: "Dec 2025 – Jan 2026",
    description:
      "Personal reading library with shelves, smart collections, and four view modes. Search titles and authors, track progress, save favorites, and add notes — with Firebase Auth and Context API.",
    stack: ["React", "Context API", "React Router", "Firebase Auth", "Formik", "Tailwind CSS"],
    image: projectBooktrackImg,
    alt: "BookTrack reading library dashboard",
    demo: "https://nadiaturko.github.io/booktrack/",
    github: "https://github.com/NadiaTurko/booktrack",
  },
  {
    id: "magic-one",
    title: "Magic One",
    type: "Commercial Project",
    period: "",
    description:
      "Multi-page website for a dental clinic in Lviv with Ukrainian and Polish versions. Doctors, services, prices, FAQ accordion, and online appointment booking, built without frameworks.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: projectMagicOneImg,
    alt: "Magic One dental clinic website preview",
    demo: "https://www.magicone.com.ua/",
  },
];
