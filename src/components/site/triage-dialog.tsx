import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { buildPartnerUrl, trackEvent } from "@/lib/analytics";
import {
  CATEGORIES,
  LEGAL_DISCLAIMER,
  NEED_OPTIONS,
  PROFILE_OPTIONS,
  SITE,
  SITUATION_OPTIONS,
  TIMING_OPTIONS,
  type CategoryId,
} from "@/lib/site";
import { useTriage } from "./triage-context";
import { maskCNPJ, maskPhone } from "@/lib/masks";

interface Answers {
  categoria: CategoryId | null;
  perfil: string;
  situacao: string;
  necessidade: string;
  prazo: string;
  nome: string;
  empresa: string;
  cnpj: string;
  email: string;
  whatsapp: string;
  consentimento: boolean;
}

const EMPTY: Answers = {
  categoria: null,
  perfil: "",
  situacao: "",
  necessidade: "",
  prazo: "",
  nome: "",
  empresa: "",
  cnpj: "",
  email: "",
  whatsapp: "",
  consentimento: false,
};

const QUESTIONS: { key: keyof Answers; label: string; help: string; options: string[] }[] = [
  {
    key: "perfil",
    label: "Qual é o perfil do interessado?",
    help: "Isso ajuda a identificar quais exigências se aplicam ao seu caso.",
    options: PROFILE_OPTIONS,
  },
  {
    key: "situacao",
    label: "Em qual situação a empresa se encontra?",
    help: "Selecione a alternativa mais próxima da realidade atual.",
    options: SITUATION_OPTIONS,
  },
  {
    key: "necessidade",
    label: "Qual é a principal necessidade?",
    help: "Escolha o ponto mais urgente para a sua empresa.",
    options: NEED_OPTIONS,
  },
  {
    key: "prazo",
    label: "Quando deseja começar?",
    help: "O prazo orienta a prioridade do atendimento.",
    options: TIMING_OPTIONS,
  },
];

const TOTAL_STEPS = QUESTIONS.length + 2; // perguntas + dados + resultado

