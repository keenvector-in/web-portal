import { ApiRequestError, apiPost } from "./client";

export interface RegisterRequest {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  userId: string;
  tenantId: string;
}

/**
 * Registers a new account. With no backend configured (local/demo), returns a mock
 * response so the onboarding flow can still be exercised end to end.
 */
export async function register(request: RegisterRequest): Promise<RegisterResponse> {
  try {
    return await apiPost<RegisterResponse, RegisterRequest>("/v1/auth/register", request);
  } catch (error) {
    if (error instanceof ApiRequestError && error.code === "no_backend_configured") {
      return { userId: "demo-user", tenantId: "demo-tenant" };
    }
    throw error;
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  tenantId: string;
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  try {
    return await apiPost<LoginResponse, LoginRequest>("/v1/auth/login", request);
  } catch (error) {
    if (error instanceof ApiRequestError && error.code === "no_backend_configured") {
      return { userId: "demo-user", tenantId: "demo-tenant" };
    }
    throw error;
  }
}
