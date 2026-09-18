import { env } from "../../config/env";

export interface ContactRequest {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Posts the contact form as a lead on KeenVector's own tenant site, so it lands in the
 * tenant DB (business-admin portal: Website > Leads) next to chatbot leads.
 */
export async function submitContact(request: ContactRequest): Promise<void> {
  if (!env.chatApiBaseUrl) throw new Error("VITE_CHAT_API_BASE_URL is not set");
  const res = await fetch(
    `${env.chatApiBaseUrl}/public/sites/${encodeURIComponent(env.chatSiteSlug)}/leads`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: request.name,
        phone: request.phone ?? "",
        email: request.email,
        message: `[${request.businessName}] ${request.message}`,
      }),
    },
  );
  if (!res.ok) throw new Error(`contact: HTTP ${res.status}`);
}
