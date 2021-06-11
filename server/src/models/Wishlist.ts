import { Schema, model, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types;

export interface WishlistDocument extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
}

const WishlistSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    product: {
      type: ObjectId,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  }
);

export const Wishlist = model<WishlistDocument>('Wishlist', WishlistSchema);
