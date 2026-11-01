import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { useShopStore } from "@/store/useShopStore";
import { productPriceWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { Availability } from "./Availability";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const favorite = useShopStore((s) => s.favorites.includes(product.slug));
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);
  const image = product.images[0] ?? "/assets/hero-living-T1Utz7X9.jpg";

  return (
    <article className={cn("group flex flex-col", className)}>
      <div className="relative overflow-hidden bg-sand/40">
        <Link to={`/produto/${product.slug}`} className="block aspect-[4/5] overflow-hidden">
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-3">
          {product.isNew ? (
            <span className="bg-espresso px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ivory">
              Novidade
            </span>
          ) : null}
          {product.categoryName ? (
            <span className="bg-ivory/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-espresso">
              {product.categoryName}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.slug)}
          aria-label={
            favorite
              ? `Remover ${product.name} dos favoritos`
              : `Adicionar ${product.name} aos favoritos`
          }
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-ivory/90 text-espresso transition hover:bg-ivory",
            favorite && "text-olive",
          )}
        >
          <Heart className={cn("h-4 w-4", favorite && "fill-current")} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-4">
        <Availability status={product.availability} note={product.availabilityNote} />
        <div>
          <h3 className="font-display text-xl leading-tight text-espresso md:text-2xl">
            <Link to={`/produto/${product.slug}`} className="hover:opacity-80">
              {product.name}
            </Link>
          </h3>
          {product.ref ? (
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Ref. {product.ref}
            </p>
          ) : null}
        </div>

        <p className="text-sm text-muted-foreground">Preço sob consulta</p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
          <a
            href={productPriceWhatsAppUrl(product.name, product.ref)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar preço de ${product.name} via WhatsApp`}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-espresso underline-offset-4 hover:underline"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" title="" />
            Consultar preço
          </a>
          <Link
            to={`/produto/${product.slug}`}
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 hover:text-espresso hover:underline"
          >
            Ver produto
          </Link>
        </div>
      </div>
    </article>
  );
}
