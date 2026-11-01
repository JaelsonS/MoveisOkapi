import { Link } from "react-router-dom";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { MapEmbed } from "@/components/site/MapEmbed";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { site } from "@/data/site";
import { genericWhatsAppUrl } from "@/lib/whatsapp";

export function AboutPage() {
  return (
    <div>
      <div className="relative overflow-hidden">
        <img
          src="/assets/showroom-CFitaGfK.jpg"
          alt="Showroom Móveis Okapi"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:px-8">
          <PageHeader
            light
            eyebrow="Sobre"
            title="Mais do que mobiliário. Criamos relações."
            description="Acompanhar cada casa com tempo, honestidade e o olhar de quem conhece materiais e proporções."
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="font-display text-3xl text-espresso sm:text-4xl">
            Móveis Okapi, em {site.location}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Somos uma loja de mobiliário focada em peças com carácter e conforto
            duradouro. Do sofá à cozinha, ajudamos a escolher acabamentos, medidas e
            composições que respeitam o espaço e o ritmo de quem vive nele.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            No showroom pode ver, tocar e comparar — e contar com a equipa para
            esclarecer dúvidas sem pressa. Acreditamos que o melhor resultado nasce de
            uma conversa clara e de escolhas bem fundamentadas.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 lg:mt-0">
          <div className="border border-border bg-sand/30 p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Visite-nos
            </p>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-espresso">
              <p>{site.address}</p>
              <p>
                <a href={`tel:${site.phoneTel}`} className="hover:underline">
                  {site.phoneDisplay}
                </a>
              </p>
              <p>{site.hours}</p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
              </p>
            </address>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contactos"
                className="bg-espresso px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory"
              >
                Contactos
              </Link>
              <a
                href={genericWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-espresso/40 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" title="" />
                WhatsApp
              </a>
              <Link
                to="/orcamento"
                className="px-2 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-espresso underline-offset-4 hover:underline"
              >
                Pedir orçamento
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-espresso sm:text-4xl">Como chegar</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Estrada Nacional 111, São João do Campo — Coimbra. Abra o mapa para direções.
          </p>
          <MapEmbed className="mt-8" />
        </div>
      </section>

      <section className="border-t border-border bg-sand/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              title: "Materiais com carácter",
              text: "Carvalho, nogueira, linho, pedra e tecidos pensados para o uso diário.",
            },
            {
              title: "Acompanhamento próximo",
              text: "Medidas, acabamentos e composição — ajudamos a decidir com confiança.",
            },
            {
              title: "Showroom em Coimbra",
              text: "Venha ver as peças ao vivo e imaginar o ambiente na sua casa.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-2xl text-espresso">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
