import React from 'react';
import InventoryCarCard from '../cars/InventoryCarCard';

const Inventory = ({ cars }) => {
  return (
    <div className="py-4 bg-bgdark h-full px-0">
      <div className="max-w-screen-xl justify-center mx-auto items-center">
        {/* <h2 className="text-3xl font-semibold mb-6 text-secondary font-primary">
          All Inventory
        </h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-8">
          {cars.map((car) => (
            <InventoryCarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;