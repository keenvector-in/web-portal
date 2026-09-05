export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
  appEnv: import.meta.env.VITE_APP_ENV ?? "development",
  enableWhatsApp: import.meta.env.VITE_ENABLE_WHATSAPP === "true",
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  isDev: import.meta.env.DEV,
} as const;
