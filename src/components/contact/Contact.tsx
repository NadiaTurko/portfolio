import { useRef, type FormEvent } from "react";
import "./contact.css";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import ContactCard from "./ContactCard";
import SendIcon from "../common/SendIcon";
import { contactCards } from "../../data/contact";
import { sendContactEmail } from "../../services/emailService";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!form.current) return;

    sendContactEmail(form.current);
    event.currentTarget.reset();
  };

  return (
    <section className="contact section" id="contact">
      <SectionHeader title="Get in touch" subtitle="Contact Me" />

      <div className="contact__container container grid">
        <Reveal delay={100}>
          <div className="contact__content">
            <h3 className="contact__title">Talk to me</h3>
            <div className="contact__info">
              {contactCards.map((card) => (
                <ContactCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="contact__content">
            <h3 className="contact__title">Write me your project</h3>
            <form ref={form} onSubmit={handleSubmit} className="contact__form">
              <div className="contact__form-div">
                <label className="contact__form-tag">Name</label>
                <input
                  type="text"
                  name="name"
                  className="contact__form-input"
                  placeholder="Insert your name"
                />
              </div>

              <div className="contact__form-div">
                <label className="contact__form-tag">E-mail</label>
                <input
                  type="email"
                  name="email"
                  className="contact__form-input"
                  placeholder="Insert your e-mail"
                />
              </div>

              <div className="contact__form-div contact__form-area">
                <label className="contact__form-tag">Project</label>
                <textarea
                  name="project"
                  rows={10}
                  className="contact__form-input"
                  placeholder="Write your project"
                ></textarea>
              </div>
              <button type="submit" className="button button--flex">
                Send Message
                <SendIcon />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
