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
        }
    },

    {
        timestamps: true
    }
);

const Demand = mongoose.model("Demand", demandSchema);

module.exports = Demand;