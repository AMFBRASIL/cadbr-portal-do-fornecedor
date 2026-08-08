/**
 * Camada única de eventos de conversão.
 * Empurra para o dataLayer (Google Tag Manager / GA4) e para o Clarity,
 * quando disponíveis. Nunca envia dados pessoais.
 */

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export type ConversionEvent =
  | "card_click"
  | "triagem_iniciada"
  | "triagem_etapa_concluida"
  | "formulario_enviado"
  | "whatsapp_click"
  | "cadbrasil_click"
  | "artigo_click"
  | "triagem_concluida";

export function trackEvent(event: ConversionEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
  window.gtag?.("event", event, payload);
  window.clarity?.("event", event);
}

export const UTM_BASE = {
  utm_source: "portal_licitacoes",
  utm_medium: "referral",
  utm_campaign: "pre_triagem",
} as const;

/** Monta a URL do parceiro com UTMs. Nunca inclui dados pessoais. */
export function buildPartnerUrl(
  baseUrl: string,
  path: string,
  params: Record<string, string | undefined>,
) {
  const url = new URL(path, baseUrl);
  Object.entries({ ...UTM_BASE, ...params }).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}
