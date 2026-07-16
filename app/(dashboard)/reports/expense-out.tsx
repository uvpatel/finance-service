import React from 'react';
import { Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';

interface ExpenseRecord { id: number; category: string; amount: number; date: string; description?: string; }

const COLUMNS: Column<ExpenseRecord>[] = [
  { key: 'category',    header: 'Category',    flex: 1 },
  { key: 'amount',      header: 'Amount',      width: 90, render: v => <Text style={{ fontSize: 12, color: Colors.error, fontWeight: '700' }}>₹{Number(v).toLocaleString('en-IN')}</Text> },
  { key: 'date',        header: 'Date',        width: 90 },
  { key: 'description', header: 'Description', flex: 1, render: v => <Text style={{ fontSize: 11, color: Colors.textSecondary }} numberOfLines={1}>{String(v ?? '-')}</Text> },
];

const MOCK: ExpenseRecord[] = [
  { id: 1, category: 'Office Rent',  amount: 15000, date: '01/07/2025', description: 'Monthly office rent' },
  { id: 2, category: 'Utilities',    amount: 3200,  date: '05/07/2025', description: 'Electricity + water' },
  { id: 3, category: 'Staff Salary', amount: 18000, date: '01/07/2025', description: 'July salary'         },
  { id: 4, category: 'Printing',     amount: 1500,  date: '10/07/2025', description: 'Stationery & forms'  },
  { id: 5, category: 'Travel',       amount: 5100,  date: '12/07/2025', description: 'Field visits'        },
];

const total = MOCK.reduce((s, e) => s + e.amount, 0);

export default function ExpenseOutScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Expense Out" subtitle="Reports > Expense Out" />
      <ScreenWrapper padded>
        <Card style={{ flexDirection: 'row', gap: 12, marginBottom: 16, backgroundColor: '#FEF2F2', borderColor: '#FECACA', borderWidth: 1 }}>
          <Text style={{ fontSize: 28 }}>💸</Text>
          <View>
            <Text style={{ fontSize: 12, color: '#B91C1C', fontWeight: '600' }}>Total Expenses Out</Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#B91C1C' }}>₹{total.toLocaleString('en-IN')}</Text>
            <Text style={{ fontSize: 11, color: '#FCA5A5' }}>{MOCK.length} transactions • July 2025</Text>
          </View>
        </Card>
        <Card padded={false} style={{ flex: 1 }}>
          <DataTable<ExpenseRecord> columns={COLUMNS} data={MOCK} keyExtractor={r => String(r.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
