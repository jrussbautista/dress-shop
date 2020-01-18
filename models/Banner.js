import mongoose from 'mongoose';

const { String } = mongoose.Schema.Types;
const BannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  text: {
    type: String
  }
});

export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
