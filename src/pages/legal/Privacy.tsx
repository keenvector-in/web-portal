import { directContacts, site } from "../../config/site";
import { ExternalLink, LegalPage, LegalSection, Operator, PageLink, SupportEmail } from "./LegalPage";

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what data {site.name} collects, why, how long we keep it, and the
        choices you have. {site.name} is operated by <Operator />. In this policy, "we" means{" "}
        {site.legal.name}.
      </p>

      <LegalSection heading="Who this policy covers">
        <p>
          <strong>Clients</strong> are businesses that sign up for {site.name} and their team
          members. <strong>End users</strong> are the clients' own customers who message them on
          WhatsApp, Instagram, or another channel connected to {site.name}.
        </p>
        <p>
          For end-user data, the client decides why the data is processed and we process it only
          on the client's instructions to provide the service. If you are an end user, you can
          also contact the business you messaged directly.
        </p>
      </LegalSection>

      <LegalSection heading="Data we collect">
        <p>
          <strong>Account data:</strong> name, business name, email address, phone number, and
          login details of clients and their team members.
        </p>
        <p>
          <strong>Data from Meta platforms:</strong> when a client connects their WhatsApp
          Business account, Instagram professional account, or Facebook Page through Meta's
          login, we receive from Meta the account and business IDs, phone numbers and display
          names of those accounts, access tokens that let us act on the client's behalf, message
          templates, and the messages sent and received through those accounts, including end
          users' phone numbers or usernames, profile names, message content, and media.
        </p>
        <p>
          <strong>Other channel data:</strong> messages, contacts, and delivery status for other
          channels a client connects, such as SMS, email, or Slack.
        </p>
        <p>
          <strong>Usage data:</strong> log and device information such as IP address, browser
          type, and pages used, collected to run, secure, and fix the service.
        </p>
      </LegalSection>

      <LegalSection heading="How we use data">
        <p>
          We use data only to provide {site.name} to the client who connected the account:
          sending and receiving messages, showing conversations in the client's inbox, managing
          contacts, running the campaigns and automated replies the client sets up, reporting
          delivery and usage to the client, billing, support, and keeping the service secure.
        </p>
        <p>
          We do <strong>not</strong> sell data, use it for advertising, build profiles of end
          users, or use one client's data for another client. Each client can see only their own
          data.
        </p>
      </LegalSection>

      <LegalSection heading="Automated replies">
        <p>
          If a client turns on automated or AI-assisted replies, message content is processed by
          models that run on our own servers to suggest or send replies for that client. We do
          not use client or end-user data to train models for anyone else.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share data with">
        <p>
          <strong>Meta</strong>, to deliver messages through the WhatsApp Business Platform,
          Instagram, and Messenger. Meta's handling of that data is covered by its own{" "}
          <ExternalLink href="https://www.facebook.com/privacy/policy">privacy policy</ExternalLink>{" "}
          and the{" "}
          <ExternalLink href="https://www.whatsapp.com/legal/business-terms">
            WhatsApp Business terms
          </ExternalLink>
          .
        </p>
        <p>
          <strong>Service providers</strong> that host and run {site.name} for us: Amazon Web
          Services (servers, databases, file storage, and email delivery, in the Mumbai region,
          India) and Vercel (this website). They may use the data only to provide their services
          to us.
        </p>
        <p>
          <strong>Authorities</strong>, when the law requires it.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep data">
        <p>
          We keep data while the client's account is active. When a client disconnects a
          channel, we stop receiving data from it and delete its access tokens immediately. When
          a client closes their account or asks for deletion, we delete their data within 30
          days, and from backups within a further 90 days, except where the law requires us to
          keep billing or tax records.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          Data is encrypted in transit and at rest, access tokens are kept in a secrets store,
          and access to production systems is limited to staff who need it.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask to access, correct, or delete your data, or withdraw consent, at any time.
          See our <PageLink href="/data-deletion">data deletion page</PageLink> for how. We
          respond within 30 days. If you are not satisfied, you may complain to the Data
          Protection Board of India.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and website analytics">
        <p>
          This website uses only cookies needed for sign-in and basic site functions. We do not
          use advertising cookies. We count page visits with Vercel Web Analytics, which does not
          use cookies, and load fonts from Google Fonts, which receives your IP address when the
          page loads.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          If we change this policy, we update the date at the top of this page, and we tell
          clients by email before any material change takes effect.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Privacy questions or requests: <SupportEmail />, or WhatsApp {site.whatsappDisplay}.
          Grievance officer: {directContacts[0].label},{" "}
          <PageLink href={`mailto:${directContacts[0].email}`}>{directContacts[0].email}</PageLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
