import type { ProjectDetailsProps } from "../../types";

const ProjectDetails = ({ project, number, isActive }: ProjectDetailsProps) => (
  <article
    className={`projects__details ${isActive ? "projects__details--active" : ""}`.trim()}
  >
    <span className="projects__number" aria-hidden="true">
      {number}
    </span>

    <div className="projects__meta">
      <span className="projects__type-badge">{project.type}</span>
      {project.period && (
        <span className="projects__period">{project.period}</span>
      )}
    </div>

    <h3 className="projects__title">{project.title}</h3>
    <p className="projects__description">{project.description}</p>

    {project.results && (
      <div className="projects__results">
        <p className="projects__results-caption">{project.results.caption}</p>
        <dl className="projects__metrics">
          {project.results.metrics.map((metric) => (
            <div key={metric.label} className="projects__metric">
              <dt className="projects__metric-label">{metric.label}</dt>
              <dd className="projects__metric-value">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    )}

    <div className="projects__stack">
      {project.stack.map((tech) => (
        <span key={tech} className="projects__tag">
          {tech}
        </span>
      ))}
    </div>

    {(project.demo || project.github) && (
      <div className="projects__links">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="projects__link projects__link--primary"
          >
            <i className="bx bx-globe"></i>
            Live Demo
          </a>
        )}
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
    )}
  </article>
);

export default ProjectDetails;
