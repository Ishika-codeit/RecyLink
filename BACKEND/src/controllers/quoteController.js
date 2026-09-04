const Quote = require("../models/Quote");
const Waste = require("../models/Waste");

// POST /api/quotes
const createQuote = async (req, res) => {
  try {
    const { wasteId, recyclerName, amount, message } = req.body;

    if (!wasteId || !recyclerName || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "wasteId, recyclerName and amount are required"
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

    const quote = await Quote.create({
      waste: wasteId,
      recyclerName,
      amount,
      message
    });

    res.status(201).json({
      success: true,
      message: "Quote created successfully",
      quote
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create quote",
      error: error.message
    });
  }
};


// GET /api/quotes/:wasteId
const getQuotesByWaste = async (req, res) => {
  try {
    const { wasteId } = req.params;

    const quotes = await Quote.find({
      waste: wasteId
    }).sort({ amount: -1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      quotes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes",
      error: error.message
    });
  }
};


// PUT /api/quotes/:id/select
const selectQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findById(id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found"
      });
    }

    // Select this quote
    quote.status = "Selected";
    await quote.save();

    // Reject other quotes for same waste
    await Quote.updateMany(
      {
        waste: quote.waste,
        _id: { $ne: quote._id }
      },
      {
        $set: {
          status: "Rejected"
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "Quote selected successfully",
      quote
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to select quote",
      error: error.message
    });
  }
};


module.exports = {
  createQuote,
  getQuotesByWaste,
  selectQuote
};