const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    waste: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Waste",
      required: true
    },

    recyclerName: {
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
      enum: ["Pending", "Selected", "Rejected"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;