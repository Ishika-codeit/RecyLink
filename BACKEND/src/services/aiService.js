const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const checkWaste = async (imagePath, condition) => {
  try {
    const formData = new FormData();

    formData.append(
      "image",
      fs.createReadStream(imagePath)
    );

    formData.append("condition", condition);

    const response = await axios.post(
      process.env.AI_API_URL,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
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
  checkWaste
};