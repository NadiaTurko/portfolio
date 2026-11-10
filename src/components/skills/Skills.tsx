import { useState } from "react";
import "./skills.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import SkillCard from "./SkillCard";
import SkillFilters from "./SkillFilters";
import { skillCategories, skillLevelLabels } from "../../data/skills";
import type { SkillLevel } from "../../types";

const allSkills = skillCategories.flatMap((category) => category.skills);

const levelFilters = (Object.keys(skillLevelLabels) as SkillLevel[])
  .map((level) => ({
    level,
    label: skillLevelLabels[level],
    count: allSkills.filter((skill) => skill.level === level).length,
  }))
  .filter((filter) => filter.count > 0);

const Skills = () => {
  const [activeLevel, setActiveLevel] = useState<SkillLevel | null>(null);

  return (
    <section className="skills section" id="skills">
      <SectionHeader title="Skills" subtitle="Tech stack & tools" />

      <div className="skills__container container">
        <Reveal>
          <SkillFilters
            filters={levelFilters}
            totalCount={allSkills.length}
            activeLevel={activeLevel}
            onChange={setActiveLevel}
          />
        </Reveal>

        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <Reveal key={category.title} delay={index * 80}>
              <SkillCard category={category} activeLevel={activeLevel} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
