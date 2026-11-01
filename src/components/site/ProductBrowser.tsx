import { useMemo, useState, type ReactNode } from "react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

type SortKey = "relevance" | "newest" | "name";

type ProductBrowserProps = {
  initialProducts?: Product[];
  hideCategoryFilter?: boolean;
  className?: string;
};

const PAGE = 9;

const widthRanges = [
  { id: "w-sm", label: "Até 100 cm", test: (w: number) => w <= 100 },
  { id: "w-md", label: "100 – 200 cm", test: (w: number) => w > 100 && w <= 200 },
  { id: "w-lg", label: "Mais de 200 cm", test: (w: number) => w > 200 },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition",
        active
          ? "border-espresso bg-espresso text-ivory"
          : "border-border text-espresso hover:border-espresso/50",
      )}
    >
      {children}
    </button>
  );
}

function uniqueSorted(values: (string | null | undefined)[]) {
  return [...new Set(values.filter(Boolean) as string[])].sort((a, b) =>
    a.localeCompare(b, "pt"),
  );
}

export function ProductBrowser({
  initialProducts,
  hideCategoryFilter,
  className,
}: ProductBrowserProps) {
  const source = initialProducts ?? products;
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("relevance");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedWidths, setSelectedWidths] = useState<string[]>([]);
  const [visible, setVisible] = useState(PAGE);

  const availabilities = useMemo(
    () => uniqueSorted(source.map((p) => p.availability)),
    [source],
  );
  const styles = useMemo(() => uniqueSorted(source.map((p) => p.style)), [source]);
  const colors = useMemo(
    () => uniqueSorted(source.flatMap((p) => p.colors)),
    [source],
  );
  const materials = useMemo(
    () => uniqueSorted(source.flatMap((p) => p.materials)),
    [source],
  );

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
    setVisible(PAGE);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = source.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.ref ?? ""} ${p.categoryName ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (
        selectedCategories.length &&
        (!p.categorySlug || !selectedCategories.includes(p.categorySlug))
      ) {
        return false;
      }
      if (selectedAvailability.length && !selectedAvailability.includes(p.availability)) {
        return false;
      }
      if (selectedStyles.length && (!p.style || !selectedStyles.includes(p.style))) {
        return false;
      }
      if (
        selectedColors.length &&
        !p.colors.some((c) => selectedColors.includes(c))
      ) {
        return false;
      }
      if (
        selectedMaterials.length &&
        !p.materials.some((m) => selectedMaterials.includes(m))
      ) {
        return false;
      }
      if (selectedWidths.length) {
        if (p.widthCm == null) return false;
        const ok = selectedWidths.some((id) =>
          widthRanges.find((r) => r.id === id)?.test(p.widthCm!),
        );
        if (!ok) return false;
      }
      return true;
    });

    list = [...list];
    if (sort === "relevance") {
      list.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.isNew) - Number(a.isNew) ||
          a.name.localeCompare(b.name, "pt"),
      );
    } else if (sort === "newest") {
      list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.name.localeCompare(b.name, "pt"));
    } else if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name, "pt"));
    }

    return list;
  }, [
    source,
    query,
    sort,
    selectedCategories,
    selectedAvailability,
    selectedStyles,
    selectedColors,
    selectedMaterials,
    selectedWidths,
  ]);

  const shown = filtered.slice(0, visible);

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="block flex-1 max-w-md">
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Pesquisa
          </span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE);
            }}
            placeholder="Nome ou referência…"
            className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-espresso"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Ordenar
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-espresso"
          >
            <option value="relevance">Relevância</option>
            <option value="newest">Mais recentes</option>
            <option value="name">Nome A–Z</option>
          </select>
        </label>
      </div>

      <div className="space-y-4">
        {!hideCategoryFilter ? (
          <FilterRow label="Categorias">
            {categories.map((c) => (
              <Chip
                key={c.slug}
                active={selectedCategories.includes(c.slug)}
                onClick={() => toggle(selectedCategories, c.slug, setSelectedCategories)}
              >
                {c.name}
              </Chip>
            ))}
          </FilterRow>
        ) : null}

        <FilterRow label="Disponibilidade">
          {availabilities.map((a) => (
            <Chip
              key={a}
              active={selectedAvailability.includes(a)}
              onClick={() => toggle(selectedAvailability, a, setSelectedAvailability)}
            >
              {a}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Estilo">
          {styles.map((s) => (
            <Chip
              key={s}
              active={selectedStyles.includes(s)}
              onClick={() => toggle(selectedStyles, s, setSelectedStyles)}
            >
              {s}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Cor">
          {colors.map((c) => (
            <Chip
              key={c}
              active={selectedColors.includes(c)}
              onClick={() => toggle(selectedColors, c, setSelectedColors)}
            >
              {c}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Material">
          {materials.map((m) => (
            <Chip
              key={m}
              active={selectedMaterials.includes(m)}
              onClick={() => toggle(selectedMaterials, m, setSelectedMaterials)}
            >
              {m}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Largura">
          {widthRanges.map((r) => (
            <Chip
              key={r.id}
              active={selectedWidths.includes(r.id)}
              onClick={() => toggle(selectedWidths, r.id, setSelectedWidths)}
            >
              {r.label}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
      </p>

      {shown.length === 0 ? (
        <div className="border border-dashed border-border px-6 py-16 text-center">
          <p className="font-display text-3xl text-espresso">Nenhum resultado</p>
          <p className="mt-3 text-muted-foreground">
            Ajuste os filtros ou limpe a pesquisa para ver mais peças.
          </p>
          <button
            type="button"
            className="mt-6 border border-espresso px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso hover:bg-espresso hover:text-ivory"
            onClick={() => {
              setQuery("");
              setSelectedCategories([]);
              setSelectedAvailability([]);
              setSelectedStyles([]);
              setSelectedColors([]);
              setSelectedMaterials([]);
              setSelectedWidths([]);
              setVisible(PAGE);
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          {visible < filtered.length ? (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE)}
                className="border border-espresso px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-espresso hover:text-ivory"
              >
                Carregar mais
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