export function TriageDialog() {
  const { open, category, closeTriage } = useTriage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setStep(0);
      setErrors({});
      setAnswers({ ...EMPTY, categoria: category });
      trackEvent("triagem_iniciada", { categoria: category ?? "geral" });
    }
  }, [open, category]);

  const selected = useMemo(
    () => CATEGORIES.find((c) => c.id === answers.categoria) ?? CATEGORIES[0]!,
    [answers.categoria],
  );

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const goNext = (from: string) => {
    trackEvent("triagem_etapa_concluida", { etapa: from });
    setStep((s) => s + 1);
  };

  const validateForm = () => {
    const next: Record<string, string> = {};
    if (answers.nome.trim().length < 2) next["nome"] = "Informe seu nome completo.";
    if (answers.empresa.trim().length < 2) next["empresa"] = "Informe o nome da empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(answers.email.trim()))
      next["email"] = "Informe um e-mail válido.";
    if (answers.whatsapp.replace(/\D/g, "").length < 10)
      next["whatsapp"] = "Informe um WhatsApp com DDD.";
    if (answers.cnpj && answers.cnpj.replace(/\D/g, "").length !== 14)
      next["cnpj"] = "O CNPJ deve ter 14 dígitos.";
    if (!answers.consentimento) next["consentimento"] = "É necessário aceitar para continuar.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validateForm()) return;
    setSending(true);
    try {
      // Integração preparada para webhook/CRM: dados pessoais trafegam no corpo,
      // nunca na URL de saída para o parceiro.
      await fetch("/api/public/triagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, categoria: selected.id }),
      }).catch(() => undefined);
      trackEvent("formulario_enviado", { categoria: selected.id });
      trackEvent("triagem_concluida", { categoria: selected.id, prazo: answers.prazo });
      setStep(TOTAL_STEPS - 1);
    } finally {
      setSending(false);
    }
  };

  const partnerHref = buildPartnerUrl(SITE.partnerUrl, selected.partnerPath, {
    utm_content: selected.id,
    perfil: answers.perfil || undefined,
    necessidade: answers.necessidade || undefined,
  });

  const isQuestionStep = step < QUESTIONS.length;
  const question = QUESTIONS[step];

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? undefined : closeTriage())}>
      <DialogContent className="max-h-[92dvh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-2xl">
        <div className="surface-navy px-6 py-5">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-lg font-semibold text-navy-foreground sm:text-xl">
              Pré-triagem gratuita
            </DialogTitle>
            <DialogDescription className="text-sm text-navy-foreground/75">
              {selected.title} · leva cerca de 2 minutos
            </DialogDescription>
          </DialogHeader>
          <Progress
            value={((step + 1) / TOTAL_STEPS) * 100}
            className="mt-4 h-1.5 bg-navy-foreground/20"
            aria-label={`Etapa ${step + 1} de ${TOTAL_STEPS}`}
          />
        </div>

        <div className="px-6 py-6">
          {isQuestionStep && question && (
            <fieldset>
              <legend className="text-base font-semibold sm:text-lg">{question.label}</legend>
              <p className="mt-1 text-sm text-muted-foreground">{question.help}</p>
              <div className="mt-5 grid gap-2.5">
                {question.options.map((option) => {
                  const active = answers[question.key] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        set(question.key, option as never);
                        window.setTimeout(() => goNext(question.key), 160);
                      }}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                        active
                          ? "border-primary bg-accent text-accent-foreground"
                          : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
                      }`}
                    >
                      {option}
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === QUESTIONS.length && (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-base font-semibold sm:text-lg">
                  Para onde enviamos a sua recomendação?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Seus dados são usados apenas para o atendimento desta solicitação.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="nome"
                  label="Nome"
                  value={answers.nome}
                  error={errors["nome"]}
                  autoComplete="name"
                  onChange={(v) => set("nome", v)}
                />
                <Field
                  id="empresa"
                  label="Empresa"
                  value={answers.empresa}
                  error={errors["empresa"]}
                  autoComplete="organization"
                  onChange={(v) => set("empresa", v)}
                />
                <Field
                  id="cnpj"
                  label="CNPJ (opcional)"
                  value={answers.cnpj}
                  error={errors["cnpj"]}
                  inputMode="numeric"
                  placeholder="00.000.000/0000-00"
                  onChange={(v) => set("cnpj", maskCNPJ(v))}
                />
                <Field
                  id="whatsapp"
                  label="WhatsApp"
                  value={answers.whatsapp}
                  error={errors["whatsapp"]}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(11) 90000-0000"
                  onChange={(v) => set("whatsapp", maskPhone(v))}
                />
                <div className="sm:col-span-2">
                  <Field
                    id="email"
                    label="E-mail"
                    type="email"
                    value={answers.email}
                    error={errors["email"]}
                    autoComplete="email"
                    placeholder="voce@empresa.com.br"
                    onChange={(v) => set("email", v)}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-secondary/60 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consentimento"
                    checked={answers.consentimento}
                    onCheckedChange={(v) => set("consentimento", v === true)}
                    aria-describedby="consentimento-erro"
                  />
                  <Label htmlFor="consentimento" className="text-sm leading-relaxed font-normal">
                    Autorizo o contato sobre esta solicitação e declaro estar ciente da{" "}
                    <a href="/politica-de-privacidade" className="font-semibold underline">
                      Política de Privacidade
                    </a>
                    , conforme a LGPD.
                  </Label>
                </div>
                {errors["consentimento"] && (
                  <p id="consentimento-erro" role="alert" className="mt-2 text-sm text-destructive">
                    {errors["consentimento"]}
                  </p>
                )}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {LEGAL_DISCLAIMER}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
                  <ArrowLeft className="size-4" aria-hidden /> Voltar
                </Button>
                <Button type="submit" size="lg" className="flex-1" disabled={sending}>
                  {sending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden /> Enviando…
                    </>
                  ) : (
                    <>Ver minha recomendação</>
                  )}
                </Button>
              </div>
            </form>
          )}

          {step === TOTAL_STEPS - 1 && (
            <div className="space-y-5">
              <div className="flex items-start gap-3 rounded-xl border border-success/30 bg-success-soft p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                <p className="text-sm font-medium">
                  Com base nas suas respostas, encontramos o caminho mais indicado para sua empresa.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-5">
                <p className="eyebrow">Necessidade identificada</p>
                <h3 className="mt-3 text-lg font-semibold">{selected.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{selected.recommendation}</p>
                <ul className="mt-4 space-y-2">
                  {selected.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
                <dl className="mt-5 grid gap-2 border-t border-border pt-4 text-sm sm:grid-cols-2">
                  <Summary label="Perfil" value={answers.perfil} />
                  <Summary label="Situação" value={answers.situacao} />
                  <Summary label="Necessidade" value={answers.necessidade} />
                  <Summary label="Prazo" value={answers.prazo} />
                </dl>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full bg-success text-success-foreground hover:bg-success/90"
              >
                <a
                  href={partnerHref}
                  target="_blank"
                  rel="noopener"
                  onClick={() => {
                    trackEvent("cadbrasil_click", { categoria: selected.id });
                    toast.success("Encaminhando para o atendimento especializado.");
                  }}
                >
                  Continuar com atendimento especializado
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
                Atendimento especializado prestado pela {SITE.partnerName}, empresa parceira. Serviço
                privado e opcional.
              </p>
            </div>
          )}

          {isQuestionStep && step > 0 && (
            <Button
              type="button"
              variant="ghost"
              className="mt-4"
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeft className="size-4" aria-hidden /> Voltar
            </Button>
          )}

          {step === 0 && (
            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-gold" aria-hidden /> Gratuito, sem compromisso e
              sem consulta a sistemas oficiais.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  type?: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "tel";
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-erro` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-erro`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
