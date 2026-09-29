import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  CheckCircle,
  BellRing,
} from 'lucide-react-native';
import { useCart } from '../context/CartContext';

export const CheckoutScreen = ({ navigation }: any) => {
  const { total, totalItems, placeOrder } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('Zona 1, Ciudad de Guatemala');
  const [paymentMethod, setPaymentMethod] = useState<'EFECTIVO' | 'TARJETA'>('EFECTIVO');
  const [processing, setProcessing] = useState(false);

  const handleConfirmOrder = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los datos de entrega.');
      return;
    }

    setProcessing(true);

    try {
      const order = await placeOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        paymentMethod,
      });

      setProcessing(false);

      Alert.alert(
        '🎉 ¡Compra Exitosa!',
        `Tu pedido #${order.orderNumber} por Q${order.total.toFixed(2)} ha sido registrado.\n\n🔔 Hemos enviado una Notificación Push de confirmación a tu teléfono.`,
        [
          {
            text: 'Ver Pedido & Notificaciones',
            onPress: () => navigation.navigate('OrdersTab'),
          },
        ]
      );
    } catch (e) {
      setProcessing(false);
      Alert.alert('Error', 'No se pudo procesar la orden.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar Compra</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Push Notification */}
        <View style={styles.pushBanner}>
          <BellRing size={20} color="#4f46e5" />
          <Text style={styles.pushBannerText}>
            Recibirás una <Text style={{ fontWeight: '700' }}>Notificación Push</Text> en tu
            dispositivo inmediatamente al confirmar esta compra.
          </Text>
        </View>

        {/* Datos de Entrega */}
        <Text style={styles.sectionTitle}>Datos de Entrega</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nombre Completo / Razón Social</Text>
          <View style={styles.inputWrapper}>
            <User size={16} color="#94a3b8" />
            <TextInput
              style={styles.input}
              value={customerName}
              onChangeText={setCustomerName}
              placeholder="Ej: Cliente Demo"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Teléfono de Contacto</Text>
          <View style={styles.inputWrapper}>
            <Phone size={16} color="#94a3b8" />
            <TextInput
              style={styles.input}
              value={customerPhone}
              onChangeText={setCustomerPhone}
              placeholder="Ej: 0000-0000"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Dirección de Entrega</Text>
          <View style={styles.inputWrapper}>
            <MapPin size={16} color="#94a3b8" />
            <TextInput
              style={styles.input}
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
              placeholder="Ej: Zona 1, Ciudad de Guatemala"
            />
          </View>
        </View>

        {/* Método de Pago */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Método de Pago</Text>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'EFECTIVO' && styles.paymentOptionSelected,
          ]}
          onPress={() => setPaymentMethod('EFECTIVO')}
          activeOpacity={0.8}
        >
          <Banknote size={20} color={paymentMethod === 'EFECTIVO' ? '#4f46e5' : '#64748b'} />
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Efectivo contra Entrega</Text>
            <Text style={styles.paymentSubtitle}>Pagas al recibir tus herramientas en tu domicilio</Text>
          </View>
          {paymentMethod === 'EFECTIVO' && <CheckCircle size={18} color="#4f46e5" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'TARJETA' && styles.paymentOptionSelected,
          ]}
          onPress={() => setPaymentMethod('TARJETA')}
          activeOpacity={0.8}
        >
          <CreditCard size={20} color={paymentMethod === 'TARJETA' ? '#4f46e5' : '#64748b'} />
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Tarjeta de Débito / Crédito</Text>
            <Text style={styles.paymentSubtitle}>Visa, Mastercard o transferencia bancaria</Text>
          </View>
          {paymentMethod === 'TARJETA' && <CheckCircle size={18} color="#4f46e5" />}
        </TouchableOpacity>
      </ScrollView>

      {/* Footer de confirmación */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerTotalLabel}>Total ({totalItems} items):</Text>
          <Text style={styles.footerTotalValue}>Q{total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
          disabled={processing}
          activeOpacity={0.8}
        >
          {processing ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.confirmButtonText}>Confirmar y Pagar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  pushBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 10,
  },
  pushBannerText: {
    flex: 1,
    fontSize: 12,
    color: '#3730a3',
    lineHeight: 17,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#0f172a',
    padding: 0,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  paymentOptionSelected: {
    backgroundColor: '#f5f3ff',
    borderColor: '#6366f1',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  paymentSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  footerTotalLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  footerTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4f46e5',
  },
  confirmButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
