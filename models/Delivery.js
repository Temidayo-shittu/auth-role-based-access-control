const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    delivery_reference: {
      type: String,
      required: true,
      unique: true
    },
    recipient_name: {
      type: String,
      required: true
    },
    delivery_address: {
      type: String,
      required: true
    },
    delivery_date: {
      type: Date,
      required: true
    },
    delivery_fee: {
        type: Number,
        required: true
      },
    status: {
      type: String,
      enum: ['PENDING', 'OUT_FOR_DELIVERY', 'DELIVERED'],
      default: 'PENDING'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Delivery', DeliverySchema);
  