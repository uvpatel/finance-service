import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { getInitials } from '@/utils/helpers';

interface AvatarProps {
  name?: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
}

export function Avatar({
  name = '?',
  size = 40,
  bgColor = Colors.primary[600],
  textColor = Colors.white,
}: AvatarProps) {
  const initials = getInitials(name);
  const fontSize = size * 0.38;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bgColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: textColor, fontSize, fontWeight: '800' }}>
        {initials}
      </Text>
    </View>
  );
}
