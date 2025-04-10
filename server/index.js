const express = require('express');
const app = express();
const cors = require("cors");
const multer = require("multer");
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config();



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173', 'https://828-auto-llc-0.vercel.app'], // Allow your frontend to access the backend
    credentials: true,                // Allow credentials (cookies, headers)
}));
// Configure multer (You can set custom storage options if needed)
const upload = multer();  // This sets up multer to handle form-data, but you can configure it more if needed

// routes
const carRoutes = require('./src/cars/car.route');
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/cars", carRoutes);
app.use("/api/auth", userRoutes);

async function main() {
    try {
        //console.log('Connecting to MongoDB with URL:', process.env.DB_URL)
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully");
        
        // This route should be after the database connection and server initialization
        app.get('/', (req, res) => {
            res.send("Car server is running!");
        });

        // Start the server only after the DB connection is established
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

main();
