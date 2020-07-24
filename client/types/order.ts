import { Product } from './product';

export type Order = {
  _id: string;
  total: number;
  products: Product[];
  createdAt: Date;
};
