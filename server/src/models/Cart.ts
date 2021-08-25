import { ProductDocument } from './Product';
import { UserDocument } from './User';
import { Schema, model, Document } from 'mongoose';

const { ObjectId, Number } = Schema.Types;

interface Items {
  quantity: number;
  product: ProductDocument['_id'];
}

export interface CartDocument extends Document {
  user: UserDocument['_id'];
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
