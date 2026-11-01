import { whatsappUrl } from "@/data/site";

export function openWhatsApp(message: string) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

export const whatsappMessages = {
  generic: "Olá! Gostaria de obter mais informações sobre os produtos da Móveis Okapi.",
  productPrice: (name: string, ref: string | null) =>
    `Olá! Gostaria de saber o preço de ${name} (Ref. ${ref ?? "—"}).`,
  productTalk: (name: string, ref: string | null) =>
    `Olá! Gostaria de falar sobre ${name} (Ref. ${ref ?? "—"}).`,
  cartQuote: (lines: string[]) =>
    `Olá! Gostaria de pedir um orçamento para:\n${lines.join("\n")}`,
};

export function genericWhatsAppUrl() {
  return whatsappUrl(whatsappMessages.generic);
}

export function productPriceWhatsAppUrl(name: string, ref: string | null) {
  return whatsappUrl(whatsappMessages.productPrice(name, ref));
}

export function productTalkWhatsAppUrl(name: string, ref: string | null) {
  return whatsappUrl(whatsappMessages.productTalk(name, ref));
}
