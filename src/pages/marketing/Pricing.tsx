import { Button, Card, Check, Container, Link, Minus, ShieldCheck } from "@keenvector/kvcl";
import { Fragment, useState } from "react";
import { Seo } from "../../components/Seo";
import { ANNUAL_DISCOUNT, comparisonGroups, contactTiers, pricingPlans, type ContactTier, type PricingPlan } from "../../config/pricing";
import { faqs } from "../../data/marketingContent";
import { formatCurrency } from "../../utils/format";

type Cycle = "monthly" | "annual";

function priceLabel(plan: PricingPlan, tier: ContactTier, cycle: Cycle) {
  const monthly = plan.prices[tier];
  if (monthly === null) return { amount: "Custom", suffix: "" };
  const effective = cycle === "annual" ? Math.round(monthly * (1 - ANNUAL_DISCOUNT)) : monthly;
  return { amount: formatCurrency(effective), suffix: "/mo" };
}

function PlanCard({ plan, tier, cycle, featured }: { plan: PricingPlan; tier: ContactTier; cycle: Cycle; featured: boolean }) {
  const { amount, suffix } = priceLabel(plan, tier, cycle);
  const monthly = plan.prices[tier];

  return (
    <Card className={`flex flex-col ${featured ? "border-brand-400/50 ring-1 ring-brand-400/30" : ""}`}>
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold text-white">{plan.name}</p>
        {featured ? (
          <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-[11px] font-medium text-brand-300">
            Most popular
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-ink-400">{plan.tagline}</p>

      <div className="mt-5">
        <span className="font-display text-3xl font-bold text-white">{amount}</span>
        {suffix ? <span className="text-sm font-normal text-ink-400"> {suffix}</span> : null}
        <p className="mt-1 h-4 text-xs text-ink-500">
          {monthly !== null && cycle === "annual" ? `${formatCurrency(monthly * 12 * (1 - ANNUAL_DISCOUNT))} billed yearly` : null}
          {monthly !== null && cycle === "monthly" ? "billed monthly" : null}
        </p>
      </div>

      <Button
        as={Link}
        to={plan.cta === "Talk to sales" ? "/contact" : "/register"}
        variant={featured ? "primary" : "secondary"}
        className="mt-5 w-full"
      >
        {plan.cta}
      </Button>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-white">{plan.featuresLead}</p>
      <ul className="mt-3 flex-1 space-y-2.5 text-sm text-ink-300">
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" /> {plan.users}
        </li>
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" /> {f}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("annual");
  const [tier, setTier] = useState<ContactTier>("1,000");

  return (
    <>
      <Seo
        title="Pricing"
        description="Plans that scale with your conversations. Every plan includes unlimited contacts in your CRM."
      />
      <Container className="py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white">Plans that scale with your conversations</h1>
          <p className="mt-3 text-ink-300">
            Every plan includes unlimited contacts in your CRM. Start free, no card
            required.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-white/10 bg-ink-900/60 p-1">
            {(["monthly", "annual"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  cycle === c ? "bg-ink-950 text-white shadow-sm" : "text-ink-400 hover:text-white"
                }`}
              >
                {c}
                {c === "annual" ? <span className="ml-1.5 text-xs font-semibold text-accent-400">save 20%</span> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Monthly active contacts</p>
          <div className="flex flex-wrap justify-center gap-2">
            {contactTiers.map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  tier === t
                    ? "border-brand-400 bg-brand-500/15 font-medium text-brand-300"
                    : "border-white/10 text-ink-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((p) => (
            <PlanCard key={p.name} plan={p} tier={tier} cycle={cycle} featured={p.name === "Growth"} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-accent-400" /> 14-day free trial
          </span>
          <span>No card required</span>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-display text-2xl font-bold tracking-tight text-white">Compare plans</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-ink-900/60 text-left">
                  <th className="p-4 font-medium text-ink-400">Feature</th>
                  {pricingPlans.map((p) => (
                    <th key={p.name} className="p-4 font-semibold text-white">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonGroups.map((g) => (
                  <Fragment key={g.group}>
                    <tr className="border-b border-white/10 bg-ink-900/30">
                      <td colSpan={pricingPlans.length + 1} className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white">
                        {g.group}
                      </td>
                    </tr>
                    {g.rows.map((row) => (
                      <tr key={g.group + row.label} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-ink-400">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="p-4">
                            {typeof v === "boolean" ? (
                              v ? (
                                <Check className="h-4 w-4 text-accent-400" />
                              ) : (
                                <Minus className="h-4 w-4 text-ink-600" />
                              )
                            ) : (
                              <span className="text-white">{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center font-display text-2xl font-bold tracking-tight text-white">Frequently asked questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <Card key={f.q}>
                <p className="text-sm font-semibold text-white">{f.q}</p>
                <p className="mt-1.5 text-sm text-ink-300">{f.a}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3">
          <Button as={Link} to="/register" size="lg">
            Start free trial
          </Button>
          <Link to="/contact" className="text-sm text-ink-400 hover:text-white">
            Or talk to sales →
          </Link>
        </div>
      </Container>
    </>
  );
}
