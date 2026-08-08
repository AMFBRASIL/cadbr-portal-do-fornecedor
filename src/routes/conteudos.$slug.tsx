import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ARTICLES, getArticle } from "@/lib/articles";
import { CATEGORIES, SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTriage } from "@/components/site/triage-context";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/conteudos/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  component: ArticlePage,
  head: ({ params, loaderData }) => {
    const article = loaderData?.article;
    if (!article) return {};
    const url = `/conteudos/${params.slug}`;
    return {
      meta: [
        { title: `${article.title} | ${SITE.name}` },
        { name: "description", content: article.description },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.h1,
            description: article.description,
            inLanguage: "pt-BR",
            mainEntityOfPage: url,
            publisher: { "@type": "Organization", name: SITE.name },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: "/" },
              { "@type": "ListItem", position: 2, name: "Conteúdos", item: "/conteudos" },
              { "@type": "ListItem", position: 3, name: article.h1, item: url },
            ],
          }),
        },
      ],
    };
  },
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const { openTriage } = useTriage();
  const category = CATEGORIES.find((c) => c.id === article.ctaCategory);
  const related = article.related
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is (typeof ARTICLES)[number] => Boolean(a));

  return (
    <div className="container-page py-12">
      <Breadcrumbs items={[{ label: "Conteúdos", to: "/conteudos" }, { label: article.h1 }]} />

      <article className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <header>
            <p className="eyebrow">{article.topic}</p>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{article.h1}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.intro}</p>
          </header>

          <nav aria-label="Neste artigo" className="mt-8 rounded-2xl border border-border p-5">
            <h2 className="text-sm font-bold tracking-wider uppercase">Neste artigo</h2>
            <ol className="mt-3 space-y-1.5 text-sm">
              {article.blocks.map((b, i) => (
                <li key={b.heading}>
                  <a href={`#secao-${i}`} className="text-primary hover:underline">
                    {b.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 space-y-9">
            {article.blocks.map((block, i) => (
              <section key={block.heading} id={`secao-${i}`}>
                <h2 className="text-xl font-bold sm:text-2xl">{block.heading}</h2>
                {block.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {block.list && (
                  <ul className="mt-4 space-y-2">
                    {block.list.map((item) => (
                      <li key={item} className="flex gap-3 text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mt-12" aria-labelledby="faq-artigo">
            <h2 id="faq-artigo" className="text-xl font-bold sm:text-2xl">
              Perguntas frequentes
            </h2>
            <Accordion type="single" collapsible className="mt-4">
              {article.faq.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {article.sources && (
            <section className="mt-10" aria-labelledby="fontes">
              <h2 id="fontes" className="text-sm font-bold tracking-wider uppercase">
                Fontes oficiais
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {article.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener nofollow"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                    >
                      {s.label} <ExternalLink className="size-3.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="surface-navy mt-12 rounded-3xl p-8">
            <h2 className="text-xl font-bold sm:text-2xl">{article.ctaText}</h2>
            <p className="mt-2 max-w-xl text-sm text-navy-foreground/75">
              Faça a pré-triagem gratuita e receba a recomendação do próximo passo para a sua
              empresa. Se for necessário apoio operacional, encaminhamos para o atendimento
              especializado da {SITE.partnerName}.
            </p>
            <Button
              size="lg"
              className="mt-6 bg-success text-success-foreground hover:bg-success/90"
              onClick={() => openTriage(article.ctaCategory)}
            >
              Começar pré-triagem gratuita <ArrowRight className="size-4" aria-hidden />
            </Button>
          </section>
        </div>

        <aside className="space-y-8">
          {category && (
            <div className="rounded-2xl border border-border p-5">
              <h2 className="text-sm font-bold tracking-wider uppercase">Caminho indicado</h2>
              <p className="mt-3 text-sm font-semibold">{category.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {category.steps.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-border p-5">
            <h2 className="text-sm font-bold tracking-wider uppercase">Leia também</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to="/conteudos/$slug"
                    params={{ slug: r.slug }}
                    onClick={() => trackEvent("artigo_click", { slug: r.slug, origem: "related" })}
                    className="font-medium hover:text-primary"
                  >
                    {r.h1}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/conteudos" className="font-semibold text-primary hover:underline">
                  Ver todos os conteúdos
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </article>
    </div>
  );
}
