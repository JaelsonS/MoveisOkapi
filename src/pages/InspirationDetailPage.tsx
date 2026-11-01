import { Link, Navigate, useParams } from "react-router-dom";
import { ProductCard } from "@/components/site/ProductCard";
import { getInspiration } from "@/data/inspirations";
import { getProduct } from "@/data/products";

export function InspirationDetailPage() {
  const { slug } = useParams();
  const article = slug ? getInspiration(slug) : undefined;

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const related = article.productSlugs
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="pb-20 pt-36 lg:pb-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          <Link to="/inspiracao" className="hover:text-espresso">
            Inspiração
          </Link>
          <span className="mx-2">/</span>
          {article.title}
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {article.readingMinutes} min de leitura
        </p>
        <h1 className="mt-3 font-display text-4xl text-espresso sm:text-5xl md:text-6xl">
          {article.title}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">{article.excerpt}</p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="aspect-[16/9] overflow-hidden">
          <img src={article.image} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-2xl space-y-6 px-4 text-base leading-relaxed text-foreground sm:px-6 lg:px-8">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {related.length > 0 ? (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-espresso">Peças relacionadas</h2>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
