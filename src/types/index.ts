import type { MouseEvent } from "react";

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

export interface SkillRow {
  label: string;
  items: string[];
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  icon: string;
  skills: Skill[];
  rows: SkillRow[];
  /** Pairs of skill names to connect; same-line pairs get a straight link. */
  links: [string, string][];
  highlight?: string;
  /** Rows from..to (inclusive) drawn inside a dashed, labelled box. */
  group?: { label: string; from: number; to: number };
}

export interface SkillDiagramProps {
  category: SkillCategory;
  activeLevel: SkillLevel | null;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectResults {
  caption: string;
  metrics: ProjectMetric[];
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
  results?: ProjectResults;
  demo?: string;
  github?: string;
}

export interface AboutStat {
  id: string;
  value?: string;
  label: string;
  sub: string;
  compactValue?: boolean;
  timeZone?: string;
}

export interface AboutAccordionItem {
  id: string;
  title: string;
  text?: string;
  tags?: readonly string[];
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
  description?: string;
  tags?: string[];
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
  copyable?: boolean;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface HeroFact {
  label: string;
  value: string;
}

export interface TerminalLine {
  command: string;
  output: string;
}

export interface HomeContent {
  name: string;
  title: string;
  roles: string[];
  facts: HeroFact[];
  lead: string;
  paragraphs: string[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface ThemeToggleOrigin {
  clientX: number;
  clientY: number;
}

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (origin?: ThemeToggleOrigin) => void;
}

export interface GitHubRepo {
  name: string;
  url: string;
  language: string | null;
  pushedAt: string;
}

export interface GitHubDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubActivity {
  repoCount: number;
  total: number;
  repos: GitHubRepo[];
  days: GitHubDay[];
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

export interface SkillFilterOption {
  level: SkillLevel;
  label: string;
  count: number;
}

export interface SkillFiltersProps {
  filters: SkillFilterOption[];
  totalCount: number;
  activeLevel: SkillLevel | null;
  onChange: (level: SkillLevel | null) => void;
}

export interface SkillCardProps {
  category: SkillCategory;
  activeLevel: SkillLevel | null;
}

export type DeckPosition = "0" | "1" | "2" | "3" | "out";

export interface ProjectSlideProps {
  project: Project;
  position: DeckPosition;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export interface ProjectDetailsProps {
  project: Project;
  number: string;
  isActive: boolean;
}

export interface ProjectsSlideshowProps {
  projects: Project[];
}

export interface StatBoxProps {
  stat: AboutStat;
}

export interface TimelineProps {
  items: TimelineEntry[];
}

export interface TimelineItemProps {
  item: TimelineEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export interface ContactCardProps {
  card: ContactCardData;
}
