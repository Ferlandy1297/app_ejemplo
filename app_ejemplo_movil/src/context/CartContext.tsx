import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductDTO } from '../dtos/product.dto';
import { CartItem, OrderDTO } from '../dtos/order.dto';
import { NotificationService } from '../services/notificationService';

const CART_STORAGE_KEY = '@app_cart_items';
const ORDERS_STORAGE_KEY = '@app_orders_history';
const SHIPPING_COST = 25.0; // Q25.00 envío estándar

interface CustomerData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: 'EFECTIVO' | 'TARJETA';
}

interface CartContextType {
  cart: CartItem[];
  orders: OrderDTO[];
  totalItems: number;
  subtotal: number;
  shippingCost: number;
  total: number;
  addToCart: (product: ProductDTO, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customer: CustomerData) => Promise<OrderDTO>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  // Cargar carrito e historial persistido
  useEffect(() => {
    const loadStorage = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
        if (savedOrders) setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Error cargando almacenamiento:', e);
      }
    };
    loadStorage();
  }, []);

  // Persistir carrito
  const saveCart = async (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    } catch (e) {
      console.error('Error guardando carrito:', e);
    }
  };

  const addToCart = (product: ProductDTO, quantity: number = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart: CartItem[];

    if (existingIndex >= 0) {
      newCart = [...cart];
      const newQty = newCart[existingIndex].quantity + quantity;
      newCart[existingIndex] = {
        ...newCart[existingIndex],
        quantity: Math.min(newQty, product.stock),
      };
    } else {
      newCart = [...cart, { product, quantity: Math.min(quantity, product.stock) }];
    }

    saveCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.min(quantity, item.product.stock) };
      }
      return item;
    });

    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.sellingPrice * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const shipping = cart.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  const placeOrder = async (customer: CustomerData): Promise<OrderDTO> => {
    const orderNumber = `FE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDTO = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: customer.customerName,
      customerPhone: customer.customerPhone,
      deliveryAddress: customer.deliveryAddress,
      paymentMethod: customer.paymentMethod,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.sellingPrice,
        quantity: item.quantity,
        subtotal: item.product.sellingPrice * item.quantity,
      })),
      subtotal,
      shippingCost: shipping,
      total,
      status: 'RECIBIDO',
      createdAt: new Date().toISOString(),
    };

    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(newOrders));

    // 1. Disparar Notificación Push Inmediata
    await NotificationService.sendOrderConfirmationNotification(
      orderNumber,
      total,
      totalItems
    );

    // 2. Programar Notificación Push de Estado (10 segundos después)
    await NotificationService.scheduleDeliveryUpdateNotification(orderNumber, 10);

    // Limpiar carrito
    clearCart();

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        totalItems,
        subtotal,
        shippingCost: shipping,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};
