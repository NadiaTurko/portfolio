import { useState, type FormEvent } from "react";
import SendIcon from "../common/SendIcon";
import { contactEmail } from "../../data/contact";
import { sendContactEmail } from "../../services/emailService";

type SendStatus = "idle" | "sending" | "success" | "error";

const MESSAGE_MAX_LENGTH = 1000;

const ContactForm = () => {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [messageLength, setMessageLength] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("sending");

    try {
      await sendContactEmail(formElement);
      formElement.reset();
      setMessageLength(0);
      setStatus("success");
    } catch {
      // The form keeps its values so the visitor doesn't lose the message.
      setStatus("error");
    }
  };

  const clearStatus = (): void => {
    if (status === "success" || status === "error") setStatus("idle");
  };

  const isSending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      onChange={clearStatus}
      className="contact__form"
    >
      <div className="contact__field">
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          className="contact__input"
          placeholder=" "
          required
        />
        <label htmlFor="contact-name" className="contact__label">
          Name
        </label>
      </div>

      <div className="contact__field">
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          className="contact__input"
          placeholder=" "
          required
        />
        <label htmlFor="contact-email" className="contact__label">
          E-mail
        </label>
      </div>

      <div className="contact__field contact__field--area">
        <textarea
          id="contact-project"
          name="project"
          rows={6}
          maxLength={MESSAGE_MAX_LENGTH}
          className="contact__input"
          placeholder=" "
          required
          onInput={(event) => setMessageLength(event.currentTarget.value.length)}
        ></textarea>
        <label htmlFor="contact-project" className="contact__label">
          Project
        </label>
        <span className="contact__counter" aria-hidden="true">
          {messageLength}/{MESSAGE_MAX_LENGTH}
        </span>
      </div>

      <div className="contact__form-footer">
        <button
          type="submit"
          className="button button--flex contact__submit"
          disabled={isSending}
        >
          {isSending ? "Sending…" : "Send Message"}
          {isSending ? <span className="contact__spinner"></span> : <SendIcon />}
        </button>

        <p className="contact__status" role="status">
          {status === "success" && (
            <span className="contact__status-text contact__status-text--success">
              <i className="bx bx-check-circle"></i>
              Thanks! Your message has been sent.
            </span>
          )}
          {status === "error" && (
            <span className="contact__status-text contact__status-text--error">
              <i className="bx bx-error-circle"></i>
              <span>
                Couldn't send it. Please write to{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </span>
            </span>
          )}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
