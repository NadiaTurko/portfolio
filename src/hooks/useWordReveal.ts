import { useEffect, type RefObject } from "react";

const START_RATIO = 0.88;
const END_RATIO = 0.55;

/** Lights up the element's child words one by one as it scrolls through the viewport. */
const useWordReveal = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const words = Array.from(element.children);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((word) => word.classList.add("is-lit"));
      return undefined;
    }

    let frame = 0;

    const update = (): void => {
      frame = 0;
      const { top, bottom } = element.getBoundingClientRect();
      const start = window.innerHeight * START_RATIO;
      const end = window.innerHeight * END_RATIO;
      const distance = start - end + (bottom - top);
      const progress = Math.min(Math.max((start - top) / distance, 0), 1);
      const litCount = Math.round(progress * words.length);
      words.forEach((word, index) =>
        word.classList.toggle("is-lit", index < litCount)
      );
    };

    const schedule = (): void => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
};

export default useWordReveal;
