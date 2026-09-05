import { Badge, BarChart3, Button, Card, Link, Megaphone, PlayCircle, PlugZap, Rocket } from "@keenvector/kvcl";
import { ChannelHub } from "../../components/ChannelHub";
import { Seo } from "../../components/Seo";
import { pricingPlans } from "../../config/pricing";
import { site } from "../../config/site";

const features = [
  {
    icon: Megaphone,
    title: "Multi-channel Campaigns",
    description: "Plan and launch WhatsApp and email campaigns from a single wizard, with priority lanes built in.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Revenue Attribution",
    description: "See exactly which message or campaign drove a payment — not just delivery rates.",
  },
  {
    icon: PlugZap,
    title: "Multi-channel Messaging",
    description: "WhatsApp, Email and Instagram — connected once, usable everywhere in the platform.",
  },
];

const steps = [
  { title: "Connect channels", description: "Link WhatsApp, Email and more in a guided onboarding flow." },
  { title: "Launch a campaign", description: "Send to a segment across every connected channel from one wizard." },
  { title: "Reply from one inbox", description: "Every conversation, every channel, in one place your team works from." },
  { title: "Track revenue", description: "Attribute every rupee back to the message that drove it." },
];

export function Home() {
  return (
    <>
      <Seo
        title="KeenVector — Multi-channel messaging for growing businesses"
        description={site.description}
      />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge tone="neutral">Built for Indian businesses</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Multi-channel messaging, in one platform
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-300">
              Reach customers on WhatsApp, Email and Instagram — from one shared inbox,
              with campaigns and analytics built in.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/register" size="lg">
                <Rocket className="h-4 w-4" /> Start free trial
              </Button>
              <Button as={Link} to="/contact" variant="secondary" size="lg">
                <PlayCircle className="h-4 w-4" /> Book a demo
              </Button>
            </div>
          </div>
          <ChannelHub className="mx-auto max-w-sm" />
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white">Everything you need to talk to customers</h2>
          <p className="mt-3 text-ink-300">One platform for messaging and the numbers that prove it's working.</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 px-6 sm:grid-cols-2">
          {features.map((f) => (
            <Card key={f.title}>
              <f.icon className="h-6 w-6 text-brand-400" />
              <h3 className="mt-3 text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink-300">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-display text-3xl font-bold text-white">How it works</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Card key={s.title}>
                <span className="font-display text-3xl font-bold text-brand-500/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm text-ink-300">{s.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-white">Simple, transparent pricing</h2>
            <p className="mt-3 text-ink-300">Start free. Upgrade as you grow.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan) => {
              const featured = plan.name === "Growth";
              return (
                <Card key={plan.name} className={`flex flex-col ${featured ? "border-brand-400/50 ring-1 ring-brand-400/30" : ""}`}>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg font-semibold text-white">{plan.name}</p>
                    {featured ? (
                      <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-[11px] font-medium text-brand-300">
                        Most popular
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-ink-400">{plan.tagline}</p>
                  <p className="mt-4 font-display text-2xl font-bold text-white">
                    {plan.prices["1,000"] === null ? "Custom" : `₹${plan.prices["1,000"].toLocaleString("en-IN")}`}
                    {plan.prices["1,000"] !== null ? <span className="text-sm font-normal text-ink-400">/mo</span> : null}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2 text-xs text-ink-300">
                    <li>{plan.users}</li>
                    {plan.features.slice(0, 3).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Button
                    as={Link}
                    to={plan.cta === "Talk to sales" ? "/contact" : "/register"}
                    variant={featured ? "primary" : "secondary"}
                    className="mt-5 w-full"
                  >
                    {plan.cta}
                  </Button>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link to="/pricing" className="text-sm font-medium text-brand-300 hover:underline">
              See full plan comparison →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
