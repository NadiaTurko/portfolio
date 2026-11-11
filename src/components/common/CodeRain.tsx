import { useEffect, useRef } from "react";
import "./codeRain.css";

const FRAME_MS = 60;
/** Phones and tablets get a lighter version: lower resolution, sparser, paused while scrolling. */
const LIGHT_QUERY = "(hover: none), (max-width: 992px)";
const SCROLL_PAUSE_MS = 180;
const FONT_SIZE = 13;
const COLUMN_WIDTH = 20;
const ACTIVE_SHARE = 0.55;
const TOKEN_LIFE = 140;
const ROW_HEIGHT = 16;
/** Share of background cells redrawn per frame, for a gentle shimmer. */
const FLICKER_SHARE = 0.003;
const TOKENS = [
  "await",
  "useEffect()",
  "npm run build",
  "n8n",
  "git push",
  "fetch()",
  "=> {}",
  "200 OK",
  "</>",
  "claude",
  "webhook",
  "deploy",
];

interface Column {
  x: number;
  y: number;
  speed: number;
  active: boolean;
}

interface Token {
  text: string;
  x: number;
  y: number;
  age: number;
}

const readColor = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
  "200, 190, 175";

/**
 * A faint falling-code backdrop over a dim, shimmering field of 0s and 1s.
 * Skipped entirely for reduced motion.
 */
const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const field = fieldRef.current;
    const fieldContext = field?.getContext("2d");
    if (
      !canvas ||
      !context ||
      !field ||
      !fieldContext ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let columns: Column[] = [];
    let tokens: Token[] = [];
    let frame = 0;
    let lastTime = 0;
    const light = window.matchMedia(LIGHT_QUERY).matches;
    const columnWidth = light ? COLUMN_WIDTH + 8 : COLUMN_WIDTH;
    let lastScroll = 0;
    let rainColor = readColor("--rain-color");
    let tokenColor = readColor("--rain-token");

    const drawCell = (x: number, y: number): void => {
      fieldContext.clearRect(x - 1, y - FONT_SIZE, columnWidth, ROW_HEIGHT);
      fieldContext.fillStyle = `rgba(${rainColor}, ${0.04 + Math.random() * 0.09})`;
      fieldContext.fillText(Math.random() < 0.5 ? "0" : "1", x, y);
    };

    const drawField = (): void => {
      fieldContext.clearRect(0, 0, width, height);
      for (let x = 4; x < width; x += columnWidth) {
        for (let y = ROW_HEIGHT; y < height + ROW_HEIGHT; y += ROW_HEIGHT) {
          drawCell(x, y);
        }
      }
    };

    const setup = (): void => {
      const ratio = light ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      // Mobile toolbars change innerHeight while scrolling; size for the tallest case once.
      height = light ? Math.max(window.innerHeight, window.screen.height) : window.innerHeight;
      [canvas, field].forEach((element) => {
        element.width = width * ratio;
        element.height = height * ratio;
      });
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      fieldContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      fieldContext.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      drawField();
      columns = Array.from({ length: Math.ceil(width / columnWidth) }, (_, index) => ({
        x: index * columnWidth + 4,
        y: Math.random() * height,
        speed: 0.15 + Math.random() * 0.45,
        active: Math.random() < ACTIVE_SHARE,
      }));
      tokens = [];
    };

    const draw = (time: number): void => {
      frame = window.requestAnimationFrame(draw);
      if (time - lastTime < FRAME_MS) return;
      if (light && time - lastScroll < SCROLL_PAUSE_MS) return;
      lastTime = time;

      // Fade what is already drawn so each column leaves a short trail.
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      const flickers = Math.ceil((width / columnWidth) * (height / ROW_HEIGHT) * FLICKER_SHARE);
      for (let index = 0; index < flickers; index += 1) {
        drawCell(
          4 + Math.floor(Math.random() * (width / columnWidth)) * columnWidth,
          ROW_HEIGHT + Math.floor(Math.random() * (height / ROW_HEIGHT)) * ROW_HEIGHT
        );
      }

      columns.forEach((column) => {
        if (!column.active) return;
        context.fillStyle = `rgba(${rainColor}, ${0.3 + Math.random() * 0.5})`;
        context.fillText(Math.random() < 0.5 ? "0" : "1", column.x, column.y);
        column.y += column.speed * FONT_SIZE;
        if (column.y > height + Math.random() * 200) {
          column.y = -Math.random() * height * 0.3;
          column.active = Math.random() < ACTIVE_SHARE;
        }
      });

      if (tokens.length < 4 && Math.random() < 0.02) {
        tokens.push({
          text: TOKENS[Math.floor(Math.random() * TOKENS.length)],
          x: Math.random() * (width - 120),
          y: 80 + Math.random() * (height - 120),
          age: 0,
        });
      }

      tokens = tokens.filter((token) => token.age < TOKEN_LIFE);
      tokens.forEach((token) => {
        token.age += 1;
        const fade = Math.sin((token.age / TOKEN_LIFE) * Math.PI);
        context.fillStyle = `rgba(${tokenColor}, ${0.35 * fade})`;
        context.fillText(token.text, token.x, token.y);
      });
    };

    const handleVisibility = (): void => {
      window.cancelAnimationFrame(frame);
      if (!document.hidden) frame = window.requestAnimationFrame(draw);
    };

    let resizeTimer = 0;
    const handleResize = (): void => {
      // On touch devices only a width change (rotation) needs a rebuild.
      if (light && window.innerWidth === width) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 200);
    };

    const handleScroll = (): void => {
      lastScroll = performance.now();
    };

    const themeObserver = new MutationObserver(() => {
      rainColor = readColor("--rain-color");
      tokenColor = readColor("--rain-token");
      drawField();
    });

    setup();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="code-rain" aria-hidden="true">
      <canvas ref={fieldRef} className="code-rain__layer" />
      <canvas ref={canvasRef} className="code-rain__layer" />
    </div>
  );
};

export default CodeRain;
