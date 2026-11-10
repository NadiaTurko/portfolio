import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import type { Theme, ThemeContextValue, ThemeToggleOrigin } from "../types";

// TypeScript 4.9's DOM types don't include the View Transitions API yet.
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

const REVEAL_MS = 650;

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme");
  return saved === "light" ? "light" : "dark";
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /** Reveals the new theme as a circle growing from the click, where the browser allows it. */
  const toggleTheme = (origin?: ThemeToggleOrigin): void => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const { startViewTransition } = document as ViewTransitionDocument;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!startViewTransition || reducedMotion) {
      setTheme(next);
      return;
    }

    // A keyboard-triggered click reports 0,0; start from the center instead.
    const hasPointer = origin && (origin.clientX !== 0 || origin.clientY !== 0);
    const x = hasPointer ? origin.clientX : window.innerWidth / 2;
    const y = hasPointer ? origin.clientY : window.innerHeight / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = document.documentElement;
    const transition = startViewTransition.call(document, () => {
      // Without this, CSS color transitions leave the new theme half-faded inside the circle.
      root.classList.add("theme-switching");
      flushSync(() => setTheme(next));
      root.setAttribute("data-theme", next);
    });

    transition.finished
      .catch(() => undefined)
      .then(() => root.classList.remove("theme-switching"));

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: REVEAL_MS,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => undefined);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
