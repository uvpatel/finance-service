import React, { forwardRef, useState } from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '@/constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      required,
      isPassword,
      leftIcon,
      rightIcon,
      style,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasError = !!error;

    return (
      <View style={{ marginBottom: 16 }}>
        {/* Label */}
        {label && (
          <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: Colors.textPrimary,
              }}
            >
              {label}
            </Text>
            {required && (
              <Text style={{ color: Colors.error, marginLeft: 2 }}>*</Text>
            )}
          </View>
        )}

        {/* Input Row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.gray[50],
            borderRadius: 10,
            borderWidth: 1.5,
            borderColor: hasError ? Colors.error : Colors.border,
            paddingHorizontal: 12,
          }}
        >
          {leftIcon && (
            <View style={{ marginRight: 8, opacity: 0.6 }}>{leftIcon}</View>
          )}

          <TextInput
            ref={ref}
            secureTextEntry={isPassword && !showPassword}
            placeholderTextColor={Colors.textDisabled}
            style={[
              {
                flex: 1,
                paddingVertical: 12,
                fontSize: 15,
                color: Colors.textPrimary,
              },
              style as object,
            ]}
            {...rest}
          />

          {/* Password toggle */}
          {isPassword && (
            <TouchableOpacity
              onPress={() => setShowPassword(p => !p)}
              style={{ padding: 4 }}
            >
              <Text style={{ fontSize: 16 }}>
                {showPassword ? '🙈' : '👁️'}
              </Text>
            </TouchableOpacity>
          )}

          {!isPassword && rightIcon && (
            <View style={{ marginLeft: 8, opacity: 0.6 }}>{rightIcon}</View>
          )}
        </View>

        {/* Error */}
        {hasError && (
          <Text
            style={{
              fontSize: 12,
              color: Colors.error,
              marginTop: 4,
              marginLeft: 2,
            }}
          >
            {error}
          </Text>
        )}

        {/* Hint */}
        {!hasError && hint && (
          <Text
            style={{
              fontSize: 12,
              color: Colors.textDisabled,
              marginTop: 4,
              marginLeft: 2,
            }}
          >
            {hint}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
