import { BarChart3, Card, Check, Gauge, Layers, Link, Megaphone, PlugZap, ShieldCheck, Users } from "@keenvector/kvcl";
import { Seo } from "../../components/Seo";
import { CHANNEL_META, marketingChannels } from "../../config/channels";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Built for India, not retrofitted",
    body: "WhatsApp Business API onboarding and template approval is handled inside the platform — not a manual side-process with a separate vendor.",
  },
  {
    icon: Gauge,
    title: "Revenue-first analytics",
    body: "Delivery and open rates tell you a message arrived. KeenVector traces every reply and payment back to the campaign that caused it.",
  },
  {
    icon: Layers,
    title: "No engineering ticket required",
    body: "Non-technical teams manage campaigns themselves. Developers get a real API, webhooks and SDKs when they need to go deeper.",
  },
];

const messagingPoints = [
  "One inbox and one template library across every connected channel",
  "Priority lanes keep OTPs and transactional sends ahead of bulk campaigns",
  "Per-channel delivery receipts normalized into a single status model",
];

const campaignPoints = [
  "Segment builder with live audience-size preview before you send",
  "One wizard schedules a coordinated send across WhatsApp and email",
  "Delivery, click and conversion tracked per campaign automatically",
];

export function Features() {
  return (
    <>
      <Seo
        title="Features"
        description="Messaging and the analytics to prove it's driving revenue — all in one platform."
      />

      <div className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white">Everything you need, one platform</h1>
        <p className="mt-3 text-ink-300">
          Messaging and the analytics to prove it's driving revenue — not five disconnected
          tools stitched together with spreadsheets.
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <PlugZap className="h-7 w-7 text-brand-400" />
            <h2 className="mt-3 font-display text-2xl font-bold text-white">Multi-channel messaging</h2>
            <p className="mt-2 text-ink-300">
              Connect WhatsApp, Email and Instagram once — then use them
              everywhere across campaigns. Priority lanes keep transactional
              messages moving ahead of bulk sends.
            </p>
            <ul className="mt-4 space-y-2">
              {messagingPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-ink-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <Card>
            <div className="grid grid-cols-2 gap-3">
              {marketingChannels.map((c) => {
                const meta = CHANNEL_META[c];
                return (
                  <div key={c} className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink-950 p-3">
                    <meta.icon className={`h-5 w-5 ${meta.className}`} />
                    <span className="text-sm font-medium text-white">{meta.label}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-900/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Card className="order-2 lg:order-1">
              <p className="text-xs font-medium text-ink-400">Campaign wizard</p>
              <div className="mt-3 space-y-2">
                {["Choose audience segment", "Pick channel(s) & template", "Schedule & launch"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3 rounded-lg border border-white/10 bg-ink-950 p-3 text-sm text-white">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-300">
                      {i + 1}
                    </span>
                    {s}
                  </div>
                ))}
              </div>
            </Card>
            <div className="order-1 lg:order-2">
              <Megaphone className="h-7 w-7 text-brand-400" />
              <h2 className="mt-3 font-display text-2xl font-bold text-white">Multi-channel campaigns</h2>
              <p className="mt-2 text-ink-300">
                Segment your contacts and launch a coordinated send across WhatsApp and
                email from a single wizard — with delivery, click and conversion tracking
                built in.
              </p>
              <ul className="mt-4 space-y-2">
                {campaignPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-900/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <Users className="h-7 w-7 text-brand-400" />
              <h2 className="mt-3 text-xl font-bold text-white">Contacts & Customer 360</h2>
              <p className="mt-2 text-ink-300">
                One timeline per contact across every channel — messages and payments —
                so your team never loses context.
              </p>
            </Card>
            <Card>
              <BarChart3 className="h-7 w-7 text-brand-400" />
              <h2 className="mt-3 text-xl font-bold text-white">Analytics & revenue attribution</h2>
              <p className="mt-2 text-ink-300">
                Go beyond delivery rates — see exactly which campaign drove a payment,
                with conversion and ROI dashboards.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-white">
              Why teams pick KeenVector over stitching tools together
            </h2>
            <p className="mt-2 text-ink-300">
              Most businesses run messaging and analytics as separate vendors with no
              shared context. That's the gap KeenVector closes.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {differentiators.map((d) => (
              <Card key={d.title}>
                <d.icon className="h-6 w-6 text-brand-400" />
                <h3 className="mt-3 text-base font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{d.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-900/40 py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-white">Connects with what you already use</h2>
        <p className="mx-auto mt-2 max-w-xl text-ink-300">
          WhatsApp, Email and Instagram, connected once.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex h-10 items-center rounded-md border border-white/10 bg-ink-950 px-5 text-sm font-medium text-white hover:bg-white/5"
        >
          Talk to us about integrations
        </Link>
      </section>
    </>
  );
}
