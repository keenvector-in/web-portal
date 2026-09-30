export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
  // edge-gateway — the one public entry for login/signup (/api/auth/*).
  edgeGatewayBaseUrl: import.meta.env.VITE_EDGE_GATEWAY_BASE_URL ?? "",
  // business-admin-portal — where signed-in tenants work; the legacy product
  // routes here (/dashboard, /inbox, /settings/*...) redirect to it.
  businessAdminBaseUrl: import.meta.env.VITE_BUSINESS_ADMIN_BASE_URL ?? "",
  appEnv: import.meta.env.VITE_APP_ENV ?? "development",
  enableWhatsApp: import.meta.env.VITE_ENABLE_WHATSAPP === "true",
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  metaAppId: import.meta.env.VITE_META_APP_ID ?? "",
  whatsappConfigId: import.meta.env.VITE_WHATSAPP_CONFIG_ID ?? "",
  // KeenVector's own chatbot (the embeddable widget) on the marketing site:
  // Vector answers visitors from the KeenVector tenant's knowledge. Empty = off.
  chatWidgetUrl: import.meta.env.VITE_CHAT_WIDGET_URL ?? "",
  chatSiteSlug: import.meta.env.VITE_CHAT_SITE_SLUG ?? "keenvector-in",
  chatApiBaseUrl: import.meta.env.VITE_CHAT_API_BASE_URL ?? "",
  isDev: import.meta.env.DEV,
} as const;
