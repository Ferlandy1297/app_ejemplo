import { ProductDTO } from '../dtos/product.dto';
import { ProductModel } from '../models/product.model';

export class ProductAdapter {
  static toModel(dto: ProductDTO): ProductModel {
    return {
      id: dto.id,
      sku: dto.sku,
      name: dto.name,
      category: dto.category,
      sellingPrice: dto.sellingPrice,
      costPrice: dto.costPrice,
      stock: dto.stock,
      minStock: dto.minStock,
      unit: dto.unit,
      description: dto.description,
      imageUrl: dto.imageUrl,
      isLowStock: dto.stock <= dto.minStock,
    };
  }

  static toModelList(dtos: ProductDTO[]): ProductModel[] {
    return dtos.map((dto) => this.toModel(dto));
  }
}
