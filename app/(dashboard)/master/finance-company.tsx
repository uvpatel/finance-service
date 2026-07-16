import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { Divider } from '@/components/ui/Divider';
import { Input } from '@/components/ui/Input';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';
import type { FinanceCompany } from '@/types';

const COLUMNS: Column<FinanceCompany>[] = [
  { key: 'name',         header: 'Finance Company', flex: 1 },
  { key: 'interestRate', header: 'Rate %',           width: 70, render: v => <Text style={{ fontSize: 13, color: Colors.textPrimary }}>{v ? `${v}%` : '-'}</Text> },
  { key: 'id', header: '', width: 64,
    render: (_, r) => (
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <TouchableOpacity onPress={() => Alert.alert('Edit', r.name)}><Text>✏️</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete ${r.name}?`)}><Text>🗑️</Text></TouchableOpacity>
      </View>
    )},
];

const MOCK: FinanceCompany[] = [
  { id: 1, name: 'HDFC Bank',   interestRate: 10.5, address: 'Mumbai' },
  { id: 2, name: 'Kotak Mahindra', interestRate: 11.0, address: 'Mumbai' },
  { id: 3, name: 'Mahindra Finance', interestRate: 13.5, address: 'Pune' },
];

export default function FinanceCompanyScreen() {
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [address, setAddress] = useState('');
  const handleSave = () => {
    if (!name.trim()) return Alert.alert('Error', 'Company name is required');
    Alert.alert('Saved', `Finance company "${name}" saved!`);
    setName(''); setRate(''); setAddress('');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Finance Company" subtitle="Master > Finance Company" />
      <ScreenWrapper scroll padded>
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>🏦 Add Finance Company</Text>
          <Input label="Company Name" required placeholder="Enter company name" value={name} onChangeText={setName} />
          <Input label="Interest Rate (%)" placeholder="e.g. 10.5" keyboardType="decimal-pad" value={rate} onChangeText={setRate} />
          <Input label="Address" placeholder="Enter address" value={address} onChangeText={setAddress} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <Button label="Clear" variant="outline" onPress={() => { setName(''); setRate(''); setAddress(''); }} style={{ flex: 1 }} />
            <Button label="Save" onPress={handleSave} style={{ flex: 2 }} />
          </View>
        </Card>
        <Divider />
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginVertical: 12 }}>Finance Company List</Text>
        <Card padded={false} style={{ minHeight: 160 }}>
          <DataTable<FinanceCompany> columns={COLUMNS} data={MOCK} keyExtractor={d => String(d.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
