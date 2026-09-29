import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { NotificationService } from '../services/notificationService';

interface NotificationLog {
  id: string;
  title: string;
  body: string;
  receivedAt: string;
  data?: Record<string, unknown>;
}

interface NotificationContextType {
  expoPushToken: string | null;
  notificationsLog: NotificationLog[];
  sendTestNotification: () => Promise<void>;
  sendPromoNotification: () => Promise<void>;
  clearLogs: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notificationsLog, setNotificationsLog] = useState<NotificationLog[]>([]);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // 1. Solicitar permisos y obtener token
    NotificationService.registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    // 2. Escuchar notificaciones recibidas en primer plano
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body, data } = notification.request.content;
      const newLog: NotificationLog = {
        id: notification.request.identifier,
        title: title || 'Notificación',
        body: body || '',
        receivedAt: new Date().toLocaleTimeString(),
        data: data as Record<string, unknown>,
      };
      setNotificationsLog((prev) => [newLog, ...prev]);
    });

    // 3. Escuchar interacción al tocar la notificación
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notificación pulsada por el usuario:', response.notification.request.content);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const sendTestNotification = async () => {
    await NotificationService.sendOrderConfirmationNotification('TEST-999', 320.0, 3);
  };

  const sendPromoNotification = async () => {
    await NotificationService.sendPromoNotification();
  };

  const clearLogs = () => {
    setNotificationsLog([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        notificationsLog,
        sendTestNotification,
        sendPromoNotification,
        clearLogs,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications debe ser utilizado dentro de un NotificationProvider');
  }
  return context;
};
