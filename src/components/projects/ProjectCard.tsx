import type { ProjectCardProps } from "../../types";

const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className="projects__card">
    <a
      href={project.demo}
      target="_blank"
      rel="noreferrer"
      className="projects__preview"
    >
      <img
        src={project.image}
        alt={project.alt}
        className="projects__image"
        width={960}
        height={600}
        loading="lazy"
        decoding="async"
      />
      <span className="projects__type-badge">{project.type}</span>
      <span className="projects__preview-overlay">
        <i className="bx bx-link-external"></i>
        View live
      </span>
    </a>

    <div className="projects__body">
      <div className="projects__card-header">
        <h3 className="projects__title">{project.title}</h3>
        <span className="projects__period">{project.period}</span>
      </div>
      <p className="projects__description">{project.description}</p>
      <div className="projects__stack">
        {project.stack.map((tech) => (
          <span key={tech} className="projects__tag">
            {tech}
          </span>
        ))}
      </div>
      <div className="projects__links">
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="projects__link projects__link--primary"
        >
          <i className="bx bx-globe"></i>
          Live Demo
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="projects__link"
          >
            <i className="uil uil-github-alt"></i>
            GitHub
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
