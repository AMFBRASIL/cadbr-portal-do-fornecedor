import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  categoria: z.string().min(1).max(60),
  perfil: z.string().max(80).optional(),
  situacao: z.string().max(120).optional(),
  necessidade: z.string().max(80).optional(),
  prazo: z.string().max(60).optional(),
  nome: z.string().trim().min(2).max(120),
  empresa: z.string().trim().min(2).max(160),
  cnpj: z.string().trim().max(20).optional(),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().min(10).max(25),
  consentimento: z.literal(true),
});

/**
 * Recebe os dados da pré-triagem e repassa para o webhook/CRM configurado.
 * Dados pessoais trafegam apenas no corpo da requisição.
 */
export const Route = createFileRoute("/api/public/triagem")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "JSON inválido" }, { status: 400 });
        }

        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Dados inválidos" }, { status: 400 });
        }

        const webhook = process.env["TRIAGEM_WEBHOOK_URL"];
        if (webhook) {
          try {
            await fetch(webhook, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...parsed.data, recebidoEm: new Date().toISOString() }),
            });
          } catch {
            return Response.json({ ok: false, error: "Falha no encaminhamento" }, { status: 502 });
          }
        }

        return Response.json({ ok: true });
      },
    },
  },
});
