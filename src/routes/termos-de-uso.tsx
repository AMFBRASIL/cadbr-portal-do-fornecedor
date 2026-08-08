import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";
import { LEGAL_DISCLAIMER, SITE } from "@/lib/site";

export const Route = createFileRoute("/termos-de-uso")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: `Termos de Uso | ${SITE.name}` },
      {
        name: "description",
        content:
          "Condições de uso do portal de orientação sobre licitações, SICAF e Compras.gov.br, incluindo limites de responsabilidade.",
      },
      { property: "og:title", content: "Termos de Uso" },
      {
        property: "og:description",
        content: "Condições de uso do portal independente de orientação sobre licitações.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/termos-de-uso" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/termos-de-uso" }],
  }),
});

function TermsPage() {
  return (
    <LegalPage title="Termos de Uso">
      <p>
        Ao navegar no portal {SITE.name}, você concorda com as condições descritas abaixo. Caso não
        concorde, recomendamos não utilizar o site.
      </p>
      <h2>Natureza do serviço</h2>
      <p>
        O portal oferece conteúdo informativo e uma pré-triagem gratuita destinada a identificar a
        necessidade do visitante e encaminhá-lo ao atendimento especializado parceiro. Não
        realizamos o acesso a sistemas oficiais em nome do usuário por meio deste site.
      </p>
      <h2>Conteúdo informativo</h2>
      <p>
        As informações publicadas têm caráter geral e educativo. Cada contratação pública possui
        regras próprias: antes de participar, consulte o edital e verifique todas as exigências
        aplicáveis.
      </p>
      <h2>Ausência de garantia de resultado</h2>
      <p>
        Nenhuma assessoria pode garantir que uma empresa vencerá uma licitação. O resultado depende
        das regras do edital, da documentação, da proposta apresentada e da concorrência.
      </p>
      <h2>Propriedade intelectual</h2>
      <p>
        Os textos, marcas e elementos visuais deste portal são protegidos. A reprodução total ou
        parcial depende de autorização prévia.
      </p>
      <h2>Links externos</h2>
      <p>
        O portal pode indicar fontes oficiais e o site da {SITE.partnerName}. Não nos
        responsabilizamos pelo conteúdo e pelas políticas de sites de terceiros.
      </p>
      <h2>Aviso legal</h2>
      <p>
        <strong>{LEGAL_DISCLAIMER}</strong>
      </p>
    </LegalPage>
  );
}
