import { useRef } from "react";
import "./about.css";
import { aboutPhotoImg, cvPdf } from "../../assets";
import AboutAccordion from "./AboutAccordion";
import Info from "./Info";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import {
  aboutBadge,
  aboutHighlights,
  aboutLead,
} from "../../data/about";
import { homeContent } from "../../data/home";
import usePointerTilt from "../../hooks/usePointerTilt";
import useWordReveal from "../../hooks/useWordReveal";

const MARQUEE_COPIES = [0, 1, 2, 3];
const TAPE_ITEMS = MARQUEE_COPIES.flatMap(() => homeContent.roles);

const About = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  usePointerTilt(stageRef);
  useWordReveal(leadRef);

  return (
    <section className="about section" id="about">
      <SectionHeader title="About Me" subtitle="My introduction" />

      <div className="about__container container">
        <Reveal delay={100} className="about__stage-reveal">
          <div ref={stageRef} className="about__stage">
            <span className="about__shape about__shape--outline" aria-hidden="true"></span>
            <span className="about__shape about__shape--fill" aria-hidden="true"></span>
            <div className="about__tape about__tape--light" aria-hidden="true">
              <div className="about__tape-track">
                {TAPE_ITEMS.map((role, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={index} className="about__tape-item">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="about__tape about__tape--dark" aria-hidden="true">
              <div className="about__tape-track">
                {TAPE_ITEMS.map((role, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={index} className="about__tape-item">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <span className="about__ground" aria-hidden="true"></span>
            <img
              src={aboutPhotoImg}
              alt={homeContent.name}
              className="about__img"
              width={480}
              height={1448}
              loading="lazy"
              decoding="async"
            />

            <span className="about__badge">
              <span className="about__badge-dot"></span>
              {aboutBadge}
            </span>
          </div>
        </Reveal>

        <div className="about__data">
          <Reveal delay={200}>
            <p ref={leadRef} className="about__lead">
              {aboutLead.split(" ").map((word, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index} className="about__lead-word">
                  {word}{" "}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <AboutAccordion />
          </Reveal>

          <Reveal delay={360}>
            <Info />
          </Reveal>

          <Reveal delay={440}>
            <div className="about__footer">
              <div className="about__marquee">
                <div className="about__marquee-track">
                  {MARQUEE_COPIES.map((copy) => (
                    <div
                      key={copy}
                      className="about__marquee-group"
                      aria-hidden={copy > 0 || undefined}
                    >
                      {aboutHighlights.map((item) => (
                        <span key={item} className="about__tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <a download="" href={cvPdf} className="button button--flex about__cv-button">
                Download CV
                <i className="bx bx-download button__icon"></i>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
