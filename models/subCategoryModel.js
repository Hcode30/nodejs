import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'SubCategories Must Be Unique'],
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
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      require: [true, 'SubCategory Must Belong To A Parent Category'],
    },
  },
  { timestamps: true }
);
export default  mongoose.model('SubCategories', subCategorySchema);
