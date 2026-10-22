export const site = {
  name: "KeenVector",
  tagline: "Connect. Engage. Automate.",
  description:
    "KeenVector helps businesses manage customer conversations on WhatsApp, Instagram and other channels, with automation and engagement tools, from one platform.",
  supportEmail: "support@keenvector.in",
  // WhatsApp in international format without "+", as wa.me wants it.
  whatsappNumber: "917285082801",
  whatsappDisplay: "+91 72850 82801",
  // Must match the business-verified portfolio in Meta Business Manager (Business info).
  legal: {
    name: "KeenVector",
    entity: "a sole proprietorship registered in India",
    udyam: "UDYAM-GJ-09-0082566",
    location: "Gandhinagar, Gujarat 382041, India",
    // Bump when any legal page changes.
    lastUpdated: "22 October 2026",
  },
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi KeenVector, I'd like to know more.")}`;

export const directContacts = [
  { label: "Saurabh Rathod", email: "saurabh.rathod@keenvector.in" },
  { label: "Hetal", email: "hetal@keenvector.in" },
] as const;

export const marketingNav = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "WhatsApp integration", href: "/whatsapp" },
    { label: "Developer docs", href: "/developers" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Acceptable use", href: "/acceptable-use" },
    { label: "Data deletion", href: "/data-deletion" },
  ],
} as const;

export const dashboardNav = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Inbox", to: "/inbox" },
  { label: "Contacts", to: "/contacts" },
  { label: "WhatsApp", to: "/settings/whatsapp" },
  { label: "Templates", to: "/templates" },
  { label: "Analytics", to: "/analytics" },
  { label: "Team", to: "/settings/team" },
  { label: "Integrations", to: "/settings/integrations" },
  { label: "Billing", to: "/settings/billing" },
  { label: "Settings", to: "/settings" },
] as const;
