import { Schema, model, Document, Types } from 'mongoose';
import { Product } from '../types';

export interface CartDocument extends Document {
  user: Types.ObjectId;
  quantity: number;
  product: Types.ObjectId;
}

const CartSchema = new Schema(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    product: {
      type: 'ObjectId',
      ref: 'Product',
    },
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

export const Cart = model<CartDocument>('Cart', CartSchema);
