import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { DrawerContent } from '@/components/layout/DrawerContent';

export default function DashboardLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: 290 },
          overlayColor: 'rgba(0,0,0,0.5)',
          swipeEdgeWidth: 60,
        }}
      >
        <Drawer.Screen name="index"     options={{ title: 'Dashboard' }} />
        <Drawer.Screen name="customers" options={{ title: 'Customers' }} />
        <Drawer.Screen name="master"    options={{ title: 'Master' }} />
        <Drawer.Screen name="payment"   options={{ title: 'Payment' }} />
        <Drawer.Screen name="reports"   options={{ title: 'Reports' }} />
        <Drawer.Screen name="admin"     options={{ title: 'Admin' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
