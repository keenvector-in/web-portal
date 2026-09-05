export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
  appEnv: import.meta.env.VITE_APP_ENV ?? "development",
  enableWhatsApp: import.meta.env.VITE_ENABLE_WHATSAPP === "true",
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  metaAppId: import.meta.env.VITE_META_APP_ID ?? "",
  whatsappConfigId: import.meta.env.VITE_WHATSAPP_CONFIG_ID ?? "",
  isDev: import.meta.env.DEV,
} as const;
