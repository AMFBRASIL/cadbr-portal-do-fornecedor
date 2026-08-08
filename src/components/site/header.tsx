import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { useTriage } from "./triage-context";
import { Logo } from "./logo";

const NAV: { label: string; to: "/" | "/conteudos" | "/cadastro-no-sicaf"; hash?: string }[] = [
  { label: "Início", to: "/" },
  { label: "Como participar", to: "/", hash: "como-funciona" },
  { label: "Cadastro no SICAF", to: "/cadastro-no-sicaf" },
  { label: "Licitações", to: "/", hash: "oportunidades" },
  { label: "Para fornecedores", to: "/", hash: "credibilidade" },
  { label: "Conteúdos", to: "/conteudos" },
];

export function Header() {
  const { openTriage } = useTriage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-background"
      }`}
    >
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${SITE.name} — início`}>
          <Logo className="h-9 w-auto shrink-0 text-foreground" />
          <span className="hidden min-w-0 truncate text-[11px] text-muted-foreground sm:block">
            Orientação em licitações públicas
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Navegação principal" className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button className="ml-2 hidden md:inline-flex" onClick={() => openTriage()}>
            <ShieldCheck className="size-4" aria-hidden />
            Fazer pré-triagem gratuita
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Navegação principal (mobile)"
          className="container-page border-t border-border pb-4 lg:hidden"
        >
          <ul className="grid gap-1 pt-3">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-semibold hover:bg-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            className="mt-3 w-full"
            size="lg"
            onClick={() => {
              setMobileOpen(false);
              openTriage();
            }}
          >
            Fazer pré-triagem gratuita
          </Button>
        </nav>
      )}
    </header>
  );
}
