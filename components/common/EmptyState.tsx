import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'No Data Found',
  description = 'There are no records to display at this time.',
  icon = '📭',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
      <Text style={{ fontSize: 56 }}>{icon}</Text>
      <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' }}>
        {title}
      </Text>
      <Text style={{ fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 }}>
        {description}
      </Text>
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} variant="primary" size="sm" style={{ marginTop: 8 }} />
      )}
    </View>
  );
}
