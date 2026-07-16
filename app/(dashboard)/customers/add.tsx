import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import { z } from 'zod';

import { Header } from '@/components/layout/Header';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';

const schema = z.object({
  fullName:  z.string().min(1, 'Full name is required'),
  mobileNo1: z.string().min(10, 'Enter a valid 10-digit mobile number').max(10),
  mobileNo2: z.string().max(10).optional(),
  email:     z.string().email('Enter a valid email').optional().or(z.literal('')),
  address:   z.string().optional(),
});

type Form = z.infer<typeof schema>;

export default function AddCustomerScreen() {
  const router = useRouter();

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', mobileNo1: '', mobileNo2: '', email: '', address: '' },
  });

  const onSubmit = async (data: Form) => {
    // TODO: call useCreateCustomer mutation
    Alert.alert('Success', `Customer "${data.fullName}" added successfully!`, [
      { text: 'Add Another', onPress: () => reset() },
      { text: 'Go to List', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Add Customer" subtitle="Customer > Add Customer" />
      <ScreenWrapper scroll padded>
        <Card>
          <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.primary[700], marginBottom: 16 }}>
            📋 Customer Information
          </Text>

          <Controller control={control} name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Full Name" required placeholder="Enter full name"
                value={value} onBlur={onBlur} onChangeText={onChange}
                error={errors.fullName?.message} autoCapitalize="characters" />
            )} />

          <Controller control={control} name="mobileNo1"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Mobile Number 1" required placeholder="Enter mobile number"
                keyboardType="phone-pad" maxLength={10}
                value={value} onBlur={onBlur} onChangeText={onChange}
                error={errors.mobileNo1?.message}
                leftIcon={<Text style={{ fontSize: 14 }}>📱</Text>} />
            )} />

          <Controller control={control} name="mobileNo2"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Mobile Number 2" placeholder="Enter alternate mobile"
                keyboardType="phone-pad" maxLength={10}
                value={value} onBlur={onBlur} onChangeText={onChange}
                error={errors.mobileNo2?.message}
                leftIcon={<Text style={{ fontSize: 14 }}>📱</Text>} />
            )} />

          <Controller control={control} name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Email" placeholder="Enter email address"
                keyboardType="email-address" autoCapitalize="none"
                value={value} onBlur={onBlur} onChangeText={onChange}
                error={errors.email?.message}
                leftIcon={<Text style={{ fontSize: 14 }}>📧</Text>} />
            )} />

          <Controller control={control} name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input label="Address" placeholder="Enter address"
                multiline numberOfLines={3}
                style={{ height: 80, textAlignVertical: 'top' }}
                value={value} onBlur={onBlur} onChangeText={onChange}
                error={errors.address?.message} />
            )} />

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            <Button label="Clear" variant="outline" onPress={() => reset()} style={{ flex: 1 }} />
            <Button label="Save Customer" onPress={handleSubmit(onSubmit)} loading={isSubmitting} style={{ flex: 2 }} />
          </View>
        </Card>
      </ScreenWrapper>
    </View>
  );
}
