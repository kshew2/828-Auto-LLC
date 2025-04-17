import React, { useState } from "react";
import CarCard from "../cars/CarCard";
import { useFetchAllCarsQuery } from "../../redux/features/cars/carsApi";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

const categories = [
  "Choose a Type",
  "Coupe",
  "Sedan",
  "Pickup Truck",
  "Crossover",
  "Minivan",
  "Hatchback",
  "Convertible",
  "Sports Car",
  "EV",
  "Hybrid",
  "Minivan",
];

const NewListings = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a Type");
  const { data, error, isLoading } = useFetchAllCarsQuery();
  const cars = data?.cars || [];

  const filteredCars =
    selectedCategory === "Choose a Type"
      ? cars
      : cars.filter(
          (car) =>
            car.category.toLowerCase() === selectedCategory.toLowerCase()
        );

        const [sliderRef, instanceRef] = useKeenSlider({
          loop: true,
          mode: "snap",
          slides: {
            perView: 1,
            spacing: 0,
            origin: "center",
          },
        });
        
  if (!Array.isArray(filteredCars)) {
    console.error("filteredCars is not an array", filteredCars);
    return <p>Error: Invalid data structure</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading cars: {error.message}</p>;
  }

  return (
    <div className="py-10 bg-bgdark px-5">
      <div className="max-w-screen-xl justify-center mx-auto items-center">
        <h2 className="text-3xl font-semibold mb-6 text-secondary font-primary">
          Newest Listings
        </h2>

        {/* Category Filtering */}
        <div className="mb-8 flex items-center">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category"
            id="category"
            className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* No cars message */}
        {filteredCars.length === 0 ? (
  <p className="text-lg text-secondary font-medium text-center mt-10 h-full p-48">
    No cars of this choice
  </p>
) : (
  <div className="relative">
    <div ref={sliderRef} className="keen-slider w-full overflow-hidden">
      {filteredCars.map((car, index) => (
        <div className="keen-slider__slide w-full" key={index}>
          <CarCard car={car} />
        </div>
      ))}
    </div>

    {/* Navigation Buttons */}
    <button
      onClick={() => instanceRef.current?.prev()}
      className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
    >
      <ArrowLeft className="text-white w-5 h-5" />
    </button>
    <button
      onClick={() => instanceRef.current?.next()}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
    >
      <ArrowRight className="text-white w-5 h-5" />
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default NewListings;
