import { site } from "@/data/site";
import { MapPinIcon } from "@/components/icons/BrandIcons";

type MapEmbedProps = {
  className?: string;
  title?: string;
};

/** Mapa Google embutido sem API key (iframe público + link externo). */
export function MapEmbed({
  className = "",
  title = "Localização da Móveis Okapi no Google Maps",
}: MapEmbedProps) {
  return (
    <div className={className}>
      <div className="overflow-hidden border border-border bg-sand/40">
        <iframe
          title={title}
          src={site.mapsEmbedSrc}
          className="h-[320px] w-full border-0 sm:h-[400px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={site.addressMaps}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm text-espresso underline-offset-4 hover:underline"
      >
        <MapPinIcon className="h-4 w-4" />
        Abrir no Google Maps
      </a>
    </div>
  );
}
