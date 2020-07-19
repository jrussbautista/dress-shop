import { Schema, model, Document, Types } from 'mongoose';
import { Product } from '../types';

export interface OrderDocument extends Document {
  user: Types.ObjectId;
  quantity: number;
  products: Product[];
}

const OrderSchema = new Schema(
  {
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    total: Number,
  },
  {
    timestamps: true,
  }
);

export const Order = model<OrderDocument>('Order', OrderSchema);
