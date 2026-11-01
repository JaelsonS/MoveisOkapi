import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
        Erro 404
      </p>
      <h1 className="mt-4 font-display text-4xl text-espresso sm:text-5xl md:text-6xl">
        Este espaço ainda está por mobilar.
      </h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        A página que procura não existe ou foi movida. Que tal explorar a nossa coleção?
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/loja"
          className="bg-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
        >
          Explorar loja
        </Link>
        <Link
          to="/"
          className="border border-espresso/40 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-espresso"
        >
          Página inicial
        </Link>
      </div>
    </section>
  );
}
