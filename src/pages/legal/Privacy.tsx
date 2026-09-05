import { site } from "../../config/site";
import { LegalPage, LegalSection } from "./LegalPage";

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This page describes, in placeholder form, how {site.name} intends to handle data. It
        is not final legal language — it is a draft for legal review before publication.
      </p>
      <LegalSection heading="Data we handle">
        <p>
          Account information (name, business name, email, phone), messaging data sent and
          received through connected channels, and usage data about how the product is
          used.
        </p>
      </LegalSection>
      <LegalSection heading="Cookies">
        <p>
          We use cookies necessary for authentication and basic site functionality.
          Analytics cookies are used only where enabled for your account.
        </p>
      </LegalSection>
      <LegalSection heading="Third-party services">
        <p>
          Messages sent via WhatsApp are processed through the WhatsApp Business Platform,
          subject to Meta's own terms and policies.
        </p>
      </LegalSection>
      <LegalSection heading="Data deletion">
        <p>
          You may request deletion of your account and associated data at any time — see our{" "}
          <a href="/data-deletion" className="text-brand-300 hover:underline">
            data deletion page
          </a>
          .
        </p>
      </LegalSection>
      <LegalSection heading="Contact">
        <p>
          Questions about this policy: <a href={`mailto:${site.supportEmail}`} className="text-brand-300 hover:underline">{site.supportEmail}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
