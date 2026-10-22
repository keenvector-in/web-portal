import { Container } from "@keenvector/kvcl";
import type { ReactNode } from "react";
import { Seo } from "../../components/Seo";
import { site } from "../../config/site";

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
        <h1 className="font-display text-4xl font-bold text-white">{title}</h1>
        <p className="mt-3 text-xs text-ink-500">Last updated: {site.legal.lastUpdated}</p>
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

// Shared links so every page points at the same addresses.
const linkClass = "text-brand-300 hover:underline";

export function SupportEmail() {
  return (
    <a href={`mailto:${site.supportEmail}`} className={linkClass}>
      {site.supportEmail}
    </a>
  );
}

export function PageLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={linkClass}>
      {children}
    </a>
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

export function Operator() {
  return (
    <>
      {site.legal.name}, {site.legal.entity} (Udyam registration {site.legal.udyam}), based in{" "}
      {site.legal.location}
    </>
  );
}
