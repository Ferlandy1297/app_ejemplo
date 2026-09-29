import { ProductDTO } from './product.dto';

export interface CartItem {
  product: ProductDTO;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderDTO {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: 'EFECTIVO' | 'TARJETA';
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'RECIBIDO' | 'EN_PREPARACION' | 'EN_CAMINO' | 'ENTREGADO';
  createdAt: string;
}
