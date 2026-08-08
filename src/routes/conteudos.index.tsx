import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const Route = createFileRoute("/conteudos/")({
  component: ConteudosPage,
  head: () => ({
    meta: [
      { title: "Central de Conhecimento sobre Licitações | Licita Certa" },
      {
        name: "description",
        content:
          "Guias práticos sobre licitações públicas, SICAF, Compras.gov.br, documentos, certidões e oportunidades para empresas de todos os portes.",
      },
      { property: "og:title", content: "Central de conhecimento sobre licitações" },
      {
        property: "og:description",
        content:
          "Artigos aprofundados sobre como participar de licitações, regularizar o SICAF e encontrar oportunidades públicas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/conteudos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/conteudos" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "/" },
            { "@type": "ListItem", position: 2, name: "Conteúdos", item: "/conteudos" },
          ],
        }),
      },
    ],
  }),
});

function ConteudosPage() {
  return (
    <div className="container-page py-12">
      <Breadcrumbs items={[{ label: "Conteúdos" }]} />
      <header className="mt-6 max-w-3xl">
        <p className="eyebrow">Central de conhecimento</p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          Central de conhecimento sobre licitações
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Conteúdo original e prático sobre participação em licitações, cadastro de fornecedores,
          documentação e oportunidades em órgãos públicos.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <article key={article.slug} className="card-interactive flex flex-col p-6">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
              <BookOpen className="size-3.5" aria-hidden /> {article.topic}
            </p>
            <h2 className="mt-3 text-lg leading-snug font-bold">
              <Link
                to="/conteudos/$slug"
                params={{ slug: article.slug }}
                onClick={() => trackEvent("artigo_click", { slug: article.slug })}
                className="after:absolute after:inset-0 hover:text-primary"
              >
                {article.h1}
              </Link>
            </h2>
            <p className="mt-2.5 flex-1 text-sm text-muted-foreground">{article.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Ler artigo <ArrowRight className="size-4" aria-hidden />
            </span>
          </article>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        Precisa de apoio operacional? O atendimento especializado é prestado pela{" "}
        {SITE.partnerName}, empresa parceira.
      </p>
    </div>
  );
}
