import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileStack,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTriage } from "@/components/site/triage-context";
import { LEGAL_DISCLAIMER, SITE } from "@/lib/site";
import {
  breadcrumbJsonLd,
  buildPageHead,
  faqJsonLd,
  jsonLdScript,
  serviceJsonLd,
} from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const FAQ = [
  {
    q: "O que é o cadastro no SICAF?",
    a: "É o cadastramento da empresa no Sistema de Cadastramento Unificado de Fornecedores, usado na habilitação de fornecedores em contratações públicas federais e em muitos processos do Compras.gov.br.",
  },
  {
    q: "Toda empresa precisa do cadastro no SICAF para licitar?",
    a: "Nas contratações federais e em processos do Compras.gov.br, o SICAF costuma ser exigido. Estados e municípios podem usar cadastros próprios. Sempre confira o edital.",
  },
  {
    q: "Quais documentos entram no cadastro no SICAF?",
    a: "Em geral: atos constitutivos, documentos dos sócios, CNPJ, certidões federal, estadual e municipal, FGTS, certidão trabalhista e, conforme o caso, demonstrações contábeis e atestados técnicos.",
  },
  {
    q: "Cadastro no SICAF e renovação são a mesma coisa?",
    a: "Não. O cadastro inicial organiza dados e documentos pela primeira vez. A renovação (ou atualização) substitui certidões vencidas e corrige alterações societárias ou cadastrais.",
  },
  {
    q: "O portal faz o cadastro diretamente no sistema do governo?",
    a: "Não. Este é um portal privado de orientação e pré-triagem. O acesso aos sistemas oficiais é feito pelos canais governamentais. Serviços operacionais do parceiro CADBR são privados e opcionais.",
  },
  {
    q: "Quanto tempo leva para concluir o cadastro no SICAF?",
    a: "Empresas com documentação regular costumam concluir a preparação em poucos dias. Pendências em certidões ou dados desatualizados aumentam o prazo.",
  },
];

const STEPS = [
  {
    title: "Diagnóstico da empresa",
    text: "Verifique CNPJ, CNAEs, contrato social e a situação atual de certidões antes de iniciar o cadastro no SICAF.",
  },
  {
    title: "Organização documental",
    text: "Reúna habilitação jurídica, regularidade fiscal e trabalhista, e os documentos econômico-financeiros exigidos.",
  },
  {
    title: "Cadastramento do fornecedor",
    text: "Preencha os níveis de cadastramento com dados corretos e documentos válidos nos canais oficiais.",
  },
  {
    title: "Conferência da regularidade",
    text: "Reconsulte o cadastro no SICAF e confirme que não há pendências antes de participar de uma disputa.",
  },
];

const RELATED = [
  {
    slug: "o-que-e-sicaf",
    title: "O que é o SICAF",
    description: "Função do sistema no cadastramento e na habilitação de fornecedores.",
  },
  {
    slug: "documentos-exigidos-no-sicaf",
    title: "Documentos do SICAF",
    description: "Checklist por tipo de habilitação para o cadastro no SICAF.",
  },
  {
    slug: "como-renovar-o-sicaf",
    title: "Renovar o SICAF",
    description: "Como atualizar certidões e dados quando o cadastro está irregular.",
  },
];

export const Route = createFileRoute("/cadastro-no-sicaf")({
  component: CadastroSicafPage,
  head: () => {
    const title = `Cadastro no SICAF: Como Cadastrar sua Empresa | ${SITE.name}`;
    const description =
      "Guia completo de cadastro no SICAF: etapas, documentos, erros comuns e como regularizar sua empresa para participar de licitações públicas. Pré-triagem gratuita.";
    const page = buildPageHead({
      title,
      description,
      path: "/cadastro-no-sicaf",
      keywords:
        "cadastro no SICAF, SICAF, cadastrar empresa no SICAF, documentos SICAF, habilitação fornecedor, Compras.gov.br, CADBR",
    });
    return {
      ...page,
      scripts: [
        jsonLdScript(
          serviceJsonLd({
            name: "Orientação para cadastro no SICAF",
            description,
            path: "/cadastro-no-sicaf",
          }),
        ),
        jsonLdScript(faqJsonLd(FAQ)),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Cadastro no SICAF", path: "/cadastro-no-sicaf" },
          ]),
        ),
      ],
    };
  },
});

