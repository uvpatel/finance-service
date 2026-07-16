import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Colors } from '@/constants/colors';

export default function OwnBankScreen() {
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [branch, setBranch] = useState('');
  const handleSave = () => {
    if (!bankName.trim()) return Alert.alert('Error', 'Bank name is required');
    Alert.alert('Saved', `Bank "${bankName}" saved!`);
    setBankName(''); setAccountNo(''); setIfsc(''); setBranch('');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header title="Own Bank" subtitle="Master > Own Bank" />
      <ScreenWrapper scroll padded>
        <Card>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.primary[700], marginBottom: 14 }}>🏛️ Add Own Bank</Text>
          <Input label="Bank Name" required placeholder="Enter bank name" value={bankName} onChangeText={setBankName} />
          <Input label="Account Number" placeholder="Enter account number" keyboardType="numeric" value={accountNo} onChangeText={setAccountNo} />
          <Input label="IFSC Code" placeholder="e.g. HDFC0001234" autoCapitalize="characters" value={ifsc} onChangeText={setIfsc} />
          <Input label="Branch" placeholder="Enter branch name" value={branch} onChangeText={setBranch} />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
            <Button label="Clear" variant="outline" onPress={() => { setBankName(''); setAccountNo(''); setIfsc(''); setBranch(''); }} style={{ flex: 1 }} />
            <Button label="Save" onPress={handleSave} style={{ flex: 2 }} />
          </View>
        </Card>
      </ScreenWrapper>
    </View>
  );
}
