import SocialLinks from "../common/SocialLinks";
import { socialLinks } from "../../data/socialLinks";

const Social = () => (
  <SocialLinks
    links={socialLinks}
    listClassName="home__social"
    linkClassName="home__social-icon"
  />
);

export default Social;
