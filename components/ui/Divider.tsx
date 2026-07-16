import React from 'react';
import { View } from 'react-native';
import { Colors } from '@/constants/colors';

interface DividerProps {
  vertical?: boolean;
  spacing?: number;
  color?: string;
  thickness?: number;
}

export function Divider({
  vertical = false,
  spacing = 12,
  color = Colors.border,
  thickness = 1,
}: DividerProps) {
  return (
    <View
      style={
        vertical
          ? { width: thickness, backgroundColor: color, marginHorizontal: spacing, alignSelf: 'stretch' }
          : { height: thickness, backgroundColor: color, marginVertical: spacing }
      }
    />
  );
}
