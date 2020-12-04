export type Product = {
  _id: string;
  name: string;
  imageURL: string;
  category: string;
  description: string;
  price: number;
};

export interface ProductsData {
  products: Product[];
  total: number;
}

export interface ProductData {
  product: Product;
  relatedProducts: Product[];
}

export interface AddProduct {
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export interface AddProductData {
  product: Product;
}

export type Products = Product[];
