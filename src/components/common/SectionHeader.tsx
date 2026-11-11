import Reveal from "./Reveal";
import DecodeText from "./DecodeText";
import type { SectionHeaderProps } from "../../types";

/** A small mono label over a large serif heading whose last word is set in italics. */
const SectionHeader = ({ title, subtitle, delay = 0 }: SectionHeaderProps) => {
  const words = subtitle.split(" ");
  const accent = words.pop() ?? "";

  return (
    <Reveal delay={delay}>
      <h2 className="section__heading">
        <span className="section__eyebrow">{title}</span>
        <DecodeText
          className="section__title"
          segments={[
            ...(words.length > 0 ? [{ text: `${words.join(" ")} ` }] : []),
            { text: accent, italic: true, className: "title-accent" },
          ]}
        />
      </h2>
    </Reveal>
  );
};

export default SectionHeader;
