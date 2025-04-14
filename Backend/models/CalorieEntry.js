import mongoose from 'mongoose';

const calorieEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    calories: { type: Number, required: true }, // In kcal
    foodItem: { type: String, default: '' }, // Optional food description
});

export default mongoose.model('CalorieEntry', calorieEntrySchema);
