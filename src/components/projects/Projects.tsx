import "./projects.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import ProjectCard from "./ProjectCard";
import { projects } from "../../data/projects";

const Projects = () => {
  return (
    <section className="projects section" id="portfolio">
      <SectionHeader title="Projects" subtitle="Selected work" />

      <div className="projects__container container grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 120}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
