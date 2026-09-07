import type { FooterLink, NavLinkItem } from "../types";

export const navLinks: NavLinkItem[] = [
  { id: "home", href: "#home", label: "Home", icon: "uil uil-estate" },
  { id: "about", href: "#about", label: "About", icon: "uil uil-user" },
  { id: "skills", href: "#skills", label: "Skills", icon: "uil uil-file-alt" },
  {
    id: "portfolio",
    href: "#portfolio",
    label: "Projects",
    icon: "uil uil-scenery",
  },
  {
    id: "qualification",
    href: "#qualification",
    label: "Experience",
    icon: "uil uil-briefcase-alt",
  },
  { id: "contact", href: "#contact", label: "Contact", icon: "uil uil-message" },
];

export const footerLinks: FooterLink[] = [
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
