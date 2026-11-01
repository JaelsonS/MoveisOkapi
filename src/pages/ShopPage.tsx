import { PageHeader } from "@/components/site/PageHeader";
import { ProductBrowser } from "@/components/site/ProductBrowser";

export function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28">
      <PageHeader
        eyebrow="Loja"
        title="O catálogo Okapi"
        description="Peças escolhidas para salas, quartos, cozinhas e todos os cantos da casa."
      />
      <div className="mt-12">
        <ProductBrowser />
      </div>
    </div>
  );
}
