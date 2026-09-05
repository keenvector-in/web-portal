export const site = {
  name: "KeenVector",
  tagline: "Connect. Engage. Automate.",
  description:
    "KeenVector helps businesses manage customer conversations, WhatsApp communication, automation, and engagement from one platform.",
  supportEmail: "support@keenvector.in",
} as const;

export const directContacts = [
  { label: "Saurabh Rathod", email: "saurabh.rathod@keenvector.in" },
  { label: "Hetal", email: "hetal@keenvector.in" },
] as const;

export const marketingNav = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "WhatsApp integration", href: "/whatsapp" },
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
