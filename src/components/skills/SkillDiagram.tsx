import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { skillLevelLabels } from "../../data/skills";
import type { SkillDiagramProps, SkillLevel } from "../../types";

interface Connector {
  key: string;
  from: string;
  to: string;
  d: string;
  vertical: boolean;
}

const filterClass = (level: SkillLevel, activeLevel: SkillLevel | null): string => {
  if (activeLevel === null) return "";
  return level === activeLevel ? " skills__tag--matched" : " skills__tag--dimmed";
};

/** Rows of skill nodes joined by connectors measured from the rendered layout. */
const SkillDiagram = ({ category, activeLevel }: SkillDiagramProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLSpanElement>());
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState<string | null>(null);

  const levels = new Map(category.skills.map((skill) => [skill.name, skill.level]));

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // Rows wrap differently at each width, so connectors are recomputed on every resize.
    const measure = (): void => {
      const base = root.getBoundingClientRect();
      const box = (name: string) => {
        const node = nodeRefs.current.get(name);
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        return {
          left: rect.left - base.left,
          right: rect.right - base.left,
          top: rect.top - base.top,
          bottom: rect.bottom - base.top,
          centerX: rect.left - base.left + rect.width / 2,
          centerY: rect.top - base.top + rect.height / 2,
        };
      };

      const next = category.links.flatMap(([from, to]) => {
        const a = box(from);
        const b = box(to);
        if (!a || !b) return [];

        const sameLine = Math.abs(a.centerY - b.centerY) < 4;
        if (sameLine) {
          const [left, right] = a.centerX < b.centerX ? [a, b] : [b, a];
          return [{
            key: `${from}>${to}`,
            from,
            to,
            d: `M ${left.right} ${left.centerY} L ${right.left} ${right.centerY}`,
            vertical: false,
          }];
        }

        const [upper, lower] = a.centerY < b.centerY ? [a, b] : [b, a];
        const middle = (upper.bottom + lower.top) / 2;
        return [{
          key: `${from}>${to}`,
          from,
          to,
          d: `M ${upper.centerX} ${upper.bottom} C ${upper.centerX} ${middle}, ${lower.centerX} ${middle}, ${lower.centerX} ${lower.top}`,
          vertical: true,
        }];
      });

      setSize({ width: base.width, height: base.height });
      setConnectors(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    nodeRefs.current.forEach((node) => observer.observe(node));
    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => observer.disconnect();
  }, [category]);

  const renderRow = (row: SkillDiagramProps["category"]["rows"][number], index: number) => (
    <div key={row.label} className="skills__row" style={{ "--row": index } as CSSProperties}>
      <span className="skills__row-label">{row.label}</span>
      <div className="skills__row-nodes">
        {row.items.map((name, itemIndex) => {
          const level = levels.get(name) ?? "confident";
          const isHighlight = category.highlight === name;
          return (
            <span
              key={name}
              ref={(node) => {
                if (node) nodeRefs.current.set(name, node);
                else nodeRefs.current.delete(name);
              }}
              className={`skills__tag${isHighlight ? " skills__tag--highlight" : ""}${filterClass(level, activeLevel)}`}
              style={{ "--i": index * 4 + itemIndex } as CSSProperties}
              title={skillLevelLabels[level]}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={`skills__dot skills__dot--${level}`} aria-hidden="true"></span>
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );

  const groupStart = category.group?.from ?? category.rows.length;
  const groupEnd = category.group?.to ?? category.rows.length;

  return (
    <div ref={rootRef} className="skills__diagram">
      <svg
        className="skills__wires"
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width || 1} ${size.height || 1}`}
        aria-hidden="true"
      >
        {connectors.map((connector) => (
          <path
            key={connector.key}
            d={connector.d}
            className={`skills__wire${connector.vertical ? " skills__wire--flow" : ""}${
              hovered && (connector.from === hovered || connector.to === hovered)
                ? " skills__wire--active"
                : ""
            }`}
          />
        ))}
      </svg>

      {category.rows.slice(0, groupStart).map(renderRow)}
      {category.group && (
        <div className="skills__group">
          <span className="skills__group-label">{category.group.label}</span>
          {category.rows.slice(groupStart, groupEnd + 1).map((row, offset) =>
            renderRow(row, groupStart + offset)
          )}
        </div>
      )}
      {category.rows.slice(category.group ? groupEnd + 1 : category.rows.length).map((row, offset) =>
        renderRow(row, groupEnd + 1 + offset)
      )}
    </div>
  );
};

export default SkillDiagram;
