import React from "react";
import bannerIMG from "../../assets/bannercar.jpg";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
      <img
        src={bannerIMG}
        alt="Car Banner"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white font-primary font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
          Welcome to 828 AUTO LLC
        </h1>
        <p className="text-white font-primary text-base sm:text-lg md:text-xl max-w-2xl mb-6">
          FIND YOUR DREAM CAR AMONG OUR WIDE SELECTION OF VEHICLES
        </p>
        <Link
          to="/allinventory"
          className="bg-primary hover:bg-primary/90 text-secondary px-6 py-3 rounded-full font-secondary text-base sm:text-lg transition duration-200"
        >
          All Inventory
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Banner);
