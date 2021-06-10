import { Product } from './Product';

export interface CartItem {
  _id: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
}
