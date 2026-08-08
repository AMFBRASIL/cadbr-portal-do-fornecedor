export const SITE = {
  name: "CAD | BRASIL",
  fullName: "CAD | BRASIL — Portal de Orientação em Licitações",
  tagline: "Portal independente de orientação sobre licitações, SICAF e Compras.gov.br",
  partnerName: "CADBRASIL",
  partnerUrl: "https://www.cadbrasil.com.br",
  whatsapp: "https://wa.me/551121220202",
  whatsappDisplay: "(11) 2122-0202",
  email: "contato@cadbrasil.com.br",
} as const;

export const LEGAL_DISCLAIMER =
  "Este é um portal privado e independente de orientação empresarial. Não somos um órgão governamental e não representamos o Governo Federal, o SICAF ou o Compras.gov.br. Os serviços de assessoria são privados e opcionais. O acesso aos sistemas oficiais deve ser realizado pelos canais governamentais competentes.";

export type CategoryId =
  | "comecar"
  | "cadastro-sicaf"
  | "renovacao"
  | "documentacao"
  | "oportunidades"
  | "pendencias";

export interface TriageCategory {
  id: CategoryId;
  icon: string;
  title: string;
  description: string;
  cta: string;
  /** caminho do serviço correspondente no parceiro */
  partnerPath: string;
  recommendation: string;
  steps: string[];
}

export const CATEGORIES: TriageCategory[] = [
  {
    id: "comecar",
    icon: "Rocket",
    title: "Quero participar de licitações",
    description:
      "Minha empresa ainda não vende para órgãos públicos e preciso entender como começar.",
    cta: "Quero começar",
    partnerPath: "/licitacoes",
    recommendation:
      "Sua empresa precisa de um diagnóstico inicial: verificação de CNAEs, situação cadastral, documentos básicos e preparação do cadastro de fornecedor.",
    steps: [
      "Diagnóstico da situação atual da empresa",
      "Verificação de CNAEs e enquadramento",
      "Preparação do cadastro de fornecedor",
      "Primeiras buscas por oportunidades compatíveis",
    ],
  },
  {
    id: "cadastro-sicaf",
    icon: "ClipboardCheck",
    title: "Preciso cadastrar minha empresa no SICAF",
    description:
      "Quero preparar e cadastrar minha empresa para participar de contratações públicas.",
    cta: "Fazer cadastro",
    partnerPath: "/cadastro-sicaf",
    recommendation:
      "O caminho indicado é a preparação documental completa seguida do cadastramento do fornecedor, com conferência de níveis e regularidade.",
    steps: [
      "Conferência de documentos e certidões",
      "Organização dos dados cadastrais",
      "Cadastramento do fornecedor",
      "Validação dos níveis de habilitação",
    ],
  },
  {
    id: "renovacao",
    icon: "RefreshCw",
    title: "Meu SICAF está vencido ou desatualizado",
    description:
      "Preciso atualizar certidões, documentos, balanço ou informações da minha empresa.",
    cta: "Regularizar cadastro",
    partnerPath: "/renovacao-sicaf",
    recommendation:
      "A prioridade é a atualização das certidões vencidas e dos dados econômico-financeiros para restabelecer a regularidade do cadastro.",
    steps: [
      "Levantamento do que está vencido",
      "Emissão e atualização de certidões",
      "Atualização de dados e demonstrações contábeis",
      "Conferência final do cadastro",
    ],
  },
  {
    id: "documentacao",
    icon: "FileStack",
    title: "Tenho dúvidas sobre os documentos",
    description:
      "Quero saber quais documentos e certidões são necessários para manter minha empresa regular.",
    cta: "Consultar documentação",
    partnerPath: "/documentacao",
    recommendation:
      "O indicado é uma orientação documental: checklist por porte da empresa, prazos de validade e rotina de acompanhamento.",
    steps: [
      "Checklist personalizado por porte e segmento",
      "Mapeamento de validade das certidões",
      "Organização do dossiê da empresa",
      "Rotina de acompanhamento periódico",
    ],
  },
  {
    id: "oportunidades",
    icon: "Search",
    title: "Quero encontrar licitações",
    description:
      "Estou procurando oportunidades compatíveis com os produtos ou serviços da minha empresa.",
    cta: "Encontrar oportunidades",
    partnerPath: "/oportunidades",
    recommendation:
      "Sua empresa se beneficia de um trabalho de busca e triagem de oportunidades por segmento, região e modalidade de contratação.",
    steps: [
      "Definição de palavras-chave e CNAEs",
      "Monitoramento de portais de compras",
      "Triagem de editais compatíveis",
      "Análise preliminar de exigências",
    ],
  },
  {
    id: "pendencias",
    icon: "ShieldAlert",
    title: "Estou com problemas no SICAF ou Compras.gov.br",
    description: "Meu cadastro apresenta pendências, erros, bloqueios ou dificuldades de acesso.",
    cta: "Resolver pendências",
    partnerPath: "/suporte",
    recommendation:
      "O caminho indicado é o diagnóstico das pendências apontadas no sistema e a correção ponto a ponto até a normalização do cadastro.",
    steps: [
      "Identificação das pendências apontadas",
      "Correção de dados e documentos",
      "Ajuste de acessos e perfis",
      "Reconferência da situação cadastral",
    ],
  },
];

export const SEGMENTS = [
  "Tecnologia",
  "Construção e engenharia",
  "Alimentos",
  "Limpeza",
  "Segurança",
  "Materiais de escritório",
  "Equipamentos",
  "Transporte",
  "Consultoria",
  "Saúde",
  "Manutenção",
  "Serviços especializados",
];

