export type Availability =
  | "Disponível"
  | "Últimas unidades"
  | "Sob encomenda"
  | "Indisponível";

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
  productSlugs: string[];
};

export type Collection = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  productSlugs: string[];
};

export type Product = {
  slug: string;
  name: string;
  ref: string | null;
  categorySlug: string | null;
  categoryName: string | null;
  availability: Availability | string;
  availabilityNote: string;
  price: number | null;
  variants: string[];
  dimensions: string | null;
  materials: string[];
  colors: string[];
  style: string | null;
  description: string;
  images: string[];
  related: string[];
  featured: boolean;
  isNew: boolean;
  widthCm: number | null;
};

export type InspirationItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readingMinutes: number;
  featured: boolean;
  productSlugs: string[];
  body: string[];
};

export type CartItem = {
  slug: string;
  quantity: number;
  variant?: string;
};
