import { useEffect, useState } from "react";
import type { StatBoxProps } from "../../types";

const CLOCK_REFRESH_MS = 20000;

const formatTime = (timeZone: string): string =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date());

const LocalTime = ({ timeZone }: { timeZone: string }) => {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    const timer = window.setInterval(
      () => setTime(formatTime(timeZone)),
      CLOCK_REFRESH_MS
    );
    return () => window.clearInterval(timer);
  }, [timeZone]);

  return <time className="about__clock">{time}</time>;
};

const StatBox = ({ stat }: StatBoxProps) => (
  <div className="about__box">
    <span className="about__main">
      {stat.value && (
        <span
          className={`about__value${stat.compactValue ? " about__value--compact" : ""}`}
        >
          {stat.value}
        </span>
      )}
      <span className="about__label">{stat.label}</span>
    </span>
    <span className="about__subtitle">
      {stat.sub}
      {stat.timeZone && (
        <>
          {" · "}
          <LocalTime timeZone={stat.timeZone} />
        </>
      )}
    </span>
  </div>
);

export default StatBox;
