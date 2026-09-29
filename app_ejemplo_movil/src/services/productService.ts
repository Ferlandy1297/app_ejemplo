import { HttpClient } from '../api/httpClient';
import { ProductDTO } from '../dtos/product.dto';
import { CategoryDTO } from '../dtos/category.dto';

interface BackendApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PageData<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

// Catálogo Seed de respaldo para modo offline
const FALLBACK_CATEGORIES: CategoryDTO[] = [
  { id: 'cat001', name: 'Herramientas Eléctricas', isActive: true },
  { id: 'cat002', name: 'Herramientas Manuales', isActive: true },
  { id: 'cat003', name: 'Pinturas & Acabados', isActive: true },
  { id: 'cat004', name: 'Plomería & Tuberías', isActive: true },
  { id: 'cat005', name: 'Material Eléctrico', isActive: true },
];

const FALLBACK_PRODUCTS: ProductDTO[] = [
  {
    id: 'p001',
    name: 'Taladro Inalámbrico 20V DeWalt',
    sku: 'TAL-DW-20V',
    categoryId: 'cat001',
    categoryName: 'Herramientas Eléctricas',
    sellingPrice: 145.0,
    stock: 18,
    minStock: 5,
    unit: 'Unidad',
    description: 'Taladro percutor con 2 baterías de litio, cargador rápido y maletín de transporte.',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    id: 'p002',
    name: 'Juego de Destornilladores Stanley (10 pzs)',
    sku: 'DES-ST-10P',
    categoryId: 'cat002',
    categoryName: 'Herramientas Manuales',
    sellingPrice: 24.5,
    stock: 35,
    minStock: 10,
    unit: 'Juego',
    description: 'Destornilladores de precisión planos y phillips con mango ergonómico antideslizante.',
    imageUrl: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    id: 'p003',
    name: 'Pintura Látex Blanca Cubeta 5 Gal',
    sku: 'PIN-LT-5GL',
    categoryId: 'cat003',
    categoryName: 'Pinturas & Acabados',
    sellingPrice: 68.0,
    stock: 22,
    minStock: 6,
    unit: 'Cubeta',
    description: 'Pintura antihongos de alto cubrimiento lavable para interiores y exteriores.',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    id: 'p004',
    name: 'Tubo PVC Presión 1/2 pulgada (6m)',
    sku: 'TUB-PVC-05',
    categoryId: 'cat004',
    categoryName: 'Plomería & Tuberías',
    sellingPrice: 6.25,
    stock: 80,
    minStock: 20,
    unit: 'Tubo',
    description: 'Tubo PVC cédula 40 de alta resistencia para conducción de agua potable.',
    imageUrl: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
  {
    id: 'p005',
    name: 'Cable Eléctrico THHN Calibre 12 (100m)',
    sku: 'CAB-TH-12C',
    categoryId: 'cat005',
    categoryName: 'Material Eléctrico',
    sellingPrice: 89.9,
    stock: 12,
    minStock: 4,
    unit: 'Rollo',
    description: 'Conductor de cobre puro de 100m resistente a alta temperatura y humedad.',
    imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    isActive: true,
  },
];

export class ProductService {
  static async getCategories(): Promise<CategoryDTO[]> {
    try {
      const response = await HttpClient.get<BackendApiResponse<CategoryDTO[]>>('/categories');
      if (response.success && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_CATEGORIES;
  }

  static async getProducts(search: string = '', categoryId: string = ''): Promise<ProductDTO[]> {
    try {
      const searchParam = search.trim() ? `&search=${encodeURIComponent(search.trim())}` : '';
      const response = await HttpClient.get<BackendApiResponse<PageData<ProductDTO>>>(
        `/products?page=0&size=50${searchParam}`
      );
      if (response.success && response.data) {
        let products = response.data.content;
        if (categoryId) {
          products = products.filter((p) => p.categoryId === categoryId);
        }
        return products;
      }
    } catch {
      // Fallback
    }

    let products = FALLBACK_PRODUCTS;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (categoryId) {
      products = products.filter((p) => p.categoryId === categoryId);
    }
    return products;
  }

  static async getProductById(id: string): Promise<ProductDTO | undefined> {
    try {
      const response = await HttpClient.get<BackendApiResponse<ProductDTO>>(`/products/${id}`);
      if (response.success && response.data) {
        return response.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_PRODUCTS.find((p) => p.id === id);
  }
}
