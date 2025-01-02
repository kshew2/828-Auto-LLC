const express = require('express');
const app = express();
const cors = require("cors");

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Allow your frontend to access the backend
    credentials: true,                // Allow credentials (cookies, headers)
}));

// routes
const carRoutes = require('./src/cars/car.route');
app.use("/api/cars", carRoutes);

async function main() {
    try {
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
