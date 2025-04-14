import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  preferences: {
    waterTracking: { type: Boolean, default: true },
    calorieTracking: { type: Boolean, default: true }
  }
}, { timestamps: true });

const Preference = mongoose.model('Preference', preferenceSchema);

export default Preference;
