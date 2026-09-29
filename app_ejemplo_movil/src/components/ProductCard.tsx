import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { ProductDTO } from '../dtos/product.dto';

interface ProductCardProps {
  product: ProductDTO;
  onPress: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.categoryName}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sku}>SKU: {product.sku}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Precio</Text>
            <Text style={styles.price}>Q{product.sellingPrice.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddToCart}
            activeOpacity={0.7}
          >
            <ShoppingCart size={16} color="#ffffff" />
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#f8fafc',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 14,
  },
  sku: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
    marginBottom: 10,
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  priceLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
    color: '#4f46e5',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    gap: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
