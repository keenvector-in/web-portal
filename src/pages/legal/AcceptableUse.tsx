import { site } from "../../config/site";
import { ExternalLink, LegalPage, LegalSection, PageLink, SupportEmail } from "./LegalPage";

export function AcceptableUse() {
  return (
    <LegalPage title="Acceptable Use Policy">
      <p>
        This policy sets out what is and isn't allowed when using {site.name} to talk to
        customers. It is part of our <PageLink href="/terms">terms of service</PageLink>.
      </p>
      <LegalSection heading="Not permitted">
        <p>
          Messaging people who have not opted in, spam, phishing, fraud, or misleading content;
          content that breaks the{" "}
          <ExternalLink href="https://business.whatsapp.com/policy">
            WhatsApp Business messaging policy
          </ExternalLink>{" "}
          or{" "}
          <ExternalLink href="https://transparency.meta.com/policies/community-standards/">
            Meta's community standards
          </ExternalLink>
          ; selling goods or services those policies prohibit; and anything unlawful.
        </p>
      </LegalSection>
      <LegalSection heading="Consent and opt-out">
        <p>
          You are responsible for getting consent before messaging a contact, and for honouring
          opt-out requests promptly.
        </p>
      </LegalSection>
      <LegalSection heading="Enforcement">
        <p>
          We may suspend channel connections or accounts that break this policy while we review
          them, and close accounts for serious or repeated breaches.
        </p>
      </LegalSection>
      <LegalSection heading="Contact">
        <p>
          Report a concern: <SupportEmail />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
