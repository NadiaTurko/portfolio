import "./footer.css";
import Reveal from "../common/Reveal";
import SocialLinks from "../common/SocialLinks";
import { footerLinks } from "../../data/navigation";
import { socialLinks } from "../../data/socialLinks";
import { homeContent } from "../../data/home";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Reveal>
          <div className="footer__top">
            <p className="footer__subtitle">
              {homeContent.title} · Lviv, Ukraine
            </p>

            <ul className="footer__list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <SocialLinks
              links={socialLinks}
              listClassName="footer__social"
              linkClassName="footer__social-icon"
            />
          </div>

          <p className="footer__wordmark animated-title">{homeContent.name}</p>

          <div className="footer__bottom">
            <span>
              &#169; {new Date().getFullYear()} {homeContent.name}. All rights reserved.
            </span>
            <span>Built with React &amp; TypeScript</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
