const express = require("express");
const cors = require("cors");

const demandRoutes = require("./routes/demandRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const quoteRoutes = require("./routes/quoteRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/demands", demandRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/quotes", quoteRoutes);

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Home Route 
app.get("/", (req, res)=>{
    res.json({
        message:"Recycling Backend API is Running"
    })
});

module.exports = app;