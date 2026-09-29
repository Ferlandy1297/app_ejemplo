export interface ProductDTO {
  id: string;
  sku: string;
  name: string;
  category: string;
  sellingPrice: number;
  costPrice: number;
  stock: number;
  minStock: number;
  unit: string;
  description: string;
  imageUrl: string;
}
