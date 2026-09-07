import { useEffect, useState } from "react";
import "./header.css";
import { useTheme } from "../../context/ThemeContext";
import useScrollHeader from "../../hooks/useScrollHeader";
import useActiveSection from "../../hooks/useActiveSection";
import { navLinks } from "../../data/navigation";

const sectionIds = navLinks.map((link) => link.href);

const Header = () => {
  useScrollHeader();
  const activeNav = useActiveSection(sectionIds);
  const { theme, toggleTheme } = useTheme();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", toggle);
    return () => document.body.classList.remove("nav-open");
  }, [toggle]);

  const closeMenu = () => setToggle(false);

  return (
    <header className={`header${toggle ? " header--menu-open" : ""}`}>
      <nav className="nav container">
        <a href="#home" className="nav__logo" onClick={closeMenu}>
          <span className="nav__logo-text">Nadia</span>
          <span className="nav__logo-accent">.</span>
        </a>

        <div
          className={toggle ? "nav__menu show-menu" : "nav__menu"}
          aria-hidden={!toggle}
        >
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav__item">
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className={
                    activeNav === link.href ? "nav__link active-link" : "nav__link"
                  }
                >
                  <i className={`${link.icon} nav__icon`}></i>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav__actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            <i
              className={`bx ${theme === "light" ? "bx-moon" : "bx-sun"} theme-toggle__icon`}
            ></i>
          </button>

          <button
            type="button"
            className="nav__toggle"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            onClick={() => setToggle(!toggle)}
          >
            <i className={`uil ${toggle ? "uil-times" : "uil-bars"}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
