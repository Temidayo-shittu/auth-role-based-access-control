const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" }, // Auto-delete after 7 days
  terminatedAt: { type: Date },
});

module.exports = mongoose.model("Session", SessionSchema);
