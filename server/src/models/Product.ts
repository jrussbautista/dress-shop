import { Schema, model, Document } from 'mongoose';

const { String, Number } = Schema.Types;

export interface ProductDocument extends Document {
  name: string;
  price: number;
  imageURL: string;
  category: string;
  description: string;
}

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    imageURL: String,
    category: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

productSchema.index(
  {
    name: 'text',
  },
  {
    weights: {
      name: 3,
    },
  }
);

export const Product = model<ProductDocument>('Product', productSchema);