export const HOW_IT_WORKS = [
  {
    title: "Entenda a situação da sua empresa",
    text: "Identifique o que já está regular e o que ainda precisa ser preparado antes de licitar.",
  },
  {
    title: "Organize seus documentos e certidões",
    text: "Reúna documentos societários, fiscais, trabalhistas e contábeis com validade em dia.",
  },
  {
    title: "Regularize o cadastro do fornecedor",
    text: "Deixe o cadastro completo e atualizado, com os níveis de habilitação adequados.",
  },
  {
    title: "Encontre oportunidades e participe",
    text: "Monitore contratações compatíveis com o seu segmento e analise cada edital com atenção.",
  },
];

export const DIFFERENTIALS = [
  {
    icon: "Compass",
    title: "Pré-triagem personalizada",
    text: "Um roteiro de perguntas curtas que identifica exatamente em que ponto da jornada sua empresa está.",
  },
  {
    icon: "ListChecks",
    title: "Organização das próximas etapas",
    text: "Você recebe uma sequência clara do que fazer primeiro, sem termos técnicos desnecessários.",
  },
  {
    icon: "FileCheck2",
    title: "Orientação sobre documentos",
    text: "Explicação objetiva sobre os documentos e certidões normalmente exigidos em contratações públicas.",
  },
  {
    icon: "Headset",
    title: "Encaminhamento especializado",
    text: `Quando é necessário apoio operacional, encaminhamos para o atendimento especializado da ${SITE.partnerName}.`,
  },
];

export const FAQ = [
  {
    q: "Minha empresa pode participar de licitações?",
    a: "Em regra, empresas regularmente constituídas e com documentação em dia podem participar de contratações públicas. Cada edital define exigências próprias de habilitação jurídica, fiscal, trabalhista, técnica e econômico-financeira, e é nele que você confirma se a sua empresa atende aos requisitos daquela contratação.",
  },
  {
    q: "MEI pode vender para o governo?",
    a: "Sim. O Microempreendedor Individual pode participar de contratações públicas compatíveis com a sua atividade e com o seu limite de faturamento. MEIs e microempresas contam com tratamento diferenciado previsto na Lei Complementar nº 123/2006, como preferência em caso de empate e prazo para regularização fiscal.",
  },
  {
    q: "Preciso ter SICAF para participar?",
    a: "O SICAF é utilizado no cadastramento e na habilitação de fornecedores em contratações do governo federal e em muitos processos conduzidos pelo Compras.gov.br. Estados e municípios podem usar sistemas próprios. Sempre verifique no edital qual cadastro é exigido.",
  },
  {
    q: "Quais documentos são normalmente exigidos?",
    a: "Costumam ser solicitados atos constitutivos, documentos dos sócios, inscrições fiscais, certidões de regularidade federal, estadual, municipal, FGTS e trabalhista, além de demonstrações contábeis e, em alguns casos, atestados de capacidade técnica.",
  },
  {
    q: "Como saber se meu SICAF está regular?",
    a: "A consulta é feita nos canais oficiais do governo, onde é possível visualizar os níveis de cadastramento e eventuais pendências. Certidões vencidas e dados desatualizados são as causas mais comuns de irregularidade.",
  },
  {
    q: "Posso participar de licitações em outros estados?",
    a: "Sim. Não há impedimento geral para participar de contratações em outras unidades da federação, desde que a empresa atenda às exigências do edital, inclusive quanto a prazos de entrega, execução e eventuais cadastros locais.",
  },
  {
    q: "Como encontrar oportunidades para meu segmento?",
    a: "O caminho usual é definir palavras-chave e códigos de itens ligados aos seus produtos ou serviços e monitorar os portais de compras públicas com essa filtragem, avaliando a compatibilidade de cada edital com a sua capacidade de entrega.",
  },
  {
    q: "O portal realiza o cadastro diretamente no sistema do governo?",
    a: "Este portal é informativo e realiza a pré-triagem. Serviços operacionais são executados de forma privada pelo atendimento especializado parceiro, sempre com autorização da empresa. O acesso aos sistemas oficiais é feito pelos canais governamentais competentes.",
  },
  {
    q: "Existe garantia de vitória em uma licitação?",
    a: "Nenhuma assessoria pode garantir que uma empresa vencerá uma licitação. O resultado depende das regras do edital, da documentação, da proposta apresentada e da concorrência.",
  },
  {
    q: "Como funciona o atendimento especializado?",
    a: `Após a pré-triagem, você recebe um resumo da sua situação e é encaminhado ao atendimento especializado da ${SITE.partnerName}, que avalia o caso e apresenta as opções de serviço privado e opcional.`,
  },
];

export const PROFILE_OPTIONS = [
  "MEI",
  "Microempresa",
  "Empresa de pequeno porte",
  "Empresa de médio ou grande porte",
  "Profissional autônomo",
  "Pessoa física",
];

export const SITUATION_OPTIONS = [
  "Nunca participou de licitações",
  "Já possui SICAF",
  "SICAF vencido ou incompleto",
  "Já participa e quer encontrar oportunidades",
  "Está com problemas no Compras.gov.br",
  "Não sabe informar",
];

export const NEED_OPTIONS = [
  "Cadastro",
  "Renovação",
  "Documentação",
  "Certidões",
  "Busca de licitações",
  "Análise de edital",
  "Suporte especializado",
];

export const TIMING_OPTIONS = ["Imediatamente", "Nos próximos dias", "Estou apenas pesquisando"];
