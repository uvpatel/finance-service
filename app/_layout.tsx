import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { LoadingScreen } from '@/components/common/LoadingScreen';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/auth.store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 min
    },
  },
});

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, loadStoredSession } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadStoredSession();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(dashboard)');
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) return <LoadingScreen message="Devang Financial Service..." />;

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(dashboard)" />
        </Stack>
      </AuthGuard>
      <StatusBar style="light" />
    </QueryClientProvider>
  );
}
