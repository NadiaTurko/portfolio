import type { ContactCardProps } from "../../types";

const ContactCard = ({ card }: ContactCardProps) => (
  <div className="contact__card">
    <i className={`${card.icon} contact__card-icon`}></i>
    <h3 className="contact__card-title">{card.title}</h3>
    <span className="contact__card-data">{card.data}</span>
    <a href={card.href} className="contact__button">
      Write me <i className="bx bx-right-arrow-alt contact__button-icon"></i>
    </a>
  </div>
);

export default ContactCard;
