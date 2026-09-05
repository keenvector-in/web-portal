import { site } from "../../config/site";
import { LegalPage, LegalSection } from "./LegalPage";

export function DataDeletion() {
  return (
    <LegalPage title="Data Deletion">
      <p>
        This page describes, in draft form, how to request deletion of your {site.name}
        account and associated data, pending legal review before publication.
      </p>
      <LegalSection heading="How to request deletion">
        <p>
          Email <a href={`mailto:${site.supportEmail}`} className="text-brand-300 hover:underline">{site.supportEmail}</a> from
          the address associated with your account, with the subject "Data deletion
          request."
        </p>
      </LegalSection>
      <LegalSection heading="What gets deleted">
        <p>
          Account information, contact records, and message history associated with your
          business account. Some records may be retained where required by law or by
          WhatsApp Business Platform's own retention requirements.
        </p>
      </LegalSection>
      <LegalSection heading="Timeline">
        <p>Deletion requests are processed within a reasonable timeframe after verification.</p>
      </LegalSection>
    </LegalPage>
  );
}
