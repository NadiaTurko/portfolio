import {
  projectBooktrackImg,
  projectDentalImg,
} from "../assets";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "booktrack",
    title: "BookTrack",
    type: "Personal Project",
    period: "Dec 2025 – Jan 2026",
    description:
      "Book-tracking SPA with Firebase Authentication (email + Google). Built debounced search, favorites, and progress tracking via custom hooks and Context API.",
    stack: ["React", "Context API", "React Router", "Firebase Auth", "Formik", "Tailwind CSS"],
    image: projectBooktrackImg,
    alt: "BookTrack app preview",
    demo: "https://nadiaturko.github.io/booktrack/",
    github: "https://github.com/NadiaTurko/booktrack",
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
];
