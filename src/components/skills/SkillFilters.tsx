import { useLayoutEffect, useRef } from "react";
import type { SkillFiltersProps, SkillLevel } from "../../types";

const SkillFilters = ({
  filters,
  totalCount,
  activeLevel,
  onChange,
}: SkillFiltersProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const placeThumb = (): void => {
      const active = track.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!active) return;
      track.style.setProperty("--thumb-x", `${active.offsetLeft}px`);
      track.style.setProperty("--thumb-w", `${active.offsetWidth}px`);
    };

    placeThumb();

    // Web fonts and viewport changes alter the button widths after first paint.
    const resizeObserver = new ResizeObserver(placeThumb);
    resizeObserver.observe(track);
    Array.from(track.children).forEach((child) => resizeObserver.observe(child));

    return () => resizeObserver.disconnect();
  }, [activeLevel]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const active = track?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!track || !active) return;
    // On narrow screens the row scrolls; keep the chosen filter in view.
    track.scrollLeft =
      active.offsetLeft - (track.clientWidth - active.offsetWidth) / 2;
  }, [activeLevel]);

  const renderButton = (
    level: SkillLevel | null,
    label: string,
    count: number
  ) => {
    const isActive = activeLevel === level;

    return (
      <button
        key={level ?? "all"}
        type="button"
        className={`skills__filter${isActive ? " skills__filter--active" : ""}`}
        aria-pressed={isActive}
        onClick={() => onChange(isActive ? null : level)}
      >
        {level && (
          <span
            className={`skills__dot skills__dot--${level}`}
            aria-hidden="true"
          ></span>
        )}
        {label}
        <span className="skills__filter-count">{count}</span>
      </button>
    );
  };

  return (
    <div ref={trackRef} className="skills__filters">
      {renderButton(null, "All", totalCount)}
      {filters.map(({ level, label, count }) =>
        renderButton(level, label, count)
      )}
    </div>
  );
};

export default SkillFilters;
