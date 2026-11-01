import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { Availability } from "@/components/site/Availability";
import { Gallery } from "@/components/site/Gallery";
import { PriceReveal } from "@/components/site/PriceReveal";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct } from "@/data/products";
import { cn } from "@/lib/utils";
import { productTalkWhatsAppUrl } from "@/lib/whatsapp";
import { useShopStore } from "@/store/useShopStore";

export function ProductPage() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const [variant, setVariant] = useState<string | undefined>();
  const addToCart = useShopStore((s) => s.addToCart);
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);
  const favorite = useShopStore((s) =>
    product ? s.favorites.includes(product.slug) : false,
  );

  const related = useMemo(() => {
    if (!product) return [];
    return product.related
      .map((s) => getProduct(s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
  }, [product]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const selectedVariant = variant ?? product.variants[0];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link to="/loja" className="hover:text-espresso">
          Loja
        </Link>
        {product.categorySlug && product.categoryName ? (
          <>
            <span className="mx-2">/</span>
            <Link
              to={`/categoria/${product.categorySlug}`}
              className="hover:text-espresso"
            >
              {product.categoryName}
            </Link>
          </>
        ) : null}
        <span className="mx-2">/</span>
        <span className="text-espresso">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Gallery images={product.images} alt={product.name} />

        <div>
          <Availability
            status={product.availability}
            note={product.availabilityNote}
          />
          <h1 className="mt-4 font-display text-4xl text-espresso sm:text-5xl">
            {product.name}
          </h1>
          {product.ref ? (
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Ref. {product.ref}
            </p>
          ) : null}

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <PriceReveal
              slug={product.slug}
              name={product.name}
              refCode={product.ref}
              price={product.price}
              size="lg"
            />
          </div>

          {product.variants.length > 0 ? (
            <div className="mt-8">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Acabamento
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariant(v)}
                    className={cn(
                      "border px-3 py-2 text-sm transition",
                      selectedVariant === v
                        ? "border-espresso bg-espresso text-ivory"
                        : "border-border text-espresso hover:border-espresso/50",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(product.slug, 1, selectedVariant)}
              className="bg-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory transition hover:opacity-90"
            >
              Adicionar ao carrinho
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(product.slug)}
              className={cn(
                "inline-flex items-center gap-2 border border-espresso/40 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso",
                favorite && "bg-sand",
              )}
            >
              <Heart className={cn("h-4 w-4", favorite && "fill-current text-olive")} />
              {favorite ? "Nos favoritos" : "Favorito"}
            </button>
            <a
              href={productTalkWhatsAppUrl(product.name, product.ref)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso hover:border-espresso/50"
            >
              <WhatsAppIcon className="h-4 w-4" title="" />
              Falar no WhatsApp
            </a>
          </div>

          <dl className="mt-12 grid gap-5 border-t border-border pt-8 sm:grid-cols-2">
            {product.dimensions ? (
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Dimensões
                </dt>
                <dd className="mt-1 text-sm text-espresso">{product.dimensions}</dd>
              </div>
            ) : null}
            {product.style ? (
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Estilo
                </dt>
                <dd className="mt-1 text-sm text-espresso">{product.style}</dd>
              </div>
            ) : null}
            {product.materials.length ? (
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Materiais
                </dt>
                <dd className="mt-1 text-sm text-espresso">
                  {product.materials.join(", ")}
                </dd>
              </div>
            ) : null}
            {product.colors.length ? (
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Cores
                </dt>
                <dd className="mt-1 text-sm text-espresso">{product.colors.join(", ")}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20 lg:mt-28">
          <h2 className="font-display text-3xl text-espresso sm:text-4xl">
            Também pode gostar
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-20 border border-border bg-sand/30 px-6 py-10 sm:px-10">
        <h2 className="font-display text-3xl text-espresso">Precisa de ajuda?</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Fale connosco para confirmar medidas, acabamentos ou disponibilidade. Preparamos
          um orçamento sem compromisso.
        </p>
        <Link
          to={`/orcamento?produto=${product.slug}`}
          className="mt-6 inline-flex bg-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
        >
          Pedir orçamento
        </Link>
      </section>
    </div>
  );
}
