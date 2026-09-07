import "./qualification.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import TimelineItem from "./TimelineItem";
import useQualificationTabs from "../../hooks/useQualificationTabs";
import {
  educationTimeline,
  experienceTimeline,
  qualificationTabs,
} from "../../data/qualification";

const Qualification = () => {
  const { setActiveTab, isActive } = useQualificationTabs("experience");

  return (
    <section id="qualification" className="qualification section">
      <SectionHeader title="Qualification" subtitle="My professional journey" />

      <Reveal delay={150}>
        <div className="qualification__container container">
          <div className="qualification__tabs">
            {qualificationTabs.map((tab) => (
              <div
                key={tab.id}
                className={
                  isActive(tab.id)
                    ? "qualification__button qualification__active button--flex"
                    : "qualification__button button--flex"
                }
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={`${tab.icon} qualification__icon`}></i>
                {tab.label}
              </div>
            ))}
          </div>

          <div className="qualification__section">
            <div
              className={
                isActive("education")
                  ? "qualification__content qualification__content-active"
                  : "qualification__content"
              }
            >
              {educationTimeline.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>

            <div
              className={
                isActive("experience")
                  ? "qualification__content qualification__content-active"
                  : "qualification__content"
              }
            >
              {experienceTimeline.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Qualification;
