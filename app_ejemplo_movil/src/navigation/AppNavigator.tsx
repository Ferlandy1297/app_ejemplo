import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Store, ShoppingCart, Bell } from 'lucide-react-native';

import { CatalogScreen } from '../screens/CatalogScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack para Catálogo y Detalle
const CatalogStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CatalogList" component={CatalogScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

// Stack para Carrito y Checkout
const CartStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CartMain" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { totalItems } = useCart();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4f46e5',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#f1f5f9',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="CatalogTab"
          component={CatalogStack}
          options={{
            tabBarLabel: 'Catálogo',
            tabBarIcon: ({ color, size }) => <Store size={size} color={color} />,
          }}
        />

        <Tab.Screen
          name="CartTab"
          component={CartStack}
          options={{
            tabBarLabel: 'Carrito',
            tabBarIcon: ({ color, size }) => (
              <View style={{ position: 'relative' }}>
                <ShoppingCart size={size} color={color} />
                {totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItems}</Text>
                  </View>
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="OrdersTab"
          component={NotificationsScreen}
          options={{
            tabBarLabel: 'Notificaciones',
            tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#ef4444',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
});
