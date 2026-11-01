import type { InspirationItem } from "@/types/product";

export const inspirations: InspirationItem[] = [
  {
    slug: "como-escolher-o-sofa-ideal",
    title: "Como escolher o sofá ideal",
    excerpt:
      "O sofá é a peça mais usada da casa. Estas são as perguntas certas antes de decidir.",
    image: "/assets/sofa-D4773WuR.jpg",
    readingMinutes: 5,
    featured: true,
    productSlugs: [
      "sofa-modular-contemporaneo",
      "sofa-linho-natural-3-lugares",
      "sofa-compacto-urbano",
    ],
    body: [
      "Comece pelo uso real: a sala é para receber, ver televisão, ou os dois?",
      "Meça o espaço com margem para circulação — um sofá demasiado grande encolhe a sala.",
      "Teste a profundidade do assento e a firmeza. O conforto certo depende de como se senta.",
      "Escolha um tecido que perdoe o dia a dia: linho lavável, bouclé resistente ou misturas técnicas.",
      "Na Móveis Okapi ajudamos a cruzar medidas, acabamentos e o resto do ambiente.",
    ],
  },
  {
    slug: "como-mobilar-uma-sala-pequena",
    title: "Como mobilar uma sala pequena",
    excerpt: "Espaços pequenos pedem escolhas inteligentes — não menos estilo.",
    image: "/assets/small-living-Dzhho_bT.jpg",
    readingMinutes: 4,
    featured: false,
    productSlugs: ["sofa-compacto-urbano", "mesa-de-centro-carvalho-macico", "tapete-juta-natural"],
    body: [
      "Prefira peças elevadas do chão — libertam visualmente a área.",
      "Um sofá compacto bem proporcionado vale mais do que dois volumes a mais.",
      "Use espelhos e tons claros para alongar a luz.",
      "Escolha uma mesa de centro leve ou com arrumação integrada.",
    ],
  },
  {
    slug: "como-criar-um-quarto-confortavel",
    title: "Como criar um quarto confortável",
    excerpt: "Um bom quarto começa no colchão e termina na luz.",
    image: "/assets/bedroom-C-G2LLig.jpg",
    readingMinutes: 5,
    featured: false,
    productSlugs: [
      "cama-estofada-taupe",
      "colchao-equilibrio-molas-ensacadas",
      "mesa-de-cabeceira-nogueira",
    ],
    body: [
      "Invista primeiro no colchão e na base — é o conforto que usa todas as noites.",
      "Cabeceiras estofadas suavizam a acústica e o toque.",
      "Luz indireta e mesas de cabeceira proporcionadas fecham o ambiente.",
      "Roupeiros bem resolvidos libertam o quarto de ruído visual.",
    ],
  },
  {
    slug: "tendencias-de-decoracao",
    title: "Tendências de decoração",
    excerpt:
      "Materiais naturais, curvas suaves e cores da terra continuam a marcar os interiores.",
    image: "/assets/decor-VFJ62N4f.jpg",
    readingMinutes: 3,
    featured: false,
    productSlugs: ["candeeiro-latao-cogumelo", "conjunto-vasos-ceramica", "tapete-juta-natural"],
    body: [
      "A madeira volta ao centro — carvalho e nogueira em peças com presença.",
      "Pedra e travertino entram nas mesas e ilhas de cozinha.",
      "Verdes azeitona e tons taupe acompanham bases de areia e creme.",
      "Menos peças, melhor escolhidas: a tendência é curadoria, não acumulação.",
    ],
  },
  {
    slug: "como-combinar-cores-e-materiais",
    title: "Como combinar cores e materiais",
    excerpt: "Uma regra simples: uma base neutra, um material dominante e um apontamento.",
    image: "/assets/hero-living-T1Utz7X9.jpg",
    readingMinutes: 4,
    featured: false,
    productSlugs: ["poltrona-boucle-oliva", "aparador-nogueira-ripado", "cadeira-veludo-oliva"],
    body: [
      "Defina a base: paredes e grandes volumes em tons claros.",
      "Escolha um material dominante — madeira, tecido ou pedra.",
      "Reserve um apontamento de cor (oliva, terracota, latão) para profundidade.",
      "Repita texturas em escalas diferentes para coesão.",
    ],
  },
  {
    slug: "como-escolher-uma-mesa-de-jantar",
    title: "Como escolher uma mesa de jantar",
    excerpt: "Forma, medida e material: as três decisões que definem a sala de jantar.",
    image: "/assets/dining-BvMXNehI.jpg",
    readingMinutes: 4,
    featured: false,
    productSlugs: [
      "mesa-de-jantar-carvalho-8-lugares",
      "mesa-redonda-travertino",
      "cadeira-palhinha-classica",
    ],
    body: [
      "Deixe pelo menos 80 cm de circulação à volta da mesa.",
      "Mesas redondas favorecem conversa; retangulares servem mais lugares.",
      "Combine o tampo com cadeiras de peso visual equilibrado.",
      "Materiais naturais envelhecem melhor e aceitam o uso diário.",
    ],
  },
];

export function getInspiration(slug: string) {
  return inspirations.find((i) => i.slug === slug);
}
