import { site } from "../../config/site";
import { LegalPage, LegalSection } from "./LegalPage";

export function WhatsAppPolicy() {
  return (
    <LegalPage title="WhatsApp Business Platform Usage">
      <p>
        {site.name} is built for the WhatsApp Business Platform. This page describes, in
        draft form, how that integration works and what it does not claim.
      </p>
      <LegalSection heading="What this integration is">
        <p>
          {site.name} lets you connect your own WhatsApp Business account to send and
          receive customer messages through our shared inbox, templates, and automation
          tools.
        </p>
      </LegalSection>
      <LegalSection heading="What this integration is not">
        <p>
          {site.name} is not an official Meta partner, is not Meta-approved, and does not
          claim any certification or partnership with Meta beyond what is explicitly stated
          here.
        </p>
      </LegalSection>
      <LegalSection heading="Message templates">
        <p>
          Templates sent through WhatsApp are subject to Meta's own approval process. A
          template's status in {site.name} reflects the actual status reported by that
          process.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
