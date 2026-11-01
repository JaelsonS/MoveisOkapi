import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useShopStore } from "@/store/useShopStore";

export function SearchDialog() {
  const open = useShopStore((s) => s.searchOpen);
  const setSearchOpen = useShopStore((s) => s.setSearchOpen);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setSearchOpen]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 8);
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.ref ?? "").toLowerCase().includes(q) ||
          (p.categoryName ?? "").toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        aria-label="Fechar pesquisa"
        onClick={() => setSearchOpen(false)}
      />
      <div className="relative mx-auto mt-16 w-[min(640px,calc(100%-2rem))] border border-border bg-background shadow-xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por nome ou referência…"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Fechar"
            className="text-muted-foreground hover:text-espresso"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">
              Nenhum produto encontrado.
            </li>
          ) : (
            results.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/produto/${p.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 transition hover:bg-sand/50"
                >
                  <img
                    src={p.images[0]}
                    alt=""
                    className="h-14 w-12 object-cover"
                  />
                  <div>
                    <p className="font-display text-lg text-espresso">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.ref ? `Ref. ${p.ref}` : p.categoryName}
                    </p>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
        <div className="border-t border-border px-4 py-3 text-right">
          <Link
            to="/loja"
            onClick={() => setSearchOpen(false)}
            className="text-xs font-medium uppercase tracking-[0.16em] text-espresso underline-offset-4 hover:underline"
          >
            Ver toda a loja
          </Link>
        </div>
      </div>
    </div>
  );
}
