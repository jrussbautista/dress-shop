import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId, Number } = Schema.Types;

interface Item {
  quantity: number;
  product: Types.ObjectId;
}

export interface OrderDocument extends Document {
  user: Types.ObjectId;
  items: Item[];
  total: number;
  isPaid?: boolean;
  paymentMethod: string;
}

const OrderSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    items: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: ObjectId,
          ref: 'Product',
        },
      },
    ],
    total: Number,
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<OrderDocument>('Order', OrderSchema);
