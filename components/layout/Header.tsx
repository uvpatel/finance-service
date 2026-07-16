import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '@/components/ui/Avatar';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showMenuButton?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  showMenuButton = true,
  rightAction,
}: HeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View
      style={{
        backgroundColor: Colors.primary[700],
        paddingTop: insets.top + 8,
        paddingBottom: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary[700]} />

      {/* Hamburger / Menu */}
      {showMenuButton && (
        <TouchableOpacity onPress={openDrawer} style={{ padding: 4 }} hitSlop={8}>
          <View style={{ gap: 5 }}>
            {[0, 1, 2].map(i => (
              <View
                key={i}
                style={{
                  width: 22,
                  height: 2.5,
                  backgroundColor: Colors.white,
                  borderRadius: 2,
                }}
              />
            ))}
          </View>
        </TouchableOpacity>
      )}

      {/* Title */}
      <View style={{ flex: 1 }}>
        <Text style={{ color: Colors.white, fontSize: 17, fontWeight: '800', letterSpacing: 0.2 }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ color: Colors.primary[200], fontSize: 11, marginTop: 1 }}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right action or user avatar */}
      {rightAction ?? (
        user ? <Avatar name={user.name} size={34} /> : null
      )}
    </View>
  );
}
