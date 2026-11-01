import { Link, Navigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductBrowser } from "@/components/site/ProductBrowser";
import { getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export function CategoryPage() {
  const { slug } = useParams();
  const category = slug ? getCategory(slug) : undefined;

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const items = getProductsByCategory(category.slug);

  return (
    <div>
      <div className="relative overflow-hidden">
        <img
          src={category.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-40 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs text-ivory/70">
            <Link to="/loja" className="hover:underline">
              Loja
            </Link>
            <span className="mx-2">/</span>
            {category.name}
          </p>
          <PageHeader
            light
            eyebrow="Categoria"
            title={category.name}
            description={category.description}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <ProductBrowser initialProducts={[...items]} hideCategoryFilter />
      </div>
    </div>
  );
}
