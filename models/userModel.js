import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'This Field Is Required'],
      unique: false,
      minLength: [3, 'Name Is Too Short'],
      maxLength: [32, 'Name Is Too Long'],
    },
    age: {
      type: Number,
      required: [true, 'Age Is Required'],
      min: [12, 'Must Be At Least 12 Years Old To Proceed'],
      max: [140, 'Too Old'],
    },
    email: {
      type: String,
      required: [true, 'Email Is Required'],
      unique: [true, 'This Email Is Used Before'],
      maxLength: [64, 'Email Is Too Long'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/,
        'This Is Not An Email!',
      ],
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
export const User = mongoose.model('Users', userSchema);
