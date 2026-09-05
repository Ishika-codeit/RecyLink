const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema(
  {
    wasteType: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    condition: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    // AI Result
    category: {
      type: String,
      default: null
    },

    classificationConfidence: {
      type: Number,
      default: null
    },

    recommendation: {
      type: String,
      default: null
    },

    repairabilityConfidence: {
      type: Number,
      default: null
    },

    reason: {
      type: String,
      default: null
    },

    suggestedActions: {
      type: [String],
      default: []
    },

    reusePotential: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Waste = mongoose.model("Waste", wasteSchema);

module.exports = Waste;