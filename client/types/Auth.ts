export interface LoginFields {
  email: string;
  password: string;
}

export interface SignupFields extends LoginFields {
  name: string;
}
