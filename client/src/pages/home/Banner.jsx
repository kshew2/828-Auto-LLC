import React from "react";
import bannerIMG from "../../assets/bannercar.jpg";
import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="bg-bgdark">
      <div
        className="flex items-center justify-center w-full bg-cover bg-no-repeat bg-center min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] xl:min-h-screen px-4"
        style={{ backgroundImage: `url(${bannerIMG})` }}
      >
        <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center gap-4 md:gap-6 bg-black/50 p-4 rounded-lg">
          <h1 className="text-white font-primary font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Welcome to 828 AUTO LLC
          </h1>
          <p className="text-white font-primary text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl">
            FIND YOUR DREAM CAR AMONG OUR WIDE SELECTION OF VEHICLES
          </p>
          <Link
            to="/allinventory"
            className="mt-2 bg-primary hover:bg-primary/90 text-secondary px-6 py-3 rounded-full font-secondary text-base sm:text-lg transition duration-200"
          >
            All Inventory
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Banner);
