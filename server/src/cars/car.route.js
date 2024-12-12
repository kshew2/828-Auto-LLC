const express = require('express');
const Car = require('./car.model');
const { createACar, getAllCars, getSingleCar, updateCar, deleteCar } = require('./car.controller');
const router = express.Router();

//frontend request to backend server => controller => car schema => database => send to server =>
    // back to frontend

//post a car
router.post("/add-car", createACar);

//get all cars
router.get("/", getAllCars);

//get single car
router.get("/:id", getSingleCar);

//update a car
router.put("/edit/:id", updateCar);

//deleting a car
router.delete("/delete/:id", deleteCar);

module.exports = router;