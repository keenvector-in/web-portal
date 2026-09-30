import { env } from "../../config/env";
import { ApiRequestError, apiPost } from "./client";

// Shapes match edge-gateway's POST /api/auth/login and /api/auth/signup.
export interface AuthUser {
  id: string;
  email: string;
  role: string;
  tenant_id: string | null;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

export interface SignupRequest {
  business_name: string;
  email: string;
  password: string;
}

// Signup answers {user: null} when the account was created but the session
// could not be started — the caller should just send them to sign in.
export type SignupResponse = TokenPair | { user: null };

const demoPair: TokenPair = {
  access_token: "",
  refresh_token: "",
  user: { id: "demo-user", email: "", role: "business_admin", tenant_id: "demo-tenant" },
};

async function withDemoFallback<T>(call: () => Promise<T>, demo: T): Promise<T> {
  try {
    return await call();
  } catch (error) {
    if (error instanceof ApiRequestError && error.code === "no_backend_configured") return demo;
    throw error;
  }
}

/** Creates a tenant and its first admin. With no edge-gateway configured, returns a mock. */
export function signup(request: SignupRequest): Promise<SignupResponse> {
  return withDemoFallback(
    () => apiPost<SignupResponse, SignupRequest>("/api/auth/signup", request, env.edgeGatewayBaseUrl),
    demoPair,
  );
}

export interface LoginRequest {
  email: string;
  password: string;
}

export function login(request: LoginRequest): Promise<TokenPair> {
  return withDemoFallback(
    () => apiPost<TokenPair, LoginRequest>("/api/auth/login", request, env.edgeGatewayBaseUrl),
    demoPair,
  );
}

/** Revokes a refresh token; fire-and-forget because the page is about to leave. */
function revoke(refreshToken: string): void {
  void fetch(`${env.edgeGatewayBaseUrl}/api/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
    keepalive: true,
  }).catch(() => undefined);
}

/**
 * Single sign-in: this site's session can't travel to business-admin-portal (its
 * refresh token lives in that origin's localStorage), so trade the new access
 * token for a one-use handoff ticket and let business-admin's /handoff page spend
 * it. The tokens here are only ever in memory and go with the navigation. If the
 * ticket can't be had, fall back to revoking the session and sending the user to
 * business-admin's sign-in.
 */
export async function continueToBusinessAdmin(session?: { access_token: string; refresh_token: string }): Promise<void> {
  // No portal configured (local demo): back to the marketing home.
  if (!env.businessAdminBaseUrl) {
    window.location.assign("/");
    return;
  }
  if (session?.access_token && env.edgeGatewayBaseUrl) {
    try {
      const res = await fetch(`${env.edgeGatewayBaseUrl}/api/auth/handoff/ticket`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const { ticket } = (await res.json()) as { ticket?: string };
        if (ticket) {
          // replace: the one-use ticket URL must not sit in history.
          window.location.replace(`${env.businessAdminBaseUrl}/handoff?ticket=${encodeURIComponent(ticket)}&next=${encodeURIComponent("/dashboard")}`);
          return;
        }
      }
    } catch {
      // network error: fall through to the sign-in page
    }
  }
  if (session?.refresh_token && env.edgeGatewayBaseUrl) revoke(session.refresh_token);
  window.location.assign(`${env.businessAdminBaseUrl}/login`);
}
