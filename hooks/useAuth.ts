import { useCallback } from 'react';

import { useAuthStore } from '@/store/auth.store';
import type { LoginCredentials } from '@/types';

export function useAuth() {
  const {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login: storeLogin,
    logout: storeLogout,
    loadStoredSession,
    updateUser,
  } = useAuthStore();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await storeLogin(credentials);
    },
    [storeLogin]
  );

  const logout = useCallback(async () => {
    await storeLogout();
  }, [storeLogout]);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    loadStoredSession,
    updateUser,
  };
}
