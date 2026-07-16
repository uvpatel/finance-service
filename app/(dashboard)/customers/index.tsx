import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/layout/Header';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { Colors } from '@/constants/colors';
import type { Customer } from '@/types';

const MOCK: Customer[] = [
  { id: 219, fullName: 'REVABHAI DAMOR',          mobileNo1: '9512197266', createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 220, fullName: 'MEHNDI VIRANI',            mobileNo1: '8155996673', createdAt: '2025-01-02', updatedAt: '2025-01-02' },
  { id: 221, fullName: 'PRADIPBHAI AHIR',          mobileNo1: '9428369204', createdAt: '2025-01-03', updatedAt: '2025-01-03' },
  { id: 222, fullName: 'MANGAL SINGH KHANT',       mobileNo1: '9781328439', createdAt: '2025-01-04', updatedAt: '2025-01-04' },
  { id: 223, fullName: 'ABDULKADIR AHMEDIGAFFAR',  mobileNo1: '9426139287', email: 'abdulkadir@email.com', createdAt: '2025-01-05', updatedAt: '2025-01-05' },
  { id: 224, fullName: 'VIKASHBHAI GMIRBHAI MEDA', mobileNo1: '7069579732', createdAt: '2025-01-06', updatedAt: '2025-01-06' },
  { id: 225, fullName: 'RATHVA PRAVINBHAI',        mobileNo1: '9427808785', createdAt: '2025-01-07', updatedAt: '2025-01-07' },
  { id: 226, fullName: 'JILUBHAI SOLANKI',         mobileNo1: '8141300564', createdAt: '2025-01-08', updatedAt: '2025-01-08' },
  { id: 227, fullName: 'RAHUL KUMAR THAKOR',       mobileNo1: '7016378887', createdAt: '2025-01-09', updatedAt: '2025-01-09' },
  { id: 228, fullName: 'SHIRAJSHA DIWAN',           mobileNo1: '9624810258', createdAt: '2025-01-10', updatedAt: '2025-01-10' },
  { id: 229, fullName: 'VINOD PATEL',               mobileNo1: '9265953267', email: 'vinod@email.com', address: 'UDHAVAD', createdAt: '2025-01-11', updatedAt: '2025-01-11' },
  { id: 230, fullName: 'BHURIYA NARVATBHAI',        mobileNo1: '8160757084', address: 'GOVINDATNAGAR', createdAt: '2025-01-12', updatedAt: '2025-01-12' },
];

const COLUMNS: Column<Customer>[] = [
  { key: 'id',       header: 'ID',     width: 44, render: v => <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.primary[600] }}>{String(v)}</Text> },
  { key: 'fullName', header: 'Name',   flex: 1   },
  { key: 'mobileNo1',header: 'Mobile', width: 100 },
];

export default function CustomersIndexScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = MOCK.filter(c =>
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.mobileNo1.includes(search) ||
    String(c.id).includes(search)
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Customers" subtitle={`${MOCK.length} total records`} />

      {/* Quick actions row */}
      <View style={{ flexDirection: 'row', gap: 8, padding: 12, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
        {[
          { label: 'Add Customer', route: '/(dashboard)/customers/add',      icon: '➕' },
          { label: 'Add File',     route: '/(dashboard)/customers/files',     icon: '📁' },
          { label: 'Upload Docs',  route: '/(dashboard)/customers/documents', icon: '📄' },
        ].map(a => (
          <TouchableOpacity
            key={a.route}
            onPress={() => router.push(a.route as any)}
            style={{ flex: 1, backgroundColor: Colors.primary[50], borderRadius: 10, paddingVertical: 10, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: Colors.primary[200] }}
          >
            <Text style={{ fontSize: 18 }}>{a.icon}</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.primary[700] }}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 8 }}>
        <Text style={{ fontSize: 16 }}>🔍</Text>
        <TextInput
          placeholder="Search by name, mobile or ID..."
          placeholderTextColor={Colors.textDisabled}
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, fontSize: 14, color: Colors.textPrimary }}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={{ fontSize: 16, color: Colors.textDisabled }}>✕</Text>
          </TouchableOpacity>
        )}
        <Badge label={`${filtered.length}`} variant="primary" size="sm" />
      </View>

      <DataTable<Customer>
        columns={COLUMNS}
        data={filtered}
        keyExtractor={c => String(c.id)}
        emptyMessage="No customers found for your search."
      />
    </View>
  );
}
