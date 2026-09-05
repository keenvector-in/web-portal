import { site } from "../../config/site";
import { LegalPage, LegalSection } from "./LegalPage";

export function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms are a draft placeholder describing the intended terms of using{" "}
        {site.name}, pending legal review before publication.
      </p>
      <LegalSection heading="Account information">
        <p>
          You are responsible for the accuracy of the account and business information you
          provide, and for keeping your credentials secure.
        </p>
      </LegalSection>
      <LegalSection heading="User responsibilities">
        <p>
          You agree to use {site.name} in compliance with applicable law and the policies of
          any connected channel (including WhatsApp Business Platform's own terms), and not
          to send unsolicited or abusive messages through the platform.
        </p>
      </LegalSection>
      <LegalSection heading="Acceptable use">
        <p>
          See our <a href="/acceptable-use" className="text-brand-300 hover:underline">acceptable use policy</a> for
          what is and isn't permitted on the platform.
        </p>
      </LegalSection>
      <LegalSection heading="Contact">
        <p>
          Questions about these terms: <a href={`mailto:${site.supportEmail}`} className="text-brand-300 hover:underline">{site.supportEmail}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
