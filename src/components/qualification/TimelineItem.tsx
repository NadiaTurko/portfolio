import type { CSSProperties } from "react";
import type { TimelineItemProps } from "../../types";

const TimelineItem = ({ item, index, isOpen, onToggle }: TimelineItemProps) => {
  const panelId = `qualification-panel-${item.id}`;
  const isCurrent = item.period.endsWith("Present");

  const summary = (
    <>
      <span className="qualification__heading-text">
        <span className="qualification__title">{item.title}</span>
        <span className="qualification__subtitle">{item.subtitle}</span>
      </span>
      <span className="qualification__meta">
        {isCurrent && (
          <span className="qualification__now">
            <span className="qualification__now-dot"></span>
            Now
          </span>
        )}
        <span className="qualification__period">{item.period}</span>
      </span>
    </>
  );

  return (
    <li
      className="qualification__item"
      style={{ "--i": index } as CSSProperties}
    >
      <span className="qualification__rounder" aria-hidden="true"></span>

      <article
        className={`qualification__card${isOpen ? " qualification__card--open" : ""}`}
      >
        <h3 className="qualification__heading">
          {item.description ? (
            <button
              type="button"
              className="qualification__header"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={onToggle}
            >
              {summary}
              <i className="bx bx-chevron-down qualification__chevron"></i>
            </button>
          ) : (
            <span className="qualification__header qualification__header--static">
              {summary}
            </span>
          )}
        </h3>

        {item.description && (
          <div id={panelId} className="qualification__panel">
            <div className="qualification__panel-inner">
              <p className="qualification__description">{item.description}</p>
            </div>
          </div>
        )}

        {item.tags && (
          <div className="qualification__tags">
            {item.tags.map((tag) => (
              <span key={tag} className="qualification__tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </li>
  );
};

export default TimelineItem;
