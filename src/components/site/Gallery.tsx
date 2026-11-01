import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type GalleryProps = {
  images: string[];
  alt: string;
  className?: string;
};

export function Gallery({ images, alt, className }: GalleryProps) {
  const list = images.length > 0 ? images : ["/assets/hero-living-T1Utz7X9.jpg"];
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const current = list[index] ?? list[0];

  function prev() {
    setIndex((i) => (i - 1 + list.length) % list.length);
  }

  function next() {
    setIndex((i) => (i + 1) % list.length);
  }

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, list.length]);

  return (
    <div className={cn("flex flex-col gap-3 md:flex-row", className)}>
      {list.length > 1 ? (
        <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:w-20 md:flex-col md:overflow-visible">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden border md:h-20 md:w-full",
                i === index ? "border-espresso" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      <div className="relative order-1 aspect-[4/5] flex-1 overflow-hidden bg-sand/40 md:order-2">
        <img src={current} alt={alt} className="h-full w-full object-cover" />

        {list.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-ivory/90 text-espresso"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Imagem seguinte"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-ivory/90 text-espresso"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Ampliar imagem"
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center bg-ivory/90 text-espresso"
        >
          <Expand className="h-4 w-4" />
        </button>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria ampliada"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Fechar"
            className="absolute right-4 top-4 text-ivory"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={prev}
            aria-label="Imagem anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={current}
            alt={alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
          <button
            type="button"
            onClick={next}
            aria-label="Imagem seguinte"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
