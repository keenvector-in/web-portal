import { site } from "../../config/site";
import { LegalPage, LegalSection } from "./LegalPage";

export function AcceptableUse() {
  return (
    <LegalPage title="Acceptable Use Policy">
      <p>
        This draft policy describes what is and isn't permitted when using {site.name} to
        communicate with customers, pending legal review before publication.
      </p>
      <LegalSection heading="Not permitted">
        <p>
          Sending unsolicited bulk messages to recipients who have not opted in, sending
          content that violates WhatsApp Business Platform's own policies, or using the
          platform to send spam, phishing, or fraudulent content.
        </p>
      </LegalSection>
      <LegalSection heading="Consent and opt-out">
        <p>
          You are responsible for obtaining consent before messaging a contact, and for
          honoring opt-out requests promptly.
        </p>
      </LegalSection>
      <LegalSection heading="Enforcement">
        <p>
          Accounts found in violation of this policy may have channel connections suspended
          pending review.
        </p>
      </LegalSection>
      <LegalSection heading="Contact">
        <p>
          Report a concern: <a href={`mailto:${site.supportEmail}`} className="text-brand-300 hover:underline">{site.supportEmail}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
