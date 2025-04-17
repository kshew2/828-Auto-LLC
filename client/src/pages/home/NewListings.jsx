import React, { useState } from "react";
import CarCard from "../cars/CarCard";
import { useFetchAllCarsQuery } from "../../redux/features/cars/carsApi";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Optional: icon library

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

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "snap",
      slides: { perView: 1, spacing: 15 },
    }
  );

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
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-secondary font-primary">
          Newest Listings
        </h2>

        {/* Category Dropdown */}
        <div className="mb-8 flex items-center">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* No Cars Message */}
        {filteredCars.length === 0 ? (
          <p className="text-lg text-secondary font-medium text-center mt-10 h-full p-48">
            No cars of this choice
          </p>
        ) : (
          <div className="relative w-full">
            <div ref={sliderRef} className="keen-slider w-full overflow-hidden">
              {filteredCars.map((car, index) => (
                <div className="keen-slider__slide p-0" key={index}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>

            {/* Arrow Controls */}
            {instanceRef.current && (
              <>
                <button
                  onClick={() => instanceRef.current?.prev()}
                  className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white text-black shadow-md hover:bg-gray-100 p-2 rounded-full z-10"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={() => instanceRef.current?.next()}
                  className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white text-black shadow-md hover:bg-gray-100 p-2 rounded-full z-10"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewListings;
