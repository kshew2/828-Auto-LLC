const Car = require("./car.model");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Posting a car
const createACar = async (req, res) => {
    try {
        // Extracting car details from the body
        const { price, make, model, year, type, color, engine, mileage, trim, category, features, coverImageIndex } = req.body;
        const media = [];
        let coverImage = '';

        // Check if files are present
        if (req.files && req.files['media[]'] && req.files['media[]'].length > 0) {
            // Upload media to Cloudinary with custom public IDs
            for (const [index, file] of req.files['media[]'].entries()) {
                const publicId = `car_${make}_${model}_${year}_${index + 1}`; // Generate a custom public ID
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({ 
                        resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
                        public_id: publicId
                    }, (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload error:', error); // Add debugging log
                            reject(error);
                        } else {
                            console.log('Cloudinary upload result:', result); // Add debugging log
                            resolve(result);
                        }
                    });
                    stream.end(file.buffer);
                });
                media.push(result.secure_url);

                // Set the cover image based on the coverImageIndex
                if (index === Number(coverImageIndex)) {
                    coverImage = result.secure_url;
                }
            }
        } else {
            console.log('No media files uploaded');
        }

        const newCar = new Car({
            price,
            make,
            model,
            year,
            type,
            color,
            engine,
            mileage: Number(mileage), // Ensure mileage is a number
            trim,
            category,
            features,
            media,
            coverImage // Set the cover image URL
        });

        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error creating car:', error.message); // Avoid logging sensitive information
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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
const getLatestCars = async (req, res) => {
    try {
      const latestCars = await Car.find().sort({ createdAt: -1 }).limit(5);
      res.status(200).json({ cars: latestCars });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch latest cars', error });
    }
  };

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
const updateCar = async (req, res) => {
    try {
        console.log('Update request received:', req.body);
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            console.log('Car not found:', id);
            return res.status(404).send({ message: "Car not found" });
        }

        // Handle media files
        const mediaFiles = req.files && req.files['media[]'] ? req.files['media[]'] : [];
        const newMediaUrls = [];
        let coverImage = car.coverImage;

        // Delete old images if new images are provided
        if (mediaFiles.length > 0) {
            for (const url of car.media) {
                const publicId = url.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId, (error, result) => {
                    if (error) {
                        console.error('Cloudinary delete error:', error);
                    } else {
                        console.log('Cloudinary delete result:', result);
                    }
                });
            }
        }

        // Upload new images
        for (const [index, file] of mediaFiles.entries()) {
            const publicId = `car_${req.body.make}_${req.body.model}_${req.body.year}_${index + 1}`;
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
                    public_id: publicId,
                    use_filename: true,
                    unique_filename: false
                }, (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        console.log('Cloudinary upload result:', result);
                        resolve(result);
                    }
                });
                stream.end(file.buffer);
            });
            newMediaUrls.push(result.secure_url);

            // Set the cover image based on the coverImageIndex
            if (index === Number(req.body.coverImageIndex)) {
                coverImage = result.secure_url;
            }
        }

        // Extract features from the request body
        const features = req.body.features ? req.body.features.filter(feature => feature !== null && feature !== undefined) : [];

        // Update car details
        const updatedCar = await Car.findByIdAndUpdate(
            id,
            {
                price: req.body.price,
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                type: req.body.type,
                color: req.body.color,
                engine: req.body.engine,
                mileage: req.body.mileage,
                trim: req.body.trim,
                category: req.body.category,
                status: req.body.status,
                features: features,
                media: newMediaUrls.length > 0 ? newMediaUrls : car.media,
                coverImage: coverImage
            },
            { new: true }
        );

        console.log('Car updated successfully:', updatedCar);
        res.status(200).send({
            message: "Car updated successfully",
            car: updatedCar
        });
    } catch (error) {
        console.error("Error updating a car", error);
        res.status(500).send({ message: "Failed to update car" });
    }
};

//deleting a car
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).send({ message: "Car not found" });
        }

        // Extract public IDs and resource types from media URLs
        const mediaItems = car.media.map(url => {
            const parts = url.split('/');
            const publicIdWithExtension = parts[parts.length - 1];
            const publicId = publicIdWithExtension.split('.')[0];
            const resourceType = url.includes('/video/upload/') ? 'video' : 'image';
            return { publicId, resourceType };
        });

        // Delete media from Cloudinary
        for (const { publicId, resourceType } of mediaItems) {
            await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        }

        // Delete the car document from the database
        await Car.findByIdAndDelete(id);

        res.status(200).send({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Error deleting car", error);
        res.status(500).send({ message: "Failed to delete car" });
    }
};

module.exports = {
    createACar, getAllCars, getSingleCar, updateCar, deleteCar, getLatestCars
}