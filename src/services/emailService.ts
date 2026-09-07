import emailjs from "@emailjs/browser";
import { emailJsConfig } from "../data/contact";

export const sendContactEmail = (formElement: HTMLFormElement) =>
  emailjs.sendForm(
    emailJsConfig.serviceId,
    emailJsConfig.templateId,
    formElement,
    { publicKey: emailJsConfig.publicKey }
  );
