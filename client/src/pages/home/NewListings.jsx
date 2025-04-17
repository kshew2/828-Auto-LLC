import React, { useState } from "react";
import CarCard from "../cars/CarCard";
import { useFetchAllCarsQuery } from "../../redux/features/cars/carsApi";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      : cars.filter((car) => car.category.toLowerCase() === selectedCategory.toLowerCase());

  const [sliderRef, sliderInstanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 0,
      },
    },
    [slider => {
      sliderInstanceRef.current = slider;
    }]
  );

  const sliderInstance = sliderInstanceRef.current;

  if (!Array.isArray(filteredCars)) {
    return <p>Error: Invalid data structure</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cars: {error.message}</p>;

  return (
    <div className="py-10 bg-bgdark px-5">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-secondary font-primary text-center">
          Newest Listings
        </h2>

        {/* Category Dropdown */}
        <div className="mb-8 flex items-center justify-center">
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

        {/* No Cars Fallback */}
        {filteredCars.length === 0 ? (
          <p className="text-lg text-secondary font-medium text-center mt-10 h-full p-48">
            No cars of this choice
          </p>
        ) : (
          <div className="relative">
            {/* Arrows */}
            <button
              onClick={() => sliderInstance?.prev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md"
            >
              <ChevronLeft className="text-secondary" />
            </button>
            <button
              onClick={() => sliderInstance?.next()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md"
            >
              <ChevronRight className="text-secondary" />
            </button>

            {/* Slider */}
            <div ref={sliderRef} className="keen-slider w-full">
              {filteredCars.map((car, index) => (
                <div className="keen-slider__slide" key={index}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewListings;
