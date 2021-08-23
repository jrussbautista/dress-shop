export type User = {
  _id: string;
  email?: string;
  name: string;
  imageURL: string;
  role: 'user' | 'admin';
};

export type UserFields = {
  name: string;
  password: string;
  email: string;
};

export interface UpdateUserFields {
  image: string | ArrayBuffer | null;
  name: string;
  email: string;
}
