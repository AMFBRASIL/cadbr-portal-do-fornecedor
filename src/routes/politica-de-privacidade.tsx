import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";
import { LEGAL_DISCLAIMER, SITE } from "@/lib/site";

export const Route = createFileRoute("/politica-de-privacidade")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: `Política de Privacidade | ${SITE.name}` },
      {
        name: "description",
        content:
          "Como o portal coleta, utiliza, armazena e protege os dados pessoais informados na pré-triagem, em conformidade com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade" },
      {
        property: "og:description",
        content: "Tratamento de dados pessoais no portal, em conformidade com a LGPD.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/politica-de-privacidade" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidade" }],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        Esta política descreve como o portal {SITE.name} trata os dados pessoais informados
        voluntariamente por visitantes, em conformidade com a Lei nº 13.709/2018 (LGPD).
      </p>
      <h2>Dados coletados</h2>
      <ul>
        <li>Dados de identificação e contato: nome, empresa, CNPJ (opcional), e-mail e WhatsApp.</li>
        <li>Respostas da pré-triagem: perfil, situação, necessidade e prazo desejado.</li>
        <li>Dados de navegação: páginas visitadas e eventos de interação, por meio de cookies.</li>
      </ul>
      <h2>Finalidade do tratamento</h2>
      <p>
        Os dados são utilizados para identificar a necessidade do visitante, apresentar a
        recomendação de próximos passos e viabilizar o encaminhamento ao atendimento especializado
        parceiro, quando autorizado. Não vendemos dados pessoais.
      </p>
      <h2>Compartilhamento</h2>
      <p>
        Com o seu consentimento, os dados podem ser compartilhados com a {SITE.partnerName}, empresa
        parceira responsável pelo atendimento especializado, e com ferramentas de CRM e analytics
        utilizadas na operação do portal. Dados pessoais nunca são transmitidos em parâmetros de
        URL.
      </p>
      <h2>Base legal</h2>
      <p>
        O tratamento ocorre com base no consentimento do titular e no legítimo interesse para
        atendimento da solicitação realizada.
      </p>
      <h2>Retenção e segurança</h2>
      <p>
        Os dados são mantidos pelo tempo necessário ao atendimento e ao cumprimento de obrigações
        legais, com medidas técnicas e administrativas de proteção contra acessos não autorizados.
      </p>
      <h2>Direitos do titular</h2>
      <p>
        Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade, anonimização
        ou exclusão dos seus dados, além de revogar o consentimento, pelo e-mail {SITE.email}.
      </p>
      <h2>Aviso legal</h2>
      <p>
        <strong>{LEGAL_DISCLAIMER}</strong>
      </p>
    </LegalPage>
  );
}
