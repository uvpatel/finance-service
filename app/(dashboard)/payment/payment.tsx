import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { Divider } from '@/components/ui/Divider';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';
import type { Payment } from '@/types';

const schema = z.object({
  customerId: z.string().min(1, 'Select customer'),
  fileNo:     z.string().min(1, 'Select file number'),
  amount:     z.string().min(1, 'Amount is required'),
  paymentDate:z.string().min(1, 'Date is required'),
  paymentMode:z.string().min(1, 'Select payment mode'),
  remarks:    z.string().optional(),
});
type Form = z.infer<typeof schema>;

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'error'> = {
  paid: 'success', pending: 'warning', failed: 'error',
};

const COLUMNS: Column<Payment>[] = [
  { key: 'customerName', header: 'Customer',   flex: 1  },
  { key: 'amount',       header: 'Amount',     width: 90, render: v => <Text style={{ fontSize: 13, color: Colors.success, fontWeight: '700' }}>₹{Number(v).toLocaleString('en-IN')}</Text> },
  { key: 'paymentDate',  header: 'Date',       width: 90 },
  { key: 'status', header: 'Status', width: 72, render: v => <Badge label={String(v)} variant={STATUS_VARIANT[String(v)] ?? 'neutral'} size="sm" /> },
];

const MOCK: Payment[] = [
  { id: 1, customerId: 219, customerName: 'REVABHAI DAMOR',    fileNo: '140825776', amount: 15000, paymentDate: '01/07/2025', paymentMode: 'cash',   status: 'paid'    },
  { id: 2, customerId: 220, customerName: 'MEHNDI VIRANI',     fileNo: '140825674', amount: 8500,  paymentDate: '03/07/2025', paymentMode: 'upi',    status: 'paid'    },
  { id: 3, customerId: 221, customerName: 'PRADIPBHAI AHIR',   fileNo: '140825820', amount: 12000, paymentDate: '05/07/2025', paymentMode: 'cheque', status: 'pending' },
];

const PAYMENT_MODES = ['Cash', 'Cheque', 'Online', 'NEFT', 'UPI'];

export default function PaymentScreen() {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { customerId: '', fileNo: '', amount: '', paymentDate: '', paymentMode: '', remarks: '' },
  });

  const onSubmit = async (data: Form) => {
    Alert.alert('Success', `Payment of ₹${data.amount} recorded!`, [
      { text: 'Add Another', onPress: () => reset() },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Add Payment" subtitle="Payment > Payment" />
      <ScreenWrapper scroll padded>
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>💳 Payment Details</Text>
          <Controller control={control} name="customerId"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Customer Name" required placeholder="Select customer" value={value} onBlur={onBlur} onChangeText={onChange} error={errors.customerId?.message} />
            )} />
          <Controller control={control} name="fileNo"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="File Number" required placeholder="Select file number" value={value} onBlur={onBlur} onChangeText={onChange} error={errors.fileNo?.message} />
            )} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Controller control={control} name="amount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Amount (₹)" required placeholder="0.00" keyboardType="decimal-pad" value={value} onBlur={onBlur} onChangeText={onChange} error={errors.amount?.message} />
                )} />
            </View>
            <View style={{ flex: 1 }}>
              <Controller control={control} name="paymentDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input label="Payment Date" required placeholder="DD/MM/YYYY" value={value} onBlur={onBlur} onChangeText={onChange} error={errors.paymentDate?.message} />
                )} />
            </View>
          </View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 8 }}>Payment Mode *</Text>
          <Controller control={control} name="paymentMode"
            render={({ field: { onChange, value } }) => (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {PAYMENT_MODES.map(mode => (
                  <TouchableOpacity key={mode}
                    onPress={() => onChange(mode.toLowerCase())}
                    style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1.5, borderColor: value === mode.toLowerCase() ? Colors.primary[600] : Colors.border, backgroundColor: value === mode.toLowerCase() ? Colors.primary[600] : Colors.surface }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: value === mode.toLowerCase() ? Colors.white : Colors.textSecondary }}>{mode}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )} />
          <Controller control={control} name="remarks"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Remarks" placeholder="Optional remarks" value={value} onBlur={onBlur} onChangeText={onChange} multiline numberOfLines={2} style={{ height: 60, textAlignVertical: 'top' }} />
            )} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <Button label="Clear" variant="outline" onPress={() => reset()} style={{ flex: 1 }} />
            <Button label="Save Payment" onPress={handleSubmit(onSubmit)} loading={isSubmitting} style={{ flex: 2 }} />
          </View>
        </Card>
        <Divider />
        <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.textPrimary, marginVertical: 12 }}>Recent Payments</Text>
        <Card padded={false} style={{ minHeight: 160 }}>
          <DataTable<Payment> columns={COLUMNS} data={MOCK} keyExtractor={p => String(p.id)} />
        </Card>
      </ScreenWrapper>
    </View>
  );
}
