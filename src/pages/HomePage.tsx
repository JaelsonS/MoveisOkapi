import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { categories } from "@/data/categories";
import { getFeaturedProducts, getNewProducts } from "@/data/products";

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);

  const featured = getFeaturedProducts();
  const novidades = getNewProducts();

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] items-end overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-0 -top-[12%] h-[124%]">
          <img
            src="/assets/hero-living-T1Utz7X9.jpg"
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </motion.div>
        <div className="bg-hero-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:px-8 lg:pb-28">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-ivory/75">
            Móveis Okapi · São João do Campo, Coimbra
          </p>
          <h1 className="max-w-5xl font-display text-[2.9rem] leading-[0.98] tracking-[-0.01em] text-ivory sm:text-6xl md:text-8xl lg:text-[7.5rem]">
            A casa que imagina.
            <br />
            O conforto que merece.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
            Descubra mobiliário e soluções para criar espaços que refletem o seu
            estilo, a sua personalidade e a forma como vive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/colecoes"
              className="bg-ivory px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-sand"
            >
              Explorar coleção
            </Link>
            <Link
              to="/inspiracao"
              className="border border-ivory/60 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory transition hover:bg-ivory hover:text-espresso"
            >
              Descobrir ambientes
            </Link>
          </div>
          <a
            href="#categorias"
            aria-label="Descer para categorias"
            className="mt-16 inline-flex flex-col items-start gap-2 text-[10px] uppercase tracking-[0.22em] text-ivory/70"
          >
            <span className="sr-only">Descer para categorias</span>
            <span className="h-12 w-px bg-ivory/40" aria-hidden />
          </a>
        </div>
      </section>

      <section id="categorias" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Categorias
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl text-espresso md:text-6xl">
            Encontre o seu próximo espaço favorito.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Da sala ao quarto, da cozinha aos pequenos detalhes — explore por ambiente.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.03}>
              <Link to={`/categoria/${cat.slug}`} className="group relative block overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-5">
                  <h3 className="font-display text-xl sm:text-2xl">{cat.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Destaques
          </p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl text-espresso md:text-6xl">
                Descubra peças que transformam ambientes.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Uma seleção de peças com materiais naturais, linhas equilibradas e o
                conforto de quem vive a casa todos os dias.
              </p>
            </div>
            <div className="flex flex-wrap gap-5 text-[11px] font-medium uppercase tracking-[0.18em]">
              <Link to="/colecoes" className="text-espresso underline-offset-4 hover:underline">
                Ver coleções
              </Link>
              <Link to="/loja" className="text-espresso underline-offset-4 hover:underline">
                Ver toda a loja
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Em destaque
          </p>
          <h2 className="mt-3 font-display text-4xl text-espresso md:text-5xl">
            Escolhas da casa
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden">
        <img
          src="/assets/showroom-CFitaGfK.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-ivory/70">
              Coleção · Design Atemporal
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-5xl text-ivory md:text-7xl">
              Escolhas que não passam de moda.
            </h2>
            <p className="mt-5 max-w-lg text-ivory/80">
              Formas equilibradas e materiais nobres que atravessam tendências e ganham
              carácter com o tempo.
            </p>
            <Link
              to="/colecoes"
              className="mt-8 inline-flex border border-ivory/60 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory transition hover:bg-ivory hover:text-espresso"
            >
              Explorar coleção
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Novidades
          </p>
          <h2 className="mt-3 font-display text-4xl text-espresso md:text-5xl">
            Acabadas de chegar
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {novidades.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-sand/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Sobre nós
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-espresso md:text-6xl">
              Mais do que mobiliário. Criamos relações.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              A Móveis Okapi é uma empresa de mobiliário em Coimbra que valoriza o
              atendimento personalizado, a qualidade dos produtos e a atualização
              constante relativamente às tendências do mercado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/loja"
                className="bg-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
              >
                Conhecer a loja
              </Link>
              <Link
                to="/orcamento"
                className="border border-espresso/40 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-espresso"
              >
                Pedir orçamento
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
