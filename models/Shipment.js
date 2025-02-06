const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  tracking_number: {
    type: String,
    required: true,
    unique: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  shipment_fee: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'IN_TRANSIT', 'DELIVERED'],
    default: 'PENDING'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', ShipmentSchema);
