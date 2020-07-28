export type User = {
  _id: string;
  email?: string;
  name: string;
  imageURL: string;
  carts: string[];
  role?: string;
};

export type UserFields = {
  name: string;
  password: string;
  email: string;
};
