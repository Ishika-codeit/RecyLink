const Demand = require("../models/Demand");

const createDemand = async (req, res) => {
    try {
        const {
            wasteType,
            quantity,
            location,
            minPrice,
            maxPrice,
            deadline,
            condition,
            description
        } = req.body;

        if (
            !wasteType ||
            !quantity ||
            !location ||
            minPrice === undefined ||
            maxPrice === undefined ||
            !deadline
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "wasteType, quantity, location, minPrice, maxPrice and deadline are required"
            });
        }

        const demand = await Demand.create({
            wasteType,
            quantity,
            location,
            minPrice,
            maxPrice,
            deadline,
            condition,
            description
        });

        res.status(201).json({
            success: true,
            message: "Demand created Successfully",
            demand
        });

    } catch (error) {

        console.error("Create Demand Error:", error);

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