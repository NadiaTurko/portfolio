import type { SkillCardProps } from "../../types";
import SkillDiagram from "./SkillDiagram";

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
        <div className="skills__card-heading">
          <h3 className="skills__card-title">{category.title}</h3>
          <p className="skills__card-subtitle">{category.subtitle}</p>
        </div>
        <span className="skills__card-count">
          {activeLevel === null ? `${total} skills` : `${matched} of ${total}`}
        </span>
      </div>

      <SkillDiagram category={category} activeLevel={activeLevel} />
    </article>
  );
};

export default SkillCard;
