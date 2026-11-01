import { Link } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct } from "@/data/products";
import { useShopStore } from "@/store/useShopStore";

export function FavoritesPage() {
  const favorites = useShopStore((s) => s.favorites);
  const products = favorites
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28">
      <PageHeader
        eyebrow="Favoritos"
        title="As suas peças guardadas"
        description="Guarde sofás, mesas e complementos para comparar e partilhar connosco."
      />

      {products.length === 0 ? (
        <div className="mt-14 border border-dashed border-border px-6 py-16 text-center">
          <p className="font-display text-3xl text-espresso">Ainda sem favoritos</p>
          <p className="mt-3 text-muted-foreground">
            Explore o catálogo e toque no coração para guardar as peças que mais gosta.
          </p>
          <Link
            to="/loja"
            className="mt-8 inline-flex bg-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
          >
            Explorar loja
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
