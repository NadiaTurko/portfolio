import useScrollProgress from "../../hooks/useScrollProgress";
import "./scrollProgress.css";

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <span
        className="scroll-progress__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
