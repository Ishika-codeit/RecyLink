const axios = require("axios");
const FormData = require("form-data");

const checkWaste = async (imageBuffer, originalName, condition) => {
  try {
    const formData = new FormData();

    formData.append(
      "image",
      imageBuffer,
      {
        filename: originalName || "waste-image.jpg",
      }
    );

    formData.append("condition", condition);

    const response = await axios.post(
      process.env.AI_API_URL,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 120000,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "AI API Error:",
      error.response?.data || error.message
    );

    throw new Error("AI prediction failed");
  }
};

module.exports = {
  checkWaste,
};