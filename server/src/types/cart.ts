import { Product } from './product';

export type Cart = {
  _id: string;
  product: Product;
  quantity: number;
};
