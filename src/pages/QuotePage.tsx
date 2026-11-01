import { type FormEvent, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";
import { getProduct, products } from "@/data/products";
import { whatsappUrl } from "@/data/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  product: string;
};

export function QuotePage() {
  const [params] = useSearchParams();
  const initialProduct = params.get("produto") ?? "";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    product: initialProduct,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [success, setSuccess] = useState(false);

  const selected = useMemo(
    () => (form.product ? getProduct(form.product) : undefined),
    [form.product],
  );

  function validate(values: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Indique o seu nome.";
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Indique um email válido.";
    }
    if (!values.phone.trim()) next.phone = "Indique um telefone de contacto.";
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message = "Descreva o que precisa (mín. 10 caracteres).";
    }
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;

    const productLine = selected
      ? `\nProduto de interesse: ${selected.name}${selected.ref ? ` (Ref. ${selected.ref})` : ""}`
      : form.product
        ? `\nProduto: ${form.product}`
        : "";

    const prepared = `Olá! Gostaria de pedir um orçamento.\n\nNome: ${form.name}\nEmail: ${form.email}\nTelefone: ${form.phone}${productLine}\n\n${form.message}`;
    window.open(whatsappUrl(prepared), "_blank", "noopener,noreferrer");
    setSuccess(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28">
      <PageHeader
        eyebrow="Orçamento"
        title="Peça o seu orçamento"
        description="Preencha o formulário. Prepararemos a mensagem no WhatsApp — esta demonstração não grava dados num servidor."
      />

      {success ? (
        <div className="mt-12 border border-border bg-sand/30 p-8">
          <h2 className="font-display text-3xl text-espresso">Pedido preparado</h2>
          <p className="mt-4 text-muted-foreground">
            Abrimos o WhatsApp com o seu pedido de orçamento. Confirme o envio na
            aplicação. Nenhum formulário foi submetido a um backend.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="text-[11px] uppercase tracking-[0.16em] text-espresso underline-offset-4 hover:underline"
            >
              Novo pedido
            </button>
            <Link
              to="/loja"
              className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-espresso"
            >
              Voltar à loja
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-12 space-y-5" noValidate>
          <Field
            label="Nome"
            value={form.name}
            error={errors.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          />
          <Field
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          />
          <Field
            label="Telefone"
            value={form.phone}
            error={errors.phone}
            onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
          />
          <label className="block">
            <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Produto (opcional)
            </span>
            <select
              value={form.product}
              onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-espresso"
            >
              <option value="">Sem produto específico</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Mensagem
            </span>
            <textarea
              rows={6}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-espresso"
              placeholder="Descreva medidas, acabamentos ou o ambiente que imagina…"
            />
            {errors.message ? (
              <span className="mt-1 block text-sm text-olive">{errors.message}</span>
            ) : null}
          </label>
          <button
            type="submit"
            className="bg-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
          >
            Preparar no WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-espresso"
      />
      {error ? <span className="mt-1 block text-sm text-olive">{error}</span> : null}
    </label>
  );
}
