import type { KeyboardEvent, MouseEvent } from "react";
import ProjectDetails from "./ProjectDetails";
import ProjectSlide from "./ProjectSlide";
import useDeckGestures from "../../hooks/useDeckGestures";
import useInView from "../../hooks/useInView";
import useSlideshow from "../../hooks/useSlideshow";
import type { DeckPosition, ProjectsSlideshowProps } from "../../types";

const formatNumber = (index: number): string =>
  String(index + 1).padStart(2, "0");

const getDeckPosition = (
  index: number,
  active: number,
  count: number
): DeckPosition => {
  const offset = (index - active + count) % count;
  if (offset === 0) return "0";
  if (offset === count - 1) return "out";
  return offset === 1 ? "1" : offset === 2 ? "2" : "3";
};

const ProjectsSlideshow = ({ projects }: ProjectsSlideshowProps) => {
  const count = projects.length;
  const { active, goTo, next, prev } = useSlideshow(count);
  const { wasDragged, handlers } = useDeckGestures({
    onNext: next,
    onPrev: prev,
  });
  const [rootRef, inView] = useInView<HTMLDivElement>();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  };

  const handleSlideClick = (
    event: MouseEvent<HTMLElement>,
    index: number
  ): void => {
    if (wasDragged.current) {
      event.preventDefault();
    } else if (index !== active) {
      event.preventDefault();
      goTo(index);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`projects__show ${inView ? "projects__show--running" : ""}`.trim()}
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      onKeyDown={handleKeyDown}
    >
      <div className="projects__details-stack">
        {projects.map((project, index) => (
          <ProjectDetails
            key={project.id}
            project={project}
            number={formatNumber(index)}
            isActive={index === active}
          />
        ))}
      </div>

      <div className="projects__stage" {...handlers}>
        <div className="projects__glow" aria-hidden="true">
          {projects.map((project, index) => (
            <span
              key={project.id}
              className={index === active ? "is-active" : undefined}
              style={{ backgroundImage: `url(${project.image})` }}
            />
          ))}
        </div>

        {projects.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            position={getDeckPosition(index, active, count)}
            onClick={(event) => handleSlideClick(event, index)}
          />
        ))}
      </div>

      <div className="projects__nav">
        <div className="projects__tabs">
          {projects.map((project, index) => {
            const isActive = index === active;
            const state = isActive
              ? "projects__tab--active"
              : index < active
                ? "projects__tab--done"
                : "";

            return (
              <button
                key={project.id}
                type="button"
                className={`projects__tab ${state}`.trim()}
                aria-label={`Show ${project.title}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(index)}
              >
                <span className="projects__tab-label">
                  <span className="projects__tab-number">
                    {formatNumber(index)}
                  </span>
                  <span className="projects__tab-name">{project.title}</span>
                </span>
                <span className="projects__tab-track">
                  <span
                    className="projects__tab-fill"
                    onAnimationEnd={isActive ? next : undefined}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="projects__arrows">
          <button
            type="button"
            className="projects__arrow"
            aria-label="Previous project"
            onClick={prev}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </button>
          <button
            type="button"
            className="projects__arrow"
            aria-label="Next project"
            onClick={next}
          >
            <i className="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSlideshow;
