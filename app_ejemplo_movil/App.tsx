import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <CartProvider>
          <StatusBar style="light" backgroundColor="#4f46e5" />
          <AppNavigator />
        </CartProvider>
      </NotificationProvider>
    </SafeAreaProvider>
  );
}
