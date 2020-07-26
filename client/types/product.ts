export type Product = {
  _id: string;
  name: string;
  imageURL: string;
  category: string;
  description: string;
  stocks: string;
  price: number;
};

export type Products = Product[];
