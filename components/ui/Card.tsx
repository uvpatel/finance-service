import React from 'react';
import { View, type ViewProps } from 'react-native';

import { Colors } from '@/constants/colors';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padded?: boolean;
  elevated?: boolean;
  radius?: number;
}

export function Card({
  children,
  padded = true,
  elevated = true,
  radius = 14,
  style,
  ...rest
}: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.surface,
          borderRadius: radius,
          padding: padded ? 16 : 0,
          overflow: 'hidden',
          ...(elevated
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 3,
              }
            : {}),
        },
        style as object,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
