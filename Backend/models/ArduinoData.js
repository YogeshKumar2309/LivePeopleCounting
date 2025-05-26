const mongoose = require("mongoose"); // <-- Yeh missing tha

const ArduinoDataSchema = new mongoose.Schema({
  people: { type: Number, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ArduinoData", ArduinoDataSchema);
