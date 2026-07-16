import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <ActivityIndicator size="large" color={Colors.primary[600]} />
      <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>{message}</Text>
    </View>
  );
}
