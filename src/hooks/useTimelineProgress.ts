import { useEffect, type RefObject } from "react";

/** How far down the viewport the fill line's leading edge sits. */
const ANCHOR_RATIO = 0.6;

/** Fills the timeline rail with scroll and marks the items the fill has passed. */
const useTimelineProgress = (listRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const list = listRef.current;
    const rail = list?.querySelector<HTMLElement>(".qualification__rail");
    if (!list || !rail) return undefined;

    let frame = 0;

    const update = (): void => {
      frame = 0;
      const anchor = window.innerHeight * ANCHOR_RATIO;
      const { top, height } = rail.getBoundingClientRect();
      const progress = Math.min(Math.max((anchor - top) / height, 0), 1);
      rail.style.setProperty("--progress", progress.toFixed(3));

      list
        .querySelectorAll<HTMLElement>(".qualification__item")
        .forEach((item) => {
          const dot = item.querySelector(".qualification__rounder");
          if (!dot) return;
          item.classList.toggle(
            "is-reached",
            dot.getBoundingClientRect().top <= anchor
          );
        });
    };

    const schedule = (): void => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    // Expanding a card changes the rail's height without any scroll event.
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(list);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [listRef]);
};

export default useTimelineProgress;
