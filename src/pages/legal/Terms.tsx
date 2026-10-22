import { site } from "../../config/site";
import { ExternalLink, LegalPage, LegalSection, Operator, PageLink, SupportEmail } from "./LegalPage";

export function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms apply to your use of {site.name}, operated by <Operator />. By creating an
        account or using the service, you agree to them on behalf of yourself and the business
        you represent.
      </p>

      <LegalSection heading="The service">
        <p>
          {site.name} is a software platform that lets businesses send and receive customer
          messages on WhatsApp, Instagram, and other channels from one inbox, manage contacts and
          message templates, and run campaigns and automated replies.
        </p>
      </LegalSection>

      <LegalSection heading="Your account">
        <p>
          You must give accurate business details, keep your login secure, and are responsible
          for what your team members do in your account. Tell us at <SupportEmail /> if you
          think your account has been misused.
        </p>
      </LegalSection>

      <LegalSection heading="Connected channels">
        <p>
          When you connect a WhatsApp, Instagram, or Facebook account, you authorise us to access
          it on your behalf to provide the service. You must accept and follow Meta's own terms,
          including the{" "}
          <ExternalLink href="https://www.whatsapp.com/legal/business-terms">
            WhatsApp Business terms
          </ExternalLink>
          ,{" "}
          <ExternalLink href="https://business.whatsapp.com/policy">
            WhatsApp Business messaging policy
          </ExternalLink>
          , and{" "}
          <ExternalLink href="https://www.facebook.com/terms">Meta's terms of service</ExternalLink>
          . Meta may approve, reject, limit, or suspend your accounts or templates; we have no
          control over those decisions.
        </p>
      </LegalSection>

      <LegalSection heading="Your responsibilities">
        <p>
          You must have your customers' consent before messaging them, honour opt-outs, and
          follow our <PageLink href="/acceptable-use">acceptable use policy</PageLink> and the
          law. You own your content and your customers' data; you give us permission to process
          it only to provide the service, as described in our{" "}
          <PageLink href="/privacy">privacy policy</PageLink>.
        </p>
      </LegalSection>

      <LegalSection heading="Fees">
        <p>
          Paid plans are billed as shown on our <PageLink href="/pricing">pricing page</PageLink>{" "}
          or in your order. Charges that Meta or other providers make per message are passed on
          as shown in your account. Fees are exclusive of applicable taxes.
        </p>
      </LegalSection>

      <LegalSection heading="Suspension and ending the service">
        <p>
          You can stop using {site.name} and close your account at any time. We may suspend or
          close an account that breaks these terms, the acceptable use policy, or Meta's
          policies, or that puts the service or others at risk; where we can, we warn you first.
          After closure, your data is deleted as set out on our{" "}
          <PageLink href="/data-deletion">data deletion page</PageLink>.
        </p>
      </LegalSection>

      <LegalSection heading="Availability and liability">
        <p>
          We work to keep {site.name} running but do not promise it will be uninterrupted or
          error-free, and message delivery depends on Meta and other providers. To the extent the
          law allows, we are not liable for indirect or consequential losses, and our total
          liability for any claim is limited to the fees you paid us in the 12 months before it.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update these terms. We will tell you by email before a material change takes
          effect; continuing to use the service after that means you accept the change.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of India, and the courts of Gandhinagar, Gujarat
          have jurisdiction.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms: <SupportEmail />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
