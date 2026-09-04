const express = require("express");

const {
  createQuote,
  getQuotesByWaste,
  selectQuote
} = require("../controllers/quoteController");

const router = express.Router();

router.post("/", createQuote);

router.get("/:wasteId", getQuotesByWaste);

router.put("/:id/select", selectQuote);

module.exports = router;