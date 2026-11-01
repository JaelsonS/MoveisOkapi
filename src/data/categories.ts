import type { Category } from "@/types/product";

export const categories: Category[] = [
  {
    slug: "salas-de-estar",
    name: "Salas de estar",
    description: "Composições para receber, descansar e viver a sala.",
    image: "/assets/hero-living-T1Utz7X9.jpg",
    productSlugs: [
      "aparador-nogueira-ripado",
      "mesa-de-centro-carvalho-macico",
      "poltrona-boucle-oliva",
    ],
  },
  {
    slug: "sofas",
    name: "Sofás",
    description: "Conforto modular, linho e linhas contemporâneas.",
    image: "/assets/sofa-D4773WuR.jpg",
    productSlugs: [
      "sofa-modular-contemporaneo",
      "sofa-linho-natural-3-lugares",
      "sofa-compacto-urbano",
    ],
  },
  {
    slug: "quartos",
    name: "Quartos",
    description: "Ambientes serenos para o descanso diário.",
    image: "/assets/bedroom-C-G2LLig.jpg",
    productSlugs: ["comoda-serenidade", "mesa-de-cabeceira-nogueira"],
  },
  {
    slug: "camas",
    name: "Camas",
    description: "Estruturas estofadas e em madeira maciça.",
    image: "/assets/bedroom-C-G2LLig.jpg",
    productSlugs: ["cama-carvalho-natural", "cama-estofada-taupe"],
  },
  {
    slug: "colchoes",
    name: "Colchões",
    description: "Suporte e conforto adaptados a cada forma de dormir.",
    image: "/assets/mattress-DW_lasAg.jpg",
    productSlugs: [
      "colchao-equilibrio-molas-ensacadas",
      "colchao-viscoelastico-repouso",
    ],
  },
  {
    slug: "salas-de-jantar",
    name: "Salas de jantar",
    description: "Mesas e cadeiras para reunir a casa.",
    image: "/assets/dining-BvMXNehI.jpg",
    productSlugs: [
      "mesa-de-jantar-carvalho-8-lugares",
      "cadeira-veludo-oliva",
    ],
  },
  {
    slug: "mesas-e-cadeiras",
    name: "Mesas e cadeiras",
    description: "Peças versáteis em madeira, palhinha e pedra.",
    image: "/assets/chairs-DAD9Op-v.jpg",
    productSlugs: [
      "banco-de-bar-carvalho",
      "cadeira-palhinha-classica",
      "mesa-redonda-travertino",
    ],
  },
  {
    slug: "cozinhas",
    name: "Cozinhas",
    description: "Soluções de cozinha funcionais e intemporais.",
    image: "/assets/kitchen-gPPKoKfV.jpg",
    productSlugs: ["cozinha-oliva-e-carvalho", "ilha-de-cozinha-pedra-natural"],
  },
  {
    slug: "roupeiros",
    name: "Roupeiros",
    description: "Arrumação elegante, à medida do seu espaço.",
    image: "/assets/wardrobe-CyBP11vr.jpg",
    productSlugs: ["roupeiro-nogueira-iluminado", "roupeiro-portas-de-correr"],
  },
  {
    slug: "complementos-e-decoracao",
    name: "Complementos e decoração",
    description: "Os detalhes que tornam a casa sua.",
    image: "/assets/decor-VFJ62N4f.jpg",
    productSlugs: [
      "candeeiro-latao-cogumelo",
      "conjunto-vasos-ceramica",
      "tapete-juta-natural",
    ],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
