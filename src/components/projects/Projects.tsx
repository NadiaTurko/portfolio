import "./projects.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import ProjectsSlideshow from "./ProjectsSlideshow";
import { projects } from "../../data/projects";

const Projects = () => {
  return (
    <section className="projects section" id="portfolio">
      <SectionHeader title="Projects" subtitle="Selected work" />

      <Reveal>
        <ProjectsSlideshow projects={projects} />
      </Reveal>
    </section>
  );
};

export default Projects;
