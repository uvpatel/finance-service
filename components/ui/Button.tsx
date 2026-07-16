import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';

import { Colors } from '@/constants/colors';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyle: Record<Variant, { bg: string; text: string; border?: string }> = {
  primary:   { bg: Colors.primary[600], text: Colors.white },
  secondary: { bg: Colors.primary[100], text: Colors.primary[700] },
  outline:   { bg: 'transparent', text: Colors.primary[600], border: Colors.primary[600] },
  danger:    { bg: Colors.error, text: Colors.white },
  ghost:     { bg: 'transparent', text: Colors.primary[600] },
};

const sizeStyle: Record<Size, { py: number; px: number; fontSize: number; radius: number }> = {
  sm: { py: 8,  px: 14, fontSize: 13, radius: 8  },
  md: { py: 12, px: 20, fontSize: 15, radius: 10 },
  lg: { py: 16, px: 24, fontSize: 16, radius: 12 },
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const v = variantStyle[variant];
  const s = sizeStyle[size];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        {
          backgroundColor: v.bg,
          borderRadius: s.radius,
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: isDisabled ? 0.55 : 1,
          alignSelf: fullWidth ? 'stretch' : 'auto',
          ...(v.border
            ? { borderWidth: 1.5, borderColor: v.border }
            : {}),
          shadowColor: variant === 'primary' ? Colors.primary[600] : 'transparent',
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: variant === 'primary' ? 3 : 0,
        },
        style as object,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <>
          {icon && <View>{icon}</View>}
          <Text
            style={{
              color: v.text,
              fontSize: s.fontSize,
              fontWeight: '700',
              letterSpacing: 0.3,
            }}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
