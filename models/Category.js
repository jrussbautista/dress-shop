import mongoose from 'mongoose';

const { String } = mongoose.Schema.Types;
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});

export default mongoose.models.Category ||
  mongoose.model('Category', CategorySchema);
