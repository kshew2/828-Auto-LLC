import React, { useEffect, useState } from "react";
import CarCard from "../cars/CarCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFetchAllCarsQuery } from "../../redux/features/cars/carsApi";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
  "Sci-Fi",
];

const NewListings = () => {
  // const [cars, setCars] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const {data: cars = []} = useFetchAllCarsQuery()
  console.log(cars)

  // useEffect(() => {
  //   fetch("cars.json")
  //     .then((res) => res.json())
  //     .then((data) => setCars(data));
  // }, []);

  const filteredCars =
    selectedCategory === "Choose a genre"
      ? cars
      : cars.filter((car) => car.category === selectedCategory.toLowerCase());

  return (
    <div className="py-10 bg-bgdark px-5">
      <div className="max-w-screen-xl justify-center mx-auto items-center">
        <h2 className="text-3xl font-semibold mb-6 text-secondary font-primary">
          New Listings
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
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="car-carousel bg-bgdark"
          >
            {filteredCars.map((car, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <CarCard car={car} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default NewListings;
