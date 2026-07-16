import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/layout/Header';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Divider } from '@/components/ui/Divider';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';
import type { AuthUser } from '@/types';

const ROLE_VARIANT: Record<string, 'primary' | 'success' | 'neutral'> = {
  admin: 'primary', manager: 'success', employee: 'neutral',
};

const MOCK_USERS: AuthUser[] = [
  { id: '1', name: 'Devang Patel',  email: 'devang@company.com',  role: 'admin'    },
  { id: '2', name: 'Rajesh Shah',   email: 'rajesh@company.com',  role: 'manager'  },
  { id: '3', name: 'Priya Mehta',   email: 'priya@company.com',   role: 'employee' },
  { id: '4', name: 'Suresh Kumar',  email: 'suresh@company.com',  role: 'employee' },
  { id: '5', name: 'Anita Desai',   email: 'anita@company.com',   role: 'employee' },
];

const COLUMNS: Column<AuthUser>[] = [
  { key: 'name', header: 'User', flex: 1,
    render: (v, row) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Avatar name={String(v)} size={28} />
        <View>
          <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.textPrimary }}>{String(v)}</Text>
          <Text style={{ fontSize: 10, color: Colors.textSecondary }}>{row.email}</Text>
        </View>
      </View>
    ) },
  { key: 'role', header: 'Role', width: 80, render: v => <Badge label={String(v)} variant={ROLE_VARIANT[String(v)] ?? 'neutral'} size="sm" /> },
  { key: 'id', header: '', width: 50,
    render: (_, r) => (
      <TouchableOpacity onPress={() => Alert.alert('Delete', `Remove ${r.name}?`)}><Text>🗑️</Text></TouchableOpacity>
    )},
];

export default function UsersScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'manager' | 'employee'>('employee');

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return Alert.alert('Error', 'Name and email are required');
    Alert.alert('Success', `User "${name}" added as ${role}!`);
    setName(''); setEmail(''); setRole('employee');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Users" subtitle="Admin > User Management" />
      <ScreenWrapper scroll padded>
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>👤 Add User</Text>
          <Input label="Full Name" required placeholder="Enter full name" value={name} onChangeText={setName} />
          <Input label="Email" required placeholder="user@company.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

          <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 8 }}>Role</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
            {(['admin', 'manager', 'employee'] as const).map(r => (
              <TouchableOpacity key={r}
                onPress={() => setRole(r)}
                style={{ flex: 1, padding: 10, borderRadius: 8, borderWidth: 1.5, alignItems: 'center',
                  borderColor: role === r ? Colors.primary[600] : Colors.border,
                  backgroundColor: role === r ? Colors.primary[600] : Colors.surface }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: role === r ? Colors.white : Colors.textSecondary, textTransform: 'capitalize' }}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button label="Add User" onPress={handleAdd} fullWidth />
        </Card>

        <Divider />
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginVertical: 12 }}>
          System Users ({MOCK_USERS.length})
        </Text>
        <Card padded={false} style={{ minHeight: 200 }}>
          <DataTable<AuthUser> columns={COLUMNS} data={MOCK_USERS} keyExtractor={u => u.id} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
