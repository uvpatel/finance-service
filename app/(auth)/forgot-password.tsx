import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';
import { authService } from '@/services/auth';
import { getApiErrorMessage } from '@/utils/helpers';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
});
type Form = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [sent, setSent] = useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }: Form) => {
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      Alert.alert('Error', getApiErrorMessage(err));
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
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text style={{ fontSize: 48 }}>{sent ? '✅' : '🔑'}</Text>
        </View>

        <Card elevated radius={20}>
          {sent ? (
            <View style={{ alignItems: 'center', gap: 12 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' }}>
                Email Sent!
              </Text>
              <Text style={{ fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 }}>
                Check your inbox for a password reset link.
              </Text>
              <Button label="Back to Login" onPress={() => router.back()} fullWidth size="lg" style={{ marginTop: 12 }} />
            </View>
          ) : (
            <>
              <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 }}>
                Forgot Password
              </Text>
              <Text style={{ fontSize: 13, color: Colors.textSecondary, marginBottom: 24 }}>
                Enter your registered email and we'll send you a reset link.
              </Text>

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
                    returnKeyType="send"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    error={errors.email?.message}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    leftIcon={<Text style={{ fontSize: 16 }}>📧</Text>}
                  />
                )}
              />

              <Button label="Send Reset Link" onPress={handleSubmit(onSubmit)} loading={isSubmitting} fullWidth size="lg" />
              <Button label="Back to Login" onPress={() => router.back()} variant="ghost" fullWidth size="md" style={{ marginTop: 8 }} />
            </>
          )}
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
