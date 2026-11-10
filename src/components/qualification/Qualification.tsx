import type { CSSProperties } from "react";
import "./qualification.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import Timeline from "./Timeline";
import useQualificationTabs from "../../hooks/useQualificationTabs";
import {
  educationTimeline,
  experienceTimeline,
  qualificationTabs,
} from "../../data/qualification";

const Qualification = () => {
  const { setActiveTab, isActive } = useQualificationTabs("experience");
  const activeIndex = qualificationTabs.findIndex((tab) => isActive(tab.id));
  const showEducation = isActive("education");

  return (
    <section id="qualification" className="qualification section">
      <SectionHeader title="Qualification" subtitle="My professional journey" />

      <Reveal delay={150}>
        <div className="qualification__container container">
          <div
            className="qualification__tabs"
            style={{ "--active": activeIndex } as CSSProperties}
          >
            {qualificationTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={
                  isActive(tab.id)
                    ? "qualification__button qualification__active"
                    : "qualification__button"
                }
                aria-pressed={isActive(tab.id)}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={`${tab.icon} qualification__icon`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Keyed so a tab switch replays the entrance and resets the open card. */}
          <Timeline
            key={showEducation ? "education" : "experience"}
            items={showEducation ? educationTimeline : experienceTimeline}
          />
        </div>
      </Reveal>
    </section>
  );
};

export default Qualification;
