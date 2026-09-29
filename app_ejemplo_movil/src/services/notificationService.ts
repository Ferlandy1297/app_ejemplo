import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configurar comportamiento por defecto de notificaciones en primer plano (foreground)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationService {
  /**
   * Solicita permisos de notificación y registra el canal Android
   */
  static async registerForPushNotificationsAsync(): Promise<string | null> {
    let token: string | null = null;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('pedidos-channel', {
        name: 'Pedidos y Compras',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4f46e5',
        sound: 'default',
      });

      await Notifications.setNotificationChannelAsync('promos-channel', {
        name: 'Promociones Ferretería',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });
    }

    if (Device.isDevice || Platform.OS === 'web') {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Permiso de notificaciones push denegado');
        return null;
      }

      try {
        const pushTokenData = await Notifications.getExpoPushTokenAsync();
        token = pushTokenData.data;
        console.log('Expo Push Token obtenido:', token);
      } catch (error) {
        console.warn('No se pudo obtener Expo Push Token remoto (modo local activo):', error);
      }
    } else {
      console.log('Ejecutando en simulador: Notificaciones locales activas.');
    }

    return token;
  }

  /**
   * 1. Notificación Inmediata: Confirmación de Pedido
   */
  static async sendOrderConfirmationNotification(
    orderNumber: string,
    total: number,
    itemCount: number
  ): Promise<string> {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎉 ¡Pedido Confirmado!',
        body: `Tu orden #${orderNumber} (${itemCount} productos) por Q${total.toFixed(2)} ha sido procesada con éxito en Ferretería Express.`,
        data: { orderNumber, type: 'ORDER_CONFIRMED', screen: 'Orders' },
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: null, // trigger null = Inmediata
    });

    return notificationId;
  }

  /**
   * 2. Notificación Programada: Estado del Pedido (Simulado en camino)
   */
  static async scheduleDeliveryUpdateNotification(
    orderNumber: string,
    delaySeconds: number = 10
  ): Promise<string> {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🚚 Tu pedido va en camino',
        body: `El repartidor de Ferretería Express ha salido con tu pedido #${orderNumber}. Llegará pronto a tu dirección.`,
        data: { orderNumber, type: 'ORDER_IN_TRANSIT', screen: 'Orders' },
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        seconds: delaySeconds,
      },
    });

    return notificationId;
  }

  /**
   * 3. Notificación de Promoción / Descuento (Ejemplo de prueba)
   */
  static async sendPromoNotification(): Promise<string> {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '⚡ ¡Oferta Relámpago de Fin de Semana!',
        body: '20% de descuento en todas las herramientas eléctricas DeWalt. ¡Aprovecha hoy!',
        data: { type: 'PROMOTION', screen: 'Catalog' },
        sound: 'default',
      },
      trigger: null,
    });

    return notificationId;
  }
}
