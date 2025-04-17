import React, { useEffect, useRef, useState } from "react";
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
];

const NewListings = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a Type");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const { data, error, isLoading } = useFetchAllCarsQuery();
  const cars = data?.cars || [];

  const filteredCars =
    selectedCategory === "Choose a Type"
      ? cars
      : cars.filter(
          (car) =>
            car.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const [sliderInstanceRef, instance] = useKeenSlider(
    {
      loop: true,
      mode: "snap",
      slides: {
        perView: 1,
        spacing: 15,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [filteredCars.length > 1]
  );

  useEffect(() => {
    sliderRef.current = instance.current;
  }, [instance]);

  if (!Array.isArray(filteredCars)) {
    console.error("filteredCars is not an array", filteredCars);
    return <p>Error: Invalid data structure</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cars: {error.message}</p>;

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
            value={selectedCategory}
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

        {/* No Cars Message */}
        {filteredCars.length === 0 ? (
          <p className="text-lg text-secondary font-medium text-center mt-10 h-full p-48">
            No cars of this choice
          </p>
        ) : filteredCars.length === 1 ? (
          // Show single car without slider
          <div className="w-full flex justify-center">
            <CarCard car={filteredCars[0]} />
          </div>
        ) : (
          // Show carousel with multiple cars
          <div className="relative">
            {/* Arrows (hidden on small screens) */}
            <button
              onClick={() => sliderRef.current?.prev()}
              className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-black px-3 py-2 rounded shadow hover:bg-gray-200 transition"
            >
              &#8592;
            </button>
            <button
              onClick={() => sliderRef.current?.next()}
              className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-black px-3 py-2 rounded shadow hover:bg-gray-200 transition"
            >
              &#8594;
            </button>

            {/* Carousel */}
            <div
              key={filteredCars.length + selectedCategory}
              ref={sliderInstanceRef}
              className="keen-slider w-full"
            >
              {filteredCars.map((car, index) => (
                <div className="keen-slider__slide px-2" key={index}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {filteredCars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => sliderRef.current?.moveToIdx(idx)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === idx ? "bg-secondary" : "bg-gray-400"
                  } transition duration-300`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewListings;
