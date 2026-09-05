import { ApiRequestError, apiPost } from "./client";

export interface ContactRequest {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  received: boolean;
}

/**
 * Posts the contact form. If no backend is configured for this environment (local/demo),
 * resolves as if it succeeded rather than surfacing a dead endpoint to the visitor.
 */
export async function submitContact(request: ContactRequest): Promise<ContactResponse> {
  try {
    return await apiPost<ContactResponse, ContactRequest>("/v1/contact", request);
  } catch (error) {
    if (error instanceof ApiRequestError && error.code === "no_backend_configured") {
      return { received: true };
    }
    throw error;
  }
}
