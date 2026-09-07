import "./scrollup.css";
import useScrollVisibility from "../../hooks/useScrollVisibility";

const ScrollUp = () => {
  const isVisible = useScrollVisibility(560);

  return (
    <a
      href="#home"
      className={`scrollup ${isVisible ? "show-scroll" : ""}`}
      aria-label="Scroll to top"
    >
      <i className="uil uil-arrow-up scrollup__icon"></i>
    </a>
  );
};

export default ScrollUp;
