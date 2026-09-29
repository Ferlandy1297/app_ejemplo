const API_BASE_URL = '/api';
const ACCESS_TOKEN_KEY = 'app_auth_token';
const REFRESH_TOKEN_KEY = 'app_refresh_token';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}

interface RefreshTokenData {
  token: string;
  refreshToken: string;
}

export class HttpClient {
  static readonly SESSION_EXPIRED_EVENT = 'auth:session-expired';
  private static refreshPromise: Promise<void> | null = null;

  private static getStoredValue(key: string): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private static getHeaders(customHeaders?: HeadersInit): Headers {
    const headers = new Headers(customHeaders);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');

    const token = this.getStoredValue(ACCESS_TOKEN_KEY);
    if (token) headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }

  private static async renewAccessToken(): Promise<void> {
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = (async () => {
      const refreshToken = this.getStoredValue(REFRESH_TOKEN_KEY);
      if (!refreshToken) throw new Error('No existe un refresh token para renovar la sesión');

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
        cache: 'no-store',
      });

      const responseData = (await response.json().catch(() => null)) as
        | ApiResponse<RefreshTokenData>
        | null;

      if (!response.ok || !responseData?.success || !responseData.data?.token) {
        throw new Error(responseData?.message || 'No fue posible renovar la sesión');
      }

      localStorage.setItem(ACCESS_TOKEN_KEY, responseData.data.token);
      localStorage.setItem(REFRESH_TOKEN_KEY, responseData.data.refreshToken);
    })()
      .catch((error) => {
        this.clearSession();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event(this.SESSION_EXPIRED_EVENT));
        }
        throw error;
      })
      .finally(() => {
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  static storeTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  static clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem('app_user_session');
  }

  static forceExpiredAccessTokenForDemo(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, 'access-token-expirado-para-demo');
    }
  }

  static async request<T>(
    endpoint: string,
    options: RequestInit = {},
    allowRefresh = true
  ): Promise<T> {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${API_BASE_URL}${normalizedEndpoint}`, {
      ...options,
      headers: this.getHeaders(options.headers),
      cache: 'no-store',
    });

    if (
      response.status === 401 &&
      allowRefresh &&
      normalizedEndpoint !== '/auth/login' &&
      normalizedEndpoint !== '/auth/refresh'
    ) {
      await this.renewAccessToken();
      return this.request<T>(normalizedEndpoint, options, false);
    }

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg =
        responseData?.message ||
        (responseData?.data && typeof responseData.data === 'object'
          ? Object.values(responseData.data).join(', ')
          : 'Error en la petición al servidor');
      throw new Error(errorMsg);
    }

    return responseData as T;
  }

  static async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  static async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  static async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
