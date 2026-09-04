const express = require("express");
const { 
    createQuote,
    getQuotes,
    getQuotesByWaste,
    selectQuote,
    rejectQuote
 } = require("../controllers/quoteController");

const router = express.Router();

router.post("/", createQuote);

router.get("/", getQuotes);

router.get("/waste/:wasteId", getQuotesByWaste);

router.patch("/:quoteId/select", selectQuote);

router.patch("/:quoteId/reject", rejectQuote);

module.exports = router;