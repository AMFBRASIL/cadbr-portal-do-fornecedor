import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "lc-consent-v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const decide = (value: "all" | "necessary") => {
    localStorage.setItem(KEY, value);
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: "cookie_consent", consent: value });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-border bg-card p-5 shadow-lift sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md"
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
        <div>
          <h2 className="text-sm font-bold">Sua privacidade</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Utilizamos cookies para operar o site e medir a audiência, conforme a LGPD. Veja a{" "}
            <a href="/politica-de-cookies" className="font-semibold underline">
              Política de Cookies
            </a>
            .
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" className="flex-1" onClick={() => decide("all")}>
          Aceitar todos
        </Button>
        <Button size="sm" variant="outline" className="flex-1" onClick={() => decide("necessary")}>
          Apenas necessários
        </Button>
      </div>
    </div>
  );
}
