import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';
import { z } from 'zod';

import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';

const schema = z.object({
  customerId:    z.string().min(1, 'Select a customer'),
  vehicle:       z.string().min(1, 'Vehicle is required'),
  vehicleNo:     z.string().min(1, 'Vehicle number is required'),
  chassisNo:     z.string().min(1, 'Chassis number is required'),
  engineNo:      z.string().min(1, 'Engine number is required'),
  manufactureYear: z.string().min(4, 'Enter manufacture year'),
  lan:           z.string().optional(),
  loanAmount:    z.string().optional(),
  noOfMonths:    z.string().optional(),
  emi:           z.string().optional(),
  financeCompany:z.string().optional(),
  fileNo:        z.string().optional(),
  docketDate:    z.string().optional(),
  rtoAmount:     z.string().optional(),
  stampAmount:   z.string().optional(),
  disbursementAmount: z.string().optional(),
});

type Form = z.infer<typeof schema>;

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={{ backgroundColor: Colors.primary[600], padding: 12, borderRadius: 8, marginBottom: 14 }}>
      <Text style={{ color: Colors.white, fontWeight: '800', fontSize: 14 }}>{title}</Text>
    </View>
  );
}

export default function AddFileScreen() {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { customerId: '', vehicle: '', vehicleNo: '', chassisNo: '', engineNo: '', manufactureYear: '' },
  });

  const onSubmit = async (data: Form) => {
    Alert.alert('Success', 'File added successfully!', [
      { text: 'Add Another', onPress: () => reset() },
    ]);
  };

  const field = (name: keyof Form, label: string, opts?: Partial<Parameters<typeof Input>[0]>) => (
    <Controller control={control} name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input label={label} value={value ?? ''} onBlur={onBlur} onChangeText={onChange}
          error={(errors[name] as any)?.message} {...opts} />
      )} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Add File" subtitle="Customer > Add File" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Customer Information */}
        <Card style={{ marginBottom: 16 }}>
          <SectionHeader title="📋 Customer Information" />
          {field('customerId', 'Customer Name', { required: true, placeholder: 'Select customer...' })}
        </Card>

        {/* Vehicle Information */}
        <Card style={{ marginBottom: 16 }}>
          <SectionHeader title="🚗 Vehicle Information" />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>{field('vehicle', 'Vehicle', { required: true, placeholder: 'Enter vehicle' })}</View>
            <View style={{ flex: 1 }}>{field('manufactureYear', 'Manufacture Year', { keyboardType: 'numeric', maxLength: 4 })}</View>
          </View>
          {field('vehicleNo', 'Vehicle Number', { required: true, placeholder: 'GJ01AB1234', autoCapitalize: 'characters' })}
          {field('chassisNo', 'Chassis Number', { required: true, placeholder: 'Enter chassis number', autoCapitalize: 'characters' })}
          {field('engineNo', 'Engine Number', { required: true, placeholder: 'Enter engine number', autoCapitalize: 'characters' })}
        </Card>

        {/* DO Information */}
        <Card style={{ marginBottom: 16 }}>
          <SectionHeader title="📝 DO Information" />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>{field('fileNo', 'File No', { placeholder: 'Enter file number' })}</View>
            <View style={{ flex: 1 }}>{field('docketDate', 'Docket Date', { placeholder: 'DD/MM/YYYY' })}</View>
          </View>
        </Card>

        {/* Finance Information */}
        <Card style={{ marginBottom: 16 }}>
          <SectionHeader title="🏦 Finance Information" />
          {field('lan', 'LAN', { placeholder: 'Enter LAN number' })}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>{field('loanAmount', 'Loan Amount', { keyboardType: 'numeric', placeholder: '0.00' })}</View>
            <View style={{ flex: 1 }}>{field('noOfMonths', 'No. of Months', { keyboardType: 'numeric', placeholder: '12' })}</View>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>{field('emi', 'EMI', { keyboardType: 'numeric', placeholder: '0.00' })}</View>
            <View style={{ flex: 1 }}>{field('financeCompany', 'Finance Company', { placeholder: 'Select company' })}</View>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>{field('rtoAmount', 'RTO Amount', { keyboardType: 'numeric', placeholder: '0.00' })}</View>
            <View style={{ flex: 1 }}>{field('stampAmount', 'Stamp Amount', { keyboardType: 'numeric', placeholder: '0.00' })}</View>
          </View>
          {field('disbursementAmount', 'Disbursement Amount', { keyboardType: 'numeric', placeholder: '0.00' })}
        </Card>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button label="Clear" variant="outline" onPress={() => reset()} style={{ flex: 1 }} />
          <Button label="Save File" onPress={handleSubmit(onSubmit)} loading={isSubmitting} style={{ flex: 2 }} />
        </View>
      </ScrollView>
    </View>
  );
}
