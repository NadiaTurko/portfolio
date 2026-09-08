import "./home.css";
import { heroProfileImg } from "../../assets";
import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";

const Home = () => {
  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <Social />
          <div className="home__img home__hero-enter home__hero-enter--delay">
            <img
              src={heroProfileImg}
              alt="Nadia Romanchuk"
              className="home__img-photo"
              width={600}
              height={600}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="home__hero-enter home__hero-enter--delay-2">
            <Data />
          </div>
        </div>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
