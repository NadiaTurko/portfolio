import { useEffect, useRef, useState, type ElementType } from "react";

export interface DecodeSegment {
  text: string;
  className?: string;
  italic?: boolean;
}

interface DecodeTextProps {
  as?: ElementType;
  className?: string;
  segments: DecodeSegment[];
  /** "load" starts right away; "view" waits until the element scrolls into view. */
  trigger?: "load" | "view";
  delay?: number;
}

const GLYPHS = "+/{}%&01<:>;$#*=[]";
const FRAME_MS = 33;
const DURATION_MS = 700;

const randomGlyph = (): string => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/** Resolves scrambled glyphs into the real text from left to right while it rises in. */
const DecodeText = ({
  as: Tag = "span",
  className = "",
  segments,
  trigger = "view",
  delay = 0,
}: DecodeTextProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const fullText = segments.map((segment) => segment.text).join("");
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [active, setActive] = useState(reducedMotion);
  const [revealed, setRevealed] = useState(reducedMotion ? fullText.length : 0);
  const [, setFrame] = useState(0);

  useEffect(() => {
    if (active || trigger !== "load") return undefined;
    // One frame later, so the rise-in transition has a starting state to animate from.
    const frame = window.requestAnimationFrame(() => setActive(true));
    return () => window.cancelAnimationFrame(frame);
  }, [active, trigger]);

  useEffect(() => {
    if (active || trigger !== "view") return undefined;
    const element = rootRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [active, trigger]);

  useEffect(() => {
    if (!active || reducedMotion) return undefined;

    const charMs = Math.min(Math.max(DURATION_MS / fullText.length, 25), 45);
    const start = performance.now() + delay;
    const timer = window.setInterval(() => {
      const count = Math.floor((performance.now() - start) / charMs);
      setRevealed(Math.max(0, Math.min(count, fullText.length)));
      // Re-render so unrevealed glyphs keep changing.
      setFrame((value) => value + 1);
      if (count >= fullText.length) window.clearInterval(timer);
    }, FRAME_MS);

    return () => window.clearInterval(timer);
  }, [active, reducedMotion, fullText.length, delay]);

  let offset = 0;

  return (
    <Tag ref={rootRef} className={`${className} decode${active ? " decode--active" : ""}`.trim()}>
      <span className="visually-hidden">{fullText}</span>
      {segments.map((segment) => {
        const start = offset;
        offset += segment.text.length;
        const shown = Array.from(segment.text, (char, index) =>
          char === " " || start + index < revealed ? char : randomGlyph()
        ).join("");
        const Wrapper = segment.italic ? "em" : "span";

        return (
          <Wrapper key={`${start}-${segment.text}`} className={segment.className} aria-hidden="true">
            {shown}
          </Wrapper>
        );
      })}
    </Tag>
  );
};

export default DecodeText;
