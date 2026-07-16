import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { Divider } from '@/components/ui/Divider';
import { Input } from '@/components/ui/Input';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';
import type { Company } from '@/types';

const COLUMNS: Column<Company>[] = [
  { key: 'name',      header: 'Company Name', flex: 1   },
  { key: 'contactNo', header: 'Contact',      width: 110 },
  {
    key: 'id',
    header: 'Actions',
    width: 70,
    render: (_, row) => (
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <TouchableOpacity onPress={() => Alert.alert('Edit', `Edit ${row.name}`)}>
          <Text style={{ fontSize: 16 }}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete ${row.name}?`)}>
          <Text style={{ fontSize: 16 }}>🗑️</Text>
        </TouchableOpacity>
      </View>
    ),
  },
];

const MOCK_DATA: Company[] = [
  { id: 1, name: 'ABC Corporation',   contactNo: '9876543210', address: 'Ahmedabad'  },
  { id: 2, name: 'XYZ Enterprises',   contactNo: '9123456789', address: 'Surat'      },
  { id: 3, name: 'PQR Industries',    contactNo: '9012345678', address: 'Vadodara'   },
];

export default function CompanyScreen() {
  const [name, setName]      = useState('');
  const [contact, setContact]= useState('');
  const [address, setAddress]= useState('');
  const [email, setEmail]    = useState('');

  const handleSave = () => {
    if (!name.trim()) return Alert.alert('Error', 'Company name is required');
    Alert.alert('Saved', `Company "${name}" saved!`);
    setName(''); setContact(''); setAddress(''); setEmail('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Company" subtitle="Master > Company" />
      <ScreenWrapper scroll padded>
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>🏢 Add Company</Text>
          <Input label="Company Name" required placeholder="Enter company name" value={name} onChangeText={setName} />
          <Input label="Contact Number" placeholder="Enter contact number" keyboardType="phone-pad" value={contact} onChangeText={setContact} />
          <Input label="Email" placeholder="company@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <Input label="Address" placeholder="Enter address" value={address} onChangeText={setAddress} multiline numberOfLines={2} style={{ height: 60, textAlignVertical: 'top' }} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <Button label="Clear" variant="outline" onPress={() => { setName(''); setContact(''); setAddress(''); setEmail(''); }} style={{ flex: 1 }} />
            <Button label="Save" onPress={handleSave} style={{ flex: 2 }} />
          </View>
        </Card>
        <Divider />
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginVertical: 12 }}>Company List</Text>
        <Card padded={false} style={{ minHeight: 200 }}>
          <DataTable<Company> columns={COLUMNS} data={MOCK_DATA} keyExtractor={c => String(c.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
