import "./contact.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";
import { contactCards } from "../../data/contact";

const Contact = () => (
  <section className="contact section" id="contact">
    <SectionHeader title="Get in touch" subtitle="Contact Me" />

    <div className="contact__container container grid">
      <Reveal delay={100} className="contact__column">
        <div className="contact__content">
          <h3 className="contact__title">Talk to me</h3>
          <div className="contact__info">
            {contactCards.map((card) => (
              <ContactCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={220} className="contact__column">
        <div className="contact__content">
          <h3 className="contact__title">Write me your project</h3>
          <ContactForm />
        </div>
      </Reveal>
    </div>
  </section>
);

export default Contact;
