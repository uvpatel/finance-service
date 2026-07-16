import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
      <Text style={{ fontSize: 52 }}>⚠️</Text>
      <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' }}>
        {title}
      </Text>
      <Text style={{ fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 }}>
        {message}
      </Text>
      {onRetry && (
        <Button label="Retry" onPress={onRetry} variant="outline" size="sm" style={{ marginTop: 8 }} />
      )}
    </View>
  );
}
