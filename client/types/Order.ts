import { Product } from './Product';

interface Item {
  quantity: number;
  product: Product;
}

export type Order = {
  _id: string;
  total: number;
  items: Item[];
  createdAt: Date;
};
