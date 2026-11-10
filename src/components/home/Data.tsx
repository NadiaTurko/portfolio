import { homeContent } from "../../data/home";
import useTypewriter from "../../hooks/useTypewriter";
import SendIcon from "../common/SendIcon";
import Social from "./Social";

const Data = () => {
  const typedRole = useTypewriter(homeContent.roles);

  return (
    <div className="home__data">
      <p className="home__subtitle">
        <span className="home__visually-hidden">{homeContent.title}</span>
        <span aria-hidden="true">
          {typedRole}
          <span className="home__caret"></span>
        </span>
      </p>
      <h1 className="home__title animated-title animated-title--play">
        {homeContent.name}
      </h1>
      <p className="home__lead">{homeContent.lead}</p>
      {homeContent.paragraphs.map((paragraph) => (
        <p key={paragraph} className="home__description">
          {paragraph}
        </p>
      ))}
      <div className="home__actions">
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
            <i className="bx bx-right-arrow-alt home__ghost-icon"></i>
          </a>
        </div>
        <Social />
      </div>
    </div>
  );
};

export default Data;
