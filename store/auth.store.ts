import { create } from 'zustand';

import { authService } from '@/services/auth';
import type { AuthState, AuthUser, LoginCredentials } from '@/types';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredSession: () => Promise<void>;
  updateUser: (user: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // ── Initial State ────────────────────────────────────────────────────────────
  user:            null,
  accessToken:     null,
  refreshToken:    null,
  isAuthenticated: false,
  isLoading:       true,

  // ── Actions ──────────────────────────────────────────────────────────────────

  async login(credentials) {
    set({ isLoading: true });
    try {
      const { user, tokens } = await authService.login(credentials);
      set({
        user,
        accessToken:     tokens.accessToken,
        refreshToken:    tokens.refreshToken,
        isAuthenticated: true,
        isLoading:       false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  async logout() {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({
        user:            null,
        accessToken:     null,
        refreshToken:    null,
        isAuthenticated: false,
        isLoading:       false,
      });
    }
  },

  async loadStoredSession() {
    set({ isLoading: true });
    try {
      const stored = await authService.loadStoredSession();
      if (stored) {
        set({
          user:            stored.user,
          accessToken:     stored.accessToken,
          isAuthenticated: true,
        });
      }
    } catch {
      // Silent fail — user redirected to login
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser(partial) {
    const current = get().user;
    if (current) set({ user: { ...current, ...partial } });
  },
}));
