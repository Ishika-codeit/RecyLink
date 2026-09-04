const express = require("express");

const {
    createDemand,
    getDemands
} = require("../controllers/demandController");

const router = express.Router();

router.post("/", createDemand);

router.get("/", getDemands);

module.exports = router;