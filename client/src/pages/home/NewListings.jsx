import React, { useEffect, useState } from "react";
import CarCard from "../cars/CarCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFetchAllCarsQuery } from "../../redux/features/cars/carsApi";

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
  console.log(cars);

  const filteredCars =
    selectedCategory === "Choose a Type"
      ? cars
      : cars.filter((car) => car.category.toLowerCase() === selectedCategory.toLowerCase());

  console.log("Filtered Cars:", filteredCars);

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
{
  `<style>
  .swiper {
  width: 100%;
}
.swiper-slide {
  width: 100% !important;
}
  </style>
`
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
        {/* Show message if no cars match the selected category */}
        {filteredCars.length === 0 ? (
          <p className="text-lg text-secondary font-medium text-center mt-10 h-full p-48">
            No cars of this choice
          </p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="car-carousel bg-bgdark w-full"
          >
            {filteredCars.map((car, index) => (
              <SwiperSlide key={index} className="!w-full px-2">
              <div className="w-full">
                <CarCard car={car} />
              </div>
            </SwiperSlide>
            
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default NewListings;