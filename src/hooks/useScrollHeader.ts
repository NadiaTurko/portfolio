import { useEffect } from "react";

const useScrollHeader = (threshold = 80): void => {
  useEffect(() => {
    const handleScroll = (): void => {
      const header = document.querySelector(".header");
      if (!header) return;

      if (window.scrollY >= threshold) {
        header.classList.add("show-header");
      } else {
        header.classList.remove("show-header");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);
};

export default useScrollHeader;
