const Car = require("./car.model");

//posting a car
const createACar =  async (req, res) =>{
    try {
        const newCar = await Car({...req.body});
        await newCar.save();
        res.status(200).send({message: "Car created successfully", car: newCar})
    } catch(error){
        console.error("Error creating car", error);
        res.status(500).send({message: "Failed to create car"});
    }
}

//get all books
const getAllCars = async(req, res) => {
    try{
        const cars = await Car.find().sort({createdAt: -1});
        res.status(200).send({message: "Cars retrieved successfully", cars})
    } catch (error){
        console.error("Error fetching cars", error);
        res.status(500).send({message: "Failed to fetch cars"})
    }
}

//getting a single car
const getSingleCar = async(req, res) => {
    try{
        const {id} = req.params;
        const car = await Car.findById(id);
        if(!car){
            res.status(404).send({message: "Car not found"})
        }
        res.status(200).send(car)
    } catch (error){
        console.error("Error fetching cars", error);
        res.status(500).send({message: "Failed to fetch cars"})
    }
}

//updating a car
const updateCar = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedCar = await Car.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedCar){
            res.status(404).send({message: "Car not found"})
        }
        res.status(200).send({
            message: "Car updated successfully",
            car: updatedCar
        })
    } catch (error) {
        console.error("Error updating a car", error);
        res.status(500).send({message: "Failed to fetch cars"})
    }
}

//deleting a car
const deleteCar = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        if(!deletedCar) {
            res.status(404).send({message: "Car is not found!"});
        }
        res.status(200).send({
            message: "Car deleted successfully",
            car: deletedCar
        })
    } catch(error) {
        console.error("Error deleting a car", error);
        res.status(500).send({message: "Failed to delete a car"});
    }
}

module.exports = {
    createACar, getAllCars, getSingleCar, updateCar, deleteCar
}