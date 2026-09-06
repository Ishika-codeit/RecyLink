const Waste = require("../models/Waste");
const { checkWaste } = require("../services/aiService");

const createWaste = async (req, res) => {
  try {
    const {
      wasteType,
      quantity,
      location,
      condition,
      collectorName
    } = req.body;

    // Validate text fields
    if (!wasteType || !quantity || !location || !condition || !collectorName) {
      return res.status(400).json({
        success: false,
        message:
          "wasteType, quantity, location and condition are required"
      });
    }

    // Validate image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Waste image is required"
      });
    }

    // Send image to AI service
    const aiResult = await checkWaste(
  req.file.buffer,
  req.file.originalname,
  condition
);
    // Save waste + AI result
    const waste = await Waste.create({
      wasteType,
      quantity,
      location,
      condition,
      collectorName,
      image: req.file.originalname,

      category: aiResult.category,
      classificationConfidence:
        aiResult.classification_confidence,

      recommendation: aiResult.recommendation,

      repairabilityConfidence:
        aiResult.repairability_confidence,

      reason: aiResult.reason,

      suggestedActions:
        aiResult.suggested_actions || [],

      reusePotential:
        aiResult.reuse_potential
    });

    res.status(201).json({
      success: true,
      message: "Waste uploaded successfully",
      waste
    });

  } catch (error) {
    console.error("Create Waste Error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid waste data",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create waste",
      error: error.message
    });
  }
};


const getWastes = async (req, res) => {
  try {
    const wastes = await Waste.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wastes.length,
      wastes
    });

  } catch (error) {
    console.error("Get Wastes Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch wastes",
      error: error.message
    });
  }
};


module.exports = {
  createWaste,
  getWastes
};