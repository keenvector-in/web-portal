import { site } from "../../config/site";
import { LegalPage, LegalSection, PageLink } from "./LegalPage";

export function WhatsAppPolicy() {
  return (
    <LegalPage title="WhatsApp Business Platform Usage">
      <p>
        {site.name} is built on the WhatsApp Business Platform. This page explains how the
        integration works.
      </p>
      <LegalSection heading="How it works">
        <p>
          You connect your own WhatsApp Business account to {site.name} through Meta's login.
          You keep ownership of the account and phone number; {site.name} uses the access you
          grant only to send and receive your customer messages through our shared inbox,
          templates, campaigns, and automation tools. You can disconnect at any time.
        </p>
      </LegalSection>
      <LegalSection heading="Relationship with Meta">
        <p>
          {site.name} is an independent business. We do not claim any certification or
          partnership with Meta beyond what is stated on this page.
        </p>
      </LegalSection>
      <LegalSection heading="Message templates">
        <p>
          Templates sent through WhatsApp are subject to Meta's own approval process. A
          template's status in {site.name} reflects the actual status reported by that process.
        </p>
      </LegalSection>
      <LegalSection heading="Your data">
        <p>
          See our <PageLink href="/privacy">privacy policy</PageLink> and{" "}
          <PageLink href="/data-deletion">data deletion page</PageLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
