import type { ContactCardData } from "../types";

export const contactEmail = "nadrom0211@gmail.com";

export const contactCards: ContactCardData[] = [
  {
    id: "email",
    title: "E-mail",
    data: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: "bx bx-mail-send",
    copyable: true,
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
    title: "LinkedIn",
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
