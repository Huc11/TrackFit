const mongoose = require("mongoose");

const IntakeLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  water: {
    type: Number,
    default: 0,
  },
  calories: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("IntakeLog", IntakeLogSchema);
