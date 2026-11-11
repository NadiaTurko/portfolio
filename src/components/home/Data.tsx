import { homeContent } from "../../data/home";
import useTypewriter from "../../hooks/useTypewriter";
import SendIcon from "../common/SendIcon";
import Social from "./Social";
import DecodeText from "../common/DecodeText";

const Data = () => {
  const typedRole = useTypewriter(homeContent.roles);
  const [firstName, ...rest] = homeContent.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="home__data">
      <p className="home__subtitle">
        <span className="home__visually-hidden">{homeContent.title}</span>
        <span aria-hidden="true">
          {typedRole}
          <span className="home__caret"></span>
        </span>
      </p>
      <DecodeText
        as="h1"
        className="home__title"
        trigger="load"
        delay={200}
        segments={[
          { text: firstName, className: "home__title-line" },
          { text: lastName, italic: true, className: "home__title-line title-accent" },
        ]}
      />
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
      <dl className="home__facts">
        {homeContent.facts.map((fact) => (
          <div key={fact.label} className="home__fact">
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Data;
