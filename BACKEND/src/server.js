
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Start Server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});