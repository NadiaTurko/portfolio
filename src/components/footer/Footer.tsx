import "./footer.css";
import SocialLinks from "../common/SocialLinks";
import { footerLinks } from "../../data/navigation";
import { socialLinks } from "../../data/socialLinks";
import { homeContent } from "../../data/home";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">{homeContent.name}</h1>
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

        <span className="footer__copy">
          &#169; {new Date().getFullYear()} {homeContent.name}. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
