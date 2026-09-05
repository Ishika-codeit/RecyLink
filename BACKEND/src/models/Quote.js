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