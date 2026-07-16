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
import type { InsuranceCompany } from '@/types';

const COLUMNS: Column<InsuranceCompany>[] = [
  { key: 'name',      header: 'Insurance Company', flex: 1  },
  { key: 'contactNo', header: 'Contact',            width: 110 },
  { key: 'id', header: '', width: 64,
    render: (_, r) => (
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <TouchableOpacity onPress={() => Alert.alert('Edit', r.name)}><Text>✏️</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete ${r.name}?`)}><Text>🗑️</Text></TouchableOpacity>
      </View>
    )},
];

const MOCK: InsuranceCompany[] = [
  { id: 1, name: 'New India Insurance', contactNo: '1800-209-1415', address: 'Mumbai', policyTypes: ['Motor', 'Health'] },
  { id: 2, name: 'ICICI Lombard',       contactNo: '1800-2588-700', address: 'Mumbai', policyTypes: ['Motor'] },
];

export default function InsuranceScreen() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const handleSave = () => {
    if (!name.trim()) return Alert.alert('Error', 'Company name is required');
    Alert.alert('Saved', `Insurance company "${name}" saved!`);
    setName(''); setContact('');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Insurance" subtitle="Master > Insurance" />
      <ScreenWrapper scroll padded>
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>🛡️ Add Insurance Company</Text>
          <Input label="Company Name" required placeholder="Enter company name" value={name} onChangeText={setName} />
          <Input label="Contact / Helpline" placeholder="Enter contact number" value={contact} onChangeText={setContact} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <Button label="Clear" variant="outline" onPress={() => { setName(''); setContact(''); }} style={{ flex: 1 }} />
            <Button label="Save" onPress={handleSave} style={{ flex: 2 }} />
          </View>
        </Card>
        <Divider />
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginVertical: 12 }}>Insurance Companies</Text>
        <Card padded={false} style={{ minHeight: 160 }}>
          <DataTable<InsuranceCompany> columns={COLUMNS} data={MOCK} keyExtractor={d => String(d.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
