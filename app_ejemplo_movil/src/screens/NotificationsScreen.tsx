import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  Bell,
  Send,
  Zap,
  Clock,
  CheckCircle2,
  Server,
  Trash2,
  Smartphone,
} from 'lucide-react-native';
import { Header } from '../components/Header';
import { useNotifications } from '../context/NotificationContext';
import { useCart } from '../context/CartContext';
import { HttpClient } from '../api/httpClient';
import { NotificationService } from '../services/notificationService';

export const NotificationsScreen = () => {
  const { expoPushToken, notificationsLog, sendPromoNotification, clearLogs } =
    useNotifications();
  const { orders } = useCart();

  const [apiUrl, setApiUrl] = useState('');
  const [savingUrl, setSavingUrl] = useState(false);

  useEffect(() => {
    HttpClient.getBaseUrl().then(setApiUrl);
  }, []);

  const handleSaveApiUrl = async () => {
    if (!apiUrl.trim()) return;
    setSavingUrl(true);
    await HttpClient.setBaseUrl(apiUrl.trim());
    setSavingUrl(false);
    Alert.alert('✅ URL Guardada', `Conectando a: ${apiUrl}`);
  };

  const handleTestOrderPush = async () => {
    const num = `FE-${Math.floor(100000 + Math.random() * 900000)}`;
    await NotificationService.sendOrderConfirmationNotification(num, 145.0, 1);
    Alert.alert('🔔 Notificación Enviada', 'Revisa la barra de notificaciones de tu teléfono.');
  };

  const handleTestScheduledPush = async () => {
    const num = `FE-${Math.floor(100000 + Math.random() * 900000)}`;
    await NotificationService.scheduleDeliveryUpdateNotification(num, 5);
    Alert.alert('⏳ Notificación Programada', 'Se disparará en 5 segundos. Puedes salir de la app para ver la alerta emergente.');
  };

  return (
    <View style={styles.container}>
      <Header title="Notificaciones & Pedidos" subtitle="Historial y Centro de Notificaciones Push" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Panel de Estado Push */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Smartphone size={18} color="#4f46e5" />
            <Text style={styles.cardTitle}>Estado de Push Notifications</Text>
          </View>

          <View style={styles.tokenContainer}>
            <Text style={styles.tokenLabel}>Expo Push Token:</Text>
            <Text style={styles.tokenValue} numberOfLines={2} selectable>
              {expoPushToken || 'Modo Local / Expo Go Activo'}
            </Text>
          </View>

          <Text style={styles.helpText}>
            Las notificaciones push están configuradas con sonido, vibración y alertas emergentes automáticas.
          </Text>

          {/* Botones de Prueba Push */}
          <Text style={styles.subTitle}>Disparar Pruebas de Notificación:</Text>

          <View style={styles.buttonGrid}>
            <TouchableOpacity
              style={[styles.testBtn, { backgroundColor: '#4f46e5' }]}
              onPress={handleTestOrderPush}
              activeOpacity={0.8}
            >
              <Send size={15} color="#ffffff" />
              <Text style={styles.testBtnText}>Push Compra</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.testBtn, { backgroundColor: '#0284c7' }]}
              onPress={handleTestScheduledPush}
              activeOpacity={0.8}
            >
              <Clock size={15} color="#ffffff" />
              <Text style={styles.testBtnText}>Push en 5s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.testBtn, { backgroundColor: '#d97706' }]}
              onPress={() => sendPromoNotification()}
              activeOpacity={0.8}
            >
              <Zap size={15} color="#ffffff" />
              <Text style={styles.testBtnText}>Push Promo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Historial de Pedidos Realizados */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <CheckCircle2 size={18} color="#16a34a" />
            <Text style={styles.cardTitle}>Mis Pedidos Realizados ({orders.length})</Text>
          </View>

          {orders.length === 0 ? (
            <Text style={styles.emptyText}>No has realizado pedidos aún.</Text>
          ) : (
            orders.map((ord) => (
              <View key={ord.id} style={styles.orderItem}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderNumber}>Orden #{ord.orderNumber}</Text>
                  <Text style={styles.orderTotal}>Q{ord.total.toFixed(2)}</Text>
                </View>
                <Text style={styles.orderDetail}>
                  {ord.items.length} producto(s) • Entrega: {ord.deliveryAddress}
                </Text>
                <Text style={styles.orderDate}>
                  {new Date(ord.createdAt).toLocaleString()}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Log de Notificaciones Recibidas */}
        <View style={styles.card}>
          <View style={styles.cardHeaderWithAction}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Bell size={18} color="#4f46e5" />
              <Text style={styles.cardTitle}>Log de Push Recibidas</Text>
            </View>
            {notificationsLog.length > 0 && (
              <TouchableOpacity onPress={clearLogs}>
                <Trash2 size={16} color="#ef4444" />
              </TouchableOpacity>
            )}
          </View>

          {notificationsLog.length === 0 ? (
            <Text style={styles.emptyText}>
              Aún no has recibido notificaciones push en esta sesión. Realiza una compra o presiona los botones de prueba arriba.
            </Text>
          ) : (
            notificationsLog.map((log) => (
              <View key={log.id} style={styles.logItem}>
                <View style={styles.logHeader}>
                  <Text style={styles.logTitle}>{log.title}</Text>
                  <Text style={styles.logTime}>{log.receivedAt}</Text>
                </View>
                <Text style={styles.logBody}>{log.body}</Text>
              </View>
            ))
          )}
        </View>

        {/* Configuración de Conexión Backend */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Server size={18} color="#4f46e5" />
            <Text style={styles.cardTitle}>Conexión al Backend Spring Boot</Text>
          </View>
          <Text style={styles.inputHelp}>
            Si pruebas en tu celular físico con Expo Go, ingresa la IP local de tu computadora (ej: http://192.168.1.50:8080/api/v1):
          </Text>

          <View style={styles.urlInputRow}>
            <TextInput
              style={styles.urlInput}
              value={apiUrl}
              onChangeText={setApiUrl}
              placeholder="http://192.168.1.X:8080/api/v1"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.saveUrlBtn}
              onPress={handleSaveApiUrl}
              disabled={savingUrl}
            >
              <Text style={styles.saveUrlText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardHeaderWithAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  tokenContainer: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tokenLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  tokenValue: {
    fontSize: 11,
    color: '#334155',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  helpText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 8,
    lineHeight: 16,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginTop: 14,
    marginBottom: 8,
  },
  buttonGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  testBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 5,
  },
  testBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  orderItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4f46e5',
  },
  orderDetail: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
  },
  orderDate: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  logItem: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4f46e5',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  logTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  logTime: {
    fontSize: 10,
    color: '#94a3b8',
  },
  logBody: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 15,
  },
  emptyText: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  inputHelp: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 15,
  },
  urlInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  urlInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    color: '#0f172a',
  },
  saveUrlBtn: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 10,
  },
  saveUrlText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
