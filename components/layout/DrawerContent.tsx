import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter, useSegments } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Divider } from '@/components/ui/Divider';
import { DrawerColors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

interface MenuSection {
  title: string;
  icon: string;
  items: MenuItem[];
}

// ─── Menu config ─────────────────────────────────────────────────────────────

const MENU: MenuSection[] = [
  {
    title: 'Customers',
    icon: '👥',
    items: [
      { label: 'Dashboard',          route: '/(dashboard)/customers',           icon: '📊' },
      { label: 'Add Customer',       route: '/(dashboard)/customers/add',       icon: '➕' },
      { label: 'Add Files',          route: '/(dashboard)/customers/files',      icon: '📁' },
      { label: 'Add User Documents', route: '/(dashboard)/customers/documents',  icon: '📄' },
    ],
  },
  {
    title: 'Master',
    icon: '⚙️',
    items: [
      { label: 'Company',         route: '/(dashboard)/master/company',          icon: '🏢' },
      { label: 'Dealer',          route: '/(dashboard)/master/dealer',           icon: '🤝' },
      { label: 'Broker',          route: '/(dashboard)/master/broker',           icon: '👔' },
      { label: 'Finance Company', route: '/(dashboard)/master/finance-company',  icon: '🏦' },
      { label: 'Own Bank',        route: '/(dashboard)/master/own-bank',         icon: '🏛️' },
      { label: 'Insurance',       route: '/(dashboard)/master/insurance',        icon: '🛡️' },
      { label: 'Expenses',        route: '/(dashboard)/master/expenses',         icon: '💸' },
    ],
  },
  {
    title: 'Payment',
    icon: '💳',
    items: [
      { label: 'Payment',    route: '/(dashboard)/payment/payment',    icon: '💰' },
      { label: 'Commission', route: '/(dashboard)/payment/commission', icon: '📈' },
    ],
  },
  {
    title: 'Reports',
    icon: '📊',
    items: [
      { label: 'Dashboard',         route: '/(dashboard)/reports',                      icon: '🏠' },
      { label: 'RTO Payment',       route: '/(dashboard)/reports/rto-payment',          icon: '🚗' },
      { label: 'Insurance Payment', route: '/(dashboard)/reports/insurance-payment',    icon: '🛡️' },
      { label: 'Expense Out',       route: '/(dashboard)/reports/expense-out',          icon: '💸' },
      { label: 'Advance Dealer',    route: '/(dashboard)/reports/advance-dealer',       icon: '🤝' },
    ],
  },
  {
    title: 'Admin',
    icon: '👤',
    items: [
      { label: 'Users', route: '/(dashboard)/admin/users', icon: '👥' },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function DrawerContent(props: any) {
  const router = useRouter();
  const segments = useSegments();
  const { user, logout } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Customers']);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const navigate = (route: string) => {
    router.push(route as any);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const currentPath = '/' + segments.join('/');

  return (
    <View style={{ flex: 1, backgroundColor: DrawerColors.background }}>
      {/* ── User Header ─────────────────────────────────── */}
      <View
        style={{
          backgroundColor: DrawerColors.header,
          padding: 20,
          paddingTop: 52,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <Avatar name={user?.name ?? 'User'} size={48} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '800' }}>
            {user?.name ?? 'Guest'}
          </Text>
          <Text style={{ color: DrawerColors.subtext, fontSize: 12, marginTop: 2 }}>
            {user?.role ?? 'employee'}
          </Text>
        </View>
      </View>

      {/* ── Dashboard Link ──────────────────────────────── */}
      <TouchableOpacity
        onPress={() => navigate('/(dashboard)')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 14,
          gap: 12,
          backgroundColor: currentPath === '/(dashboard)' ? DrawerColors.active : 'transparent',
        }}
      >
        <Text style={{ fontSize: 16 }}>🏠</Text>
        <Text style={{ color: DrawerColors.activeText, fontSize: 14, fontWeight: '700' }}>
          Dashboard
        </Text>
      </TouchableOpacity>

      <Divider color={DrawerColors.divider} spacing={0} />

      {/* ── Scrollable Menu ─────────────────────────────── */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
        style={{ flex: 1 }}
      >
        {MENU.map(section => {
          const isExpanded = expandedSections.includes(section.title);
          return (
            <View key={section.title}>
              {/* Section Header */}
              <TouchableOpacity
                onPress={() => toggleSection(section.title)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  gap: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>{section.icon}</Text>
                <Text
                  style={{
                    flex: 1,
                    color: DrawerColors.text,
                    fontSize: 14,
                    fontWeight: '700',
                    letterSpacing: 0.3,
                  }}
                >
                  {section.title}
                </Text>
                <Text style={{ color: DrawerColors.subtext, fontSize: 12 }}>
                  {isExpanded ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {/* Section Items */}
              {isExpanded &&
                section.items.map(item => {
                  const isActive = currentPath.startsWith(item.route);
                  return (
                    <TouchableOpacity
                      key={item.route}
                      onPress={() => navigate(item.route)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 28,
                        paddingVertical: 10,
                        gap: 10,
                        backgroundColor: isActive ? DrawerColors.active : 'transparent',
                        borderRadius: isActive ? 8 : 0,
                        marginHorizontal: isActive ? 8 : 0,
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>{item.icon}</Text>
                      <Text
                        style={{
                          color: isActive ? DrawerColors.activeText : DrawerColors.text,
                          fontSize: 13,
                          fontWeight: isActive ? '700' : '500',
                        }}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

              <Divider color={DrawerColors.divider} spacing={0} thickness={0.5} />
            </View>
          );
        })}
      </DrawerContentScrollView>

      {/* ── Logout ──────────────────────────────────────── */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          gap: 12,
          borderTopWidth: 1,
          borderTopColor: DrawerColors.divider,
        }}
      >
        <Text style={{ fontSize: 18 }}>🚪</Text>
        <Text style={{ color: '#F87171', fontSize: 14, fontWeight: '700' }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
