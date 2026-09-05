import { Container } from "@keenvector/kvcl";
import { Seo } from "../../components/Seo";
import { site } from "../../config/site";

export function About() {
  return (
    <>
      <Seo
        title="About"
        description="What KeenVector is, the problem it solves, and how to reach us."
      />
      <Container className="max-w-3xl py-20">
        <h1 className="font-display text-4xl font-bold text-white">About KeenVector</h1>
        <div className="mt-8 space-y-6 text-ink-300">
          <p>
            {site.name} is a business communication platform focused on helping businesses
            manage customer conversations, WhatsApp communication, automation, and
            engagement from one place.
          </p>
          <p>
            Businesses today juggle customer conversations across phone, email, and
            messaging apps, with no shared view of who said what. That fragmentation costs
            time and, eventually, customers. {site.name} brings those conversations into one
            inbox, with automation and AI assistance to keep responses fast and consistent.
          </p>
          <p>
            We're building this focused on business communication first — starting with
            WhatsApp, because that's where a large share of customer conversations already
            happen — before expanding into the broader set of tools a growing business
            needs.
          </p>
          <p>
            Questions about the product or how we handle your data? Reach us at{" "}
            <a href={`mailto:${site.supportEmail}`} className="text-brand-300 hover:underline">
              {site.supportEmail}
            </a>{" "}
            or through the <a href="/contact" className="text-brand-300 hover:underline">contact page</a>.
          </p>
        </div>
      </Container>
    </>
  );
}
