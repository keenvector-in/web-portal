import { env } from "../../config/env";

export interface ApiError {
  status: number;
  code: string;
  message: string;
}

export class ApiRequestError extends Error implements ApiError {
  status: number;
  code: string;

  constructor(error: ApiError) {
    super(error.message);
    this.status = error.status;
    this.code = error.code;
  }
}

export async function apiPost<TResponse, TBody extends object>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  if (!env.apiBaseUrl) {
    throw new ApiRequestError({
      status: 0,
      code: "no_backend_configured",
      message: "No backend configured for this environment.",
    });
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new ApiRequestError({
      status: response.status,
      code: payload?.code ?? "request_failed",
      message: payload?.message ?? "The request could not be completed. Please try again.",
    });
  }

  return response.json() as Promise<TResponse>;
}
