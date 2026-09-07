import type { StatBoxProps } from "../../types";

const StatBox = ({ stat }: StatBoxProps) => (
  <div className="about__box">
    <div className="about__box-top">
      <i className={`bx ${stat.icon} about__icon`}></i>
      {stat.value && (
        <span
          className={`about__value${stat.compactValue ? " about__value--compact" : ""}`}
        >
          {stat.value}
        </span>
      )}
    </div>
    <span className={`about__label${stat.formats ? " about__label--formats" : ""}`}>
      {stat.label}
    </span>
    <span className="about__subtitle">{stat.sub}</span>
  </div>
);

export default StatBox;
