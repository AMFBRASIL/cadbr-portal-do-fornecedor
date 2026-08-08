import { Link } from "@tanstack/react-router";
import { ExternalLink, Mail, MessageCircle } from "lucide-react";
import { LEGAL_DISCLAIMER, SITE } from "@/lib/site";
import { ARTICLES } from "@/lib/articles";
import { trackEvent } from "@/lib/analytics";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="surface-navy mt-24">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="size-9 shrink-0" />
            <span className="font-display text-lg font-extrabold">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-foreground/75">
            Portal independente de orientação sobre licitações públicas, cadastro de fornecedores,
            SICAF e Compras.gov.br.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener"
              onClick={() => trackEvent("whatsapp_click", { origem: "rodape" })}
              className="flex items-center gap-2 text-navy-foreground/80 hover:text-navy-foreground"
            >
              <MessageCircle className="size-4" aria-hidden /> Falar pelo WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-navy-foreground/80 hover:text-navy-foreground"
            >
              <Mail className="size-4" aria-hidden /> {SITE.email}
            </a>
          </div>
        </div>

        <nav aria-label="Institucional">
          <h2 className="font-display text-sm font-bold tracking-widest uppercase">Institucional</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/80">
            <li>
              <Link to="/" className="hover:text-navy-foreground">
                Início
              </Link>
            </li>
            <li>
              <Link to="/" hash="como-funciona" className="hover:text-navy-foreground">
                Como participar
              </Link>
            </li>
            <li>
              <Link to="/" hash="sicaf" className="hover:text-navy-foreground">
                SICAF
              </Link>
            </li>
            <li>
              <Link to="/" hash="faq" className="hover:text-navy-foreground">
                Perguntas frequentes
              </Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-navy-foreground">
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Central de conhecimento">
          <h2 className="font-display text-sm font-bold tracking-widest uppercase">
            Central de conhecimento
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/80">
            {ARTICLES.slice(0, 5).map((a) => (
              <li key={a.slug}>
                <Link
                  to="/conteudos/$slug"
                  params={{ slug: a.slug }}
                  className="hover:text-navy-foreground"
                >
                  {a.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/conteudos" className="font-semibold hover:text-navy-foreground">
                Ver todos os conteúdos
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal e parceria">
          <h2 className="font-display text-sm font-bold tracking-widest uppercase">Legal</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/80">
            <li>
              <Link to="/politica-de-privacidade" className="hover:text-navy-foreground">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/termos-de-uso" className="hover:text-navy-foreground">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/politica-de-cookies" className="hover:text-navy-foreground">
                Política de Cookies
              </Link>
            </li>
          </ul>
          <h2 className="mt-6 font-display text-sm font-bold tracking-widest uppercase">Parceiro</h2>
          <a
            href={SITE.partnerUrl}
            target="_blank"
            rel="noopener"
            onClick={() => trackEvent("cadbrasil_click", { origem: "rodape" })}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-navy-foreground/80 hover:text-navy-foreground"
          >
            {SITE.partnerName} — atendimento especializado
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </nav>
      </div>

      <div className="border-t border-navy-foreground/15">
        <div className="container-page py-7">
          <p className="max-w-4xl text-xs leading-relaxed text-navy-foreground/70">
            <strong className="text-navy-foreground">Aviso legal:</strong> {LEGAL_DISCLAIMER}
          </p>
          <p className="mt-4 text-xs text-navy-foreground/60">
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
