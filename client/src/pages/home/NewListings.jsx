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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const sliderRef = useRef(null);

  const { data, error, isLoading } = useFetchAllCarsQuery();
  const cars = data?.cars || [];

  const filteredCars =
    selectedCategory === "Choose a Type"
      ? cars
      : cars.filter(
          (car) =>
            car.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const shouldUseSlider = filteredCars.length > 1;

  const [sliderInstanceRef] = useKeenSlider(
    shouldUseSlider
      ? {
          loop: true,
          mode: "snap",
          slides: {
            perView: 1,
            spacing: 15,
          },
          created(slider) {
            sliderRef.current = slider;
            setTotalSlides(slider.track.details.slides.length);
          },
          slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
          },
        }
      : null // disables slider
  );

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
        <div className="relative w-fit">
  <select
    onChange={(e) => setSelectedCategory(e.target.value)}
    value={selectedCategory}
    name="category"
    id="category"
    className="border border-gray-300 rounded-md px-4 py-2 text-black bg-[#EAEAEA] focus:outline-none focus:ring-2 focus:ring-secondary appearance-none pr-10"
  >
    {categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ))}
  </select>

  {/* Down Arrow */}
  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 text-sm">
    ▼
  </div>
</div>

        {/* No cars message */}
        {filteredCars.length === 0 ? (
          <p className="text-lg text-secondary font-medium text-center mt-10 h-full p-48">
            No cars of this choice
          </p>
        ) : filteredCars.length === 1 ? (
          // Just one car, no slider
          <div className="w-full flex justify-center">
            <CarCard car={filteredCars[0]} />
          </div>
        ) : (
          // Multiple cars, show slider
          <div className="relative">
            {/* Arrows - hidden on small screens */}
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

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => sliderRef.current?.moveToIdx(idx)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === idx
                      ? "bg-secondary"
                      : "bg-gray-400"
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
