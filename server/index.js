const express = require('express')
const app = express()
const cors = require("cors");

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173/'],
    credentials: true
}))

//routes
const carRoutes = require('./src/cars/car.route')
app.use("/api/cars", carRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send("Car server is running!");
    })    
}

main().then(() => console.log("Mongodb connected successfully")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})