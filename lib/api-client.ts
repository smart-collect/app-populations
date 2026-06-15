import { getToken, removeToken, removeUser, saveToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export class ApiClientError extends Error {
  code: string;
  details?: Record<string, string>;

  constructor(
    message: string,
    code = "UNKNOWN_ERROR",
    details?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiClientError";
    this.code = code;
    this.details = details;
  }
}

async function readJson<T>(response: Response): Promise<ApiResponse<T> | null> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as ApiResponse<T>;
  } catch {
    return null;
  }
}

async function refreshToken(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return false;

    const json = await readJson<{ token: string }>(response);
    if (!json?.success) return false;

    saveToken(json.data.token);
    return true;
  } catch {
    return false;
  }
}

function clearSession(): void {
  removeToken();
  removeUser();
}

async function parseResponse<T>(response: Response): Promise<T> {
  const json = await readJson<T>(response);

  if (!json) {
    if (response.ok) return undefined as T;
    throw new ApiClientError(
      "Réponse serveur invalide. Réessaie plus tard.",
      "INVALID_RESPONSE"
    );
  }

  if (!json.success) {
    throw new ApiClientError(
      json.error.message,
      json.error.code,
      json.error.details
    );
  }

  return json.data;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && retry) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return request<T>(path, options, false);
    }

    clearSession();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new ApiClientError("Session expirée", "UNAUTHORIZED");
  }

  return parseResponse<T>(response);
}

export const apiClient = {
  get<T>(path: string) {
    return request<T>(path, { method: "GET" });
  },

  post<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  patch<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(path: string) {
    return request<T>(path, { method: "DELETE" });
  },

  postFormData<T>(path: string, formData: FormData) {
    return request<T>(path, {
      method: "POST",
      body: formData,
    });
  },
};
