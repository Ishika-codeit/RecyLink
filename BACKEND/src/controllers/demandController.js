const Demand = require("../models/Demand");

// POST/api/demands
const createDemand = async (req, res)=>{

    try {
        const { wasteType, quantity, location } = req.body;

        const demand = await Demand.create({
            wasteType,
            quantity,
            location
        });

        res.status(201).json({
            success: true,
            message: "Demand created Successfully",
            demand
        });
    }
    catch(error){

        res.status(500).json({
            success: false,
            message: "Failed to create demand",
            error: error.message
        });
    }
};


// GET/api/demands
const getDemands = async (req, res) =>{

    try{
        const demands = await Demand.find().sort({createdAt: -1});

        res.status(200).json({
            success: true,
            count: demands.length,
            demands
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch demands",
            error: error.message
        });
    }
};

module.exports = {
    createDemand,
    getDemands
};