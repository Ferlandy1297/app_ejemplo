import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ArrowLeft, Plus, Minus, ShoppingCart, CheckCircle, Package } from 'lucide-react-native';
import { ProductService } from '../services/productService';
import { ProductDTO } from '../dtos/product.dto';
import { useCart } from '../context/CartContext';

export const ProductDetailScreen = ({ route, navigation }: any) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductDTO | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useCart();

  useEffect(() => {
    ProductService.getProductById(productId).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Producto no encontrado</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert(
      '✅ Carrito Actualizado',
      `Se agregaron ${quantity} unidad(es) de ${product.name} a tu carrito.`,
      [
        { text: 'Seguir comprando', style: 'cancel' },
        { text: 'Ir al Carrito', onPress: () => navigation.navigate('CartTab') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón flotante para regresar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <ArrowLeft size={20} color="#0f172a" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.categoryName}</Text>
            </View>
            <Text style={styles.skuText}>SKU: {product.sku}</Text>
          </View>

          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>Q{product.sellingPrice.toFixed(2)}</Text>
            <View style={styles.stockBadge}>
              <CheckCircle size={14} color="#16a34a" />
              <Text style={styles.stockText}>{product.stock} disponibles ({product.unit})</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.featuresBox}>
            <View style={styles.featureItem}>
              <Package size={16} color="#4f46e5" />
              <Text style={styles.featureText}>Garantía de calidad Ferretería Express</Text>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle size={16} color="#4f46e5" />
              <Text style={styles.featureText}>Entrega a domicilio disponible en todo el país</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Barra inferior de compra */}
      <View style={styles.footer}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={16} color="#475569" />
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
          >
            <Plus size={16} color="#475569" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <ShoppingCart size={18} color="#ffffff" />
          <Text style={styles.addToCartText}>
            Comprar (Q{(product.sellingPrice * quantity).toFixed(2)})
          </Text>
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
  scrollContent: {
    paddingBottom: 100,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f1f5f9',
  },
  content: {
    padding: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#6366f1',
    fontSize: 11,
    fontWeight: '700',
  },
  skuText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 26,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4f46e5',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  stockText: {
    fontSize: 11,
    color: '#16a34a',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 20,
  },
  featuresBox: {
    marginTop: 18,
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  qtyValue: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 15,
    color: '#64748b',
  },
});
