import React from 'react';
import { Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';

interface InsuranceRecord { id: number; customerName: string; company: string; policyNo: string; premium: number; from: string; to: string; status: string; }

const COLUMNS: Column<InsuranceRecord>[] = [
  { key: 'customerName', header: 'Customer', flex: 1 },
  { key: 'company',      header: 'Insurer',  width: 110 },
  { key: 'premium',      header: 'Premium',  width: 80, render: v => <Text style={{ fontSize: 12, color: Colors.primary[600], fontWeight: '700' }}>₹{Number(v).toLocaleString('en-IN')}</Text> },
  { key: 'status',       header: 'Status',   width: 70, render: v => <Badge label={String(v)} variant={v === 'active' ? 'success' : 'warning'} size="sm" /> },
];

const MOCK: InsuranceRecord[] = [
  { id: 1, customerName: 'REVABHAI DAMOR',  company: 'New India', policyNo: 'NI2025001', premium: 12000, from: '01/01/2025', to: '31/12/2025', status: 'active'  },
  { id: 2, customerName: 'MEHNDI VIRANI',   company: 'ICICI Lombard', policyNo: 'IC2025002', premium: 8500, from: '01/02/2025', to: '31/01/2026', status: 'active'  },
  { id: 3, customerName: 'PRADIPBHAI AHIR', company: 'New India', policyNo: 'NI2025003', premium: 15000, from: '01/03/2025', to: '28/02/2026', status: 'expired' },
];

export default function InsurancePaymentScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Insurance Payment" subtitle="Reports > Insurance Payment" />
      <ScreenWrapper padded>
        <Card style={{ flexDirection: 'row', gap: 12, marginBottom: 16, backgroundColor: '#F5F3FF', borderColor: '#DDD6FE', borderWidth: 1 }}>
          <Text style={{ fontSize: 28 }}>🛡️</Text>
          <View>
            <Text style={{ fontSize: 12, color: '#5B21B6', fontWeight: '600' }}>Total Insurance Premium</Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#5B21B6' }}>₹2,85,000</Text>
          </View>
        </Card>
        <Card padded={false} style={{ flex: 1 }}>
          <DataTable<InsuranceRecord> columns={COLUMNS} data={MOCK} keyExtractor={r => String(r.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
