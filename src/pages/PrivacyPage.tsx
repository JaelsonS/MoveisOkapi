import { Link } from "react-router-dom";
import { PageHeader } from "@/components/site/PageHeader";
import { site } from "@/data/site";

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-28">
      <PageHeader
        eyebrow="Privacidade"
        title="Política de privacidade"
        description="Informação sobre o tratamento de dados neste website de demonstração."
      />

      <div className="prose-sm mt-12 space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-display text-2xl text-espresso">1. Quem somos</h2>
          <p className="mt-3 leading-relaxed">
            Este website é uma demonstração da marca {site.name}, associada a {site.location}.
            Contacto:{" "}
            <a href={`mailto:${site.email}`} className="text-espresso hover:underline">
              {site.email}
            </a>{" "}
            · {site.phoneDisplay}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-espresso">2. Natureza da demonstração</h2>
          <p className="mt-3 leading-relaxed">
            Os preços, stocks e disponibilidades apresentados são fictícios. Os formulários
            de contacto e orçamento não enviam dados para um servidor próprio: preparam uma
            mensagem para WhatsApp, que só é enviada se o utilizador confirmar na aplicação.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-espresso">3. Dados armazenados no dispositivo</h2>
          <p className="mt-3 leading-relaxed">
            Utilizamos armazenamento local do navegador (localStorage) para guardar
            favoritos, carrinho e preços revelados. Estes dados permanecem no seu
            dispositivo e podem ser apagados limpando os dados do site nas definições do
            browser.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-espresso">4. Ligações externas</h2>
          <p className="mt-3 leading-relaxed">
            Ligações para WhatsApp, Instagram, Facebook ou mapas podem implicar o
            tratamento de dados por esses serviços, segundo as respetivas políticas de
            privacidade.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-espresso">5. Os seus direitos</h2>
          <p className="mt-3 leading-relaxed">
            Num contexto real de loja, teria direito de acesso, retificação e apagamento
            dos seus dados, nos termos do RGPD. Nesta demonstração, como não há backend de
            formulários, o controlo principal é o armazenamento local no seu browser e as
            conversas que iniciar no WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-espresso">6. Atualizações</h2>
          <p className="mt-3 leading-relaxed">
            Esta página pode ser atualizada sem aviso prévio no âmbito da demonstração.
            Última atualização: novembro de 2026.
          </p>
        </section>

        <p className="pt-4">
          <Link to="/" className="text-espresso underline-offset-4 hover:underline">
            Voltar à página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}
