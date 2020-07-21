import { Schema, model, Document, Types } from 'mongoose';

interface Product {
  quantity: number;
  product: Types.ObjectId;
}

export interface OrderDocument extends Document {
  user: Types.ObjectId;
  products: Product[];
  total: number;
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
