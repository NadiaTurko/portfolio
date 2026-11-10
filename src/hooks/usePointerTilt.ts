import { useEffect, type RefObject } from "react";

const ENABLED_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const MAX_TILT_X_DEG = 6;
const MAX_TILT_Y_DEG = 9;

const clamp = (value: number): number => Math.min(Math.max(value, -1), 1);

/** Tilts an element toward the pointer while it moves inside the surrounding section. */
const usePointerTilt = (visualRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const visual = visualRef.current;
    const section = visual?.closest<HTMLElement>("section");
    if (!visual || !section || !window.matchMedia(ENABLED_QUERY).matches) {
      return undefined;
    }

    let frame = 0;
    let shiftX = 0;
    let shiftY = 0;

    const apply = (): void => {
      frame = 0;
      visual.style.setProperty("--tilt-x", `${(-shiftY * MAX_TILT_X_DEG).toFixed(2)}deg`);
      visual.style.setProperty("--tilt-y", `${(shiftX * MAX_TILT_Y_DEG).toFixed(2)}deg`);
      visual.style.setProperty("--shift-x", shiftX.toFixed(3));
      visual.style.setProperty("--shift-y", shiftY.toFixed(3));
    };

    const schedule = (): void => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const handleMove = (event: PointerEvent): void => {
      if (event.pointerType !== "mouse") return;
      const rect = visual.getBoundingClientRect();
      shiftX = clamp((event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2));
      shiftY = clamp((event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2));
      schedule();
    };

    const handleLeave = (): void => {
      shiftX = 0;
      shiftY = 0;
      schedule();
    };

    section.addEventListener("pointermove", handleMove, { passive: true });
    section.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerleave", handleLeave);
    };
  }, [visualRef]);
};

export default usePointerTilt;
