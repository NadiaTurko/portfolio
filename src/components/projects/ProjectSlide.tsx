import type { ProjectSlideProps } from "../../types";

const getHost = (url: string): string =>
  new URL(url).hostname.replace(/^www\./, "");

const ProjectSlide = ({ project, position, onClick }: ProjectSlideProps) => {
  const isFront = position === "0";

  const sharedProps = {
    className: "projects__slide",
    "data-pos": position,
    draggable: false,
    "aria-hidden": isFront ? undefined : true,
    onClick,
  };

  const content = (
    <span className="projects__slide-tilt">
      <span className="projects__slide-bar" aria-hidden="true">
        <span className="projects__slide-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="projects__slide-url">
          {project.demo ? getHost(project.demo) : project.title}
        </span>
      </span>
      <span className="projects__slide-shot">
        <img
          src={project.image}
          alt={project.alt}
          className="projects__image"
          width={960}
          height={600}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="projects__slide-shine" aria-hidden="true" />
      {project.demo && (
        <span className="projects__slide-cursor" aria-hidden="true">
          Visit
          <i className="bx bx-right-top-arrow-circle"></i>
        </span>
      )}
    </span>
  );

  if (!project.demo) return <div {...sharedProps}>{content}</div>;

  return (
    <a
      {...sharedProps}
      href={project.demo}
      target="_blank"
      rel="noreferrer"
      tabIndex={isFront ? undefined : -1}
      aria-label={`Open ${project.title} website`}
    >
      {content}
    </a>
  );
};

export default ProjectSlide;
