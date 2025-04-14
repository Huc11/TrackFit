import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    hydration: {
      goal: { type: Number, default: 2000 },
      current: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema,'users');


export default User;