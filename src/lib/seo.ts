import { SITE } from "./site";

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE.url;
  return `${SITE.url}${normalized}`;
}

export type PageHeadOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  keywords?: string;
  noIndex?: boolean;
};

export function buildPageHead({
  title,
  description,
  path,
  type = "website",
  image = SITE.ogImage,
  keywords = SITE.keywords,
  noIndex = false,
}: PageHeadOptions) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "robots", content: noIndex ? "noindex, nofollow" : "index, follow" },
      { name: "author", content: SITE.name },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE.name} — Cadastro no SICAF e licitações` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.fullName,
    url: SITE.url,
    logo: absoluteUrl(SITE.logoPath),
    description: SITE.tagline,
    email: SITE.email,
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    sameAs: [SITE.partnerUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SITE.email,
      telephone: "+55-11-2122-0202",
      availableLanguage: "Portuguese",
      areaServed: "BR",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/conteudos?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function articleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    inLanguage: "pt-BR",
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    mainEntityOfPage: absoluteUrl(opts.path),
    image: absoluteUrl(SITE.ogImage),
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE.logoPath),
      },
    },
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: "Orientação e preparação para cadastro no SICAF",
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Fornecedores e empresas que desejam participar de licitações públicas",
    },
  };
}
