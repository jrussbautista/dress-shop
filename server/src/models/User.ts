import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Role } from '../types';

const { String } = Schema.Types;

export interface UserDocument extends Document {
  name: string;
  email: string;
  imageURL?: string;
  password?: string;
  role: Role;
  googleId?: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    imageURL: String,
    password: String,
    role: String,
    googleId: String,
  },
  {
    timestamps: true,
  }
);

// hash password
UserSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    if (this.password) {
      const hash = await bcrypt.hashSync(this.password.toString(), 10);
      this.password = hash;
    }
  }
});

// check if password matches the hash password
UserSchema.methods.matchesPassword = function (password: string) {
  if (!this.password) {
    return false;
  }
  return bcrypt.compareSync(password, this.password);
};

export const User = model<UserDocument>('User', UserSchema);
