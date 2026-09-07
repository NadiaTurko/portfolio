import type { SocialLinksProps } from "../../types";

const SocialLinks = ({ links, listClassName, linkClassName }: SocialLinksProps) => (
  <div className={listClassName}>
    {links.map((link) => (
      <a
        key={link.id}
        href={link.href}
        className={linkClassName}
        target="_blank"
        rel="noreferrer"
        aria-label={link.label}
      >
        <i className={link.icon}></i>
      </a>
    ))}
  </div>
);

export default SocialLinks;
