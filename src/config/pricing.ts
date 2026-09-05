export const contactTiers = ["1,000", "2,500", "5,000", "10,000", ">10,000"] as const;
export type ContactTier = (typeof contactTiers)[number];

export interface PricingPlan {
  name: string;
  /** Monthly price per contact tier; `null` means "talk to sales". */
  prices: Record<ContactTier, number | null>;
  tagline: string;
  featuresLead: string;
  users: string;
  features: string[];
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    prices: { "1,000": 4999, "2,500": 6999, "5,000": 9999, "10,000": 14999, ">10,000": null },
    tagline: "For small teams sending their first campaigns.",
    featuresLead: "Includes",
    users: "5 users",
    features: [
      "Team & custom inboxes",
      "Campaign wizard",
      "Basic reports",
      "Two-factor authentication (2FA)",
    ],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    prices: { "1,000": 12999, "2,500": 16999, "5,000": 22999, "10,000": 31999, ">10,000": null },
    tagline: "For teams automating conversations across channels.",
    featuresLead: "Everything in Starter, plus",
    users: "15 users",
    features: [
      "WhatsApp Business API & Instagram DMs",
      "AI reply assist",
      "Priority email + chat support",
    ],
    cta: "Start free trial",
  },
  {
    name: "Advanced",
    prices: { "1,000": 24999, "2,500": 31999, "5,000": 41999, "10,000": 54999, ">10,000": null },
    tagline: "For scaling businesses with security requirements.",
    featuresLead: "Everything in Growth, plus",
    users: "50 users",
    features: [
      "Revenue attribution",
      "API & webhooks access",
      "Custom roles & permissions",
      "Single sign-on (SSO)",
      "99.9% uptime SLA",
    ],
    cta: "Talk to sales",
  },
  {
    name: "Enterprise",
    prices: { "1,000": null, "2,500": null, "5,000": null, "10,000": null, ">10,000": null },
    tagline: "For high-volume senders with custom needs.",
    featuresLead: "Everything in Advanced, plus",
    users: "Unlimited users",
    features: [
      "Dedicated customer success manager",
      "Higher API rate limits",
      "Custom contract & invoicing",
    ],
    cta: "Talk to sales",
  },
];

/** Annual billing discount applied to the monthly list price. */
export const ANNUAL_DISCOUNT = 0.2;

export const comparisonGroups: { group: string; rows: { label: string; values: (boolean | string)[] }[] }[] = [
  {
    group: "Usage",
    rows: [
      { label: "Users", values: ["5", "15", "50", "Unlimited"] },
      { label: "Messages / month", values: ["10,000", "1,00,000", "5,00,000", "Custom"] },
    ],
  },
  {
    group: "Channels",
    rows: [
      { label: "Email", values: [true, true, true, true] },
      { label: "WhatsApp Business API", values: [false, true, true, true] },
      { label: "Instagram DMs", values: [false, true, true, true] },
    ],
  },
  {
    group: "Automation",
    rows: [
      { label: "Campaign wizard", values: [true, true, true, true] },
      { label: "AI reply assist", values: [false, true, true, true] },
    ],
  },
  {
    group: "Reporting",
    rows: [
      { label: "Basic reports", values: [true, true, true, true] },
      { label: "Advanced reports", values: [false, true, true, true] },
      { label: "Revenue attribution", values: [false, false, true, true] },
    ],
  },
  {
    group: "Security & support",
    rows: [
      { label: "Two-factor authentication (2FA)", values: [true, true, true, true] },
      { label: "Single sign-on (SSO)", values: [false, false, true, true] },
      { label: "Uptime SLA", values: [false, false, "99.9%", "Custom"] },
      { label: "Support", values: ["Email", "Priority Email + Chat", "+ Phone", "Dedicated CSM"] },
    ],
  },
];
