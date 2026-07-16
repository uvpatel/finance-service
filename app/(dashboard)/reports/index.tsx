import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/common/StatCard';
import { Card } from '@/components/ui/Card';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';

const REPORT_MENU = [
  { label: 'RTO Payment',       icon: '🚗', route: '/(dashboard)/reports/rto-payment',       desc: 'RTO payment summary and records'    },
  { label: 'Insurance Payment', icon: '🛡️', route: '/(dashboard)/reports/insurance-payment', desc: 'Insurance payment history'           },
  { label: 'Expense Out',       icon: '💸', route: '/(dashboard)/reports/expense-out',       desc: 'Outgoing expense reports'           },
  { label: 'Advance Dealer',    icon: '🤝', route: '/(dashboard)/reports/advance-dealer',    desc: 'Advance given to dealers and brokers'},
];

const STATS = [
  { label: 'RTO Collected',     value: '₹1,24,500', icon: '🚗', color: '#0891B2', bg: '#ECFEFF' },
  { label: 'Insurance Paid',    value: '₹2,85,000', icon: '🛡️', color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Expense Out',       value: '₹42,800',   icon: '💸', color: '#DC2626', bg: '#FEF2F2' },
  { label: 'Dealer Advance',    value: '₹85,000',   icon: '🤝', color: '#D97706', bg: '#FFFBEB' },
];

export default function ReportsIndexScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Reports" subtitle="Financial Reports Dashboard" />
      <ScreenWrapper scroll padded>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {STATS.map((s, i) => (
            <View key={i} style={{ width: '47.5%' }}>
              <StatCard {...s} />
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 }}>Report Categories</Text>
        {REPORT_MENU.map(item => (
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
