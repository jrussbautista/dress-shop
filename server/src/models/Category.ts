import { Schema, model, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  name: String;
  imageURL: String;
}

const CategorySchema = new Schema(
  {
    name: String,
    imageURL: String,
  },
  {
    timestamps: true,
  }
);

export const Category = model<CategoryDocument>('Category', CategorySchema);
