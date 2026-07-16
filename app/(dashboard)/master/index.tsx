import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';

const MASTER_ITEMS = [
  { label: 'Company',          route: '/(dashboard)/master/company',          icon: '🏢', desc: 'Manage company records'             },
  { label: 'Dealer',           route: '/(dashboard)/master/dealer',           icon: '🤝', desc: 'Add and manage dealers'              },
  { label: 'Broker',           route: '/(dashboard)/master/broker',           icon: '👔', desc: 'Manage broker information'           },
  { label: 'Finance Company',  route: '/(dashboard)/master/finance-company',  icon: '🏦', desc: 'Finance company configuration'       },
  { label: 'Own Bank',         route: '/(dashboard)/master/own-bank',         icon: '🏛️', desc: 'Manage own bank accounts'           },
  { label: 'Insurance',        route: '/(dashboard)/master/insurance',        icon: '🛡️', desc: 'Insurance company details'          },
  { label: 'Expenses',         route: '/(dashboard)/master/expenses',         icon: '💸', desc: 'Track expense categories'           },
];

export default function MasterIndexScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Master" subtitle="Manage master data" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 13, color: Colors.textSecondary, marginBottom: 16 }}>
          Configure system-wide master data used across forms and reports.
        </Text>
        {MASTER_ITEMS.map(item => (
          <TouchableOpacity key={item.route} onPress={() => router.push(item.route as any)} activeOpacity={0.8} style={{ marginBottom: 10 }}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.textPrimary }}>{item.label}</Text>
                  <Text style={{ fontSize: 12, color: Colors.textSecondary, marginTop: 2 }}>{item.desc}</Text>
                </View>
                <Text style={{ color: Colors.primary[400], fontSize: 20 }}>›</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
