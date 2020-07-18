import { Role } from './role';

export type User = {
  _id: string;
  name: string;
  email: string;
  imageURL?: string;
  password: string;
  role: Role;
  carts: string[];
};
