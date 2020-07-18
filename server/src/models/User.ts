import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Role } from '../types';

export interface UserDocument extends Document {
  name: string;
  email: string;
  imageURL?: string;
  password: string;
  role: Role;
  carts: Types.ObjectId[];
  matchesPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    imageURL: String,
    password: String,
    role: String,
    carts: [
      {
        type: 'ObjectId',
        ref: 'Cart',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hash password
UserSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    const hash = await bcrypt.hashSync(String(this.password), 10);
    this.password = hash;
  }
});

// check if password matches the hash password
UserSchema.methods.matchesPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

export const User = model<UserDocument>('User', UserSchema);
