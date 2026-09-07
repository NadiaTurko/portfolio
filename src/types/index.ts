export type Theme = "light" | "dark";

export type SkillLevel =
  | "production"
  | "confident"
  | "good"
  | "daily"
  | "learning"
  | "basic"
  | "ai";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  type: string;
  period: string;
  description: string;
  stack: string[];
  image: string;
  alt: string;
  demo: string;
  github?: string;
}

export interface AboutStat {
  id: string;
  value?: string;
  label: string;
  sub: string;
  icon: string;
  formats?: boolean;
  compactValue?: boolean;
}

export interface NavLinkItem {
  id: string;
  href: string;
  label: string;
  icon: string;
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface SocialLink {
  id: string;
  href: string;
  label: string;
  icon: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  align: "left" | "right";
  description?: string;
}

export interface QualificationTab {
  id: string;
  label: string;
  icon: string;
}

export interface ContactCardData {
  id: string;
  title: string;
  data: string;
  href: string;
  icon: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface HomeContent {
  name: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export interface SectionHeaderProps {
  title: string;
  subtitle: string;
  delay?: number;
}

export interface SocialLinksProps {
  links: SocialLink[];
  listClassName: string;
  linkClassName: string;
}

export interface SkillCardProps {
  category: SkillCategory;
}

export interface ProjectCardProps {
  project: Project;
}

export interface StatBoxProps {
  stat: AboutStat;
}

export interface TimelineItemProps {
  item: TimelineEntry;
}

export interface ContactCardProps {
  card: ContactCardData;
}
