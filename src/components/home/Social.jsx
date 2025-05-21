import React from "react";

const Social = () => {
  return (
    <div className="home__social">
      <a
        href="https://t.me/nadrom0211"
        className="footer__social-icon"
        target="_blank"
        rel="noreferrer"
      >
        <i className="bx bxl-telegram"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/nadiia-romanchuk-42930630a/"
        className="footer__social-icon"
        target="_blank"
        rel="noreferrer"
      >
        <i className="bx bxl-linkedin"></i>
      </a>
      <a
        href="https://github.com/"
        className="footer__social-icon"
        target="_blank"
        rel="noreferrer"
      >
        <i className="uil uil-github-alt"></i>
      </a>
    </div>
  );
};

export default Social;
