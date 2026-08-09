import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Compass,
  FileCheck2,
  FileStack,
  FileText,
  Gavel,
  Headset,
  Info,
  ListChecks,
  RefreshCw,
  Rocket,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CATEGORIES,
  DIFFERENTIALS,
  FAQ,
  HOW_IT_WORKS,
  LEGAL_DISCLAIMER,
  SEGMENTS,
  SITE,
} from "@/lib/site";
import { ARTICLES } from "@/lib/articles";
import { buildPageHead, faqJsonLd, jsonLdScript } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { useTriage } from "@/components/site/triage-context";

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  ClipboardCheck,
  RefreshCw,
  FileStack,
  Search,
  ShieldAlert,
  Compass,
  ListChecks,
  FileCheck2,
  Headset,
};

export const Route = createFileRoute("/")({
  component: Home,
  head: () => {
    const title = `${SITE.name} — Como Participar de Licitações e Vender para o Governo`;
    const description =
      "Aprenda a fazer o cadastro no SICAF, organizar documentos e encontrar licitações públicas. Pré-triagem gratuita para empresas e MEIs que querem vender para o governo.";
    const page = buildPageHead({ title, description, path: "/" });
    return {
      ...page,
      scripts: [jsonLdScript(faqJsonLd(FAQ))],
    };
  },
});

