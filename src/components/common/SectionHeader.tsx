import Reveal from "./Reveal";
import type { SectionHeaderProps } from "../../types";

const SectionHeader = ({ title, subtitle, delay = 0 }: SectionHeaderProps) => (
  <Reveal delay={delay}>
    <h2 className="section__title">{title}</h2>
    <span className="section__subtitle">{subtitle}</span>
  </Reveal>
);

export default SectionHeader;
