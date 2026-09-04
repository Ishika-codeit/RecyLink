const express = require("express");

const {
    createWaste
} = require("../controllers/wasteController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), createWaste);

module.exports = router;