import { useEffect, useRef } from "react";
import "./pointerEffects.css";

const ENABLED_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const MAGNET_SELECTOR = ".button";
const SPOTLIGHT_SELECTOR =
  ".skills__card, .contact__card, .home__img, .qualification__card, .github__repo";

const MAGNET_STRENGTH = 0.28;
const GLOW_EASE = 0.09;
const SETTLED_PX = 0.2;

interface Follower {
  element: HTMLElement;
  ease: number;
  x: number;
  y: number;
}

interface Magnet {
  element: HTMLElement;
  centerX: number;
  centerY: number;
}

/** Cursor glow, magnetic buttons, and card spotlights, via one delegated listener. */
const PointerEffects = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || !window.matchMedia(ENABLED_QUERY).matches) {
      return undefined;
    }

    const followers: Follower[] = [
      { element: glow, ease: GLOW_EASE, x: 0, y: 0 },
    ];
    const pointer = { x: 0, y: 0 };
    let hasPointer = false;
    let frame = 0;
    let magnet: Magnet | null = null;

    const place = (follower: Follower): void => {
      follower.element.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0) translate(-50%, -50%)`;
    };

    const tick = (): void => {
      let moving = false;

      followers.forEach((follower) => {
        const dx = pointer.x - follower.x;
        const dy = pointer.y - follower.y;
        follower.x += dx * follower.ease;
        follower.y += dy * follower.ease;
        place(follower);
        if (Math.abs(dx) > SETTLED_PX || Math.abs(dy) > SETTLED_PX) {
          moving = true;
        }
      });

      frame = moving ? window.requestAnimationFrame(tick) : 0;
    };

    const releaseMagnet = (): void => {
      if (magnet) magnet.element.style.translate = "";
      magnet = null;
    };

    const updateMagnet = (target: Element, x: number, y: number): void => {
      const element = target.closest<HTMLElement>(MAGNET_SELECTOR);

      if (element !== magnet?.element) {
        releaseMagnet();
        if (element) {
          const rect = element.getBoundingClientRect();
          magnet = {
            element,
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
          };
        }
      }

      if (magnet) {
        const shiftX = (x - magnet.centerX) * MAGNET_STRENGTH;
        const shiftY = (y - magnet.centerY) * MAGNET_STRENGTH;
        magnet.element.style.translate = `${shiftX.toFixed(1)}px ${shiftY.toFixed(1)}px`;
      }
    };

    const updateSpotlight = (target: Element, x: number, y: number): void => {
      const element = target.closest<HTMLElement>(SPOTLIGHT_SELECTOR);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      element.style.setProperty("--spot-x", `${(x - rect.left).toFixed(0)}px`);
      element.style.setProperty("--spot-y", `${(y - rect.top).toFixed(0)}px`);
    };

    const handleMove = (event: PointerEvent): void => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) {
        return;
      }

      const { clientX: x, clientY: y, target } = event;
      pointer.x = x;
      pointer.y = y;

      if (!hasPointer) {
        hasPointer = true;
        followers.forEach((follower) => {
          follower.x = x;
          follower.y = y;
          place(follower);
        });
      }

      glow.classList.add("pointer-glow--visible");

      updateMagnet(target, x, y);
      updateSpotlight(target, x, y);

      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const handleLeave = (): void => {
      hasPointer = false;
      glow.classList.remove("pointer-glow--visible");
      releaseMagnet();
    };

    const root = document.documentElement;
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", releaseMagnet, { passive: true });
    root.addEventListener("mouseleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", releaseMagnet);
      root.removeEventListener("mouseleave", handleLeave);
      releaseMagnet();
    };
  }, []);

  return <div ref={glowRef} className="pointer-glow" aria-hidden="true" />;
};

export default PointerEffects;
