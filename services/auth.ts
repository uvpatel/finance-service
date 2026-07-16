import { ENDPOINTS, STORAGE_KEYS } from '@/constants';
import type { AuthTokens, AuthUser, LoginCredentials } from '@/types';
import { storage } from '@/utils/storage';
import api from './api';

// ─── Auth Service ─────────────────────────────────────────────────────────────

export const authService = {
  /** POST /auth/login */
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    const { data } = await api.post<{
      user: AuthUser;
      accessToken: string;
      refreshToken: string;
    }>(ENDPOINTS.AUTH.LOGIN, credentials);

    const tokens: AuthTokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    // Persist to secure storage
    await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    await storage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    if (credentials.rememberMe) {
      await storage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
    }

    return { user: data.user, tokens };
  },

  /** POST /auth/logout */
  async logout(): Promise<void> {
    try {
      await api.post(ENDPOINTS.AUTH.LOGOUT);
    } finally {
      await storage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER,
        STORAGE_KEYS.REMEMBER_ME,
      ]);
    }
  },

  /** POST /auth/forgot-password */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await api.post<{ message: string }>(
      ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    );
    return data;
  },

  /** GET /auth/profile */
  async getProfile(): Promise<AuthUser> {
    const { data } = await api.get<AuthUser>(ENDPOINTS.AUTH.PROFILE);
    return data;
  },

  /** Read persisted session from secure storage */
  async loadStoredSession(): Promise<{
    user: AuthUser;
    accessToken: string;
  } | null> {
    const [accessToken, userJson] = await Promise.all([
      storage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
      storage.getItem(STORAGE_KEYS.USER),
    ]);
    if (!accessToken || !userJson) return null;
    try {
      return { accessToken, user: JSON.parse(userJson) as AuthUser };
    } catch {
      return null;
    }
  },
};
