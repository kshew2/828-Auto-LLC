import React, { useState, useRef } from "react";
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
            car.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const sliderRef = useRef(null);

  const [sliderInstanceRef, setSliderInstanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 15,
    },
    created(s) {
      sliderRef.current = s;
    },
  });

  if (!Array.isArray(filteredCars)) {
    console.error("filteredCars is not an array", filteredCars);
    return <p>Error: Invalid data structure</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cars: {error.message}</p>;

  return (
    <div className="py-10 bg-bgdark px-5">
      <div className="max-w-screen-xl justify-center mx-auto items-center relative">
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
            {/* Arrow Buttons */}
            <button
              onClick={() => sliderRef.current?.prev()}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 text-black px-3 py-2 rounded shadow hover:bg-gray-200 transition"
            >
              &#8592;
            </button>
            <button
              onClick={() => sliderRef.current?.next()}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 text-black px-3 py-2 rounded shadow hover:bg-gray-200 transition"
            >
              &#8594;
            </button>

            <div ref={sliderInstanceRef} className="keen-slider w-full">
              {filteredCars.map((car, index) => (
                <div className="keen-slider__slide px-2" key={index}>
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
