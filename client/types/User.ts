export type User = {
  _id: string;
  email?: string;
  name: string;
  imageURL: string;
  carts: string[];
  role: 'user' | 'admin';
};

export type UserFields = {
  name: string;
  password: string;
  email: string;
};
