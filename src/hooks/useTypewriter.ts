import { useEffect, useState } from "react";

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1800;
const PAUSE_MS = 300;

/** Types and erases each word in turn; shows the first word statically for reduced motion. */
const useTypewriter = (words: readonly string[]): string => {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion) return undefined;

    const word = words[wordIndex];
    const finishedTyping = !deleting && length === word.length;
    const finishedDeleting = deleting && length === 0;

    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (finishedTyping) delay = HOLD_MS;
    if (finishedDeleting) delay = PAUSE_MS;

    const timer = window.setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true);
      } else if (finishedDeleting) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      } else {
        setLength((value) => value + (deleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [words, wordIndex, length, deleting, reducedMotion]);

  return reducedMotion ? words[0] : words[wordIndex].slice(0, length);
};

export default useTypewriter;
