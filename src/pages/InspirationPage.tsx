import { Link } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { inspirations } from "@/data/inspirations";

export function InspirationPage() {
  const featured = inspirations.find((i) => i.featured) ?? inspirations[0];
  const others = inspirations.filter((i) => i.slug !== featured.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28">
      <PageHeader
        eyebrow="Inspiração"
        title="Ideias para habitar melhor."
        description="Guias práticos sobre sofás, salas pequenas, quartos e combinações de materiais — com peças do nosso catálogo."
      />

      <Reveal className="mt-14">
        <Link
          to={`/inspiracao/${featured.slug}`}
          className="group grid overflow-hidden lg:grid-cols-2"
        >
          <div className="aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
            <img
              src={featured.image}
              alt=""
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-center bg-sand/40 px-6 py-10 sm:px-10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Em destaque · {featured.readingMinutes} min
            </p>
            <h2 className="mt-3 font-display text-3xl text-espresso sm:text-4xl md:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-espresso underline-offset-4 group-hover:underline">
              Ler artigo
            </span>
          </div>
        </Link>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.05}>
            <Link to={`/inspiracao/${item.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {item.readingMinutes} min de leitura
              </p>
              <h3 className="mt-2 font-display text-2xl text-espresso group-hover:opacity-80">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
