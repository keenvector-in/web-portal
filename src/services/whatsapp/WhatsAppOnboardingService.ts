import { env } from "../../config/env";
import { ApiRequestError, apiPost } from "../api/client";

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
  startSignup(): Promise<WhatsAppConnectionStatus>;
  disconnect(): Promise<void>;
  handleCallback(params: URLSearchParams): Promise<void>;
  getConnectionStatus(): Promise<WhatsAppConnectionStatus>;
}

const MOCK_STORAGE_KEY = "kv_whatsapp_mock_connection";

/** True once both Meta app + Embedded Signup config are set — otherwise we mock. */
function hasRealMetaConfig(): boolean {
  return Boolean(env.metaAppId && env.whatsappConfigId);
}

function readMockConnection(): WhatsAppConnectionStatus | null {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WhatsAppConnectionStatus) : null;
  } catch {
    return null;
  }
}

function loadFacebookSdk(appId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.FB) {
      resolve();
      return;
    }
    window.fbAsyncInit = () => {
      window.FB!.init({ appId, xfbml: false, version: "v21.0" });
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Could not load the Facebook SDK."));
    document.body.appendChild(script);
  });
}

/** Opens Meta's WhatsApp Embedded Signup popup and resolves with the auth code. */
function launchEmbeddedSignup(configId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    window.FB!.login(
      (response) => {
        const code = response.authResponse?.code;
        if (response.authResponse && code) {
          resolve(code);
        } else {
          reject(new Error("WhatsApp signup was cancelled or denied."));
        }
      },
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
      },
    );
  });
}

class WhatsAppOnboardingServiceImpl implements WhatsAppOnboardingService {
  async startSignup(): Promise<WhatsAppConnectionStatus> {
    if (!hasRealMetaConfig()) {
      // ponytail: no Meta app configured (local/demo) — mock a successful
      // connection so the flow can be exercised end to end. Upgrade path: set
      // VITE_META_APP_ID + VITE_WHATSAPP_CONFIG_ID once a real Meta app exists.
      await new Promise((r) => setTimeout(r, 600));
      const mock: WhatsAppConnectionStatus = {
        state: "available",
        phoneNumber: "+91 90000 00000 (demo)",
        businessAccountId: "demo-waba-000000",
      };
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(mock));
      return mock;
    }

    await loadFacebookSdk(env.metaAppId);
    const code = await launchEmbeddedSignup(env.whatsappConfigId);

    try {
      return await apiPost<WhatsAppConnectionStatus, { code: string }>("/v1/whatsapp/embedded-signup", {
        code,
      });
    } catch (error) {
      if (error instanceof ApiRequestError && error.code === "no_backend_configured") {
        throw new Error("WhatsApp is configured for live signup but no backend is set — add VITE_API_BASE_URL.");
      }
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    localStorage.removeItem(MOCK_STORAGE_KEY);
    try {
      await apiPost<{ disconnected: boolean }, Record<string, never>>("/v1/whatsapp/disconnect", {});
    } catch (error) {
      if (!(error instanceof ApiRequestError && error.code === "no_backend_configured")) {
        throw error;
      }
    }
  }

  async handleCallback(params: URLSearchParams): Promise<void> {
    const code = params.get("code");
    if (!code) return;
    await apiPost<WhatsAppConnectionStatus, { code: string }>("/v1/whatsapp/embedded-signup", { code });
  }

  async getConnectionStatus(): Promise<WhatsAppConnectionStatus> {
    if (!env.enableWhatsApp) return { state: "coming_soon" };

    const mock = readMockConnection();
    if (mock) return mock;

    if (!env.apiBaseUrl) {
      // No backend to check against yet — connect flow is ready (it will mock).
      return { state: "available" };
    }

    return { state: hasRealMetaConfig() ? "available" : "configuration_required" };
  }
}

export const whatsAppOnboardingService: WhatsAppOnboardingService =
  new WhatsAppOnboardingServiceImpl();
