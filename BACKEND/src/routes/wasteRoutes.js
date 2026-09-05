const express = require("express");

const {
    createWaste,
    getWastes
} = require("../controllers/wasteController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), createWaste);
router.get("/", getWastes);

module.exports = router;