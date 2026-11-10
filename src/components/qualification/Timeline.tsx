import { useRef, useState } from "react";
import type { TimelineProps } from "../../types";
import TimelineItem from "./TimelineItem";
import useTimelineProgress from "../../hooks/useTimelineProgress";

const Timeline = ({ items }: TimelineProps) => {
  const listRef = useRef<HTMLOListElement>(null);
  const [openId, setOpenId] = useState<string | null>(
    items.find((item) => item.description)?.id ?? null
  );

  useTimelineProgress(listRef);

  return (
    <ol ref={listRef} className="qualification__list">
      <li className="qualification__rail" aria-hidden="true"></li>
      {items.map((item, index) => (
        <TimelineItem
          key={item.id}
          item={item}
          index={index}
          isOpen={openId === item.id}
          onToggle={() =>
            setOpenId((current) => (current === item.id ? null : item.id))
          }
        />
      ))}
    </ol>
  );
};

export default Timeline;
