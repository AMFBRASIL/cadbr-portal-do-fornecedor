import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="container-page py-12">
      <Breadcrumbs items={[{ label: title }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-sm text-muted-foreground">{updated}</p>}
      </header>
      <div className="mt-8 max-w-3xl space-y-6 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}
