import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Button } from "@/components/ui/button";
import { LEGAL_DISCLAIMER, SITE } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { useTriage } from "@/components/site/triage-context";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({
    meta: [
      { title: `Contato | ${SITE.name}` },
      {
        name: "description",
        content:
          "Fale com o portal de orientação sobre licitações, SICAF e Compras.gov.br ou faça a pré-triagem gratuita em dois minutos.",
      },
      { property: "og:title", content: `Contato — ${SITE.name}` },
      {
        property: "og:description",
        content: "Canais de contato e pré-triagem gratuita para empresas interessadas em licitar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contato" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
});

function ContatoPage() {
  const { openTriage } = useTriage();
  return (
    <div className="container-page py-12">
      <Breadcrumbs items={[{ label: "Contato" }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Fale conosco</p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Contato</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A forma mais rápida de ser direcionado corretamente é fazer a pré-triagem gratuita. Ela
          leva cerca de 2 minutos.
        </p>
        <Button size="lg" className="mt-6" onClick={() => openTriage()}>
          Começar pré-triagem gratuita
        </Button>
      </header>

      <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener"
          onClick={() => trackEvent("whatsapp_click", { origem: "contato" })}
          className="card-interactive flex items-center gap-3 p-5 font-semibold"
        >
          <MessageCircle className="size-5 text-success" aria-hidden /> Falar pelo WhatsApp
        </a>
        <a
          href={`mailto:${SITE.email}`}
          className="card-interactive flex items-center gap-3 p-5 font-semibold"
        >
          <Mail className="size-5 text-primary" aria-hidden /> {SITE.email}
        </a>
      </div>

      <p className="mt-10 max-w-3xl rounded-2xl border border-border bg-secondary/50 p-5 text-sm leading-relaxed text-muted-foreground">
        {LEGAL_DISCLAIMER}
      </p>
    </div>
  );
}
