const express = require('express');
const Car = require('./car.model');
const { createACar, getAllCars, getSingleCar, updateCar, deleteCar, getLatestCars } = require('./car.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }).fields([
    { name: 'media[]', maxCount: 20 }  // 'media[]' must match the name attribute in your form
]);

// Post a car
router.post("/add-car", verifyAdminToken, upload, createACar);

// Get all cars
router.get("/", getAllCars);

// Get single car
router.get("/:id", getSingleCar);

//Get 5 latest cars
router.get("/latest", getLatestCars);

// Update a car
router.put("/edit/:id", verifyAdminToken, upload, updateCar);

// Delete a car
router.delete("/delete/:id", verifyAdminToken, deleteCar);

module.exports = router;