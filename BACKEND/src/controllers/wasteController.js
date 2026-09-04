const Waste = require("../models/Waste");
const { checkWaste } = require("../services/aiService");

const createWaste = async (req, res) => {
  try {
    const {
      wasteType,
      quantity,
      location,
      condition
    } = req.body;

    // Validate text fields
    if (!wasteType || !quantity || !location || !condition) {
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

    // Send image + condition to AI
    const aiResult = await checkWaste(
      req.file.path,
      condition
    );

    // Save data + AI result in MongoDB
    const waste = await Waste.create({
      wasteType,
      quantity,
      location,
      condition,
      image: req.file.path,

      category: aiResult.category,

      classificationConfidence:
        aiResult.classification_confidence,

      recommendation:
        aiResult.recommendation,

      repairabilityConfidence:
        aiResult.repairability_confidence,

      reason:
        aiResult.reason,

      suggestedActions:
        aiResult.suggested_actions,

      reusePotential:
        aiResult.reuse_potential
    });

    res.status(201).json({
      success: true,
      message: "Waste uploaded and analyzed successfully",
      waste
    });

  } catch (error) {
    console.error("Create Waste Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createWaste
};