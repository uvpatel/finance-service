import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/layout/Header';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

export default function AdminIndexScreen() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Admin" subtitle="Administration Panel" />
      <ScreenWrapper scroll padded>
        {/* Admin Profile Card */}
        <Card style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: Colors.primary[700] }}>
          <Avatar name={user?.name ?? 'Admin'} size={56} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.white }}>{user?.name ?? 'Administrator'}</Text>
            <Text style={{ fontSize: 12, color: Colors.primary[200], marginTop: 2 }}>{user?.email ?? 'admin@devangfinancial.com'}</Text>
            <Badge label={user?.role ?? 'admin'} variant="primary" size="sm" style={{ marginTop: 6 }} />
          </View>
        </Card>

        {/* Navigation Items */}
        {[
          { label: 'User Management', icon: '👥', route: '/(dashboard)/admin/users', desc: 'Add, edit, and manage system users' },
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

        {/* System Info */}
        <Card style={{ backgroundColor: Colors.gray[50], borderColor: Colors.border, borderWidth: 1, marginTop: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10 }}>⚙️ System Information</Text>
          {[
            ['App Version', 'v1.0.0'],
            ['Environment', 'Production'],
            ['API Status', 'Connected'],
            ['Last Sync', 'Today, 11:30 PM'],
          ].map(([k, v]) => (
            <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
              <Text style={{ fontSize: 13, color: Colors.textSecondary }}>{k}</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.textPrimary }}>{v}</Text>
            </View>
          ))}
        </Card>
      </ScreenWrapper>
    </View>
  );
}
