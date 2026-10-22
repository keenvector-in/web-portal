import { site } from "../../config/site";
import { LegalPage, LegalSection, PageLink, SupportEmail } from "./LegalPage";

export function DataDeletion() {
  return (
    <LegalPage title="Data Deletion">
      <p>
        This page explains how to delete your data from {site.name}, including data we received
        through Facebook, Instagram, or WhatsApp. See the{" "}
        <PageLink href="/privacy">privacy policy</PageLink> for what we collect and why.
      </p>

      <LegalSection heading="If you are a client (a business using KeenVector)">
        <p>
          <strong>Disconnect a channel:</strong> in your {site.name} account, open Integrations
          and disconnect the WhatsApp, Instagram, or Facebook account. We stop receiving its data
          and delete its access token straight away. You can also remove {site.name} from your
          Facebook settings under Business integrations, or from Meta Business Manager.
        </p>
        <p>
          <strong>Delete your account and all its data:</strong> email <SupportEmail /> from the
          email address on your account, with the subject "Data deletion request". Include your
          business name.
        </p>
      </LegalSection>

      <LegalSection heading="If you messaged a business that uses KeenVector">
        <p>
          Email <SupportEmail /> with the subject "Data deletion request", the phone number or
          Instagram username you used, and the name of the business you messaged. We delete your
          messages and contact details held for that business and let the business know. You
          can also ask the business directly.
        </p>
      </LegalSection>

      <LegalSection heading="What gets deleted">
        <p>
          Account details, connected channel tokens, contacts, message history and media,
          templates, campaigns, and automation settings linked to the request.
        </p>
        <p>
          We keep only what the law requires, such as invoices and tax records, for as long as
          the law requires.
        </p>
      </LegalSection>

      <LegalSection heading="Timeline">
        <p>
          We confirm your request within 3 working days, and may ask you to prove you own the
          account or phone number. Deletion is completed within 30 days of confirmation, and
          removed from backups within a further 90 days. We email you when it is done.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          <SupportEmail /> or WhatsApp {site.whatsappDisplay}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
