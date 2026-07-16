import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';
import type { Commission } from '@/types';

const COLUMNS: Column<Commission>[] = [
  { key: 'agentName',      header: 'Agent',       flex: 1   },
  { key: 'fileNo',         header: 'File No',     width: 90  },
  { key: 'amount',         header: 'Commission',  width: 90, render: v => <Text style={{ fontSize: 13, color: Colors.success, fontWeight: '700' }}>₹{Number(v).toLocaleString('en-IN')}</Text> },
  { key: 'status',         header: 'Status',      width: 72, render: v => <Badge label={String(v)} variant={v === 'paid' ? 'success' : 'warning'} size="sm" /> },
];

const MOCK: Commission[] = [
  { id: 1, agentId: 1, agentName: 'Suresh Shah',   fileNo: '140825776', amount: 2500,  commissionDate: '01/07/2025', status: 'paid'    },
  { id: 2, agentId: 2, agentName: 'Ramesh Patel',  fileNo: '140825674', amount: 1800,  commissionDate: '03/07/2025', status: 'paid'    },
  { id: 3, agentId: 3, agentName: 'Kiran Mehta',   fileNo: '140825820', amount: 3200,  commissionDate: '05/07/2025', status: 'pending' },
  { id: 4, agentId: 1, agentName: 'Suresh Shah',   fileNo: '140825113', amount: 1500,  commissionDate: '10/07/2025', status: 'pending' },
];

const totalPaid    = MOCK.filter(c => c.status === 'paid').reduce((s, c) => s + c.amount, 0);
const totalPending = MOCK.filter(c => c.status === 'pending').reduce((s, c) => s + c.amount, 0);

export default function CommissionScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Commission" subtitle="Payment > Commission" />
      <ScreenWrapper scroll padded>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          <Card style={{ flex: 1, backgroundColor: '#F0FDF4', borderColor: '#BBF7D0', borderWidth: 1 }}>
            <Text style={{ fontSize: 12, color: '#15803D', fontWeight: '600' }}>Total Paid</Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#15803D' }}>₹{totalPaid.toLocaleString('en-IN')}</Text>
          </Card>
          <Card style={{ flex: 1, backgroundColor: '#FFFBEB', borderColor: '#FDE68A', borderWidth: 1 }}>
            <Text style={{ fontSize: 12, color: '#B45309', fontWeight: '600' }}>Pending</Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#B45309' }}>₹{totalPending.toLocaleString('en-IN')}</Text>
          </Card>
        </View>
        <Card padded={false} style={{ flex: 1, minHeight: 200 }}>
          <DataTable<Commission> columns={COLUMNS} data={MOCK} keyExtractor={c => String(c.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
