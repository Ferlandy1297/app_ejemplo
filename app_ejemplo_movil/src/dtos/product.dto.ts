export interface ProductDTO {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  sellingPrice: number;
  costPrice?: number;
  stock: number;
  minStock: number;
  unit: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}
