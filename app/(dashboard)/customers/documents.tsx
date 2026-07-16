import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import { z } from 'zod';

import { Header } from '@/components/layout/Header';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { Divider } from '@/components/ui/Divider';
import { Colors } from '@/constants/colors';
import type { CustomerDocument } from '@/types';

const schema = z.object({
  customerId: z.string().min(1, 'Select a customer'),
  fileNo:     z.string().min(1, 'Select a file number'),
  fileName:   z.string().min(1, 'File name is required'),
});
type Form = z.infer<typeof schema>;

const MOCK_DOCS: CustomerDocument[] = [];

const COLUMNS: Column<CustomerDocument>[] = [
  { key: 'customerName', header: 'Customer', flex: 1 },
  { key: 'fileNo',       header: 'File No',  width: 90 },
  { key: 'fileName',     header: 'Name',     flex: 1   },
];

export default function AddDocumentsScreen() {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { customerId: '', fileNo: '', fileName: '' },
  });

  const onSubmit = async (data: Form) => {
    Alert.alert('Success', `Document "${data.fileName}" uploaded!`, [
      { text: 'Upload Another', onPress: () => reset() },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Upload Documents" subtitle="Customer > Add User Documents" />
      <ScreenWrapper scroll padded>

        {/* Upload Form */}
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>
            📄 Upload Document
          </Text>

          <Controller control={control} name="customerId"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Customer Name" required placeholder="Select customer"
                value={value} onBlur={onBlur} onChangeText={onChange}
                error={errors.customerId?.message}
                leftIcon={<Text style={{ fontSize: 14 }}>👤</Text>} />
            )} />

          <Controller control={control} name="fileNo"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="File Number" required placeholder="Select file number"
                value={value} onBlur={onBlur} onChangeText={onChange}
                error={errors.fileNo?.message}
                leftIcon={<Text style={{ fontSize: 14 }}>📁</Text>} />
            )} />

          <Controller control={control} name="fileName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="File Name" required placeholder="Enter document name"
                value={value} onBlur={onBlur} onChangeText={onChange}
                error={errors.fileName?.message} />
            )} />

          {/* Upload File Picker placeholder */}
          <View style={{ backgroundColor: Colors.gray[50], borderRadius: 10, borderWidth: 1.5, borderColor: Colors.border, borderStyle: 'dashed', padding: 20, alignItems: 'center', marginBottom: 16, gap: 8 }}>
            <Text style={{ fontSize: 32 }}>📂</Text>
            <Text style={{ fontSize: 13, color: Colors.textSecondary, fontWeight: '600' }}>Tap to choose a file</Text>
            <Text style={{ fontSize: 11, color: Colors.textDisabled }}>PDF, JPG, PNG up to 10 MB</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button label="Clear" variant="outline" onPress={() => reset()} style={{ flex: 1 }} />
            <Button label="Upload" onPress={handleSubmit(onSubmit)} loading={isSubmitting} style={{ flex: 2 }} />
          </View>
        </Card>

        <Divider />

        {/* Uploaded Files Table */}
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 }}>
          Uploaded Files
        </Text>
        <Card padded={false} style={{ minHeight: 160 }}>
          <DataTable<CustomerDocument>
            columns={COLUMNS}
            data={MOCK_DOCS}
            keyExtractor={d => String(d.id)}
            emptyMessage="No documents uploaded yet."
          />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
