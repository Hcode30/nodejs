import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'Categories Must Be Unique'],
      required: [true, 'This Field Is Required'],
      trim: true,
      minLength: [3, 'Name Is Too Short'],
      maxLength: [32, 'Name Is Too Long'],
    },
    image: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model('Categories', categorySchema);
