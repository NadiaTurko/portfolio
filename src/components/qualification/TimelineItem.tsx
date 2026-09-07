import type { TimelineItemProps } from "../../types";

const TimelineItem = ({ item }: TimelineItemProps) => (
  <div className="qualification__data">
    {item.align === "left" ? (
      <>
        <div>
          <h3 className="qualification__title">{item.title}</h3>
          <span className="qualification__subtitle">{item.subtitle}</span>
          <div className="qualification__calendar">
            <i className="uil uil-calendar-alt"></i> {item.period}
          </div>
          {item.description && (
            <p className="qualification__description">{item.description}</p>
          )}
        </div>
        <div>
          <span className="qualification__rounder"></span>
          <span className="qualification__line"></span>
        </div>
      </>
    ) : (
      <>
        <div></div>
        <div>
          <span className="qualification__rounder"></span>
          <span className="qualification__line"></span>
        </div>
        <div>
          <h3 className="qualification__title">{item.title}</h3>
          <span className="qualification__subtitle">{item.subtitle}</span>
          <div className="qualification__calendar">
            <i className="uil uil-calendar-alt"></i> {item.period}
          </div>
          {item.description && (
            <p className="qualification__description">{item.description}</p>
          )}
        </div>
      </>
    )}
  </div>
);

export default TimelineItem;
