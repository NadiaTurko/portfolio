import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Front-end Developer</h1>
        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>

          <li>
            <a href="#portfolio" className="footer__link">
              Project
            </a>
          </li>

          <li>
            <a href="#skills" className="footer__link">
              Skills
            </a>
          </li>
        </ul>

        <div className="footer__social ">
          <a
            href="https://t.me/nadrom0211"
            className="footer__social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-telegram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/nadiia-romanchuk-42930630a/"
            className="footer__social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <i class="bx bxl-linkedin"></i>
          </a>
          <a
            href="https://github.com/"
            className="footer__social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <i class="uil uil-github-alt"></i>
          </a>
        </div>
        <span className="footer__copy">
          &#169; Crypticalcoder. All rigths reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
