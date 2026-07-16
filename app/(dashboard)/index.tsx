import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/common/StatCard';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

const STATS = [
  { label: 'Total Customers', value: '189', icon: '👥', color: '#4F46E5', bg: '#EEF2FF', subtitle: '+12 this month' },
  { label: 'Active Files',    value: '142', icon: '📁', color: '#0891B2', bg: '#ECFEFF', subtitle: '89% active rate'  },
  { label: 'Payments Today',  value: '₹84,200', icon: '💰', color: '#16A34A', bg: '#F0FDF4', subtitle: '8 transactions' },
  { label: 'Pending',         value: '47',  icon: '⏳', color: '#D97706', bg: '#FFFBEB', subtitle: 'Needs attention' },
];

const QUICK_ACTIONS = [
  { label: 'Add Customer',   icon: '👤', route: '/(dashboard)/customers/add',       color: '#4F46E5' },
  { label: 'Add File',       icon: '📁', route: '/(dashboard)/customers/files',      color: '#0891B2' },
  { label: 'Upload Docs',    icon: '📄', route: '/(dashboard)/customers/documents',  color: '#16A34A' },
  { label: 'Add Payment',    icon: '💳', route: '/(dashboard)/payment/payment',      color: '#D97706' },
  { label: 'View Reports',   icon: '📊', route: '/(dashboard)/reports',             color: '#7C3AED' },
  { label: 'Master Data',    icon: '⚙️', route: '/(dashboard)/master',              color: '#DC2626' },
];

const RECENT_CUSTOMERS = [
  { id: 228, name: 'SHIRAJSHA DIWAN',          mobile: '9624810258', fileNo: '140825113', status: 'active' },
  { id: 227, name: 'RAHUL KUMAR THAKOR',       mobile: '7016378887', fileNo: '140825617', status: 'pending' },
  { id: 226, name: 'JILUBHAI SOLANKI',         mobile: '8141300564', fileNo: '140825974', status: 'active' },
  { id: 225, name: 'RATHVA PRAVINBHAI',        mobile: '9427808785', fileNo: '140825630', status: 'active' },
  { id: 224, name: 'VIKASHBHAI GMIRBHAI MEDA', mobile: '7069579732', fileNo: '140825353', status: 'closed' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Dashboard" subtitle="Devang Financial Service" />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        {/* Welcome */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.textPrimary }}>
            Hello, {user?.name?.split(' ')[0] ?? 'Admin'} 👋
          </Text>
          <Text style={{ fontSize: 13, color: Colors.textSecondary, marginTop: 2 }}>
            Here's what's happening today
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {STATS.map((s, i) => (
            <View key={i} style={{ width: '47.5%' }}>
              <StatCard {...s} />
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 }}>
          Quick Actions
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {QUICK_ACTIONS.map((qa, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(qa.route as any)}
              activeOpacity={0.8}
              style={{
                width: '30.5%',
                backgroundColor: Colors.surface,
                borderRadius: 14,
                padding: 14,
                alignItems: 'center',
                gap: 8,
                borderWidth: 1,
                borderColor: Colors.border,
                shadowColor: '#000',
                shadowOpacity: 0.04,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: qa.color + '18',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 22 }}>{qa.icon}</Text>
              </View>
              <Text style={{ fontSize: 11, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' }}>
                {qa.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Customers */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.textPrimary }}>Recent Customers</Text>
          <TouchableOpacity onPress={() => router.push('/(dashboard)/customers' as any)}>
            <Text style={{ fontSize: 13, color: Colors.primary[600], fontWeight: '700' }}>See All →</Text>
          </TouchableOpacity>
        </View>

        <Card padded={false}>
          {RECENT_CUSTOMERS.map((c, i) => (
            <View
              key={c.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 14,
                paddingVertical: 12,
                backgroundColor: i % 2 === 0 ? Colors.surface : Colors.gray[50],
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  backgroundColor: Colors.primary[100],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: Colors.primary[700], fontWeight: '800', fontSize: 13 }}>
                  {c.name.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.textPrimary }} numberOfLines={1}>
                  {c.name}
                </Text>
                <Text style={{ fontSize: 11, color: Colors.textSecondary }}>{c.mobile}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 10, color: Colors.primary[600], fontWeight: '700', textAlign: 'right' }}>
                  {c.fileNo}
                </Text>
                <View
                  style={{
                    backgroundColor:
                      c.status === 'active' ? '#DCFCE7' : c.status === 'pending' ? '#FEF3C7' : Colors.gray[100],
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 99,
                    marginTop: 2,
                    alignSelf: 'flex-end',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '700',
                      color: c.status === 'active' ? '#15803D' : c.status === 'pending' ? '#B45309' : Colors.gray[500],
                      textTransform: 'uppercase',
                    }}
                  >
                    {c.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}
