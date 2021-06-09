import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId, Number } = Schema.Types;

interface Items {
  quantity: number;
  product: Types.ObjectId;
}

export interface CartDocument extends Document {
  user: Types.ObjectId;
  items: Items[];
}

const CartSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export const Cart = model<CartDocument>('Cart', CartSchema);
