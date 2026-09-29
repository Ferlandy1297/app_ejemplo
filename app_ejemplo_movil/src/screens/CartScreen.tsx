import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react-native';
import { Header } from '../components/Header';
import { useCart } from '../context/CartContext';

export const CartScreen = ({ navigation }: any) => {
  const {
    cart,
    totalItems,
    subtotal,
    shippingCost,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Header title="Carrito de Compras" subtitle="0 productos seleccionados" />
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <ShoppingBag size={48} color="#94a3b8" />
          </View>
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptySubtitle}>
            Explora nuestro catálogo y agrega los materiales o herramientas que necesitas.
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('CatalogTab')}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>Explorar Catálogo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Carrito de Compras"
        subtitle={`${totalItems} productos seleccionados`}
        rightComponent={
          <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
            <Text style={styles.clearBtnText}>Vaciar</Text>
          </TouchableOpacity>
        }
      />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image
              source={{ uri: item.product.imageUrl }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemCategory}>{item.product.categoryName}</Text>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.itemPrice}>
                Q{item.product.sellingPrice.toFixed(2)}{' '}
                <Text style={styles.unitText}>/ {item.product.unit}</Text>
              </Text>

              <View style={styles.quantityRow}>
                <View style={styles.qtyBox}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus size={14} color="#334155" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus size={14} color="#334155" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFromCart(item.product.id)}
                >
                  <Trash2 size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Resumen de Pago */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>Q{subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Costo de Envío</Text>
          <Text style={styles.summaryValue}>Q{shippingCost.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total a Pagar</Text>
          <Text style={styles.totalValue}>Q{total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Proceder al Pago</Text>
          <ArrowRight size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  clearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  clearBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 220,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemCategory: {
    fontSize: 10,
    color: '#6366f1',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4f46e5',
  },
  unitText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  qtyText: {
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  removeBtn: {
    padding: 6,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4f46e5',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 12,
    gap: 8,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  exploreButton: {
    marginTop: 20,
    backgroundColor: '#4f46e5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});
