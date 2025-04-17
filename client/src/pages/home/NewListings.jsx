import React, { useState } from "react";
import CarCard from "../cars/CarCard";
import { useFetchAllCarsQuery } from "../../redux/features/cars/carsApi";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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
            car.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      mode: "snap",
      slides: {
        perView: 1,
        spacing: 15,
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 2, spacing: 15 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 20 },
        },
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cars: {error.message}</p>;

  return (
    <div className="py-10 bg-bgdark px-5">
      <div className="max-w-screen-xl mx-auto">
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
            {/* Arrow Controls */}
            <button
              onClick={() => slider.current?.prev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-600"
            >
              ‹
            </button>
            <button
              onClick={() => slider.current?.next()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-600"
            >
              ›
            </button>

            {/* Carousel */}
            <div ref={sliderRef} className="keen-slider overflow-hidden">
              {filteredCars.map((car, index) => (
                <div
                  key={index}
                  className="keen-slider__slide flex justify-center px-2"
                >
                  <div className="w-full max-w-sm">
                    <CarCard car={car} />
                  </div>
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
