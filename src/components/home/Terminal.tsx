import { useEffect, useState } from "react";
import { homeTerminal } from "../../data/home";

const TICK_MS = 55;
/** Ticks between a finished command and its output, and before the loop restarts. */
const OUTPUT_DELAY = 10;
const RESTART_DELAY = 60;

const offsets = homeTerminal.reduce<number[]>((list, line, index) => {
  const previous = index === 0 ? 0 : list[index - 1] + homeTerminal[index - 1].command.length + OUTPUT_DELAY;
  return [...list, previous];
}, []);

const lastLine = homeTerminal[homeTerminal.length - 1];
const TOTAL = offsets[offsets.length - 1] + lastLine.command.length + OUTPUT_DELAY;

const Terminal = () => {
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [tick, setTick] = useState(reducedMotion ? TOTAL : 0);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setTimeout(
      () => setTick((value) => (value >= TOTAL + RESTART_DELAY ? 0 : value + 1)),
      TICK_MS
    );
    return () => window.clearTimeout(timer);
  }, [tick, reducedMotion]);

  return (
    <div className="terminal" aria-hidden="true">
      <div className="terminal__bar">
        <span className="terminal__dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
        ~/nadia — zsh
      </div>
      <div className="terminal__body">
        {homeTerminal.map((line, index) => {
          const typed = Math.min(Math.max(tick - offsets[index], 0), line.command.length);
          if (tick < offsets[index]) return null;
          const typing = typed < line.command.length;
          const showOutput = tick >= offsets[index] + line.command.length + OUTPUT_DELAY / 2;

          return (
            <div key={line.command}>
              <p className="terminal__command">
                <span className="terminal__prompt">$</span> {line.command.slice(0, typed)}
                {typing && <span className="terminal__caret"></span>}
              </p>
              {showOutput && <p className="terminal__output">{line.output}</p>}
            </div>
          );
        })}
        {tick >= TOTAL && (
          <p className="terminal__command">
            <span className="terminal__prompt">$</span> <span className="terminal__caret"></span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Terminal;
