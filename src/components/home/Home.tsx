import { useRef } from "react";
import "./home.css";
import { heroProfileImg } from "../../assets";
import usePointerTilt from "../../hooks/usePointerTilt";
import Data from "./Data";
import ScrollDown from "./ScrollDown";
import Terminal from "./Terminal";

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

              <Terminal />
            </div>
          </div>
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
