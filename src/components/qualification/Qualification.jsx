import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section id="portfolio" className="qualification section">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personal journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={
              toggleState === 1
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification__button qualification__active button--flex"
                : "qualification__button button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase qualification__icon"></i>Experience
          </div>
        </div>

        <div className="qualification__section">
          {/* Education Section */}
          <div
            className={
              toggleState === 1
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">React</h3>
                <span className="qualification__subtitle">
                  IT Hillel, online
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2024
                </div>
                <p className="qualification__description">
                  Covered the fundamentals of React including virtual DOM,
                  component structure, state and props, lifecycle methods, and
                  hooks. Practiced data binding, routing with React Router,
                  handling API requests, and working with state management tools
                  such as Redux.
                </p>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line "></span>
              </div>
            </div>

            <div className="qualification__data">
              <div></div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line "></span>
              </div>

              <div>
                <h3 className="qualification__title">
                  JavaScript Fundamentals
                </h3>
                <span className="qualification__subtitle">
                  SoftServe Academy, Lviv
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2023
                </div>
              </div>
            </div>

            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">
                  Teacher of mathematics, economics, computer science
                </h3>
                <span className="qualification__subtitle">
                  National Pedagogical Dragomanov University, Kyiv
                </span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2010 - 2015
                </div>
              </div>

              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line "></span>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div
            className={
              toggleState === 2
                ? "qualification__content qualification__content-active"
                : "qualification__content"
            }
          >
            {/* Experience 1 */}
            <div className="qualification__data">
              <div></div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line "></span>
              </div>
              <div>
                <h3 className="qualification__title">
                  Junior Frontend Developer
                </h3>
                <span className="qualification__subtitle">On-site</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> July 2024 – May 2025
                </div>
                <p className="qualification__description">
                  Worked on developing and maintaining user interfaces using
                  HTML5, CSS3/SCSS, JavaScript, and React. Collaborated with
                  designers and backend developers to build responsive and
                  accessible web pages. Gained experience with Git, REST API
                  integration, and task automation using Gulp. Contributed to
                  bug fixing, cross-browser testing, and UI optimization.
                </p>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="qualification__data">
              <div>
                <h3 className="qualification__title">Frontend Developer</h3>
                <span className="qualification__subtitle">On-site</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> May 2023 – June 2024
                </div>
                <p className="qualification__description">
                  Developed and maintained UI components for client-facing web
                  applications using JavaScript, SCSS, and jQuery. Collaborated
                  with a cross-functional team to deliver responsive layouts and
                  implement UI/UX improvements. Integrated third-party
                  libraries, optimized front-end performance, and participated
                  in regular code reviews. Contributed to task automation and
                  deployment workflows using Gulp and Git.
                </p>
              </div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line "></span>
              </div>
            </div>

            {/* Experience 3 */}
            <div className="qualification__data">
              <div></div>
              <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line "></span>
              </div>
              <div>
                <h3 className="qualification__title">Teacher of Mathematics</h3>
                <span className="qualification__subtitle">Lviv</span>
                <div className="qualification__calendar">
                  <i className="uil uil-calendar-alt"></i> 2014 – 2020
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
