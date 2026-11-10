import { useEffect, useState } from "react";
import type { ContactCardProps } from "../../types";

const COPIED_RESET_MS = 2000;

const ContactCard = ({ card }: ContactCardProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(card.data);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the link on the card still works.
    }
  };

  return (
    <div className="contact__card">
      <span className="contact__card-icon">
        <i className={card.icon}></i>
      </span>

      <div className="contact__card-text">
        <h4 className="contact__card-title">{card.title}</h4>
        <span className="contact__card-data">{card.data}</span>
      </div>

      {card.copyable && (
        <button
          type="button"
          className={`contact__copy${copied ? " contact__copy--done" : ""}`}
          aria-label={copied ? "Copied" : `Copy ${card.title}`}
          onClick={handleCopy}
        >
          <i className={`bx ${copied ? "bx-check" : "bx-copy"}`}></i>
        </button>
      )}

      <a
        href={card.href}
        className="contact__button"
        aria-label={`Write me via ${card.title}`}
      >
        <i className="bx bx-right-arrow-alt contact__button-icon"></i>
      </a>
    </div>
  );
};

export default ContactCard;
