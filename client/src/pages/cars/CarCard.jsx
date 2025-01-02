import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="bg-transparent rounded-lg transition-shadow duration-300 flex justify-center">
      {/* <div className="flex flex-col items-center sm:items-start"> */}
      <div className="flex flex-col items-center ">
        <div className="w-11/12  p-10 mb-4">

          <Link to={`/cars/${car._id}`}>
            <img
              src={getImgUrl(car.coverImage)}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-contain bg-no-repeat rounded-md cursor-pointer hover:scale-105 transition-transform duration-200"
            />
            </Link>

        </div>

        {/* <div className="text-center sm:text-left"> */}
        <div className="text-center ">
        <Link to={`/cars/${car._id}`}>
            <h3 className="text-xl text-secondary font-secondary font-semibold hover:text-secondary-accent mb-2">
              {car.year + " " + car.make + " " + car.model}
            </h3>
          </Link>
          <p className="font-medium mb-4 font-secondary text-secondary-accent">
            $80 <span className="line-through font-normal ml-2">$100</span>
          </p>
          <button className="btn-primary px-6 flex items-center mx-auto gap-1">
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
