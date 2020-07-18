import { Product } from './product';

export interface Cart {
  _id: string;
  product: Product;
  quantity: number;
}

export interface AddCart {
  product: Product;
  quantity: number;
}

export interface Carts {
  carts: Cart[];
}
