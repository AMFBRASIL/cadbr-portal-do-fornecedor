import type { CategoryId } from "./site";

export interface ArticleBlock {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  h1: string;
  description: string;
  topic: string;
  intro: string;
  blocks: ArticleBlock[];
  faq: { q: string; a: string }[];
  related: string[];
  ctaCategory: CategoryId;
  ctaText: string;
  datePublished?: string;
  dateModified?: string;
  sources?: { label: string; url: string }[];
}

export const ARTICLE_DEFAULT_DATES = {
  datePublished: "2025-06-01",
  dateModified: "2026-03-15",
} as const;

const OFICIAL = [
  { label: "Compras.gov.br — portal oficial de compras públicas", url: "https://www.gov.br/compras" },
  { label: "Lei nº 14.133/2021 — Lei de Licitações e Contratos", url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm" },
];

export const ARTICLES: Article[] = [
  {
    slug: "como-participar-de-licitacao-publica",
    title: "Como Participar de uma Licitação Pública: Guia Prático",
    h1: "Como participar de uma licitação pública",
    description:
      "Passo a passo para entender modalidades, habilitação, proposta e disputa em licitações públicas, com checklist de preparação da empresa.",
    topic: "Primeiros passos",
    intro:
      "Participar de uma licitação é, na prática, atender a um conjunto de exigências previstas em edital e apresentar uma proposta competitiva dentro do prazo. Este guia organiza o processo em etapas para que a sua empresa saiba exatamente o que preparar antes de disputar a primeira contratação.",
    blocks: [
      {
        heading: "1. Verifique se a empresa está apta a licitar",
        paragraphs: [
          "Antes de olhar editais, confirme o básico: CNPJ ativo, atividade econômica (CNAE) compatível com o objeto que pretende fornecer, contrato social atualizado e certidões de regularidade válidas. É comum uma empresa perder a disputa não pelo preço, mas por uma certidão vencida no dia da sessão.",
        ],
        list: [
          "Situação cadastral do CNPJ regular",
          "CNAE compatível com o produto ou serviço",
          "Contrato social ou requerimento de empresário atualizado",
          "Certidões federal, estadual, municipal, FGTS e trabalhista válidas",
        ],
      },
      {
        heading: "2. Faça o cadastro de fornecedor",
        paragraphs: [
          "Nas contratações federais, o cadastro de fornecedores é feito no SICAF, integrado ao Compras.gov.br. Estados e municípios podem manter cadastros próprios. O cadastro é o que permite que o órgão verifique automaticamente a sua regularidade durante a habilitação.",
        ],
      },
      {
        heading: "3. Encontre oportunidades compatíveis",
        paragraphs: [
          "Defina palavras-chave ligadas aos seus produtos e serviços e monitore os portais de compras. Avalie sempre três pontos antes de investir tempo em um edital: se você consegue entregar no prazo, se consegue atender às exigências técnicas e se o preço de referência é viável para a sua operação.",
        ],
      },
      {
        heading: "4. Leia o edital com atenção",
        paragraphs: [
          "O edital é a regra do jogo. Nele estão o objeto, os documentos de habilitação, o modelo de proposta, os prazos, as condições de pagamento, as penalidades e os critérios de julgamento. Se algo estiver obscuro, existe prazo formal para pedir esclarecimento ou apresentar impugnação.",
        ],
        list: [
          "Objeto e quantidades",
          "Critério de julgamento (menor preço, técnica e preço, maior desconto)",
          "Documentos de habilitação exigidos",
          "Prazos de entrega e execução",
          "Sanções e condições de pagamento",
        ],
      },
      {
        heading: "5. Envie a proposta e participe da disputa",
        paragraphs: [
          "No pregão eletrônico, propostas são cadastradas no sistema e a disputa acontece por lances. Depois vem a fase de habilitação, em que o pregoeiro confere a documentação da empresa mais bem classificada. Vencidas essas etapas, ocorre a adjudicação e a homologação.",
          "Exemplo prático: uma empresa de materiais de limpeza que fornece a um município cadastra a proposta com preço unitário por item, participa dos lances e, ao ser convocada, envia amostras e catálogos exigidos no termo de referência.",
        ],
      },
    ],
    faq: [
      {
        q: "Quanto tempo leva para uma empresa começar a licitar?",
        a: "Depende da situação documental. Empresas com documentação regular costumam concluir a preparação e o cadastro em poucos dias; empresas com certidões vencidas ou dados desatualizados precisam primeiro regularizar essas pendências.",
      },
      {
        q: "Preciso de advogado para participar?",
        a: "Não há exigência geral de representação por advogado para participar. Apoio jurídico pode ser útil em impugnações, recursos e análise de contratos mais complexos.",
      },
    ],
    related: [
      "o-que-e-sicaf",
      "como-encontrar-licitacoes",
      "o-que-analisar-antes-de-participar-de-um-edital",
    ],
    ctaCategory: "comecar",
    ctaText: "Quero entender o que minha empresa precisa para começar",
    sources: OFICIAL,
  },
  {
    slug: "como-comecar-a-vender-para-o-governo",
    title: "Como Uma Empresa Começa a Vender para o Governo",
    h1: "Como uma empresa começa a vender para o governo",
    description:
      "Entenda o caminho completo para transformar sua empresa em fornecedora de órgãos públicos, do diagnóstico inicial ao primeiro contrato.",
    topic: "Primeiros passos",
    intro:
      "Vender para o governo é uma decisão comercial: exige preparo documental, disciplina de prazos e capacidade de entrega. A boa notícia é que o caminho é padronizado e pode ser percorrido por empresas de qualquer porte, inclusive MEIs.",
    blocks: [
      {
        heading: "Diagnóstico: onde a sua empresa está hoje",
        paragraphs: [
          "O primeiro passo não é procurar edital, é olhar para dentro. Verifique regularidade fiscal, capacidade produtiva, formação de preço e experiência anterior comprovável. Esse retrato define se o foco inicial deve ser regularização, cadastro ou prospecção.",
        ],
      },
      {
        heading: "Estruture a formação de preço",
        paragraphs: [
          "Contratos públicos costumam ter prazos de pagamento definidos e exigências de entrega específicas. Inclua no cálculo tributos, logística, custo financeiro do prazo de recebimento e eventuais garantias contratuais. Preço baixo sem margem é a principal causa de prejuízo em contratos públicos.",
        ],
      },
      {
        heading: "Cadastro de fornecedor e habilitação",
        paragraphs: [
          "Com a casa organizada, faça o cadastro de fornecedor e mantenha os níveis de habilitação atualizados. É esse cadastro que sustenta a sua participação de forma recorrente, sem retrabalho a cada disputa.",
        ],
      },
      {
        heading: "Comece por contratações compatíveis com o seu porte",
        paragraphs: [
          "Empresas iniciantes tendem a ter melhor resultado em contratações menores, com objeto simples e entrega próxima da sua base. Depois de acumular atestados de capacidade técnica, fica mais fácil disputar contratos maiores.",
        ],
        list: [
          "Comece por órgãos da sua região",
          "Prefira objetos que você já vende no mercado privado",
          "Guarde notas e atestados de cada entrega",
          "Acompanhe o histórico de preços praticados",
        ],
      },
    ],
    faq: [
      {
        q: "Preciso de estrutura grande para fornecer ao setor público?",
        a: "Não necessariamente. O que importa é atender às exigências do edital e ter capacidade de entrega para o objeto disputado. Existem contratações de pequeno valor compatíveis com empresas iniciantes.",
      },
      {
        q: "Órgãos públicos pagam com atraso?",
        a: "Os prazos de pagamento constam do edital e do contrato. É prudente considerar o prazo previsto no seu fluxo de caixa ao formar o preço.",
      },
    ],
    related: [
      "como-participar-de-licitacao-publica",
      "mei-pode-participar-de-licitacao",
      "como-encontrar-licitacoes",
    ],
    ctaCategory: "comecar",
    ctaText: "Fazer a pré-triagem da minha empresa",
  },
  {
    slug: "o-que-e-sicaf",
    title: "O Que é o SICAF e Para Que Serve no Cadastro de Fornecedores",
    h1: "O que é o SICAF e para que serve",
    description:
      "Entenda o que é o SICAF, como funciona o cadastro no SICAF para habilitação de fornecedores e a relação com o Compras.gov.br.",
    topic: "SICAF",
    datePublished: "2025-06-01",
    dateModified: "2026-03-15",
    intro:
      "O SICAF é o sistema oficial utilizado no processo de cadastramento e habilitação de fornecedores em contratações públicas federais. Ele funciona como um cadastro central em que ficam registrados os dados da empresa, a documentação e a situação de regularidade. Se você busca fazer o cadastro no SICAF, este guia explica o papel do sistema na prática.",
    blocks: [
      {
        heading: "Para que o cadastro serve na prática",
        paragraphs: [
          "Durante uma contratação, o órgão consulta o cadastro do fornecedor para verificar regularidade jurídica, fiscal, trabalhista e, conforme o caso, econômico-financeira e técnica. Um cadastro completo e atualizado reduz a chance de inabilitação por documentação.",
        ],
      },
      {
        heading: "Níveis de cadastramento",
        paragraphs: [
          "O cadastro é organizado em níveis que agrupam tipos diferentes de informação, como credenciamento, habilitação jurídica, regularidade fiscal e trabalhista, qualificação econômico-financeira e qualificação técnica. As exigências aplicáveis variam conforme o objeto da contratação.",
        ],
      },
      {
        heading: "Relação com o Compras.gov.br",
        paragraphs: [
          "O Compras.gov.br é o ambiente onde as contratações acontecem: divulgação, propostas, disputa e comunicação com o órgão. O cadastro de fornecedor é o que sustenta a habilitação dentro desse ambiente.",
        ],
      },
      {
        heading: "Cuidados com validade",
        paragraphs: [
          "Certidões têm prazo. Um cadastro que estava regular há dois meses pode estar irregular hoje. Estabeleça uma rotina de conferência mensal, especialmente se a empresa participa de disputas com frequência.",
        ],
      },
    ],
    faq: [
      {
        q: "O cadastro tem custo governamental?",
        a: "O cadastramento é feito nos canais oficiais do governo. Serviços de assessoria para preparação e acompanhamento são privados e opcionais.",
      },
      {
        q: "Estados e municípios usam o mesmo sistema?",
        a: "Nem sempre. Muitos entes utilizam o sistema federal, mas outros mantêm cadastros próprios. Confira o edital de cada contratação.",
      },
    ],
    related: [
      "documentos-exigidos-no-sicaf",
      "como-renovar-o-sicaf",
      "como-funciona-o-compras-gov-br",
    ],
    ctaCategory: "cadastro-sicaf",
    ctaText: "Preciso de ajuda com o cadastro no SICAF",
    sources: OFICIAL,
  },
  {
    slug: "documentos-exigidos-no-sicaf",
    title: "Documentos Exigidos no Cadastro no SICAF",
    h1: "Quais documentos são exigidos no SICAF",
    description:
      "Checklist dos documentos e certidões normalmente solicitados no cadastro no SICAF, organizados por tipo de habilitação.",
    topic: "Documentação",
    datePublished: "2025-06-15",
    dateModified: "2026-03-15",
    intro:
      "A lista exata varia conforme o porte da empresa, a natureza jurídica e o objeto que ela pretende fornecer. Ainda assim, existe um conjunto de documentos que aparece na maioria dos cadastros no SICAF e nas contratações públicas.",
    blocks: [
      {
        heading: "Habilitação jurídica",
        list: [
          "Contrato social, estatuto ou requerimento de empresário, com alterações",
          "Documentos de identificação dos sócios ou representantes",
          "Comprovante de inscrição no CNPJ",
          "Procuração, quando houver representante",
        ],
      },
      {
        heading: "Regularidade fiscal e trabalhista",
        list: [
          "Certidão de débitos relativos a tributos federais e à dívida ativa da União",
          "Certidão de regularidade estadual e/ou municipal, conforme a atividade",
          "Certificado de regularidade do FGTS",
          "Certidão negativa de débitos trabalhistas",
        ],
      },
      {
        heading: "Qualificação econômico-financeira",
        paragraphs: [
          "Costuma envolver demonstrações contábeis do último exercício e certidão negativa de falência ou recuperação judicial. Alguns editais calculam índices contábeis mínimos a partir do balanço.",
        ],
      },
      {
        heading: "Qualificação técnica",
        paragraphs: [
          "Quando exigida, é comprovada por atestados de capacidade técnica emitidos por clientes, registros em conselhos profissionais e, em alguns casos, licenças específicas da atividade.",
        ],
      },
    ],
    faq: [
      {
        q: "MEI precisa apresentar balanço?",
        a: "O tratamento contábil do MEI é simplificado, e os editais costumam adaptar as exigências econômico-financeiras. Verifique o que o edital específico exige.",
      },
      {
        q: "Documento vencido invalida a participação?",
        a: "Pode levar à inabilitação. Microempresas e empresas de pequeno porte têm prazo legal para regularização fiscal em determinadas situações, conforme a Lei Complementar nº 123/2006.",
      },
    ],
    related: ["o-que-e-sicaf", "como-emitir-e-acompanhar-certidoes", "como-renovar-o-sicaf"],
    ctaCategory: "documentacao",
    ctaText: "Quero orientação sobre a minha documentação",
  },
  {
    slug: "como-renovar-o-sicaf",
    title: "Como Atualizar ou Renovar o Cadastro no SICAF",
    h1: "Como atualizar ou renovar o SICAF",
    description:
      "O que fazer quando o cadastro no SICAF está vencido, incompleto ou desatualizado, e como evitar novas irregularidades.",
    topic: "SICAF",
    datePublished: "2025-07-01",
    dateModified: "2026-03-15",
    intro:
      "Não existe uma renovação única e anual: o cadastro no SICAF fica regular enquanto os documentos que o compõem estiverem válidos. Atualizar significa substituir o que venceu e corrigir o que mudou na empresa.",
    blocks: [
      {
        heading: "Levante o que está vencido",
        paragraphs: [
          "Consulte a situação do cadastro nos canais oficiais e anote cada pendência por nível. Normalmente o problema se concentra em duas ou três certidões e nas demonstrações contábeis do exercício anterior.",
        ],
      },
      {
        heading: "Atualize documentos societários e cadastrais",
        paragraphs: [
          "Mudanças de endereço, de quadro societário, de capital social ou de atividade precisam ser refletidas no cadastro. Divergência entre o cadastro e o CNPJ é motivo frequente de questionamento na habilitação.",
        ],
      },
      {
        heading: "Renove certidões antes do vencimento",
        list: [
          "Monitore a data de validade de cada certidão",
          "Programe a emissão com antecedência de 15 a 30 dias",
          "Guarde os arquivos em uma pasta única e datada",
        ],
      },
      {
        heading: "Confira o resultado",
        paragraphs: [
          "Depois de atualizar, reconsulte o cadastro e confirme que os níveis aparecem regulares. Só assim você evita descobrir uma pendência no meio de uma sessão de disputa.",
        ],
      },
    ],
    faq: [
      {
        q: "Perdi prazos e o cadastro ficou irregular. Perco o histórico?",
        a: "A irregularidade impede a habilitação enquanto durar, mas o cadastro pode ser regularizado com a atualização dos documentos pendentes.",
      },
      {
        q: "Com que frequência devo revisar?",
        a: "Uma conferência mensal é suficiente para a maioria das empresas; quem participa de disputas semanais costuma revisar antes de cada envio de proposta.",
      },
    ],
    related: ["documentos-exigidos-no-sicaf", "principais-pendencias-que-impedem-de-licitar", "o-que-e-sicaf"],
    ctaCategory: "renovacao",
    ctaText: "Quero regularizar meu cadastro",
  },
  {
    slug: "como-funciona-o-compras-gov-br",
    title: "Como Funciona o Compras.gov.br",
    h1: "Como funciona o Compras.gov.br",
    description:
      "Visão geral do portal de compras do governo federal: divulgação de contratações, envio de propostas, disputa e comunicação com o órgão.",
    topic: "Compras.gov.br",
    intro:
      "O Compras.gov.br concentra grande parte das contratações do governo federal e é também utilizado por outros entes. É nele que fornecedores acompanham avisos, enviam propostas e participam das sessões públicas.",
    blocks: [
      {
        heading: "O que você faz dentro do portal",
        list: [
          "Consultar contratações abertas e seus documentos",
          "Enviar propostas dentro do prazo do edital",
          "Participar da fase de lances em pregões eletrônicos",
          "Enviar documentos de habilitação quando convocado",
          "Interagir com o pregoeiro por meio do chat da sessão",
        ],
      },
      {
        heading: "Acesso e perfis",
        paragraphs: [
          "O acesso é vinculado ao cadastro do fornecedor e às pessoas autorizadas a representá-lo. Problemas de acesso costumam vir de vínculos desatualizados entre representante e empresa, ou de dados divergentes do cadastro.",
        ],
      },
      {
        heading: "Boas práticas na sessão pública",
        paragraphs: [
          "Entre no sistema com antecedência, tenha o edital aberto, acompanhe o chat e mantenha a documentação pronta para envio imediato. Perder um prazo de convocação no meio da sessão significa, na prática, perder a disputa.",
        ],
      },
    ],
    faq: [
      {
        q: "Preciso pagar para acessar o portal?",
        a: "O acesso aos sistemas oficiais é feito pelos canais governamentais competentes. Serviços de apoio e acompanhamento são privados e opcionais.",
      },
      {
        q: "Estados e municípios publicam no mesmo lugar?",
        a: "Parte das contratações é divulgada em portais próprios e no Portal Nacional de Contratações Públicas. Vale monitorar mais de uma fonte conforme a sua região de atuação.",
      },
    ],
    related: ["o-que-e-sicaf", "como-encontrar-licitacoes", "principais-pendencias-que-impedem-de-licitar"],
    ctaCategory: "pendencias",
    ctaText: "Estou com dificuldade de acesso e preciso de suporte",
    sources: OFICIAL,
  },
  {
    slug: "como-encontrar-licitacoes",
    title: "Como Encontrar Licitações para a Sua Empresa",
    h1: "Como encontrar licitações para a sua empresa",
    description:
      "Método prático para localizar oportunidades compatíveis com o seu segmento, filtrar editais e priorizar o que realmente vale disputar.",
    topic: "Oportunidades",
    intro:
      "Encontrar licitação não é procurar tudo, é procurar bem. A diferença entre uma empresa que ganha contratos e outra que só consome tempo costuma estar na qualidade da triagem.",
    blocks: [
      {
        heading: "Monte o seu vocabulário de busca",
        paragraphs: [
          "Liste os termos que descrevem os seus produtos e serviços, incluindo sinônimos usados no setor público. Uma empresa de informática, por exemplo, deve buscar por 'notebook', 'microcomputador', 'estação de trabalho' e códigos de itens correspondentes.",
        ],
      },
      {
        heading: "Defina filtros de viabilidade",
        list: [
          "Região de entrega compatível com a sua logística",
          "Valor estimado dentro da sua capacidade financeira",
          "Exigências técnicas que você comprova hoje",
          "Prazo de entrega executável",
        ],
      },
      {
        heading: "Crie uma rotina de monitoramento",
        paragraphs: [
          "Reserve um horário fixo diário para revisar os avisos novos. Oportunidades têm prazo curto, e a maioria das perdas acontece por atraso na leitura, não por falta de competitividade.",
        ],
      },
      {
        heading: "Priorize com um critério simples",
        paragraphs: [
          "Classifique cada edital como alta, média ou baixa aderência e trabalhe primeiro os de alta. É preferível disputar bem cinco contratações por mês do que cadastrar propostas apressadas em vinte.",
        ],
      },
    ],
    faq: [
      {
        q: "Existe um único lugar que reúne todas as licitações?",
        a: "Há portais que centralizam boa parte das publicações, mas entes podem divulgar em canais próprios. O ideal é monitorar as fontes relevantes para a sua região e segmento.",
      },
      {
        q: "Vale a pena disputar fora do meu estado?",
        a: "Vale quando o custo logístico e o prazo de entrega cabem na sua operação. Simule o frete antes de decidir.",
      },
    ],
    related: ["o-que-analisar-antes-de-participar-de-um-edital", "como-comecar-a-vender-para-o-governo", "diferenca-entre-credenciamento-pregao-e-concorrencia"],
    ctaCategory: "oportunidades",
    ctaText: "Quero ajuda para encontrar oportunidades",
  },
  {
    slug: "o-que-analisar-antes-de-participar-de-um-edital",
    title: "O Que Analisar Antes de Participar de um Edital",
    h1: "O que analisar antes de participar de um edital",
    description:
      "Checklist de leitura de edital: objeto, habilitação, prazos, penalidades, critério de julgamento e riscos de execução.",
    topic: "Editais",
    intro:
      "Ler edital é uma habilidade comercial. Em vinte minutos de leitura estruturada é possível decidir se aquela contratação faz sentido para a sua empresa e o que precisa ser providenciado.",
    blocks: [
      {
        heading: "Comece pelo objeto e pelo termo de referência",
        paragraphs: [
          "O termo de referência descreve o que será entregue, em qual especificação, quantidade, prazo e local. Se a especificação não corresponde ao que você fornece, não há proposta viável — e existe prazo para pedir esclarecimento ou impugnar exigências indevidas.",
        ],
      },
      {
        heading: "Confira a habilitação exigida",
        paragraphs: [
          "Compare a lista do edital com o que a sua empresa tem hoje. Atestado de capacidade técnica e índices contábeis são as exigências que mais surpreendem quem está começando.",
        ],
      },
      {
        heading: "Avalie prazos, penalidades e pagamento",
        list: [
          "Prazo de entrega ou execução e possibilidade de prorrogação",
          "Multas e sanções previstas",
          "Condições e prazo de pagamento",
          "Necessidade de garantia contratual",
        ],
      },
      {
        heading: "Simule o preço antes de dar lance",
        paragraphs: [
          "Defina previamente o seu preço-limite e não ultrapasse esse teto na disputa. Lance emocional é a origem mais comum de contrato deficitário.",
        ],
      },
    ],
    faq: [
      {
        q: "Posso questionar uma exigência do edital?",
        a: "Sim. Os editais preveem prazos para pedidos de esclarecimento e impugnação antes da sessão.",
      },
      {
        q: "E se eu vencer e não conseguir entregar?",
        a: "A inexecução pode gerar sanções administrativas previstas no edital e na legislação. Por isso a análise de viabilidade deve vir antes da proposta.",
      },
    ],
    related: ["como-participar-de-licitacao-publica", "diferenca-entre-credenciamento-pregao-e-concorrencia", "como-encontrar-licitacoes"],
    ctaCategory: "oportunidades",
    ctaText: "Quero apoio na análise de editais",
    sources: OFICIAL,
  },
  {
    slug: "principais-pendencias-que-impedem-de-licitar",
    title: "Principais Pendências Que Impedem uma Empresa de Licitar",
    h1: "Principais pendências que impedem uma empresa de licitar",
    description:
      "As irregularidades mais comuns em cadastros de fornecedores e como corrigir cada uma delas antes da próxima disputa.",
    topic: "Pendências",
    intro:
      "A maior parte das inabilitações não tem relação com preço nem com qualidade técnica: são falhas cadastrais evitáveis. Conhecer as mais frequentes economiza contratos.",
    blocks: [
      {
        heading: "Certidões vencidas",
        paragraphs: [
          "É a campeã absoluta. A solução é operacional: um calendário de vencimentos e emissão antecipada.",
        ],
      },
      {
        heading: "Dados divergentes do CNPJ",
        paragraphs: [
          "Endereço, sócios, capital social ou atividade diferentes do registro oficial geram questionamentos. Atualize o cadastro sempre que houver alteração contratual.",
        ],
      },
      {
        heading: "Demonstrações contábeis ausentes ou desatualizadas",
        paragraphs: [
          "Sem balanço do exercício exigido, a empresa não comprova qualificação econômico-financeira. Alinhe o envio com a sua contabilidade logo após o fechamento.",
        ],
      },
      {
        heading: "Problemas de acesso e representação",
        list: [
          "Representante sem vínculo ativo com a empresa",
          "Procuração vencida",
          "Dados de contato desatualizados, impedindo convocações",
        ],
      },
      {
        heading: "Impedimentos e sanções",
        paragraphs: [
          "Empresas com sanções registradas podem ficar impedidas de contratar por determinado período. Consultar cadastros de sanções faz parte da rotina de conferência.",
        ],
      },
    ],
    faq: [
      {
        q: "Como sei se minha empresa tem pendência?",
        a: "A consulta é feita nos canais oficiais, onde as pendências aparecem por nível de cadastramento.",
      },
      {
        q: "Quanto tempo leva para regularizar?",
        a: "Varia conforme a pendência. Certidões costumam ser rápidas; questões contábeis ou societárias podem levar mais tempo.",
      },
    ],
    related: ["como-renovar-o-sicaf", "documentos-exigidos-no-sicaf", "como-funciona-o-compras-gov-br"],
    ctaCategory: "pendencias",
    ctaText: "Quero resolver as pendências do meu cadastro",
  },
  {
    slug: "mei-pode-participar-de-licitacao",
    title: "MEI Pode Participar de Licitação Pública?",
    h1: "MEI pode participar de licitação pública?",
    description:
      "Como o Microempreendedor Individual pode vender para órgãos públicos, quais os limites e quais benefícios legais se aplicam.",
    topic: "MEI",
    intro:
      "Sim, o MEI pode participar de contratações públicas compatíveis com a sua atividade registrada e com o seu limite de faturamento. Além disso, conta com tratamento diferenciado previsto na Lei Complementar nº 123/2006.",
    blocks: [
      {
        heading: "Benefícios legais aplicáveis",
        list: [
          "Preferência em caso de empate ficto em relação a empresas de maior porte",
          "Prazo para regularização de documentação fiscal após a habilitação",
          "Possibilidade de contratações com participação exclusiva de ME e EPP em determinadas faixas de valor",
        ],
      },
      {
        heading: "Limites a considerar",
        paragraphs: [
          "O MEI tem teto de faturamento anual e restrição de atividades permitidas. Antes de disputar um contrato relevante, avalie se o valor cabe no seu limite e se a atividade está prevista no seu registro.",
        ],
      },
      {
        heading: "O que preparar",
        paragraphs: [
          "Certificado da condição de MEI, CNPJ ativo, certidões de regularidade e, quando o objeto exigir, comprovação técnica. O cadastro de fornecedor segue a mesma lógica das demais empresas, com exigências contábeis simplificadas.",
        ],
      },
    ],
    faq: [
      {
        q: "MEI pode prestar serviço continuado ao governo?",
        a: "Pode, desde que a atividade seja permitida ao MEI e o contrato respeite os limites legais de faturamento e as regras do edital.",
      },
      {
        q: "Se eu ultrapassar o limite, o que acontece?",
        a: "O enquadramento como MEI pode ser alterado. Nesse caso, o recomendável é planejar a migração para microempresa antes de assumir contratos maiores.",
      },
    ],
    related: ["como-comecar-a-vender-para-o-governo", "documentos-exigidos-no-sicaf", "como-participar-de-licitacao-publica"],
    ctaCategory: "comecar",
    ctaText: "Sou MEI e quero saber por onde começar",
  },
  {
    slug: "como-emitir-e-acompanhar-certidoes",
    title: "Como Emitir e Acompanhar Certidões da Empresa",
    h1: "Como emitir e acompanhar certidões da empresa",
    description:
      "Guia para emitir as principais certidões exigidas em contratações públicas e montar uma rotina de controle de validade.",
    topic: "Documentação",
    intro:
      "Certidão é documento com prazo. Quem participa de licitações precisa tratar a emissão como rotina, e não como tarefa de última hora.",
    blocks: [
      {
        heading: "As certidões mais solicitadas",
        list: [
          "Certidão de débitos relativos a tributos federais e à dívida ativa da União",
          "Certidão estadual e municipal, conforme a atividade",
          "Certificado de regularidade do FGTS",
          "Certidão negativa de débitos trabalhistas",
          "Certidão de falência e recuperação judicial, quando exigida",
        ],
      },
      {
        heading: "Onde emitir",
        paragraphs: [
          "Cada certidão é emitida no órgão competente: Receita Federal, secretarias estaduais e municipais de fazenda, Caixa Econômica Federal, Justiça do Trabalho e tribunais estaduais. A emissão é feita nos canais oficiais desses órgãos.",
        ],
      },
      {
        heading: "Monte um controle simples",
        paragraphs: [
          "Uma planilha com nome da certidão, data de emissão, data de validade e responsável já resolve. Programe alertas 30 dias antes de cada vencimento.",
        ],
      },
      {
        heading: "O que fazer diante de uma certidão positiva",
        paragraphs: [
          "Se houver débito, avalie parcelamento ou quitação com apoio contábil. Existe também a certidão positiva com efeito de negativa, aceita em várias situações quando o débito está suspenso ou parcelado.",
        ],
      },
    ],
    faq: [
      {
        q: "Qual a validade das certidões?",
        a: "Varia conforme o órgão emissor, sendo comum o prazo de 30 a 180 dias. A validade consta no próprio documento.",
      },
      {
        q: "Certidão positiva com efeito de negativa serve?",
        a: "Em muitos casos sim, quando o débito está suspenso ou parcelado regularmente. Confirme a aceitação no edital.",
      },
    ],
    related: ["documentos-exigidos-no-sicaf", "como-renovar-o-sicaf", "principais-pendencias-que-impedem-de-licitar"],
    ctaCategory: "documentacao",
    ctaText: "Quero ajuda com certidões e documentos",
  },
  {
    slug: "diferenca-entre-credenciamento-pregao-e-concorrencia",
    title: "Diferença Entre Credenciamento, Pregão e Concorrência",
    h1: "Diferença entre credenciamento, pregão e concorrência",
    description:
      "Compare as principais formas de contratação pública, quando cada uma é usada e o que muda para o fornecedor em cada caso.",
    topic: "Modalidades",
    intro:
      "Modalidades diferentes exigem preparações diferentes. Saber em qual você está entrando evita erro de estratégia e de precificação.",
    blocks: [
      {
        heading: "Pregão",
        paragraphs: [
          "Usado para bens e serviços comuns, aqueles cujo padrão de desempenho pode ser objetivamente definido no edital. O julgamento é por menor preço ou maior desconto e a disputa ocorre por lances, normalmente em sessão eletrônica.",
        ],
      },
      {
        heading: "Concorrência",
        paragraphs: [
          "Aplicada a objetos mais complexos, incluindo obras e serviços de engenharia e contratações que admitem critérios como técnica e preço. Costuma exigir documentação de qualificação técnica mais robusta.",
        ],
      },
      {
        heading: "Credenciamento",
        paragraphs: [
          "Não é uma disputa por menor preço, e sim um processo em que todos os interessados que atendem aos requisitos podem ser contratados, geralmente com preço previamente definido pela administração. É comum em serviços de saúde, cursos e atividades com demanda distribuída.",
        ],
      },
      {
        heading: "Como isso muda a sua preparação",
        list: [
          "Pregão: agilidade na disputa e preço-limite bem calculado",
          "Concorrência: dossiê técnico e capacidade econômica comprovada",
          "Credenciamento: atenção ao cumprimento dos requisitos e ao prazo de adesão",
        ],
      },
    ],
    faq: [
      {
        q: "Dispensa e inexigibilidade são modalidades?",
        a: "São hipóteses de contratação direta previstas em lei, com procedimento próprio. Mesmo nelas, a empresa precisa comprovar regularidade.",
      },
      {
        q: "Qual modalidade é melhor para quem está começando?",
        a: "Pregões de objeto simples e menor valor costumam ser o ponto de entrada mais acessível.",
      },
    ],
    related: ["o-que-analisar-antes-de-participar-de-um-edital", "como-participar-de-licitacao-publica", "como-encontrar-licitacoes"],
    ctaCategory: "comecar",
    ctaText: "Quero entender qual caminho serve para minha empresa",
    sources: OFICIAL,
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
