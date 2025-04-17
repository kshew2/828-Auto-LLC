import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
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
  <div className="bg-secondary w-full rounded-lg transition-shadow duration-300 flex sm:justify-start justify-center p-2">
  <div className="flex sm:flex-row flex-col items-center w-full">
    {/* Image Section */}
    <div className="sm:w-1/2 w-full p-2 sm:max-h-[500px] max-h-[300px] h-full">
      <div className="w-full h-full">
        {renderMedia(car.coverImage)}
      </div>
    </div>

    {/* Details Section */}
    <div className="sm:w-1/2 w-full p-2 text-left self-start">
      <h3 className="text-2xl lg:text-3xl text-bgdark font-secondary font-semibold hover:text-secondary-accent mb-4">
        {car.year} {car.make} {car.model}
      </h3>

      <p className="text-lg lg:text-xl font-medium mb-4 text-tertiary-accent">
        ${car.price} | {car.mileage} miles
      </p>
<hr className="my-4 border-gray-300" />
      {/* Details Grid - Adjusting layout for md screens */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-base lg:text-xl ">
  <div className="flex lg:mt-4 flex-col lg:mb-4 sm:flex-row">
    <p className="font-semibold mr-2">Make:</p>
    <p className="md:ml-0">{car.make || 'N/A'}</p>
  </div>
  <div className="flex lg:mt-4 flex-col lg:mb-4 sm:flex-row">
    <p className="font-semibold mr-2">Trim:</p>
    <p className="md:ml-0">{car.trim || 'N/A'}</p>
  </div>
  <div className="flex lg:mt-4 flex-col lg:mb-4 sm:flex-row">
    <p className="font-semibold mr-2">Model:</p>
    <p className="md:ml-0">{car.model || 'N/A'}</p>
  </div>
  <div className="flex lg:mt-4 flex-col lg:mb-4 sm:flex-row">
    <p className="font-semibold mr-2">Mileage:</p>
    <p className="md:ml-0">{car.mileage || 'N/A'}</p>
  </div>
  <div className="flex lg:mt-4 flex-col lg:mb-4 sm:flex-row">
  <p className="font-semibold mr-2">Year:</p>
    <p className="md:ml-0">{car.year || 'N/A'}</p>
  </div>
  <div className="flex lg:mt-4 flex-col lg:mb-4 sm:flex-row">
    <p className="font-semibold mr-2">Type:</p>
    <p className="md:ml-0">{car.type || 'N/A'}</p>
  </div>
  <div className="flex lg:mt-4 flex-col lg:mb-4 sm:flex-row">
    <p className="font-semibold mr-2">Color:</p>
    <p className="md:ml-0">{car.color || 'N/A'}</p>
  </div>
  <div className="flex lg:mt-4 flex-col lg:mb-4 sm:flex-row">
    <p className="font-semibold mr-2">Engine:</p>
    <p className="md:ml-0">{car.engine || 'N/A'}</p>
  </div>
</div>

    </div>
  </div>
</div>

    </Link>
  );
};

export default CarCard;