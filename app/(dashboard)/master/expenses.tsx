import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { Divider } from '@/components/ui/Divider';
import { Input } from '@/components/ui/Input';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/colors';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description?: string;
}

const COLUMNS: Column<Expense>[] = [
  { key: 'category',    header: 'Category',    flex: 1 },
  { key: 'amount',      header: 'Amount',      width: 90, render: v => <Text style={{ fontSize: 13, color: Colors.primary[600], fontWeight: '700' }}>₹{Number(v).toLocaleString('en-IN')}</Text> },
  { key: 'date',        header: 'Date',        width: 90 },
  { key: 'id', header: '', width: 40,
    render: (_, r) => <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete ${r.category}?`)}><Text>🗑️</Text></TouchableOpacity>},
];

const MOCK: Expense[] = [
  { id: 1, category: 'Office Rent',    amount: 15000, date: '01/07/2025' },
  { id: 2, category: 'Utilities',      amount: 3200,  date: '05/07/2025' },
  { id: 3, category: 'Miscellaneous',  amount: 1800,  date: '10/07/2025' },
];

const totalExpenses = MOCK.reduce((sum, e) => sum + e.amount, 0);

export default function ExpensesScreen() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const handleSave = () => {
    if (!category.trim()) return Alert.alert('Error', 'Category is required');
    Alert.alert('Saved', `Expense "${category}" saved!`);
    setCategory(''); setAmount(''); setDate(''); setDesc('');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Expenses" subtitle="Master > Expenses" />
      <ScreenWrapper scroll padded>
        <Card style={{ marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }} elevated>
          <Text style={{ fontSize: 28 }}>💸</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: Colors.textSecondary }}>Total Expenses</Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.error }}>₹{totalExpenses.toLocaleString('en-IN')}</Text>
          </View>
          <Badge label={`${MOCK.length} items`} variant="warning" />
        </Card>
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>💸 Add Expense</Text>
          <Input label="Category" required placeholder="e.g. Office Rent" value={category} onChangeText={setCategory} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}><Input label="Amount (₹)" placeholder="0.00" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} /></View>
            <View style={{ flex: 1 }}><Input label="Date" placeholder="DD/MM/YYYY" value={date} onChangeText={setDate} /></View>
          </View>
          <Input label="Description" placeholder="Optional description" value={desc} onChangeText={setDesc} multiline numberOfLines={2} style={{ height: 60, textAlignVertical: 'top' }} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <Button label="Clear" variant="outline" onPress={() => { setCategory(''); setAmount(''); setDate(''); setDesc(''); }} style={{ flex: 1 }} />
            <Button label="Save" onPress={handleSave} style={{ flex: 2 }} />
          </View>
        </Card>
        <Divider />
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginVertical: 12 }}>Expense Records</Text>
        <Card padded={false} style={{ minHeight: 160 }}>
          <DataTable<Expense> columns={COLUMNS} data={MOCK} keyExtractor={e => String(e.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
