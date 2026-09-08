import "./about.css";
import { aboutPhotoImg, cvPdf } from "../../assets";
import Info from "./Info";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import {
  aboutBadge,
  aboutDescription,
  aboutHighlights,
  aboutLearning,
} from "../../data/about";

const About = () => {
  return (
    <section className="about section" id="about">
      <SectionHeader title="About Me" subtitle="My introduction" />

      <div className="about__container container grid">
        <Reveal delay={100}>
          <div className="about__photo">
            <div className="about__img-wrapper">
              <img
                src={aboutPhotoImg}
                alt="Nadia Romanchuk"
                className="about__img"
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
              />
              <span className="about__badge">
                <span className="about__badge-dot"></span>
                {aboutBadge}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="about__data">
          <Reveal delay={200}>
            <Info />
          </Reveal>

          <Reveal delay={300}>
            <div className="about__content">
              <p className="about__description">{aboutDescription}</p>

              <div className="about__highlights">
                {aboutHighlights.map((item) => (
                  <span key={item} className="about__tag">
                    {item}
                  </span>
                ))}
              </div>

              <div className="about__learning">
                <span className="about__learning-label">Currently learning</span>
                <div className="about__learning-tags">
                  {aboutLearning.map((item) => (
                    <span key={item} className="about__tag about__tag--learning">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <a download="" href={cvPdf} className="button button--flex about__cv-button">
              Download CV
              <i className="bx bx-download button__icon"></i>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
