import { homeContent } from "../../data/home";
import SendIcon from "../common/SendIcon";

const Data = () => {
  return (
    <div className="home__data">
      <h1 className="home__title">{homeContent.name}</h1>
      <h3 className="home__subtitle">{homeContent.title}</h3>
      <p className="home__description">{homeContent.description}</p>
      <div className="home__buttons">
        <a href={homeContent.primaryCta.href} className="button button--flex">
          {homeContent.primaryCta.label}
          <SendIcon />
        </a>
        <a
          href={homeContent.secondaryCta.href}
          className="button button--flex button--ghost"
        >
          {homeContent.secondaryCta.label}
        </a>
      </div>
    </div>
  );
};

export default Data;
