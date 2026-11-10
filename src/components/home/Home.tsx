import { useRef } from "react";
import "./home.css";
import { heroProfileImg } from "../../assets";
import { homeContent } from "../../data/home";
import usePointerTilt from "../../hooks/usePointerTilt";
import Data from "./Data";
import ScrollDown from "./ScrollDown";

const Home = () => {
  const visualRef = useRef<HTMLDivElement>(null);
  usePointerTilt(visualRef);

  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <Data />
          <div className="home__visual-wrap home__hero-enter home__hero-enter--delay">
            <div ref={visualRef} className="home__visual">
              <div className="home__arch" aria-hidden="true"></div>
              <div className="home__img">
                <img
                  src={heroProfileImg}
                  alt="Nadia Romanchuk"
                  className="home__img-photo"
                  width={480}
                  height={745}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              {homeContent.chips.map((chip, index) => (
                <span
                  key={chip.label}
                  className={`home__chip home__chip--${index + 1}`}
                  aria-hidden="true"
                >
                  <span className="home__chip-inner">
                    <i className={chip.icon}></i>
                    {chip.label}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
