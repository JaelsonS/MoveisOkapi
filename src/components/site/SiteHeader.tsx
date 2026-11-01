import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { categories } from "@/data/categories";
import { site } from "@/data/site";
import { genericWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useShopStore } from "@/store/useShopStore";

const nav = [
  { to: "/loja", label: "Loja" },
  { to: "/colecoes", label: "Coleções" },
  { to: "/inspiracao", label: "Inspiração" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contactos", label: "Contactos" },
];

export function SiteHeader() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const favorites = useShopStore((s) => s.favorites);
  const cart = useShopStore((s) => s.cart);
  const setSearchOpen = useShopStore((s) => s.setSearchOpen);

  const isHome = location.pathname === "/";
  const overHero = isHome && !scrolled;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          overHero
            ? "bg-transparent text-ivory"
            : "border-b border-border/70 bg-background/85 text-espresso backdrop-blur-md",
        )}
      >
        <p
          className={cn(
            "border-b px-4 py-2 text-center text-[11px] tracking-[0.14em] sm:px-6",
            overHero
              ? "border-ivory/15 text-ivory/80"
              : "border-border/60 text-muted-foreground",
          )}
        >
          Mobiliário para transformar a sua casa.
        </p>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0 leading-none">
            <span className="font-display text-2xl tracking-wide sm:text-[1.7rem]">OKAPI</span>
            <span
              className={cn(
                "mt-0.5 block text-[9px] font-medium uppercase tracking-[0.22em]",
                overHero ? "text-ivory/70" : "text-muted-foreground",
              )}
            >
              Móveis · Coimbra
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "text-[12px] font-medium uppercase tracking-[0.18em] transition hover:opacity-80",
                    isActive && "underline underline-offset-8",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Pesquisar"
              className="flex h-10 w-10 items-center justify-center"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <Link
              to="/favoritos"
              aria-label="Favoritos"
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <Heart className="h-5 w-5" strokeWidth={1.5} />
              {favorites.length > 0 ? (
                <span
                  className={cn(
                    "absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center px-1 text-[10px]",
                    overHero ? "bg-ivory text-espresso" : "bg-espresso text-ivory",
                  )}
                >
                  {favorites.length}
                </span>
              ) : null}
            </Link>
            <Link
              to="/carrinho"
              aria-label="Carrinho"
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {cartCount > 0 ? (
                <span
                  className={cn(
                    "absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center px-1 text-[10px]",
                    overHero ? "bg-ivory text-espresso" : "bg-espresso text-ivory",
                  )}
                >
                  {cartCount}
                </span>
              ) : null}
            </Link>
            <a
              href={genericWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "ml-1 hidden border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition md:inline-flex",
                overHero
                  ? "border-ivory/50 text-ivory hover:bg-ivory hover:text-espresso"
                  : "border-espresso/40 text-espresso hover:bg-espresso hover:text-ivory",
              )}
            >
              Contactar
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink text-ivory lg:hidden">
          <div className="flex items-center justify-between px-4 py-5">
            <Link
              to="/"
              className="font-display text-2xl tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              OKAPI
            </Link>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-6 pb-16 pt-4">
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-ivory/50">
              Categorias
            </p>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/categoria/${cat.slug}`}
                    className="font-display text-3xl"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-3 border-t border-ivory/15 pt-8">
              {nav.slice(2).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-sm uppercase tracking-[0.18em] text-ivory/80"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/loja"
                className="block text-sm uppercase tracking-[0.18em] text-ivory/80"
                onClick={() => setMobileOpen(false)}
              >
                Toda a loja
              </Link>
            </div>
            <div className="mt-10 border-t border-ivory/15 pt-8 text-sm text-ivory/70">
              <p className="font-medium text-ivory">Visite-nos</p>
              <p className="mt-2 max-w-xs leading-relaxed">{site.address}</p>
              <a href={`tel:${site.phoneTel}`} className="mt-3 block text-ivory">
                {site.phoneDisplay}
              </a>
              <p className="mt-1">{site.hours}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
