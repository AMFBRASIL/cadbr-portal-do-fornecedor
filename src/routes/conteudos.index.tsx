import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, buildPageHead, jsonLdScript } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { Breadcrumbs } from "@/components/site/breadcrumbs";

export const Route = createFileRoute("/conteudos/")({
  component: ConteudosPage,
  head: () => {
    const page = buildPageHead({
      title: `Central de Conhecimento sobre Licitações | ${SITE.name}`,
      description:
        "Guias práticos sobre licitações públicas, cadastro no SICAF, Compras.gov.br, documentos, certidões e oportunidades para empresas de todos os portes.",
      path: "/conteudos",
    });
    return {
      ...page,
      scripts: [
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Conteúdos", path: "/conteudos" },
          ]),
        ),
      ],
    };
  },
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

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <li key={article.slug}>
            <Link
              to="/conteudos/$slug"
              params={{ slug: article.slug }}
              onClick={() => trackEvent("artigo_click", { slug: article.slug })}
              className="card-interactive group flex h-full flex-col p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                <BookOpen className="size-3.5" aria-hidden /> {article.topic}
              </p>
              <h2 className="mt-3 text-lg leading-snug font-bold transition-colors group-hover:text-primary">
                {article.h1}
              </h2>
              <p className="mt-2.5 flex-1 text-sm text-muted-foreground">{article.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Ler artigo <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm text-muted-foreground">
        Precisa de apoio operacional? O atendimento especializado é prestado pela{" "}
        {SITE.partnerName}, empresa parceira.
      </p>
    </div>
  );
}
