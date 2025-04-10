const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    // _id: {
    //     type: Number,
    //     required: true,
    // },
    make: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    engine: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["available", "sold", "maintenance"],
      default: "available",
    },
    // coverImages: {
    //   type: Array,
    //   required: true,
    // },
    features: {
      type: Array,
      required: false,
    },
    media: {
      type: Array,
      required: false,
    },
    coverImage: String,
    color: {
      type: String,
      required: false,
    },
    trim: {
      type: String,
      required: false,
    },
    mileage: {
      type: Number,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
