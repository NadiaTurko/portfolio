import { useState } from "react";
import { aboutAccordion } from "../../data/about";
import useInView from "../../hooks/useInView";

/** On narrow screens auto-advancing would shift the page while someone reads. */
const AUTOPLAY_QUERY =
  "(min-width: 861px) and (prefers-reduced-motion: no-preference)";

const AboutAccordion = () => {
  const [rootRef, inView] = useInView<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [autoplay, setAutoplay] = useState(
    () => window.matchMedia(AUTOPLAY_QUERY).matches
  );

  const advance = (): void =>
    setOpenIndex((index) => (index + 1) % aboutAccordion.length);

  const select = (index: number): void => {
    setAutoplay(false);
    setOpenIndex(index);
  };

  const running = inView && !hovered;

  return (
    <div
      ref={rootRef}
      className="about__acc"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {aboutAccordion.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `about-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`about__acc-item${isOpen ? " about__acc-item--open" : ""}`}
          >
            <h3 className="about__acc-heading">
              <button
                type="button"
                className="about__acc-button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => select(index)}
              >
                <span className="about__acc-number">0{index + 1}</span>
                <span className="about__acc-title">{item.title}</span>
                <i className="bx bx-plus about__acc-icon"></i>
              </button>
            </h3>

            <div id={panelId} className="about__acc-panel">
              <div className="about__acc-inner">
                {item.text && <p className="about__acc-text">{item.text}</p>}
                {item.tags && (
                  <div className="about__acc-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="about__tag about__tag--learning">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {autoplay && isOpen && (
              <span
                key={openIndex}
                className="about__acc-progress"
                style={{ animationPlayState: running ? "running" : "paused" }}
                onAnimationEnd={advance}
                aria-hidden="true"
              ></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AboutAccordion;
