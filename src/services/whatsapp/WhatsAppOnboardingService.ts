import { env } from "../../config/env";

export type WhatsAppConnectionState = "available" | "coming_soon" | "configuration_required";

export interface WhatsAppConnectionStatus {
  state: WhatsAppConnectionState;
  phoneNumber?: string;
  businessAccountId?: string;
}

/**
 * The frontend only ever initiates this flow and displays status — token exchange,
 * WABA IDs, and phone number IDs are handled entirely by the backend via Meta's
 * Embedded Signup. No Meta credentials are ever read or stored here.
 */
export interface WhatsAppOnboardingService {
  startSignup(): Promise<void>;
  handleCallback(params: URLSearchParams): Promise<void>;
  getConnectionStatus(): Promise<WhatsAppConnectionStatus>;
}

class StubWhatsAppOnboardingService implements WhatsAppOnboardingService {
  async startSignup(): Promise<void> {
    // ponytail: stub until the backend exposes Meta Embedded Signup; upgrade by
    // redirecting to the backend-issued signup URL once that endpoint exists.
  }

  async handleCallback(): Promise<void> {}

  async getConnectionStatus(): Promise<WhatsAppConnectionStatus> {
    return { state: env.enableWhatsApp ? "configuration_required" : "coming_soon" };
  }
}

export const whatsAppOnboardingService: WhatsAppOnboardingService =
  new StubWhatsAppOnboardingService();
