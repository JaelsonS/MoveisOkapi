import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import { categories } from "@/data/categories";
import { site } from "@/data/site";

const lojaLinks = [
  { to: "/loja", label: "Catálogo" },
  { to: "/colecoes", label: "Coleções" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/orcamento", label: "Pedir orçamento" },
  { to: "/carrinho", label: "Carrinho" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-sand/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-3xl tracking-wide text-espresso">OKAPI</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Móveis · São João do Campo
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Mobiliário e decoração em Coimbra, com atendimento personalizado e uma
            seleção atenta às tendências.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @moveis_okapi"
              className="flex h-10 w-10 items-center justify-center border border-border text-espresso transition hover:bg-espresso hover:text-ivory"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Móveis Okapi"
              className="flex h-10 w-10 items-center justify-center border border-border text-espresso transition hover:bg-espresso hover:text-ivory"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Loja
          </p>
          <ul className="mt-4 space-y-2">
            {lojaLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-espresso transition hover:opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Categorias
          </p>
          <ul className="mt-4 space-y-2">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/categoria/${cat.slug}`}
                  className="text-sm text-espresso transition hover:opacity-70"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Visite-nos
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-muted-foreground">
            <p>
              <a
                href={site.addressMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espresso hover:underline"
              >
                {site.address}
              </a>
            </p>
            <p>
              <a href={`tel:${site.phoneTel}`} className="text-espresso hover:underline">
                {site.phoneDisplay}
              </a>
            </p>
            <p>{site.hours}</p>
            <p>
              <a href={`mailto:${site.email}`} className="text-espresso hover:underline">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Móveis Okapi. Website de demonstração —
              preços sob consulta via WhatsApp.
            </p>
            <Link to="/privacidade" className="hover:text-espresso">
              Política de privacidade
            </Link>
          </div>
          <p>
            Desenvolvido pela{" "}
            <a
              href={site.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-espresso underline-offset-4 hover:underline"
            >
              {site.developer.shortName}
            </a>
            .{" "}
            <a
              href={site.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              afdigitalweb.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
