export const site = {
  name: "Móveis Okapi",
  tagline: "Móveis · Coimbra",
  location: "São João do Campo, Coimbra",
  phoneDisplay: "239 961 524",
  phoneTel: "+351239961524",
  whatsapp: "351239961524",
  email: "moveisokapi@hotmail.com",
  address: "Estrada Nacional 111, São João do Campo, 3025-466 Coimbra, Portugal",
  /** Link externo para abrir no Google Maps (nova aba) */
  addressMaps:
    "https://www.google.com/maps/search/?api=1&query=Móveis+Okapi,+Estrada+Nacional+111,+São+João+do+Campo,+3025-466+Coimbra",
  /** Embed sem API key — iframe oficial do Google Maps */
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Móveis+Okapi,+Estrada+Nacional+111,+São+João+do+Campo,+3025-466+Coimbra&hl=pt-PT&z=16&output=embed",
  lat: 40.233891,
  lng: -8.500774,
  instagram: "https://www.instagram.com/moveis_okapi/",
  facebook: "https://www.facebook.com/MoveisOkapi/",
  hours: "Seg–Sex · 09h–19h · Sáb · 09h–18h · Dom · Encerrado",
  developer: {
    name: "AF Digital — Soluções Tecnológicas",
    shortName: "AfDigital - Soluções Tecnológicas",
    url: "https://afdigitalweb.com",
  },
} as const;

export function whatsappUrl(message: string) {
  const text = encodeURIComponent(message);
  const phone = site.whatsapp;
  return phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`;
}
