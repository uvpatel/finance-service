import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/utils/helpers';

// ─── Schema ───────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email:      z.string().min(1, 'Email is required').email('Enter a valid email'),
  password:   z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
      router.replace('/(dashboard)');
    } catch (err) {
      Alert.alert('Login Failed', getApiErrorMessage(err));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.primary[700] }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Brand Header ──────────────────────────── */}
        <View style={{ alignItems: 'center', marginBottom: 36 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: Colors.primary[500],
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 8,
            }}
          >
            <Text style={{ fontSize: 30 }}>🏦</Text>
          </View>
          <Text style={{ fontSize: 26, fontWeight: '800', color: Colors.white, letterSpacing: 0.3 }}>
            Devang Financial
          </Text>
          <Text style={{ fontSize: 13, color: Colors.primary[200], marginTop: 4 }}>
            Finance & Insurance Management
          </Text>
        </View>

        {/* ── Login Card ────────────────────────────── */}
        <Card elevated radius={20}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 }}>
            Welcome Back 👋
          </Text>
          <Text style={{ fontSize: 13, color: Colors.textSecondary, marginBottom: 24 }}>
            Sign in to your account to continue
          </Text>

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email Address"
                required
                placeholder="you@company.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                returnKeyType="next"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.email?.message}
                leftIcon={<Text style={{ fontSize: 16 }}>📧</Text>}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                required
                placeholder="Enter your password"
                isPassword
                autoComplete="current-password"
                returnKeyType="done"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.password?.message}
                onSubmitEditing={handleSubmit(onSubmit)}
                leftIcon={<Text style={{ fontSize: 16 }}>🔐</Text>}
              />
            )}
          />

          {/* Remember Me + Forgot Password */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  onPress={() => onChange(!value)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: value ? Colors.primary[600] : Colors.border,
                      backgroundColor: value ? Colors.primary[600] : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {value && <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '800' }}>✓</Text>}
                  </View>
                  <Text style={{ fontSize: 13, color: Colors.textSecondary }}>Remember me</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
              <Text style={{ fontSize: 13, color: Colors.primary[600], fontWeight: '700' }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <Button
            label="Sign In"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            fullWidth
            size="lg"
          />
        </Card>

        <Text style={{ textAlign: 'center', marginTop: 24, color: Colors.primary[200], fontSize: 12 }}>
          © 2025 Devang Financial Service
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
