import { aboutStats } from "../../data/about";
import StatBox from "./StatBox";

const Info = () => {
  return (
    <div className="about__info grid">
      {aboutStats.map((stat) => (
        <StatBox key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default Info;
