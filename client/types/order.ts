import { Product } from './product';

interface OrderProduct {
  quantity: number;
  product: Product;
}

export type Order = {
  _id: string;
  total: number;
  products: OrderProduct[];
  createdAt: Date;
};
