import React from 'react';
import { Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';

interface AdvanceDealerRecord { id: number; dealerName: string; fileNo: string; amount: number; date: string; recovered: number; status: string; }

const COLUMNS: Column<AdvanceDealerRecord>[] = [
  { key: 'dealerName', header: 'Dealer',    flex: 1  },
  { key: 'amount',     header: 'Advance',   width: 80, render: v => <Text style={{ fontSize: 12, color: Colors.warning, fontWeight: '700' }}>₹{Number(v).toLocaleString('en-IN')}</Text> },
  { key: 'recovered',  header: 'Recovered', width: 80, render: v => <Text style={{ fontSize: 12, color: Colors.success, fontWeight: '700' }}>₹{Number(v).toLocaleString('en-IN')}</Text> },
  { key: 'status',     header: 'Status',    width: 70, render: v => <Badge label={String(v)} variant={v === 'cleared' ? 'success' : 'warning'} size="sm" /> },
];

const MOCK: AdvanceDealerRecord[] = [
  { id: 1, dealerName: 'Rajesh Motors',  fileNo: '140825776', amount: 25000, date: '01/07/2025', recovered: 25000, status: 'cleared' },
  { id: 2, dealerName: 'Gujarat Wheels', fileNo: '140825674', amount: 30000, date: '03/07/2025', recovered: 15000, status: 'partial' },
  { id: 3, dealerName: 'Patel Autos',    fileNo: '140825820', amount: 20000, date: '10/07/2025', recovered: 0,     status: 'pending' },
];

const totalAdvance = MOCK.reduce((s, r) => s + r.amount, 0);
const totalRecovered = MOCK.reduce((s, r) => s + r.recovered, 0);

export default function AdvanceDealerScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Advance Dealer" subtitle="Reports > Advance Dealer" />
      <ScreenWrapper padded>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          <Card style={{ flex: 1, backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderWidth: 1 }}>
            <Text style={{ fontSize: 11, color: '#B45309', fontWeight: '600' }}>Total Advance</Text>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#B45309' }}>₹{totalAdvance.toLocaleString('en-IN')}</Text>
          </Card>
          <Card style={{ flex: 1, backgroundColor: '#F0FDF4', borderColor: '#BBF7D0', borderWidth: 1 }}>
            <Text style={{ fontSize: 11, color: '#15803D', fontWeight: '600' }}>Recovered</Text>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#15803D' }}>₹{totalRecovered.toLocaleString('en-IN')}</Text>
          </Card>
        </View>
        <Card padded={false} style={{ flex: 1 }}>
          <DataTable<AdvanceDealerRecord> columns={COLUMNS} data={MOCK} keyExtractor={r => String(r.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
