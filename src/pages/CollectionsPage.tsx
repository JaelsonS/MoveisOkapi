import { Link } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { collections } from "@/data/collections";
import { getProduct } from "@/data/products";

export function CollectionsPage() {
  return (
    <div className="pb-20 pt-36 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Coleções"
          title="Ambientes com intenção."
          description="Cinco leituras do viver contemporâneo — do minimalismo ao conforto familiar — com peças escolhidas para trabalhar em conjunto."
        />
      </div>

      <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
        {collections.map((collection, index) => {
          const products = collection.productSlugs
            .map((s) => getProduct(s))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));

          return (
            <section key={collection.slug} id={collection.slug}>
              <div className="relative overflow-hidden">
                <img
                  src={collection.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/60" />
                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                  <Reveal>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-ivory/70">
                      {collection.eyebrow}
                    </p>
                    <h2 className="mt-3 max-w-3xl font-display text-4xl text-ivory sm:text-5xl md:text-6xl">
                      {collection.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-ivory/80">{collection.description}</p>
                    <Link
                      to="/loja"
                      className="mt-8 inline-flex border border-ivory/50 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory transition hover:bg-ivory hover:text-espresso"
                    >
                      Ver na loja
                    </Link>
                  </Reveal>
                </div>
              </div>

              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <p className="mb-8 font-display text-2xl text-espresso">
                  {collection.name}
                  <span className="ml-3 text-sm font-sans text-muted-foreground">
                    0{index + 1}
                  </span>
                </p>
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