function Home() {
  const { openTriage } = useTriage();

  return (
    <>
      {/* HERO */}
      <section className="surface-hero border-b border-border">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="eyebrow">Oportunidades para empresas e fornecedores</p>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
              Quer vender para o governo e{" "}
              <span className="text-primary">participar de licitações?</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Descubra o que sua empresa precisa para começar, regularizar seu cadastro e encontrar
              oportunidades em órgãos públicos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-14 px-7 text-base" onClick={() => openTriage()}>
                Descobrir o que minha empresa precisa
                <ArrowRight className="size-5" aria-hidden />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-7 text-base"
                onClick={() => openTriage("renovacao")}
              >
                Já tenho cadastro no SICAF
              </Button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 text-success" aria-hidden />
              Pré-triagem gratuita, sem compromisso · leva cerca de 2 minutos
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-lift">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold tracking-wider uppercase">Jornada do fornecedor</p>
                <Sparkles className="size-4 text-gold" aria-hidden />
              </div>
              <ul className="mt-5 space-y-3">
                {[
                  { icon: Building2, label: "Cadastro de fornecedor" },
                  { icon: FileText, label: "Documentação empresarial" },
                  { icon: BadgeCheck, label: "Regularidade no SICAF" },
                  { icon: Target, label: "Oportunidades públicas" },
                  { icon: Gavel, label: "Participação em licitações" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-3"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <span className="min-w-0 truncate text-sm font-semibold">{label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-success/25 bg-success-soft px-4 py-3 text-sm font-medium">
                Cada etapa concluída aproxima sua empresa de contratar com órgãos públicos.
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -top-4 -right-4 -z-10 hidden size-40 rounded-full bg-gold/15 blur-3xl lg:block"
            />
          </div>
        </div>
      </section>

      {/* PRÉ-TRIAGEM */}
      <section id="pre-triagem" className="container-page scroll-mt-24 py-16 sm:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Como podemos ajudar sua empresa hoje?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Selecione a opção que mais combina com a sua necessidade.
          </p>
        </header>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = ICONS[category.icon] ?? Rocket;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("card_click", { categoria: category.id });
                    openTriage(category.id);
                  }}
                  className="card-interactive flex h-full w-full flex-col p-6 text-left"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg leading-snug font-bold">{category.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground transition-colors group-hover:bg-primary">
                    {category.cta}
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-secondary/40 p-5 text-center text-xs leading-relaxed text-muted-foreground">
          {LEGAL_DISCLAIMER}
        </p>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="scroll-mt-24 border-y border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-24">
          <header className="max-w-2xl">
            <p className="eyebrow">Como funciona</p>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
              Começar a vender para o governo pode ser mais simples
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada empresa possui uma situação diferente. Por isso, o primeiro passo é identificar o
              que já está regular e o que ainda precisa ser preparado.
            </p>
          </header>

          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-3xl font-extrabold text-primary/25">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OPORTUNIDADE */}
      <section id="oportunidades" className="surface-navy scroll-mt-24">
        <div className="container-page py-16 sm:py-24">
          <header className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] text-gold uppercase">
              Mercado público
            </p>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
              Órgãos públicos compram produtos e contratam serviços de diferentes segmentos
            </h2>
          </header>

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {SEGMENTS.map((segment) => (
              <li
                key={segment}
                className="rounded-full border border-navy-foreground/20 bg-navy-foreground/5 px-4 py-2 text-sm font-medium"
              >
                {segment}
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-3xl leading-relaxed text-navy-foreground/80">
            Empresas de diferentes portes podem fornecer para municípios, estados, União, autarquias
            e empresas públicas, desde que atendam às exigências de cada contratação.
          </p>

          <Button
            size="lg"
            className="mt-8 h-14 bg-success px-7 text-base text-success-foreground hover:bg-success/90"
            onClick={() => openTriage("oportunidades")}
          >
            Ver se minha empresa está preparada
            <ArrowRight className="size-5" aria-hidden />
          </Button>
        </div>
      </section>

      {/* SICAF */}
      <section id="sicaf" className="container-page scroll-mt-24 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Cadastro no SICAF</p>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
              Cadastro no SICAF: o que é necessário para participar
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              O SICAF é o sistema oficial usado no cadastramento e na habilitação de fornecedores em
              contratações públicas federais. Para o cadastro no SICAF, a empresa geralmente precisa
              apresentar informações cadastrais, documentos, certidões, qualificação técnica,
              regularidade fiscal e dados econômico-financeiros — conforme o edital.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold-soft p-5">
              <Info className="mt-0.5 size-5 shrink-0 text-foreground/70" aria-hidden />
              <p className="text-sm leading-relaxed font-medium">
                Cada contratação possui regras próprias. Antes de participar, consulte o edital e
                verifique todas as exigências. Veja também o guia completo de{" "}
                <Link to="/cadastro-no-sicaf" className="font-bold text-foreground underline-offset-2 hover:underline">
                  cadastro no SICAF
                </Link>
                .
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-14 px-7 text-base"
                onClick={() => openTriage("cadastro-sicaf")}
              >
                Preciso de ajuda com o SICAF
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-7 text-base" asChild>
                <Link to="/cadastro-no-sicaf">Guia de cadastro no SICAF</Link>
              </Button>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Habilitação jurídica", text: "Atos constitutivos, sócios e representação." },
              { title: "Regularidade fiscal", text: "Certidões federal, estadual e municipal." },
              { title: "Regularidade trabalhista", text: "FGTS e certidão negativa trabalhista." },
              {
                title: "Qualificação econômica",
                text: "Demonstrações contábeis e índices exigidos.",
              },
              { title: "Qualificação técnica", text: "Atestados e registros, quando exigidos." },
              { title: "Dados cadastrais", text: "Informações da empresa sempre atualizadas." },
            ].map((item) => (
              <li key={item.title} className="rounded-2xl border border-border p-5">
                <BadgeCheck className="size-5 text-success" aria-hidden />
                <h3 className="mt-3 text-sm font-bold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTEÚDOS */}
      <section id="conteudos" className="scroll-mt-24 border-y border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-24">
          <header className="grid gap-4 sm:flex sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Conteúdo</p>
              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                Central de conhecimento sobre licitações
              </h2>
              <p className="mt-3 text-muted-foreground">
                Guias completos e originais para entender cada etapa da jornada do fornecedor
                público.
              </p>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/conteudos">Ver todos os artigos</Link>
            </Button>
          </header>

          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.slice(0, 6).map((article) => (
              <li key={article.slug}>
                <Link
                  to="/conteudos/$slug"
                  params={{ slug: article.slug }}
                  onClick={() => trackEvent("artigo_click", { slug: article.slug })}
                  className="card-interactive flex h-full flex-col p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <p className="text-xs font-bold tracking-wider text-primary uppercase">
                    {article.topic}
                  </p>
                  <h3 className="mt-3 text-base leading-snug font-bold">{article.h1}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CREDIBILIDADE */}
      <section id="credibilidade" className="container-page scroll-mt-24 py-16 sm:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Orientação clara para sua empresa avançar
          </h2>
        </header>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIALS.map((item) => {
            const Icon = ICONS[item.icon] ?? Compass;
            return (
              <li key={item.title} className="rounded-2xl border border-border p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-navy-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-24">
          <header className="max-w-2xl">
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Perguntas frequentes</h2>
          </header>
          <Accordion type="single" collapsible className="mt-8 max-w-3xl">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-page py-16 sm:py-24">
        <div className="surface-navy rounded-3xl px-7 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Sua empresa está pronta para vender para o governo?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-foreground/80">
            Faça uma pré-triagem rápida, identifique sua situação e descubra qual é o próximo passo.
          </p>
          <Button
            size="lg"
            className="mt-8 h-14 bg-success px-8 text-base text-success-foreground hover:bg-success/90"
            onClick={() => openTriage()}
          >
            Começar pré-triagem gratuita
            <ArrowRight className="size-5" aria-hidden />
          </Button>
          <p className="mt-4 text-sm text-navy-foreground/70">Leva aproximadamente 2 minutos.</p>
          <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-navy-foreground/60">
            {LEGAL_DISCLAIMER} Atendimento especializado prestado pela {SITE.partnerName}.
          </p>
        </div>
      </section>
    </>
  );
}
