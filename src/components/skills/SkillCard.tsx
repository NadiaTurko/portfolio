import { skillLevelLabels } from "../../data/skills";
import type { SkillCardProps } from "../../types";

const SkillCard = ({ category }: SkillCardProps) => (
  <article className="skills__card">
    <div className="skills__card-header">
      <span className="skills__card-icon">
        <i className={`bx ${category.icon}`}></i>
      </span>
      <h3 className="skills__card-title">{category.title}</h3>
    </div>

    <div className="skills__tags">
      {category.skills.map((skill) => (
        <span
          key={skill.name}
          className={`skills__tag skills__tag--${skill.level}`}
          title={skillLevelLabels[skill.level]}
        >
          {skill.name}
        </span>
      ))}
    </div>
  </article>
);

export default SkillCard;
