import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";
import { SITE } from "@/lib/site";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/politica-de-cookies")({
  component: CookiesPage,
  head: () =>
    buildPageHead({
      title: `Política de Cookies | ${SITE.name}`,
      description:
        "Quais cookies o portal utiliza, para que servem e como gerenciar suas preferências de privacidade.",
      path: "/politica-de-cookies",
    }),
});

function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies">
      <p>
        Cookies são pequenos arquivos armazenados no seu navegador que permitem o funcionamento do
        site e a medição de audiência.
      </p>
      <h2>Categorias utilizadas</h2>
      <ul>
        <li>
          <strong>Necessários:</strong> essenciais para a navegação e para registrar a sua escolha
          de consentimento.
        </li>
        <li>
          <strong>Analíticos:</strong> medem uso e desempenho por meio de ferramentas como Google
          Analytics 4 e Microsoft Clarity.
        </li>
        <li>
          <strong>Marketing:</strong> ajudam a medir a origem das visitas e a eficácia das
          campanhas.
        </li>
      </ul>
      <h2>Gerenciamento</h2>
      <p>
        Ao acessar o portal, você escolhe entre aceitar todos os cookies ou manter apenas os
        necessários. É possível alterar a decisão limpando os dados do site no seu navegador e
        recarregando a página.
      </p>
      <h2>Dúvidas</h2>
      <p>Para dúvidas sobre cookies e privacidade, escreva para {SITE.email}.</p>
    </LegalPage>
  );
}
