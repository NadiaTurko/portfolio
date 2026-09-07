import { useEffect, useState } from "react";

const useActiveSection = (
  sectionIds: string[],
  defaultSection = "#home"
): string => {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id.replace("#", "")))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;
