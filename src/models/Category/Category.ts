import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from '../../graphql.types';

export type CategoryDocument = Document &
  Omit<Category, 'id'> & {
    // Category & {
    commandId: string;
  };
export const CategorySchema = new mongoose.Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    commandId: String,
    photo: String,
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model('Category', CategorySchema);
