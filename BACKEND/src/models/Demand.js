const mongoose = require("mongoose");

const demandSchema = new mongoose.Schema(
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

        minPrice: {
            type: Number,
            required: true,
            min: 0
        },

        maxPrice: {
            type: Number,
            required: true,
            min: 0
        },

        deadline: {
            type: Date,
            required: true
        },

        condition: {
            type: String,
            default: "Any Condition",
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        }
    },

    {
        timestamps: true
    }
);

const Demand = mongoose.model("Demand", demandSchema);

module.exports = Demand;