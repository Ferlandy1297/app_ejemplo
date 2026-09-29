import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Search, SlidersHorizontal, Bell } from 'lucide-react-native';
import { Header } from '../components/Header';
import { CategoryPill } from '../components/CategoryPill';
import { ProductCard } from '../components/ProductCard';
import { ProductService } from '../services/productService';
import { ProductDTO } from '../dtos/product.dto';
import { CategoryDTO } from '../dtos/category.dto';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';

export const CatalogScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { addToCart } = useCart();
  const { sendPromoNotification } = useNotifications();

  const loadData = useCallback(async () => {
    try {
      const [cats, prods] = await Promise.all([
        ProductService.getCategories(),
        ProductService.getProducts(search, selectedCategory),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (e) {
      console.error('Error cargando catálogo:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, selectedCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleAddToCart = (product: ProductDTO) => {
    addToCart(product, 1);
    Alert.alert('✅ Agregado', `${product.name} fue agregado a tu carrito.`);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Ferretería Express"
        subtitle="Catálogo de Compras"
        rightComponent={
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => sendPromoNotification()}
          >
            <Bell size={18} color="#ffffff" />
          </TouchableOpacity>
        }
      />

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar herramientas, materiales..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Categorías horizontales */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <CategoryPill
            name="Todos"
            isSelected={selectedCategory === ''}
            onPress={() => setSelectedCategory('')}
          />
          {categories.map((cat) => (
            <CategoryPill
              key={cat.id}
              name={cat.name}
              isSelected={selectedCategory === cat.id}
              onPress={() => setSelectedCategory(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Lista de productos */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text style={styles.loadingText}>Cargando catálogo...</Text>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>No se encontraron productos</Text>
          <Text style={styles.emptySubtitle}>Intenta con otro término de búsqueda o categoría.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
              onAddToCart={() => handleAddToCart(item)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4f46e5']} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  bellButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0f172a',
    padding: 0,
  },
  categoriesWrapper: {
    paddingVertical: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingTop: 6,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 10,
    color: '#64748b',
    fontSize: 13,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
});
