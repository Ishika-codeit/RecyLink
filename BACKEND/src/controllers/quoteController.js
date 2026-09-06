const Quote = require("../models/Quote");
const Waste = require("../models/Waste");

const createQuote = async (req, res) => {
  try {
    const {
      wasteId,
      collectorId,
      amount,
      pricePerUnit,
      quantity,
      pickupType,
      validity,
      message
    } = req.body;

    // Check required fields
    if (
      !wasteId ||
      !collectorId ||
      amount === undefined ||
      pricePerUnit === undefined ||
      quantity === undefined ||
      !pickupType
    ) {
      return res.status(400).json({
        success: false,
        message:
          "wasteId, collectorId, amount, pricePerUnit, quantity and pickupType are required"
      });
    }

    // Check whether waste exists
    const waste = await Waste.findById(wasteId);

    if (!waste) {
      return res.status(404).json({
        success: false,
        message: "Waste not found"
      });
    }

    // Make sure quantity does not exceed collector submission
    if (Number(quantity) > Number(waste.quantity)) {
      return res.status(400).json({
        success: false,
        message: `Quantity cannot exceed collector submitted quantity of ${waste.quantity}`
      });
    }

    // Create quote
    const quote = await Quote.create({
      wasteId,
      collectorId,
      amount: Number(amount),
      pricePerUnit: Number(pricePerUnit),
      quantity: Number(quantity),
      pickupType,
      validity: validity || "3 days",
      message: message || ""
    });

    res.status(201).json({
      success: true,
      message: "Quote created successfully",
      quote
    });

  } catch (error) {
    console.error("Create Quote Error:", error);

    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid quote data",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create quote",
      error: error.message
    });
  }
};

const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate("wasteId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      quotes
    });

  } catch (error) {
    console.error("Get Quotes Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes",
      error: error.message
    });
  }
};

const getQuotesByWaste = async (req, res) => {
  try {
    const { wasteId } = req.params;

    const quotes = await Quote.find({ wasteId })
      .populate("wasteId")
      .sort({ amount: 1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      quotes
    });

  } catch (error) {
    console.error("Get Quotes By Waste Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes for this waste",
      error: error.message
    });
  }
};

const selectQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;

    // Find selected quote
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found"
      });
    }

    // Select this quote
    quote.status = "SELECTED";
    await quote.save();

    // Reject all other quotes for the same waste
    await Quote.updateMany(
      {
        wasteId: quote.wasteId,
        _id: { $ne: quote._id }
      },
      {
        $set: { status: "REJECTED" }
      }
    );

    res.status(200).json({
      success: true,
      message: "Quote selected successfully",
      quote
    });

  } catch (error) {
    console.error("Select Quote Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to select quote",
      error: error.message
    });
  }
};

const rejectQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;

    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found"
      });
    }

    quote.status = "REJECTED";
    await quote.save();

    res.status(200).json({
      success: true,
      message: "Quote rejected successfully",
      quote
    });

  } catch (error) {
    console.error("Reject Quote Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reject quote",
      error: error.message
    });
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuotesByWaste,
  selectQuote,
  rejectQuote
};