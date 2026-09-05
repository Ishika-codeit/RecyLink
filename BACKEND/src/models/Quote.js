const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema(
  {
    wasteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Waste",
      required: true
    },

    collectorId: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    pricePerUnit: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    pickupType: {
      type: String,
      enum: ["Recycler Pickup", "Collector Drop-off"],
      required: true
    },

    validity: {
      type: String,
      enum: ["1 day", "3 days", "5 days", "7 days"],
      default: "3 days"
    },

    message: {
      type: String,
      trim: true,
      default: ""
    },

    status: {
      type: String,
      enum: ["PENDING", "SELECTED", "REJECTED"],
      default: "PENDING"
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Quote", quoteSchema);