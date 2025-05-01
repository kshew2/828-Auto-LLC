import React from 'react';
import { Link } from 'react-router-dom';

const InventoryCarCard = ({ car }) => {
  const renderMedia = (url) => {
    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      return <img src={url} alt="Car media" className="w-full h-full object-cover" />;
    } else if (url.match(/\.(mp4|webm|ogg)$/) != null) {
      return (
        <video controls className="w-full h-full object-cover">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };

  return (
    <Link to={`/cars/${car._id}`}>
      <div className="bg-secondary w-full mx-auto rounded-lg transition-shadow duration-300 flex flex-col items-center p-3">
        {/* Image Section with fixed height */}
        <div className="w-full p-2 h-96">
          <div className="w-full h-full">
            {renderMedia(car.coverImage)}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full p-3 text-left">
          <h3 className="text-2xl lg:text-3xl text-bgdark font-secondary font-semibold hover:text-secondary-accent mb-4">
            {car.year} {car.make} {car.model}
          </h3>

          <p className="text-lg lg:text-xl font-medium mb-4 text-tertiary-accent">
            ${car.price} | {car.mileage} miles
          </p>
          <hr className="my-4 border-gray-300" />
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-2 text-base lg:text-xl">
            <div className="flex flex-col">
              <p className="font-semibold">Make:</p>
              <p>{car.make || 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Trim:</p>
              <p>{car.trim || 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Model:</p>
              <p>{car.model || 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Mileage:</p>
              <p>{car.mileage || 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Year:</p>
              <p>{car.year || 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Type:</p>
              <p>{car.type || 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Color:</p>
              <p>{car.color || 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Engine:</p>
              <p>{car.engine || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InventoryCarCard;