import type { ValidationErrors } from "@/types/api";

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1"
).replace(/\/+$/, "");

interface ErrorResponse {
  message?: string;
  errors?: ValidationErrors;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: ValidationErrors,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiRequestOptions extends Omit<RequestInit, "headers"> {
  token?: string | null;
  headers?: Record<string, string>;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { token, headers, ...requestOptions } = options;
  const hasJsonBody =
    requestOptions.body !== undefined &&
    !(requestOptions.body instanceof FormData);

  let response: Response;

  try {
    response = await fetch(`${API_URL}/${endpoint.replace(/^\/+/, "")}`, {
      ...requestOptions,
      headers: {
        Accept: "application/json",
        ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  } catch {
    throw new ApiError(
      "Tidak dapat terhubung ke server. Pastikan backend Laravel sedang berjalan.",
      0,
    );
  }

  const payload = (await response.json().catch(() => null)) as
    | T
    | ErrorResponse
    | null;

  if (!response.ok) {
    const errorPayload = payload as ErrorResponse | null;
    const firstValidationMessage = errorPayload?.errors
      ? Object.values(errorPayload.errors)[0]?.[0]
      : undefined;

    const error = new ApiError(
      firstValidationMessage ??
        errorPayload?.message ??
        "Permintaan tidak dapat diproses.",
      response.status,
      errorPayload?.errors,
    );

    if (response.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("arcanisia:unauthorized"));
    }

    throw error;
  }

  return payload as T;
}

export function fieldError(
  errors: ValidationErrors | undefined,
  field: string,
): string | undefined {
  return errors?.[field]?.[0];
}

export function resolveAssetUrl(value: string | null): string | null {
  if (!value || !value.startsWith("/storage/")) return value;
  return `${new URL(API_URL).origin}${value}`;
}
