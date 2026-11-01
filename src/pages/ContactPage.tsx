import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { MapEmbed } from "@/components/site/MapEmbed";
import { PageHeader } from "@/components/site/PageHeader";
import { site, whatsappUrl } from "@/data/site";
import { genericWhatsAppUrl } from "@/lib/whatsapp";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const empty: FormState = { name: "", email: "", phone: "", message: "" };

export function ContactPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [success, setSuccess] = useState(false);

  function validate(values: FormState) {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Indique o seu nome.";
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Indique um email válido.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
    }
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;

    const prepared = `Olá! O meu nome é ${form.name}. Email: ${form.email}${
      form.phone ? ` · Tel: ${form.phone}` : ""
    }.\n\n${form.message}`;
    window.open(whatsappUrl(prepared), "_blank", "noopener,noreferrer");
    setSuccess(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28">
      <PageHeader
        eyebrow="Contactos"
        title="Fale connosco."
        description="Visite o showroom, ligue ou envie uma mensagem — respondemos com o tempo que a sua casa merece."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Morada
            </p>
            <p className="mt-2 text-espresso">{site.address}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Telefone
            </p>
            <a href={`tel:${site.phoneTel}`} className="mt-2 block text-espresso">
              {site.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Email
            </p>
            <a href={`mailto:${site.email}`} className="mt-2 block text-espresso">
              {site.email}
            </a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Horário
            </p>
            <p className="mt-2 text-espresso">{site.hours}</p>
          </div>
          <a
            href={genericWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
          >
            <WhatsAppIcon className="h-4 w-4" title="" />
            Falar no WhatsApp
          </a>
          <MapEmbed className="pt-2" />
          <p className="text-sm text-muted-foreground">
            Prefere um orçamento estruturado?{" "}
            <Link to="/orcamento" className="text-espresso underline-offset-4 hover:underline">
              Pedir orçamento
            </Link>
          </p>
        </div>

        <div className="border border-border p-6 sm:p-8">
          {success ? (
            <div>
              <h2 className="font-display text-3xl text-espresso">Mensagem preparada</h2>
              <p className="mt-4 text-muted-foreground">
                Abrimos o WhatsApp com a sua mensagem. Esta demonstração não envia dados
                para um servidor — confirme o envio na aplicação WhatsApp.
              </p>
              <button
                type="button"
                className="mt-6 text-[11px] uppercase tracking-[0.16em] text-espresso underline-offset-4 hover:underline"
                onClick={() => {
                  setSuccess(false);
                  setForm(empty);
                }}
              >
                Nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <h2 className="font-display text-3xl text-espresso">Escreva-nos</h2>
              <Field
                label="Nome"
                error={errors.name}
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                label="Email"
                type="email"
                error={errors.email}
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
              <Field
                label="Telefone (opcional)"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
              <label className="block">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Mensagem
                </span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-espresso"
                />
                {errors.message ? (
                  <span className="mt-1 block text-sm text-olive">{errors.message}</span>
                ) : null}
              </label>
              <button
                type="submit"
                className="bg-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
              >
                Preparar mensagem
              </button>
              <p className="text-xs text-muted-foreground">
                Ao submeter, abrimos o WhatsApp com o texto preparado. Nada é enviado
                automaticamente.
              </p>
            </form>
          )}
        </div>
      </div>
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
