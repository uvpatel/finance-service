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
import type { Dealer } from '@/types';

const COLUMNS: Column<Dealer>[] = [
  { key: 'name',      header: 'Dealer Name', flex: 1  },
  { key: 'contactNo', header: 'Contact',     width: 110 },
  { key: 'id', header: '', width: 64,
    render: (_, r) => (
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <TouchableOpacity onPress={() => Alert.alert('Edit', r.name)}><Text>✏️</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete ${r.name}?`)}><Text>🗑️</Text></TouchableOpacity>
      </View>
    )},
];

const MOCK: Dealer[] = [
  { id: 1, name: 'Rajesh Motors',   contactNo: '9876543210', address: 'Ahmedabad', type: 'dealer' },
  { id: 2, name: 'Gujarat Wheels',  contactNo: '9123456789', address: 'Surat',     type: 'dealer' },
];

export default function DealerScreen() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const handleSave = () => {
    if (!name.trim()) return Alert.alert('Error', 'Dealer name is required');
    Alert.alert('Saved', `Dealer "${name}" saved!`);
    setName(''); setContact(''); setAddress('');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Dealer" subtitle="Master > Dealer" />
      <ScreenWrapper scroll padded>
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>🤝 Add Dealer</Text>
          <Input label="Dealer Name" required placeholder="Enter dealer name" value={name} onChangeText={setName} />
          <Input label="Contact Number" placeholder="Enter contact" keyboardType="phone-pad" value={contact} onChangeText={setContact} />
          <Input label="Address" placeholder="Enter address" value={address} onChangeText={setAddress} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <Button label="Clear" variant="outline" onPress={() => { setName(''); setContact(''); setAddress(''); }} style={{ flex: 1 }} />
            <Button label="Save" onPress={handleSave} style={{ flex: 2 }} />
          </View>
        </Card>
        <Divider />
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginVertical: 12 }}>Dealer List</Text>
        <Card padded={false} style={{ minHeight: 160 }}>
          <DataTable<Dealer> columns={COLUMNS} data={MOCK} keyExtractor={d => String(d.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
