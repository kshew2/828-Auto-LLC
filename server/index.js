const express = require('express');
const app = express();
const cors = require("cors");
const multer = require("multer");
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config();
//console.log('DB_URL:', process.env.DB_URL);



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173', 'https://828autollc.vercel.app'], // Allow your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow credentials (cookies, headers)
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
        if (!process.env.DB_URL) {
            throw new Error('DB_URL is not defined in the environment variables.');
        }
        //console.log('Connecting to MongoDB with URL:', process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully");

        app.get('/', (req, res) => {
            res.send("Car server is running!");
        });

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

main();
