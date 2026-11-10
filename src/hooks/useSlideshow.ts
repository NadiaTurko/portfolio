import { useCallback, useState } from "react";

const useSlideshow = (count: number) => {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => setActive(index), []);

  const next = useCallback(
    () => setActive((current) => (current + 1) % count),
    [count]
  );

  const prev = useCallback(
    () => setActive((current) => (current - 1 + count) % count),
    [count]
  );

  return { active, goTo, next, prev };
};

export default useSlideshow;
