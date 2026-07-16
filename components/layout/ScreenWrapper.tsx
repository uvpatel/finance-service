import React from 'react';
import { ScrollView, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  bg?: string;
}

export function ScreenWrapper({
  children,
  scroll = false,
  padded = true,
  bg = Colors.background,
  style,
  ...rest
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        {
          flex: scroll ? undefined : 1,
          padding: padded ? 16 : 0,
          paddingBottom: padded ? insets.bottom + 16 : insets.bottom,
        },
        style as object,
      ]}
      {...rest}
    >
      {children}
    </View>
  );

  if (scroll) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: bg }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      {content}
    </View>
  );
}
