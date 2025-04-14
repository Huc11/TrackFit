import mongoose from 'mongoose';

const waterEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true }, // In ml or cups (e.g., 250ml)
    notes: { type: String, default: '' }, // Optional notes for the entry
});

export default mongoose.model('WaterEntry', waterEntrySchema);
