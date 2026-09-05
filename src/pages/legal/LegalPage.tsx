import { Badge, Container } from "@keenvector/kvcl";
import type { ReactNode } from "react";
import { Seo } from "../../components/Seo";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Seo title={title} description={`${title} for KeenVector.`} />
      <Container className="max-w-3xl py-20">
        <Badge tone="warning">Pending legal review</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">{title}</h1>
        <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-ink-300">
          {children}
        </div>
      </Container>
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-white">{heading}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}
