import { useRef, type PointerEvent } from "react";

const DRAG_START_PX = 8;
const SWIPE_PX = 70;
const DRAG_TURN_DEG_PER_PX = 0.02;

interface DeckGestureOptions {
  onNext: () => void;
  onPrev: () => void;
}

interface DragState {
  startX: number;
  dragging: boolean;
}

const clearVars = (stage: HTMLElement, names: string[]): void => {
  names.forEach((name) => stage.style.removeProperty(name));
};

/** Pointer tilt and swipe for the deck. Writes CSS variables to avoid re-renders. */
const useDeckGestures = ({ onNext, onPrev }: DeckGestureOptions) => {
  const drag = useRef<DragState | null>(null);
  const wasDragged = useRef(false);

  const endDrag = (stage: HTMLElement): number => {
    const state = drag.current;
    const distance = Number.parseFloat(stage.style.getPropertyValue("--drag"));
    drag.current = null;
    if (!state?.dragging) return 0;

    stage.classList.remove("is-dragging");
    clearVars(stage, ["--drag", "--drag-turn"]);
    return distance || 0;
  };

  const updateTilt = (event: PointerEvent<HTMLDivElement>): void => {
    const stage = event.currentTarget;
    const card = stage.querySelector('[data-pos="0"]');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    stage.style.setProperty("--px", (x / rect.width - 0.5).toFixed(3));
    stage.style.setProperty("--py", (y / rect.height - 0.5).toFixed(3));
    stage.style.setProperty("--mx", `${x.toFixed(0)}px`);
    stage.style.setProperty("--my", `${y.toFixed(0)}px`);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.button !== 0) return;
    drag.current = { startX: event.clientX, dragging: false };
    wasDragged.current = false;
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const state = drag.current;
    if (!state) {
      if (event.pointerType === "mouse") updateTilt(event);
      return;
    }

    const stage = event.currentTarget;
    const distance = event.clientX - state.startX;

    if (!state.dragging && Math.abs(distance) > DRAG_START_PX) {
      state.dragging = true;
      wasDragged.current = true;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("is-dragging");
    }

    if (state.dragging) {
      stage.style.setProperty("--drag", `${distance}px`);
      stage.style.setProperty(
        "--drag-turn",
        `${(distance * DRAG_TURN_DEG_PER_PX).toFixed(2)}deg`
      );
    }
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    const distance = endDrag(event.currentTarget);
    if (distance <= -SWIPE_PX) onNext();
    else if (distance >= SWIPE_PX) onPrev();
  };

  const onPointerCancel = (event: PointerEvent<HTMLDivElement>): void => {
    endDrag(event.currentTarget);
  };

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>): void => {
    clearVars(event.currentTarget, ["--px", "--py"]);
  };

  return {
    wasDragged,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onPointerLeave,
    },
  };
};

export default useDeckGestures;
