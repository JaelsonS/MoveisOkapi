import { productPriceWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";

type PriceRevealProps = {
  slug: string;
  name: string;
  refCode: string | null;
  price?: number | null;
  className?: string;
  size?: "sm" | "md" | "lg";
};

/** Preços não são publicados — consulta exclusiva via WhatsApp. */
export function PriceReveal({
  name,
  refCode,
  className,
  size = "md",
}: PriceRevealProps) {
  const labelClass =
    size === "lg" ? "text-lg sm:text-xl" : size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      <p className={cn("font-medium text-espresso", labelClass)}>
        Preço sob consulta
      </p>
      <p className="text-sm text-muted-foreground">
        Valores e condições disponíveis mediante contacto. Sem preços inventados neste
        website.
      </p>
      <a
        href={productPriceWhatsAppUrl(name, refCode)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-espresso/30 bg-espresso px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory transition hover:opacity-90"
      >
        <WhatsAppIcon className="h-4 w-4" title="" />
        Consultar preço no WhatsApp
      </a>
    </div>
  );
}
