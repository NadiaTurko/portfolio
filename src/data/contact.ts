import type { ContactCardData } from "../types";

export const contactCards: ContactCardData[] = [
  {
    id: "email",
    title: "E-mail",
    data: "nadrom0211@gmail.com",
    href: "mailto:nadrom0211@gmail.com",
    icon: "bx bx-mail-send",
  },
  {
    id: "telegram",
    title: "Telegram",
    data: "@nadrom0211",
    href: "https://t.me/nadrom0211",
    icon: "bx bxl-telegram",
  },
  {
    id: "linkedin",
    title: "Linkedin",
    data: "Nadia Romanchuk",
    href: "https://www.linkedin.com/in/nadiia-romanchuk-42930630a/",
    icon: "bx bxl-linkedin",
  },
];

export const emailJsConfig = {
  serviceId: "service_qbd7jrv",
  templateId: "template_gag6ior",
  publicKey: "vrux4ffkQjQRY6JI2",
} as const;
