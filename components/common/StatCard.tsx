import React from 'react';
import { Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  bg: string;
  subtitle?: string;
}

export function StatCard({ label, value, icon, color, bg, subtitle }: StatCardProps) {
  return (
    <Card style={{ flex: 1, backgroundColor: bg, borderColor: color + '22', borderWidth: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            backgroundColor: color + '22',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>{icon}</Text>
        </View>
        <Text style={{ fontSize: 12, color, fontWeight: '700', flex: 1 }} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <Text style={{ fontSize: 22, fontWeight: '800', color, marginBottom: subtitle ? 2 : 0 }}>
        {value}
      </Text>
      {subtitle && (
        <Text style={{ fontSize: 11, color: color + 'AA' }}>{subtitle}</Text>
      )}
    </Card>
  );
}
