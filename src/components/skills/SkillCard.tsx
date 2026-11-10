import type { CSSProperties } from "react";
import { skillLevelLabels } from "../../data/skills";
import type { SkillCardProps, SkillLevel } from "../../types";

const getFilterState = (
  level: SkillLevel,
  activeLevel: SkillLevel | null
): string => {
  if (activeLevel === null) return "";
  return level === activeLevel
    ? " skills__tag--matched"
    : " skills__tag--dimmed";
};

const SkillCard = ({ category, activeLevel }: SkillCardProps) => {
  const total = category.skills.length;
  const matched = category.skills.filter(
    (skill) => skill.level === activeLevel
  ).length;

  let stateClass = "";
  if (activeLevel !== null) {
    stateClass = matched > 0 ? " skills__card--matched" : " skills__card--empty";
  }

  return (
    <article className={`skills__card${stateClass}`}>
      <div className="skills__card-header">
        <span className="skills__card-icon">
          <i className={`bx ${category.icon}`}></i>
        </span>
        <h3 className="skills__card-title">{category.title}</h3>
        <span className="skills__card-count">
          {activeLevel === null ? `${total} skills` : `${matched} of ${total}`}
        </span>
      </div>

      <div className="skills__tags">
        {category.skills.map((skill, index) => (
          <span
            key={skill.name}
            className={`skills__tag${getFilterState(skill.level, activeLevel)}`}
            style={{ "--i": index } as CSSProperties}
            title={skillLevelLabels[skill.level]}
          >
            <span
              className={`skills__dot skills__dot--${skill.level}`}
              aria-hidden="true"
            ></span>
            {skill.name}
          </span>
        ))}
      </div>
    </article>
  );
};

export default SkillCard;
