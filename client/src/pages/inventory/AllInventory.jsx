import React, { useState } from 'react';
import Inventory from './Inventory';
import { useFetchAllCarsQuery } from '../../redux/features/cars/carsApi';

const categories = [
  "All Cars",
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

const AllInventory = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Cars");
  const { data, error, isLoading } = useFetchAllCarsQuery();
  const cars = data?.cars || [];

  const filteredCars =
    selectedCategory === "All Cars"
      ? cars
      : cars.filter((car) => car.category.toLowerCase() === selectedCategory.toLowerCase());

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading cars: {error.message}</p>;
  }

  return (
    <div className="py-2 bg-bgdark min-h-screen px-5">
      <div className="max-w-screen-xl justify-center mx-auto items-center">
        <h2 className="text-3xl font-semibold mb-2 text-secondary font-primary">
          All Inventory
        </h2>

        {/* Category Filtering */}
        <div className="mb-4 flex items-center">
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

        {/* Show selected category heading */}
        <h3 className="text-2xl font-semibold mb-1 text-secondary font-primary">
          {selectedCategory === "Choose a Type" ? "All Cars" : selectedCategory}
        </h3>

        {/* Show message if no cars match the selected category */}
        {filteredCars.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-secondary font-medium text-center">
            No {selectedCategory === "Choose a Type" ? "Cars" : selectedCategory}s available currently.
            </p>
          </div>
        ) : (
          <Inventory cars={filteredCars} />
        )}
      </div>
    </div>
  );
};

export default AllInventory;