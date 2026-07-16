import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const MAP: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: '#DCFCE7', text: '#15803D' },
  warning: { bg: '#FEF3C7', text: '#B45309' },
  error:   { bg: '#FEE2E2', text: '#B91C1C' },
  info:    { bg: '#CFFAFE', text: '#0E7490' },
  neutral: { bg: Colors.gray[100], text: Colors.gray[600] },
  primary: { bg: Colors.primary[100], text: Colors.primary[700] },
};

export function Badge({ label, variant = 'neutral', size = 'md' }: BadgeProps) {
  const { bg, text } = MAP[variant];
  return (
    <View
      style={{
        backgroundColor: bg,
        paddingHorizontal: size === 'sm' ? 6 : 10,
        paddingVertical:  size === 'sm' ? 2 : 4,
        borderRadius: 99,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ color: text, fontSize: size === 'sm' ? 10 : 12, fontWeight: '700' }}>
        {label}
      </Text>
    </View>
  );
}
