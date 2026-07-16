import React from 'react';
import { Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';

interface RtoRecord { id: number; customerName: string; vehicleNo: string; rtoDistrict: string; amount: number; date: string; status: string; }

const COLUMNS: Column<RtoRecord>[] = [
  { key: 'customerName', header: 'Customer',  flex: 1 },
  { key: 'vehicleNo',    header: 'Vehicle No', width: 100 },
  { key: 'amount',       header: 'Amount', width: 80, render: v => <Text style={{ fontSize: 12, color: Colors.primary[600], fontWeight: '700' }}>₹{Number(v).toLocaleString('en-IN')}</Text> },
  { key: 'status',       header: 'Status', width: 70, render: v => <Badge label={String(v)} variant={v === 'paid' ? 'success' : 'warning'} size="sm" /> },
];

const MOCK: RtoRecord[] = [
  { id: 1, customerName: 'REVABHAI DAMOR',    vehicleNo: 'GJ01AB1234', rtoDistrict: 'Ahmedabad', amount: 5200, date: '01/07/2025', status: 'paid'    },
  { id: 2, customerName: 'MEHNDI VIRANI',     vehicleNo: 'GJ05CD5678', rtoDistrict: 'Surat',     amount: 4800, date: '03/07/2025', status: 'paid'    },
  { id: 3, customerName: 'PRADIPBHAI AHIR',   vehicleNo: 'GJ06EF9012', rtoDistrict: 'Vadodara',  amount: 5500, date: '05/07/2025', status: 'pending' },
];

export default function RtoPaymentScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="RTO Payment" subtitle="Reports > RTO Payment" />
      <ScreenWrapper padded>
        <Card style={{ flexDirection: 'row', gap: 12, marginBottom: 16, backgroundColor: '#ECFEFF', borderColor: '#A5F3FC', borderWidth: 1 }}>
          <Text style={{ fontSize: 28 }}>🚗</Text>
          <View>
            <Text style={{ fontSize: 12, color: '#0E7490', fontWeight: '600' }}>Total RTO Collected</Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#0E7490' }}>₹1,24,500</Text>
            <Text style={{ fontSize: 11, color: '#67E8F9' }}>From 189 files • July 2025</Text>
          </View>
        </Card>
        <Card padded={false} style={{ flex: 1 }}>
          <DataTable<RtoRecord> columns={COLUMNS} data={MOCK} keyExtractor={r => String(r.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
