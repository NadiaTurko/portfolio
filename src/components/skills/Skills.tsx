import "./skills.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import SkillCard from "./SkillCard";
import { skillCategories } from "../../data/skills";

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <SectionHeader title="Skills" subtitle="Tech stack & tools" />

      <div className="skills__container container">
        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <Reveal key={category.title} delay={index * 80}>
              <SkillCard category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
