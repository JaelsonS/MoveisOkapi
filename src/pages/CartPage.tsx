import { Link } from "react-router-dom";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { PageHeader } from "@/components/site/PageHeader";
import { getProduct } from "@/data/products";
import { whatsappUrl } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { useShopStore } from "@/store/useShopStore";

export function CartPage() {
  const cart = useShopStore((s) => s.cart);
  const setQty = useShopStore((s) => s.setQty);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const clearCart = useShopStore((s) => s.clearCart);

  const lines = cart
    .map((item) => {
      const product = getProduct(item.slug);
      if (!product) return null;
      return { item, product };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  function openQuote() {
    const textLines = lines.map(
      ({ item, product }) =>
        `• ${product.name}${item.variant ? ` (${item.variant})` : ""} × ${item.quantity}${
          product.ref ? ` — Ref. ${product.ref}` : ""
        }`,
    );
    window.open(
      whatsappUrl(whatsappMessages.cartQuote(textLines)),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28">
      <PageHeader
        eyebrow="Carrinho"
        title="A sua seleção"
        description="Ajuste quantidades e peça orçamento via WhatsApp. Os valores são sempre sob consulta."
      />

      {lines.length === 0 ? (
        <div className="mt-14 border border-dashed border-border px-6 py-16 text-center">
          <p className="font-display text-3xl text-espresso">Carrinho vazio</p>
          <p className="mt-3 text-muted-foreground">
            Ainda não adicionou peças. Explore o catálogo e comece a composição.
          </p>
          <Link
            to="/loja"
            className="mt-8 inline-flex bg-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
          >
            Ir para a loja
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
          <ul className="divide-y divide-border border-y border-border">
            {lines.map(({ item, product }) => (
              <li key={`${item.slug}-${item.variant ?? ""}`} className="flex gap-4 py-6">
                <Link to={`/produto/${product.slug}`} className="shrink-0">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="h-28 w-24 object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-2">
                  <div>
                    <Link
                      to={`/produto/${product.slug}`}
                      className="font-display text-2xl text-espresso hover:opacity-80"
                    >
                      {product.name}
                    </Link>
                    {item.variant ? (
                      <p className="text-sm text-muted-foreground">{item.variant}</p>
                    ) : null}
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Preço sob consulta
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center border border-border">
                      <button
                        type="button"
                        aria-label="Diminuir quantidade"
                        className="px-3 py-1.5 text-sm"
                        onClick={() => setQty(item.slug, item.quantity - 1, item.variant)}
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Aumentar quantidade"
                        className="px-3 py-1.5 text-sm"
                        onClick={() => setQty(item.slug, item.quantity + 1, item.variant)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-espresso"
                      onClick={() => removeFromCart(item.slug, item.variant)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border bg-sand/30 p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Resumo
            </p>
            <p className="mt-4 font-display text-2xl text-espresso">
              {lines.reduce((n, { item }) => n + item.quantity, 0)} peça(s)
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sem preços públicos neste website. O valor é confirmado em orçamento via
              WhatsApp.
            </p>
            <button
              type="button"
              onClick={openQuote}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-espresso px-4 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory"
            >
              <WhatsAppIcon className="h-4 w-4" title="" />
              Pedir orçamento no WhatsApp
            </button>
            <Link
              to="/orcamento"
              className="mt-3 block w-full border border-espresso/40 px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-espresso"
            >
              Formulário de orçamento
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="mt-4 w-full text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-espresso"
            >
              Limpar carrinho
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
