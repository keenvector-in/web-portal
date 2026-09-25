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
export interface ContactResult {
  /** Set when the phone already belongs to a WhatsApp conversation with us: send the code from that number to link up. */
  verify_code?: string;
  claim_address?: string;
}

export async function submitContact(request: ContactRequest): Promise<ContactResult> {
  // Not optional, unlike VITE_API_BASE_URL: this form has no mock fallback, so an
  // unset value means every submit fails. It lives only in .env (gitignored), so a
  // build made anywhere else needs it set in that environment's build config.
  if (!env.chatApiBaseUrl) throw new Error("VITE_CHAT_API_BASE_URL is not set — the contact form has nowhere to post");
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
  const text = await res.text();
  return text ? (JSON.parse(text) as ContactResult) : {};
}
