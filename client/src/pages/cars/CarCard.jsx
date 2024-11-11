import React from 'react'
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';

const CarCard = ({car}) => {
  return (
    <div className=" rounded-lg transition-shadow duration-300 mb-10 items-center">
  <div
    className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
  >
    <div className="sm:h-72 sm:min-h-[300px] sm:flex-shrink-0 border rounded-md">

      <a href="/">
        <img
          src={`${getImgUrl(car.coverImage)}`}
          alt=""
          className="w-full bg-contain bg-no-repeat p-2 h-full rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
        />
      </a>
    </div>

    <div>
      <a href="/"
        ><h3 className="text-xl text-secondary font-secondary font-semibold hover:text-secondary-accent mb-3">
          {car.year + " " + car.make + " " + car.model}
        </h3></a>
      {/* <p className="text-secondary-accent font-secondary mb-5">Book Description</p> */}
      <p className="font-medium mb-5 font-secondary text-secondary-accent">
        $80 <span className="line-through font-normal ml-2">$100</span>
      </p>
      <button className="btn-primary px-6 mb-10 space-x-1 flex items-center gap-1 ">
        <FiShoppingCart className="" />
        <span>Add to Cart</span>
      </button>
    </div>
  </div>
</div>
  )
}

export default CarCard