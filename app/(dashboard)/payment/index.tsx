import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/common/StatCard';
import { Card } from '@/components/ui/Card';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';

const STATS = [
  { label: 'Total Collected', value: '₹12,45,800', icon: '💰', color: '#16A34A', bg: '#F0FDF4', subtitle: 'All time' },
  { label: 'This Month',      value: '₹89,400',    icon: '📅', color: '#0891B2', bg: '#ECFEFF', subtitle: 'July 2025'  },
  { label: 'Pending',         value: '₹2,15,200',  icon: '⏳', color: '#D97706', bg: '#FFFBEB', subtitle: '23 files'   },
  { label: 'Commission Due',  value: '₹18,500',    icon: '📈', color: '#7C3AED', bg: '#F5F3FF', subtitle: '5 agents'   },
];

export default function PaymentIndexScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Payment" subtitle="Payment Management" />
      <ScreenWrapper scroll padded>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {STATS.map((s, i) => (
            <View key={i} style={{ width: '47.5%' }}>
              <StatCard {...s} />
            </View>
          ))}
        </View>
        {[
          { label: 'Add Payment',    icon: '💳', route: '/(dashboard)/payment/payment',    desc: 'Record a new payment entry'  },
          { label: 'Commission',     icon: '📈', route: '/(dashboard)/payment/commission', desc: 'Manage agent commissions'     },
        ].map(item => (
          <TouchableOpacity key={item.route} onPress={() => router.push(item.route as any)} activeOpacity={0.8} style={{ marginBottom: 10 }}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary }}>{item.label}</Text>
                  <Text style={{ fontSize: 12, color: Colors.textSecondary }}>{item.desc}</Text>
                </View>
                <Text style={{ color: Colors.primary[400], fontSize: 20 }}>›</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScreenWrapper>
    </View>
  );
}