function CadastroSicafPage() {
  const { openTriage } = useTriage();

  return (
    <div className="pb-16">
      <div className="container-page py-12">
        <Breadcrumbs items={[{ label: "Cadastro no SICAF" }]} />

        <header className="mt-6 max-w-3xl">
          <p className="eyebrow">SICAF · Fornecedores</p>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Cadastro no SICAF</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            O cadastro no SICAF é o passo que organiza os dados e a documentação da sua empresa para
            habilitação em contratações públicas federais. Este guia explica o que preparar, quais
            documentos reunir e como evitar as pendências mais comuns.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-14 px-7 text-base"
              onClick={() => {
                trackEvent("triagem_iniciada", { origem: "landing_sicaf_hero" });
                openTriage("cadastro-sicaf");
              }}
            >
              Fazer pré-triagem gratuita
              <ArrowRight className="size-5" aria-hidden />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-7 text-base" asChild>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener"
                onClick={() => trackEvent("whatsapp_click", { origem: "landing_sicaf" })}
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </header>
      </div>

      <section className="border-y border-border bg-secondary/40">
        <div className="container-page py-14 sm:py-16">
          <header className="max-w-2xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Etapas do cadastro no SICAF
            </h2>
            <p className="mt-3 text-muted-foreground">
              Um roteiro objetivo para preparar a empresa antes de disputar licitações.
            </p>
          </header>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
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

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Documentos para o cadastro no SICAF
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A lista varia conforme porte, natureza jurídica e objeto da contratação. Ainda assim,
              estes grupos aparecem na maioria dos cadastros:
            </p>
            <ul className="mt-6 space-y-4">
              {[
                {
                  icon: ClipboardCheck,
                  title: "Habilitação jurídica",
                  text: "Contrato social, documentos dos sócios, CNPJ e representação.",
                },
                {
                  icon: FileStack,
                  title: "Regularidade fiscal e trabalhista",
                  text: "Certidões federal, estadual, municipal, FGTS e trabalhista.",
                },
                {
                  icon: BadgeCheck,
                  title: "Qualificação econômica e técnica",
                  text: "Balanço, certidão de falência e atestados, quando o edital exigir.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 rounded-2xl border border-border p-5">
                  <item.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-6" asChild>
              <Link to="/conteudos/$slug" params={{ slug: "documentos-exigidos-no-sicaf" }}>
                Ver checklist completo de documentos
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Erros comuns no SICAF</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A maior parte das irregularidades no cadastro no SICAF vem de certidões vencidas e
              dados divergentes do CNPJ — não de exigências “escondidas”.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                {
                  icon: ShieldAlert,
                  title: "Certidões vencidas",
                  text: "Um cadastro regular há meses pode estar irregular hoje. Monitore validades.",
                },
                {
                  icon: RefreshCw,
                  title: "Dados desatualizados",
                  text: "Endereço, sócios ou capital social diferentes do registro oficial geram questionamentos.",
                },
                {
                  icon: FileStack,
                  title: "Níveis incompletos",
                  text: "Falta preencher ou anexar documentos em um dos níveis de habilitação exigidos pelo edital.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 rounded-2xl border border-border p-5">
                  <item.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link to="/conteudos/$slug" params={{ slug: "como-renovar-o-sicaf" }}>
                  Como renovar o SICAF
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/" hash="sicaf">
                  Seção SICAF na home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container-page py-14 sm:py-16">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Cadastro no SICAF x renovação
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold">Cadastro inicial</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Ideal para empresas que ainda não estão no SICAF ou que precisam montar o dossiê pela
                primeira vez: organização de documentos, preenchimento dos níveis e validação da
                regularidade.
              </p>
              <Button
                className="mt-5"
                onClick={() => openTriage("cadastro-sicaf")}
              >
                Quero cadastrar minha empresa
              </Button>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold">Renovação / atualização</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Para quem já tem cadastro no SICAF, mas está com certidões vencidas, balanço antigo
                ou dados societários desatualizados. O foco é restabelecer a regularidade.
              </p>
              <Button className="mt-5" variant="secondary" onClick={() => openTriage("renovacao")}>
                Quero regularizar meu SICAF
              </Button>
            </article>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Continue aprendendo sobre o SICAF</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {RELATED.map((item) => (
            <li key={item.slug}>
              <Link
                to="/conteudos/$slug"
                params={{ slug: item.slug }}
                className="card-interactive flex h-full flex-col p-6"
                onClick={() => trackEvent("artigo_click", { slug: item.slug, origem: "landing_sicaf" })}
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Ler artigo <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page" aria-labelledby="faq-sicaf">
        <h2 id="faq-sicaf" className="text-2xl font-extrabold sm:text-3xl">
          Perguntas frequentes sobre cadastro no SICAF
        </h2>
        <Accordion type="single" collapsible className="mt-6 max-w-3xl">
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="container-page mt-14">
        <div className="surface-navy rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Precisa de ajuda com o cadastro no SICAF?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-foreground/75">
            Faça a pré-triagem gratuita em cerca de dois minutos. Você recebe a recomendação do
            próximo passo e, se fizer sentido, o encaminhamento para o atendimento especializado da{" "}
            {SITE.partnerName}.
          </p>
          <Button
            size="lg"
            className="mt-6 bg-success text-success-foreground hover:bg-success/90"
            onClick={() => openTriage("cadastro-sicaf")}
          >
            Começar pré-triagem gratuita
            <ArrowRight className="size-4" aria-hidden />
          </Button>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-navy-foreground/60">
            {LEGAL_DISCLAIMER}
          </p>
        </div>
      </section>
    </div>
  );
}
