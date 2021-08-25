import { User } from './User';
import { Product } from './Product';

interface CartItem {
  quantity: number;
  product: Product;
}

export type Cart = {
  _id: string;
  items: CartItem[];
  user: string;
};
